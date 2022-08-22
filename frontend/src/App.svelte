<script>
  import {GetAssignedReviews, GetCompletedReviews, GetPullRequest} from '../wailsjs/go/main/App.js'
  import { repoURLToName, repoNameToDisplay } from './functions';
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

  getCompletedReviews().then(async rawReviews => {
      if(rawReviews.length == 0) {
          return;
      } 

      reviews = rawReviews;
      console.log(rawReviews);


      /* console.log(pr); */

      const reviewPRPromises = rawReviews.map(async review => {
          const {user, repo} = repoURLToName(review.RepositoryURL);
          const pr = await getPullRequest(user, repo, review.Number);
          return pr;
      });

      const reviewPRs = await Promise.all(reviewPRPromises);
      console.log(reviewPRs);
    }).catch(e => {throw e});

  console.log(reviews);
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .header {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .body {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  .footer {
    font-size: 1rem;
    font-weight: bold;
    margin-top: 1rem;
  }
</style>

<main>
  {#each reviews as review}
    <div>
      <h5>
        {review.Title}
      </h5>
      <p>
        {repoNameToDisplay(repoURLToName(review.RepositoryURL))}
      </p>
      <p>
        {review.User.Login}
      </p>
    </div>
  {/each}
</main>
