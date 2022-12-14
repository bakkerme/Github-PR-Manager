import {
  GetAssignedPullRequestsForUser,
  GetReviewedPullRequestsForUser
} from '../wailsjs/go/main/App.js';

export const ASSIGNED = 'assigned';
export const REVIEWED = 'reviewed';
export const CREATED = 'created';

export const getReviews = async (tab) => {
  let getReviewFunc = null;
  switch (tab) {
    case ASSIGNED:
      getReviewFunc = GetAssignedPullRequestsForUser;
      break;
    case REVIEWED:
      getReviewFunc = GetReviewedPullRequestsForUser;
      break;
    case CREATED:
      // not implemented yet
      break;
  }

  const data = await getReviewFunc()
  if(data.length == 0) {
    return [];
  } 

  console.log(data);

  return data;
}

export function repoURLToName(repoURL) {
  const splits = repoURL.split('/');
  return  {
    user: splits[splits.length - 4], 
    repo: splits[splits.length - 3],
  }
}

export function repoNameToDisplay({user, repo}) {
  return `${user}/${repo}`;
}

export function getMostRecentInteractionToDisplay(issue) {
  const { Comments: comments, Reviews: reviews } = issue;

  const mostRecentComment = comments ? comments.slice(-1)[0] : null;
  const mostRecentReview = reviews ? reviews.slice(-1)[0] : null;

  if (!mostRecentComment && mostRecentReview) {
    return reviewUIString(mostRecentReview);
  }

  if (!mostRecentReview && mostRecentComment) {
    return commentUIString(mostRecentComment);
  }

  if (mostRecentComment && mostRecentReview) {
    const mostRecentCommentDate = new Date(mostRecentComment.CreatedAt);
    const mostRecentReviewDate = new Date(mostRecentReview.CreatedAt);

    if(mostRecentCommentDate > mostRecentReviewDate) {
      return commentUIString(mostRecentComment);
    } else {
      return reviewUIString(mostRecentReview);
    }
  } else {
    return "";
  }
}

function reviewUIString(review) {
  const { User: { Login: user }, Body: body, State: state } = review;

  const stateString = reviewStateToUIString(state);
  const commentBody = body ? `: "${body}"` : '';
  return `${user} ${stateString} this PR${commentBody}`;
}

function commentUIString(review) {
  const { User: { Login: user }, Body: body } = review;
  return `${user} commented ${body}`;
}

export function reviewStateToUIString(reviewState) {
  switch (reviewState) {
    case APPROVED:
      return "approved";
    case CHANGES_REQUESTED:
      return "requested changes to";
    case COMMENTED:
      return "commented on";
    case DISMISSED:
      return "dismissed";
    case PENDING:
      return "pending";
    default:
      return "";
  }
}


const PENDING = "PENDING";
const APPROVED = "APPROVED";
const CHANGES_REQUESTED = "CHANGES_REQUESTED";
const DISMISSED = "DISMISSED";
const COMMENTED = "COMMENTED";

export function getFinalReviewState(reviewStateForUser) {
  return reviewStateForUser.reduce((acc, curr) => {
    if (curr.ReviewState === CHANGES_REQUESTED) {
      return CHANGES_REQUESTED;
    }

    if (acc === PENDING && curr.ReviewState === APPROVED) {
      return APPROVED;
    }

    return acc;
  }, PENDING);
}

export function reviewStateToClass(reviewStatus) {
  switch(reviewStatus) {
    case "APPROVED":
      return "approved";
      break;
    case "PENDING":
      return "pending";
      break;
    case "CHANGES_REQUESTED":
      return "changes_requested";
      break;
    case undefined:
      return "";
      break;
    default:
      return "pending";
  }
}

export function dateToDisplay(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = date.getHours();
  const hoursString = hours < 10 ? `0${hours}` : hours;

  const minutes = date.getMinutes();
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;

  return `${month}/${day}/${year} ${hoursString}:${minutesString}`;
}
