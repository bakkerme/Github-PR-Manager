// Package githubservice provides github connections
package githubservice

import (
	"time"

	"github.com/google/go-github/v45/github"
)

// Issue is a struct that represents a pull request
type Issue struct {
	ID                *int64
	Number            *int
	State             *string
	Locked            *bool
	Title             *string
	Body              *string
	AuthorAssociation *string
	User              *User
	Comments          *int
	CreatedAt         *time.Time
	UpdatedAt         *time.Time
	URL               *string
	HTMLURL           *string
	CommentsURL       *string
	EventsURL         *string
	LabelsURL         *string
	RepositoryURL     *string
}

func githubIssueToIssue(ghi *github.Issue) *Issue {
	return &Issue{
		ID:                ghi.ID,
		Number:            ghi.Number,
		State:             ghi.State,
		Locked:            ghi.Locked,
		Title:             ghi.Title,
		Body:              ghi.Body,
		AuthorAssociation: ghi.AuthorAssociation,
		User:              githubUserToUser(ghi.User),
		Comments:          ghi.Comments,
		CreatedAt:         ghi.CreatedAt,
		UpdatedAt:         ghi.UpdatedAt,
		URL:               ghi.URL,
		HTMLURL:           ghi.HTMLURL,
		CommentsURL:       ghi.CommentsURL,
		EventsURL:         ghi.EventsURL,
		LabelsURL:         ghi.LabelsURL,
		RepositoryURL:     ghi.RepositoryURL,
	}
}

// User is a struct that represents a user
type User struct {
	Login             string
	ID                int64
	AvatarURL         string
	HTMLURL           string
	GravatarID        string
	Type              string
	SiteAdmin         bool
	URL               string
	EventsURL         string
	FollowingURL      string
	FollowersURL      string
	GistsURL          string
	OrganizationsURL  string
	ReceivedEventsURL string
	ReposURL          string
	StarredURL        string
	SubscriptionsURL  string
}

func githubUserToUser(ghu *github.User) *User {
	if ghu == nil {
		return nil
	}

	return &User{
		Login:             *ghu.Login,
		ID:                *ghu.ID,
		AvatarURL:         *ghu.AvatarURL,
		HTMLURL:           *ghu.HTMLURL,
		GravatarID:        *ghu.GravatarID,
		Type:              *ghu.Type,
		SiteAdmin:         *ghu.SiteAdmin,
		URL:               *ghu.URL,
		EventsURL:         *ghu.EventsURL,
		FollowingURL:      *ghu.FollowingURL,
		FollowersURL:      *ghu.FollowersURL,
		GistsURL:          *ghu.GistsURL,
		OrganizationsURL:  *ghu.OrganizationsURL,
		ReceivedEventsURL: *ghu.ReceivedEventsURL,
		ReposURL:          *ghu.ReposURL,
		StarredURL:        *ghu.StarredURL,
		SubscriptionsURL:  *ghu.SubscriptionsURL,
	}
}

// PullRequest is a struct that represents a pull request
type PullRequest struct {
	ID                 *int64
	Number             *int
	State              *string
	Locked             *bool
	Title              *string
	Body               *string
	CreatedAt          *time.Time
	UpdatedAt          *time.Time
	ClosedAt           *time.Time
	MergedAt           *time.Time
	User               *User
	Draft              *bool
	Merged             *bool
	Mergeable          *bool
	MergeableState     *string
	MergedBy           *User
	Comments           *int
	Additions          *int
	Deletions          *int
	ChangedFiles       *int
	HTMLURL            *string
	Assignee           *User
	Assignees          []*User
	RequestedReviewers []*User

	// Below are computed and not taken directly from a github.PullRequest object
	Reviews            []PullRequestReview
	ReviewStateForUser []UserReviewState
}

func githubPullRequestToPullRequest(ghp *github.PullRequest) PullRequest {
	assignees := make([]*User, 0)
	for _, assignee := range ghp.Assignees {
		user := githubUserToUser(assignee)
		assignees = append(assignees, user)
	}

	requestedReviewers := make([]*User, 0)
	for _, reviewer := range ghp.RequestedReviewers {
		user := githubUserToUser(reviewer)
		requestedReviewers = append(requestedReviewers, user)
	}

	return PullRequest{
		ID:                 ghp.ID,
		Number:             ghp.Number,
		State:              ghp.State,
		Locked:             ghp.Locked,
		Title:              ghp.Title,
		Body:               ghp.Body,
		CreatedAt:          ghp.CreatedAt,
		UpdatedAt:          ghp.UpdatedAt,
		ClosedAt:           ghp.ClosedAt,
		MergedAt:           ghp.MergedAt,
		User:               githubUserToUser(ghp.User),
		Draft:              ghp.Draft,
		Merged:             ghp.Merged,
		Mergeable:          ghp.Mergeable,
		MergeableState:     ghp.MergeableState,
		MergedBy:           githubUserToUser(ghp.MergedBy),
		Comments:           ghp.Comments,
		Additions:          ghp.Additions,
		Deletions:          ghp.Deletions,
		ChangedFiles:       ghp.ChangedFiles,
		HTMLURL:            ghp.HTMLURL,
		Assignee:           githubUserToUser(ghp.Assignee),
		Assignees:          assignees,
		RequestedReviewers: requestedReviewers,
	}
}

// PullRequestReview is a struct that represents the review of a pull request
type PullRequestReview struct {
	ID             int64
	User           *User
	Body           string
	SubmittedAt    *time.Time
	CommitID       string
	HTMLURL        string
	PullRequestURL string
	State          ReviewState
}

// UserReviewState returns the review status for a user on a pull request.
// This is useful for getting a quick indication of what each reviewers most recent
// review is
type UserReviewState struct {
	User        *User
	ReviewState ReviewState
}

// ReviewState is the state of a pull request review
type ReviewState string

// ReviewState values
const (
	Approved         = "APPROVED"
	ChangesRequested = "CHANGES_REQUESTED"
	Commented        = "COMMENTED"
	Dismissed        = "DISMISSED"
	Pending          = "PENDING"
)

func reviewStateStringToReviewState(reviewState string) ReviewState {
	switch reviewState {
	case "APPROVED":
		return Approved
	case "CHANGES_REQUESTED":
		return ChangesRequested
	case "COMMENTED":
		return Commented
	case "DISMISSED":
		return Dismissed
	case "PENDING":
		return Pending
	}
	return ""
}

func githubPullRequestReviewToPullRequestReview(ghp *github.PullRequestReview) *PullRequestReview {
	var state ReviewState
	if ghp.State == nil {
		state = Pending
	} else {
		state = reviewStateStringToReviewState(*ghp.State)
	}

	return &PullRequestReview{
		ID:             *ghp.ID,
		User:           githubUserToUser(ghp.User),
		Body:           *ghp.Body,
		SubmittedAt:    ghp.SubmittedAt,
		CommitID:       *ghp.CommitID,
		HTMLURL:        *ghp.HTMLURL,
		PullRequestURL: *ghp.PullRequestURL,
		State:          state,
	}
}
