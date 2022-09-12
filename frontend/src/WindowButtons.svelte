<style>
  #windowButtons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
  }

  .windowButton {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    margin-right: 5px;

    background-color: var(--bg-light);
    padding: 5px;
    border-radius: 100%;
  }

  .windowButton:hover {
    background-color: var(--fg-dark);
  }

  .windowButton:last-child {
    margin-right: 0;
  }

  .windowButton:hover {
    cursor: pointer;
  }
</style>
<script>
  import Close from './assets/window-close.svelte';
  import Maximise from './assets/window-maximise.svelte';
  import Minimise from './assets/window-minimise.svelte';
  import Restore from './assets/window-restore.svelte';

  export let isMaximised = false;

  export let onMaximise = () => {};
  export let onRestore = () => {};
  export let onMinimise = () => {};
  export let onClose = () => {};

</script>
<div id="windowButtons" data-wails-drag>
  <div class="windowButton" id="windowButtonMinimize" on:click={onMinimise}>
    <Minimise />
  </div>
  <div class="windowButton" id="windowButtonMaximize" on:click={isMaximised ? onRestore : onMaximise}>
    {#if isMaximised}
      <Restore />
    {:else}
      <Maximise />
    {/if}
  </div>
  <div class="windowButton" id="windowButtonClose" on:click={onRestore}>
    <Close class="icon" />
  </div>
</div>
