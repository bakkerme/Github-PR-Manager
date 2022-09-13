<style>
  #review {
    background-color: var(--bg-light);
    padding: 10px 14px;
    margin-bottom: 8px;
    cursor: pointer;
  }

  .approved {
    border-left: 5px solid var(--approved);
  }

  .pending {
    border-left: 5px solid var(--pending);
  }

  .changes_requested {
    border-left: 5px solid var(--changes-requested);
  }

  h5, p {
    margin: 0;
    font-weight: 500;
  }

  #title {
    margin-bottom: 8px;
    font-size: 0.9em;
  }

  #repo {
    font-size: 0.7em;
    color: var(--fg-dark);
    margin-bottom: 10px;
  }

  #userContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 7px;
  }

  #reviewUsers {
    margin-left: 10px;
    padding-left: 10px;
    border-left: 2px solid var(--fg-dark);

    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #bottomBarContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  #commentContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #commentIcon {
    width: 20px;
    height: 20px;
  }

  #commentCount {
    margin-left: 9px;
    font-size: 1em;
    margin-right: 8px;
    padding-right: 8px;
    border-right: 2px solid var(--fg-dark);
  }

  #commentText {
    font-size: 0.8em;
  }

  #created {
    font-size: 0.6em;
    color: var(--fg-dark);
  }
</style>

<script>
  import { blur } from 'svelte/transition';
  import {
      repoURLToName,
      repoNameToDisplay,
      getMostRecentInteractionToDisplay,
      getFinalReviewState,
      reviewStateToClass,
      dateToDisplay,
    } from './functions';
  import { BrowserOpenURL } from '../wailsjs/runtime';
  import Avatar from './Avatar.svelte';
  import CommentIcon from './assets/comment.svelte';

  export let review = {};

  const onClick = () => {
      BrowserOpenURL(review.HTMLURL);
  }

  $: reviewClass = reviewStateToClass(getFinalReviewState(review.ReviewStateForUser));

  const date = new Date(review.CreatedAt);
  $: createTime = dateToDisplay(date);

</script>

<div
    id="review"
    class={reviewClass}
    on:click={onClick}
    transition:blur="{{delay: 250, duration: 300}}"
>
  <h5 id="title">
    {review.Title}
  </h5>
  <p id="repo">
  {repoNameToDisplay(repoURLToName(review.HTMLURL))}
  </p>
  <div id="userContainer">
    <Avatar
      avatarURL={review.User.AvatarURL}
      userName={review.User.Login}
      small
    />
    <div id="reviewUsers">
      {#each review.ReviewStateForUser as reviewer}
        <Avatar
          avatarURL={reviewer.User.AvatarURL}
          reviewStatus={reviewer.ReviewState}
        />
      {/each}
    </div>
  </div>
  <div id="bottomBarContainer">
    <div id="commentContainer">
      <CommentIcon id="commentIcon" />
      <p id="commentCount">
        {review.CommentCount}
      </p>
      <p id="commentText">
        {getMostRecentInteractionToDisplay(review)}
      </p>
    </div>
    <div id="created">
      {createTime}
    </div>
  </div>
</div>

