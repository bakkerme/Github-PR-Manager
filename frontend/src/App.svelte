<script>
  import {GetAssignedReviews, GetPullRequest} from '../wailsjs/go/main/App.js'
  import { repoURLToName } from './functions';
  import testdata from './testdata.json'

  async function getAssignedReviews() {
      return GetAssignedReviews();
  }

  async function getPullRequest() {
      return GetPullRequest("bakkerme", "pr-first-response", 1);
  }

  let reviews = testdata;

  getAssignedReviews().then(data => {
      const request = data;
      console.log(JSON.stringify(request));
    }).catch(e => {throw e});

  console.log(reviews);
</script>

<main class="p-6">
  {#each reviews as review}
    <div class="p-6 max-w-sm mx-auto bg-slate-900/50">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-white/95">
        {review.title}
      </h5>
    <p class="font-normal text-white/95 leading-tight">
      {repoURLToName(review.repository_url)}
    </p>
    </div>
  {/each}
</main>
