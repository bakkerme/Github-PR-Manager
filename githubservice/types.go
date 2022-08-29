// Package githubservice provides github connections
package githubservice

import (
	"time"
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

// User is a struct that represents a user
type User struct {
	Login             *string
	ID                *int64
	AvatarURL         *string
	HTMLURL           *string
	GravatarID        *string
	Type              *string
	SiteAdmin         *bool
	URL               *string
	EventsURL         *string
	FollowingURL      *string
	FollowersURL      *string
	GistsURL          *string
	OrganizationsURL  *string
	ReceivedEventsURL *string
	ReposURL          *string
	StarredURL        *string
	SubscriptionsURL  *string
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
	CommentCount       *int
	Comments           []PullRequestComment
	Additions          *int
	Deletions          *int
	ChangedFiles       *int
	HTMLURL            *string
	Assignee           *User
	Assignees          []User
	RequestedReviewers []User

	// Below are computed and not taken directly from a github.PullRequest object
	Reviews            []PullRequestReview
	ReviewStateForUser []UserReviewState
}

// PullRequestReview is a struct that represents the review of a pull request
type PullRequestReview struct {
	ID             *int64
	User           *User
	Body           *string
	SubmittedAt    *time.Time
	CommitID       *string
	HTMLURL        *string
	PullRequestURL *string
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

// PullRequestComment is a struct that represents a comment on a pull request
type PullRequestComment struct {
	ID                  *int64
	NodeID              *string
	InReplyTo           *int64
	Body                *string
	Path                *string
	DiffHunk            *string
	PullRequestReviewID *int64
	Position            *int
	OriginalPosition    *int
	StartLine           *int
	Line                *int
	OriginalLine        *int
	OriginalStartLine   *int
	Side                *string
	StartSide           *string
	CommitID            *string
	OriginalCommitID    *string
	User                *User
	// Reactions           *Reactions
	CreatedAt      *time.Time
	UpdatedAt      *time.Time
	URL            *string
	HTMLURL        *string
	PullRequestURL *string
}
