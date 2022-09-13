// Package main is the main package for the app
package main

import (
	"context"
	"fmt"
	"sort"
	"strings"
	"time"

	"github.com/bakkerme/github-pr-manager/githubservice"
)

type config struct {
	GithubUsername string
	Frameless      bool
	OrgFilter      *string
}

// App struct
type App struct {
	ctx context.Context
	gh  githubservice.GithubService
	cfg config
}

// NewApp creates a new App application struct
func NewApp(gh githubservice.GithubService, cfg config) *App {
	return &App{
		gh:  gh,
		cfg: cfg,
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// GetAssignedPullRequestsForUser returns the pull requests to review for the given user
func (a *App) GetAssignedPullRequestsForUser() ([]githubservice.PullRequest, error) {
	issues, err := a.GetAssignedReviews()
	if err != nil {
		return nil, err
	}

	pullRequests, err := processPullRequests(a.gh, issues, sortKeyUpdated, orderDirectionDesc, a.cfg.OrgFilter)
	if err != nil {
		return []githubservice.PullRequest{}, err
	}
	return pullRequests, nil
}

// GetReviewedPullRequestsForUser returns the pull requests to review for the given user
func (a *App) GetReviewedPullRequestsForUser() ([]githubservice.PullRequest, error) {
	issues, err := a.GetCompletedReviews()
	if err != nil {
		return nil, err
	}

	pullRequests, err := processPullRequests(a.gh, issues, sortKeyUpdated, orderDirectionDesc, a.cfg.OrgFilter)
	if err != nil {
		return []githubservice.PullRequest{}, err
	}
	return pullRequests, nil
}

// GetAssignedReviews returns the assigned reviews for user
func (a *App) GetAssignedReviews() ([]githubservice.Issue, error) {
	assignedReviews, err := a.gh.GetAssignedReviews(a.cfg.GithubUsername)
	if err != nil {
		return nil, err
	}

	return assignedReviews, nil
}

// GetCompletedReviews returns the completed reviews for user
func (a *App) GetCompletedReviews() ([]githubservice.Issue, error) {
	completedReviews, err := a.gh.GetCompletedReviews(a.cfg.GithubUsername)
	if err != nil {
		return nil, err
	}

	return completedReviews, nil
}

// GetPullRequest returns the pull request for the given owner, repo and number
func (a *App) GetPullRequest(owner, repo string, number int) (*githubservice.PullRequest, error) {
	pr, err := a.gh.GetPullRequest(owner, repo, number)
	if err != nil {
		return nil, err
	}

	return &pr, nil
}

// IsFrameless returns if frameless window is turned on
func (a *App) IsFrameless() bool {
	return a.cfg.Frameless
}

type userAndRepo struct {
	user string
	repo string
}

func getUserAndRepoFromRepoURL(url string) (*userAndRepo, error) {
	withoutDomain := strings.Replace(url, "https://api.github.com/repos/", "", 1)
	urlParts := strings.Split(withoutDomain, "/")
	if len(urlParts) != 2 {
		return nil, fmt.Errorf("invalid repo url: %s", url)
	}

	return &userAndRepo{
		user: urlParts[0],
		repo: urlParts[1],
	}, nil
}

func getReviewStateForUsers(reviews []githubservice.PullRequestReview) []githubservice.UserReviewState {
	userToReview := map[string]githubservice.UserReviewState{}

	for _, review := range reviews {
		if reviewEntry, ok := userToReview[*review.User.Login]; ok {
			reviewEntry.ReviewState = review.State
		} else {
			userToReview[*review.User.Login] = githubservice.UserReviewState{
				User:        review.User,
				ReviewState: review.State,
			}
		}
	}

	reviewsForUser := []githubservice.UserReviewState{}
	for _, review := range userToReview {
		reviewsForUser = append(reviewsForUser, review)
	}

	return reviewsForUser
}

type orderDirection string
type sortKey string

const (
	orderDirectionAsc  orderDirection = "asc"
	orderDirectionDesc orderDirection = "desc"
	sortKeyUpdated     sortKey        = "updated"
	sortKeyCreated     sortKey        = "created"
)

func processPullRequests(
	gh githubservice.GithubService,
	issues []githubservice.Issue,
	sortfield sortKey,
	order orderDirection,
	orgFilter *string,
) ([]githubservice.PullRequest, error) {
	type prAndError struct {
		pr  *githubservice.PullRequest
		err error
	}

	var ch = make(chan prAndError)

	pullRequests := []githubservice.PullRequest{}
	for _, issue := range issues {
		go func(ch chan (prAndError), issue githubservice.Issue) {
			issueNo := *issue.Number

			userRepo, err := getUserAndRepoFromRepoURL(*issue.RepositoryURL)
			if err != nil {
				ch <- prAndError{err: err}
				return
			}

			if orgFilter != nil && userRepo.user != *orgFilter {
				ch <- prAndError{
					pr: nil,
				}
				return
			}
			println(userRepo.user)

			pr, err := gh.GetPullRequest(userRepo.user, userRepo.repo, issueNo)
			if err != nil {
				ch <- prAndError{err: err}
				return
			}

			reviews, err := gh.GetPullRequestReviews(userRepo.user, userRepo.repo, issueNo)
			if err != nil {
				ch <- prAndError{err: err}
				return
			}

			pr.Reviews = reviews
			reviewState := getReviewStateForUsers(reviews)
			pr.ReviewStateForUser = reviewState

			comments, err := gh.GetIssueComments(userRepo.user, userRepo.repo, issueNo)
			if err != nil {
				ch <- prAndError{err: err}
				return
			}
			pr.Comments = comments

			ch <- prAndError{
				pr: &pr,
			}
		}(ch, issue)
	}

	for i := 0; i < len(issues); i++ {
		pr := <-ch
		if pr.err != nil {
			return nil, pr.err
		}

		if pr.pr != nil {
			pullRequests = append(pullRequests, *pr.pr)
		}
	}

	sort.Slice(
		pullRequests,
		func(p, q int) bool {
			currPR := pullRequests[p]
			otherPR := pullRequests[q]

			var fieldToCompare *time.Time
			var otherFieldToCompare *time.Time
			switch sortfield {
			case sortKeyUpdated:
				fieldToCompare = currPR.UpdatedAt
				otherFieldToCompare = otherPR.UpdatedAt
				break
			case sortKeyCreated:
				fieldToCompare = currPR.CreatedAt
				otherFieldToCompare = otherPR.CreatedAt
				break
			}

			if fieldToCompare == nil || otherFieldToCompare == nil {
				return false
			}

			if order == orderDirectionAsc {
				return fieldToCompare.Before(*otherFieldToCompare)
			}

			return fieldToCompare.After(*otherFieldToCompare)
		},
	)

	return pullRequests, nil

}
