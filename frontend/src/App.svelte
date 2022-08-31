<script>
  import {GetAssignedReviews, GetCompletedReviews, GetPullRequest, GetPullRequestsToReviewForUser} from '../wailsjs/go/main/App.js'
  import { repoURLToName } from './functions';
  import Review from './Review.svelte'
  import testdata from './testdata.json'

  async function getAssignedReviews() {
      return GetAssignedReviews();
  }

  async function getCompletedReviews() {
      return GetCompletedReviews();
  }

  async function getPullRequest(owner, repo, number) {
      return GetPullRequest(owner, repo, number);
  }

  /* let reviews = testdata; */
  let reviews = [];

  GetPullRequestsToReviewForUser().then(data => {
      console.log(data);
      if(data.length == 0) {
          return;
      } 

      reviews = data;
  });
</script>
<main>
  {#each reviews as review}
    <Review review={review} />
  {/each}
</main>
