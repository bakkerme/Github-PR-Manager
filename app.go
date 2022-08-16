package main

import (
	"context"

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
