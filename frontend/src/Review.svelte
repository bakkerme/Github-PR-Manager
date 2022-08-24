<script>
  import { repoURLToName, repoNameToDisplay } from './functions';
  export let review = {};
</script>
<style>
  #review {
    background-color: #2b3c46ff;
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
    color: #7996a9ff;
    margin-bottom: 10px;
  }

  #userContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #user {
    font-size: 16px;
    display: flex;
    flex-direction: row;
  }

  #user img {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    margin-right: 10px;
  }

  #reviewUsers {
    margin-left: 10px;
    padding-left: 10px;
    border-left: 2px solid #dcf3ffff;

    display: flex;
    flex-direction: row;
    align-items: center;
  }

  #reviewUserAvatar {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    margin-right: 10px;
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
    <div id="user">
      <img src={review.User.AvatarURL} />
      <p>
      {review.User.Login}
      </p>
    </div>
    <div id="reviewUsers">
      {#each review.RequestedReviewers as reviewer}
        <img src={reviewer.AvatarURL} id="reviewUserAvatar" />
      {/each}
    </div>
  </div>
</div>

