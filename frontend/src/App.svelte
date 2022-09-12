<script>
  import { WindowToggleMaximise, WindowMinimise, Quit, WindowGetPosition } from '../wailsjs/runtime';

  import {
      repoURLToName,
      getReviews,
      ASSIGNED,
      REVIEWED,
      CREATED,
    } from './functions';
  import Review from './Review.svelte';
  import Tab from './Tab.svelte';
  import TabContainer from './TabContainer.svelte';
  import WindowButtons from './WindowButtons.svelte';
  import testdata from './testdata.json';

  let activeTab = 'assigned';

  $: reviewsPromise = getReviews(activeTab);

  const setActiveTab = (tab) => async () => {
      activeTab = tab;
  }
</script>
<main>
  <TabContainer>
    <Tab active={activeTab === ASSIGNED} onClick={setActiveTab(ASSIGNED)}>Assigned</Tab>
    <Tab active={activeTab === CREATED} onClick={setActiveTab(CREATED)}>Created</Tab>
    <Tab></Tab>
    <Tab active={activeTab === REVIEWED} onClick={setActiveTab(REVIEWED)}>Reviewed</Tab>
    <WindowButtons
        onMaximise={WindowToggleMaximise}
        onRestore={WindowToggleMaximise}
        onMinimise={WindowMinimise}
        onClose={Quit}
      />
  </TabContainer>
  {#await reviewsPromise}
    <p>loading...</p>
  {:then reviews}
    {#each reviews as review}
      <Review review={review} id={review.ID} />
    {/each}
  {/await}
</main>
