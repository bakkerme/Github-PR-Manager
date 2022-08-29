<script>
  import { reviewStateToClass } from './functions';
  export let avatarURL = "";
  export let userName = "";
  export let reviewStatus = undefined;
  export let small = false;

  let parsedReviewStatus = reviewStateToClass(reviewStatus);
</script>

<style>
  #user {
    font-size: 16px;
    display: flex;
    flex-direction: row;
  }

  #user img {
    width: 25px;
    height: 25px;
    border-radius: 100%;
    margin-right: 10px;
  }
  #user.small img {
    width: 20px;
    height: 20px;
  }

  p {
    margin: 0;
    font-weight: 500;
    vertical-align: middle;
    line-height: 25px;
  }

  .small p {
    line-height: initial;
  }

  .approved {
    border: 2px solid;
    border-color: var(--approved);
  }

  .pending {
    border: 2px solid;
    border-color: var(--pending);
  }

  .changes_requested {
    border: 2px solid;
    border-color: var(--changes-requested);
  }
</style>

<div id="user" class={small ? "small" : ""}>
  <img src={avatarURL} class={parsedReviewStatus} />
  <p>
  {userName}
  </p>
</div>

