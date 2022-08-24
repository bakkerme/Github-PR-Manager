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

  /* getCompletedReviews().then(async rawReviews => { */
      /* if(rawReviews.length == 0) { */
          /* return; */
      /* }  */

      /* reviews = rawReviews; */
      /* console.log(rawReviews); */


      /* [> console.log(pr); <] */

      /* const reviewPRPromises = rawReviews.map(async review => { */
          /* const {user, repo} = repoURLToName(review.RepositoryURL); */
          /* const pr = await getPullRequest(user, repo, review.Number); */
          /* return pr; */
      /* }); */

      /* const reviewPRs = await Promise.all(reviewPRPromises); */
      /* console.log(reviewPRs); */
    /* }).catch(e => {throw e}); */

  /* console.log(reviews); */
</script>
<main>
  {#each reviews as review}
    <Review review={review} />
  {/each}
</main>
