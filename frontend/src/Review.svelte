<script>
  import { repoURLToName, repoNameToDisplay } from './functions';
  import Avatar from './Avatar.svelte';
  import CommentIcon from './assets/comment.svelte';
  export let review = {};
</script>
<style>
  #review {
    background-color: var(--bg-light);
    padding: 10px 14px;
    margin-bottom: 8px;

    font-size: 21px;
  }

  h5, p {
    margin: 0;
    font-weight: 500;
  }

  #title {
    margin-bottom: 8px;
  }

  #repo {
    font-size: 15px;
    color: var(--fg-dark);
    margin-bottom: 10px;
  }

  #userContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #reviewUsers {
    margin-left: 10px;
    padding-left: 10px;
    border-left: 2px solid var(--fg-dark);

    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
<div id="review">
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
        {#if reviewer.User.Login !== review.User.Login}
          <Avatar
            avatarURL={reviewer.User.AvatarURL}
            reviewStatus={reviewer.ReviewState}
          />
        {/if}
      {/each}
    </div>
  </div>
  <CommentIcon />
</div>

