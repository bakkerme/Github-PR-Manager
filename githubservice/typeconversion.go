// Package githubservice provides github connections
package githubservice

import (
	"errors"
	"fmt"

	"github.com/google/go-github/v45/github"
)

func githubIssueToIssue(ghi *github.Issue) (Issue, error) {
	if ghi == nil {
		return Issue{}, errors.New("github issue is nil")
	}

	user, err := githubUserToUser(ghi.User)
	if err != nil {
		return Issue{}, fmt.Errorf("Could not convert issue: %w", err)
	}

	return Issue{
		ID:                ghi.ID,
		Number:            ghi.Number,
		State:             ghi.State,
		Locked:            ghi.Locked,
		Title:             ghi.Title,
		Body:              ghi.Body,
		AuthorAssociation: ghi.AuthorAssociation,
		User:              &user,
		Comments:          ghi.Comments,
		CreatedAt:         ghi.CreatedAt,
		UpdatedAt:         ghi.UpdatedAt,
		URL:               ghi.URL,
		HTMLURL:           ghi.HTMLURL,
		CommentsURL:       ghi.CommentsURL,
		EventsURL:         ghi.EventsURL,
		LabelsURL:         ghi.LabelsURL,
		RepositoryURL:     ghi.RepositoryURL,
	}, nil
}

func githubUserToUser(ghu *github.User) (User, error) {
	if ghu == nil {
		return User{}, errors.New("github user is nil")
	}

	return User{
		Login:             ghu.Login,
		ID:                ghu.ID,
		AvatarURL:         ghu.AvatarURL,
		HTMLURL:           ghu.HTMLURL,
		GravatarID:        ghu.GravatarID,
		Type:              ghu.Type,
		SiteAdmin:         ghu.SiteAdmin,
		URL:               ghu.URL,
		EventsURL:         ghu.EventsURL,
		FollowingURL:      ghu.FollowingURL,
		FollowersURL:      ghu.FollowersURL,
		GistsURL:          ghu.GistsURL,
		OrganizationsURL:  ghu.OrganizationsURL,
		ReceivedEventsURL: ghu.ReceivedEventsURL,
		ReposURL:          ghu.ReposURL,
		StarredURL:        ghu.StarredURL,
		SubscriptionsURL:  ghu.SubscriptionsURL,
	}, nil
}

func githubPullRequestToPullRequest(ghp *github.PullRequest) (PullRequest, error) {
	if ghp == nil {
		return PullRequest{}, errors.New("github pull request is nil")
	}

	assignees := make([]User, 0)
	for _, assignee := range ghp.Assignees {
		user, err := githubUserToUser(assignee)
		if err != nil {
			return PullRequest{}, fmt.Errorf("could not convert assignees in pull request: %w", err)
		}
		assignees = append(assignees, user)
	}

	requestedReviewers := make([]User, 0)
	for _, reviewer := range ghp.RequestedReviewers {
		user, err := githubUserToUser(reviewer)
		if err != nil {
			return PullRequest{}, fmt.Errorf("could not convert requested reviewer in pull request: %w", err)
		}
		requestedReviewers = append(requestedReviewers, user)
	}

	user, err := githubUserToUser(ghp.User)
	if err != nil {
		return PullRequest{}, fmt.Errorf("could not convert user in pull request: %w", err)
	}

	var mergedBy *User
	if ghp.MergedBy != nil {
		mergedByU, err := githubUserToUser(ghp.MergedBy)
		if err != nil {
			return PullRequest{}, fmt.Errorf("could not convert merged by user in pull request: %w", err)
		}
		mergedBy = &mergedByU
	}

	var assignee *User
	if ghp.Assignee != nil {
		assigneeU, err := githubUserToUser(ghp.Assignee)
		if err != nil {
			return PullRequest{}, fmt.Errorf("could not convert assignee in pull request: %w", err)
		}

		assignee = &assigneeU
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
		User:               &user,
		Draft:              ghp.Draft,
		Merged:             ghp.Merged,
		Mergeable:          ghp.Mergeable,
		MergeableState:     ghp.MergeableState,
		MergedBy:           mergedBy,
		CommentCount:       ghp.Comments,
		Additions:          ghp.Additions,
		Deletions:          ghp.Deletions,
		ChangedFiles:       ghp.ChangedFiles,
		HTMLURL:            ghp.HTMLURL,
		Assignee:           assignee,
		Assignees:          assignees,
		RequestedReviewers: requestedReviewers,
	}, nil
}

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

func githubPullRequestReviewToPullRequestReview(ghp *github.PullRequestReview) (PullRequestReview, error) {
	if ghp == nil {
		return PullRequestReview{}, errors.New("github pull request review is nil")
	}

	var state ReviewState
	if ghp.State == nil {
		state = Pending
	} else {
		state = reviewStateStringToReviewState(*ghp.State)
	}

	user, err := githubUserToUser(ghp.User)
	if err != nil {
		return PullRequestReview{}, err
	}

	return PullRequestReview{
		ID:             ghp.ID,
		User:           &user,
		Body:           ghp.Body,
		SubmittedAt:    ghp.SubmittedAt,
		CommitID:       ghp.CommitID,
		HTMLURL:        ghp.HTMLURL,
		PullRequestURL: ghp.PullRequestURL,
		State:          state,
	}, nil
}

func githubPullRequestCommentToPullRequestComment(ghp *github.PullRequestComment) (PullRequestComment, error) {
	if ghp == nil {
		return PullRequestComment{}, errors.New("github pull request comment is nil")
	}

	user, err := githubUserToUser(ghp.User)
	if err != nil {
		return PullRequestComment{}, err
	}

	return PullRequestComment{
		ID:                  ghp.ID,
		InReplyTo:           ghp.InReplyTo,
		Body:                ghp.Body,
		Path:                ghp.Path,
		DiffHunk:            ghp.DiffHunk,
		PullRequestReviewID: ghp.PullRequestReviewID,
		Position:            ghp.Position,
		OriginalPosition:    ghp.OriginalPosition,
		StartLine:           ghp.StartLine,
		Line:                ghp.Line,
		OriginalLine:        ghp.OriginalLine,
		OriginalStartLine:   ghp.OriginalStartLine,
		Side:                ghp.Side,
		StartSide:           ghp.StartSide,
		CommitID:            ghp.CommitID,
		OriginalCommitID:    ghp.OriginalCommitID,
		User:                &user,
		CreatedAt:           ghp.CreatedAt,
		UpdatedAt:           ghp.UpdatedAt,
		URL:                 ghp.URL,
		HTMLURL:             ghp.HTMLURL,
		PullRequestURL:      ghp.PullRequestURL,
		//: ghp.Reactions           //,
	}, nil
}

func githubIssueCommentToIssueComment(ghp *github.IssueComment) (IssueComment, error) {
	if ghp == nil {
		return IssueComment{}, errors.New("github pull request comment is nil")
	}

	user, err := githubUserToUser(ghp.User)
	if err != nil {
		return IssueComment{}, err
	}

	return IssueComment{
		ID:                ghp.ID,
		NodeID:            ghp.NodeID,
		Body:              ghp.Body,
		User:              &user,
		CreatedAt:         ghp.CreatedAt,
		UpdatedAt:         ghp.UpdatedAt,
		AuthorAssociation: ghp.AuthorAssociation,
		URL:               ghp.URL,
		HTMLURL:           ghp.HTMLURL,
		IssueURL:          ghp.IssueURL,
	}, nil
}
