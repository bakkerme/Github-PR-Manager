<script>
  import {GetAssignedPullRequestsForUser, GetReviewedPullRequestsForUser } from '../wailsjs/go/main/App.js';
  import { repoURLToName } from './functions';
  import Review from './Review.svelte';
  import Tab from './Tab.svelte';
  import TabContainer from './TabContainer.svelte';
  import testdata from './testdata.json';

  const ASSIGNED = 'assigned';
  const REVIEWED = 'reviewed';
  const CREATED = 'created';

  /* let reviews = testdata; */
  let reviews = [];
  let activeTab = 'assigned';

  const getReviews = (tab) => {
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

    getReviewFunc().then(data => {
        console.log(data);
        if(data.length == 0) {
            return;
        } 

        reviews = data;
    });
  }

  const setActiveTab = (tab) => () => {
      console.log(tab)
      activeTab = tab;
      getReviews(tab);
  }
</script>
<main>
  <TabContainer>
    <Tab active={activeTab === ASSIGNED} onClick={setActiveTab(ASSIGNED)}>Assigned</Tab>
    <Tab active={activeTab === REVIEWED} onClick={setActiveTab(REVIEWED)}>Reviewed</Tab>
    <Tab></Tab>
    <Tab active={activeTab === CREATED} onClick={setActiveTab(CREATED)}>Created</Tab>
  </TabContainer>
  {#each reviews as review}
    <Review review={review} />
  {/each}
</main>
