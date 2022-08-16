package githubservice

import (
	"time"

	"github.com/google/go-github/v45/github"
)

// Issue is a struct that represents a pull request
type Issue struct {
	ID                int64
	Number            int
	State             string
	Locked            bool
	Title             string
	Body              string
	AuthorAssociation string
	User              User
	Comments          int
	CreatedAt         time.Time
	UpdatedAt         time.Time
	URL               string
	HTMLURL           string
	CommentsURL       string
	EventsURL         string
	LabelsURL         string
	RepositoryURL     string
}

func githubIssueToIssue(ghi *github.Issue) Issue {
	return Issue{
		ID:                *ghi.ID,
		Number:            *ghi.Number,
		State:             *ghi.State,
		Locked:            *ghi.Locked,
		Title:             *ghi.Title,
		Body:              *ghi.Body,
		AuthorAssociation: *ghi.AuthorAssociation,
		User:              githubUserToUser(ghi.User),
		Comments:          *ghi.Comments,
		CreatedAt:         *ghi.CreatedAt,
		UpdatedAt:         *ghi.UpdatedAt,
		URL:               *ghi.URL,
		HTMLURL:           *ghi.HTMLURL,
		CommentsURL:       *ghi.CommentsURL,
		EventsURL:         *ghi.EventsURL,
		LabelsURL:         *ghi.LabelsURL,
		RepositoryURL:     *ghi.RepositoryURL,
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

func githubUserToUser(ghu *github.User) User {
	return User{
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
	ID                 int64
	Number             int
	State              string
	Locked             bool
	Title              string
	Body               string
	CreatedAt          time.Time
	UpdatedAt          time.Time
	ClosedAt           time.Time
	MergedAt           time.Time
	User               User
	Draft              bool
	Merged             bool
	Mergeable          bool
	MergeableState     string
	MergedBy           User
	Comments           int
	Additions          int
	Deletions          int
	ChangedFiles       int
	HTMLURL            string
	Assignee           User
	Assignees          []*User
	RequestedReviewers []*User
}

func githubPullRequestToPullRequest(ghp *github.PullRequest) PullRequest {
	assignees := make([]*User, 0)
	for _, assignee := range ghp.Assignees {
		user := githubUserToUser(assignee)
		assignees = append(assignees, &user)
	}

	requestedReviewers := make([]*User, 0)
	for _, reviewer := range ghp.RequestedReviewers {
		user := githubUserToUser(reviewer)
		requestedReviewers = append(requestedReviewers, &user)
	}

	return PullRequest{
		ID:                 *ghp.ID,
		Number:             *ghp.Number,
		State:              *ghp.State,
		Locked:             *ghp.Locked,
		Title:              *ghp.Title,
		Body:               *ghp.Body,
		CreatedAt:          *ghp.CreatedAt,
		UpdatedAt:          *ghp.UpdatedAt,
		ClosedAt:           *ghp.ClosedAt,
		MergedAt:           *ghp.MergedAt,
		User:               githubUserToUser(ghp.User),
		Draft:              *ghp.Draft,
		Merged:             *ghp.Merged,
		Mergeable:          *ghp.Mergeable,
		MergeableState:     *ghp.MergeableState,
		MergedBy:           githubUserToUser(ghp.MergedBy),
		Comments:           *ghp.Comments,
		Additions:          *ghp.Additions,
		Deletions:          *ghp.Deletions,
		ChangedFiles:       *ghp.ChangedFiles,
		HTMLURL:            *ghp.HTMLURL,
		Assignee:           githubUserToUser(ghp.Assignee),
		Assignees:          requestedReviewers,
		RequestedReviewers: requestedReviewers,
	}
}
