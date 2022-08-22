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
	GetPullRequest(owner, repo string, number int) (*PullRequest, error)
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
		issues = append(issues, *githubIssueToIssue(issue))
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
		issues = append(issues, *githubIssueToIssue(issue))
	}

	return issues, err
}

func (gh *githubService) GetPullRequest(owner, repo string, number int) (*PullRequest, error) {
	result, _, err := gh.client.PullRequests.Get(gh.ctx, owner, repo, number)
	pr := githubPullRequestToPullRequest(result)
	return &pr, err
}

func (gh *githubService) GetPullRequestReviews(owner, repo string, number int) ([]Review, error) {
	result, _, err := gh.client.PullRequests.GetReviews(gh.ctx, owner, repo, number)
	reviews := []Review{}
	for _, review := range result {
		reviews = append(reviews, *githubReviewToReview(review))
	}

	return reviews, err
}
