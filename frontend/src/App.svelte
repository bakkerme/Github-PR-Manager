<script>
  import {
      WindowToggleMaximise,
      WindowMinimise,
      Quit,
    } from '../wailsjs/runtime';
  import { IsFrameless } from '../wailsjs/go/main/App';

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
  import RefreshButton from './RefreshButton.svelte';

  let activeTab = 'assigned';
  let framelessPromise = IsFrameless();

  $: reviewsPromise = getReviews(activeTab);

  const setActiveTab = (tab) => async () => {
      activeTab = tab;
  }

  const refresh = () => {
      reviewsPromise = getReviews(activeTab);
  }
</script>
<main>
  <TabContainer>
    <Tab active={activeTab === ASSIGNED} onClick={setActiveTab(ASSIGNED)}>Assigned</Tab>
    <Tab active={activeTab === CREATED} onClick={setActiveTab(CREATED)}>Created</Tab>
    <Tab></Tab>
    <Tab active={activeTab === REVIEWED} onClick={setActiveTab(REVIEWED)}>Reviewed</Tab>

    <RefreshButton onClick={refresh} />

    {#await framelessPromise}
    {:then frameless}
      {#if frameless}
        <WindowButtons
          onMaximise={WindowToggleMaximise}
          onRestore={WindowToggleMaximise}
          onMinimise={WindowMinimise}
          onClose={Quit}
        />
      {/if}
    {/await}
  </TabContainer>
  {#await reviewsPromise}
    <p>loading...</p>
  {:then reviews}
    {#each reviews as review}
      <Review review={review} id={review.ID} />
    {/each}
  {/await}
</main>
