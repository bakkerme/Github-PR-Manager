// Package githubservice provides github connections
package githubservice

import (
	"context"
	"fmt"

	"github.com/google/go-github/v45/github"
)

// GithubService is a service that provides access to the Github API
type GithubService interface {
	GetAssignedReviews(username string) ([]Issue, error)
	GetCompletedReviews(username string) ([]Issue, error)
	GetPullRequest(owner, repo string, number int) (PullRequest, error)
	GetPullRequestReviews(owner, repo string, number int) ([]PullRequestReview, error)
	GetPullRequestComments(owner, repo string, number int) ([]PullRequestComment, error)
}

type githubService struct {
	client *github.Client
	ctx    context.Context
}

// New creates a new GithubService
func New(ctx context.Context, client *github.Client) GithubService {
	return &githubService{
		client: client,
		ctx:    ctx,
	}
}

func (gh *githubService) GetAssignedReviews(username string) ([]Issue, error) {
	result, _, err := gh.client.Search.Issues(
		gh.ctx,
		fmt.Sprintf("is:open is:pr review-requested:%s", username),
		&github.SearchOptions{Sort: "created", Order: "asc", ListOptions: github.ListOptions{PerPage: 100}},
	)

	issues := []Issue{}
	for _, issue := range result.Issues {
		stIssue, err := githubIssueToIssue(issue)
		if err != nil {
			return nil, err
		}
		issues = append(issues, stIssue)
	}

	return issues, err
}

func (gh *githubService) GetCompletedReviews(username string) ([]Issue, error) {
	result, _, err := gh.client.Search.Issues(
		gh.ctx,
		fmt.Sprintf("is:pr reviewed-by:%s", username),
		&github.SearchOptions{Sort: "created", Order: "asc", ListOptions: github.ListOptions{PerPage: 100}},
	)

	issues := []Issue{}
	for _, issue := range result.Issues {
		stIssue, err := githubIssueToIssue(issue)
		if err != nil {
			return nil, err
		}
		issues = append(issues, stIssue)
	}

	return issues, err
}

func (gh *githubService) GetPullRequest(owner, repo string, number int) (PullRequest, error) {
	result, _, err := gh.client.PullRequests.Get(gh.ctx, owner, repo, number)
	if err != nil {
		return PullRequest{}, err
	}

	pr, err := githubPullRequestToPullRequest(result)
	return pr, err
}

func (gh *githubService) GetPullRequestReviews(owner, repo string, number int) ([]PullRequestReview, error) {
	result, _, err := gh.client.PullRequests.ListReviews(
		gh.ctx,
		owner,
		repo,
		number,
		&github.ListOptions{Page: 0, PerPage: 100},
	)

	reviews := []PullRequestReview{}
	for _, review := range result {
		prr, err := githubPullRequestReviewToPullRequestReview(review)
		if err != nil {
			return nil, err
		}
		reviews = append(reviews, prr)
	}

	return reviews, err
}

func (gh *githubService) GetPullRequestComments(owner, repo string, number int) ([]PullRequestComment, error) {
	result, _, err := gh.client.PullRequests.ListComments(
		gh.ctx,
		owner,
		repo,
		number,
		nil,
	)

	comments := []PullRequestComment{}
	for _, comment := range result {
		prc, err := githubPullRequestCommentToPullRequestComment(comment)
		if err != nil {
			return nil, err
		}
		comments = append(comments, prc)
	}

	return comments, err
}
