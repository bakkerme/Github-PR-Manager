// Package main is the main package for the app
package main

import (
	"context"
	"fmt"
	"strings"

	"github.com/bakkerme/github-pr-manager/githubservice"
)

type config struct {
	GithubUsername string
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

// GetPullRequestsToReviewForUser returns the pull requests to review for the given user
func (a *App) GetPullRequestsToReviewForUser() ([]githubservice.PullRequest, error) {
	issues, err := a.GetAssignedReviews()
	if err != nil {
		return nil, err
	}

	pullRequests := make([]githubservice.PullRequest, len(issues))
	for i, issue := range issues {
		userRepo, err := getUserAndRepoFromRepoURL(*issue.RepositoryURL)
		if err != nil {
			return nil, err
		}

		pr, err := a.GetPullRequest(userRepo.user, userRepo.repo, *issue.Number)
		if err != nil {
			return nil, err
		}

		reviews, err := a.gh.GetPullRequestReviews(userRepo.user, userRepo.repo, *issue.Number)
		if err != nil {
			return nil, err
		}

		pr.Reviews = reviews

		reviewState := getReviewStateForUsers(reviews)
		pr.ReviewStateForUser = reviewState

		comments, err := a.gh.GetPullRequestComments(userRepo.user, userRepo.repo, *issue.Number)
		if err != nil {
			return nil, err
		}
		pr.Comments = comments

		// Add pr to list to return
		pullRequests[i] = *pr
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
