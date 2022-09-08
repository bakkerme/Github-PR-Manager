<style>
  #tab {
    background-color: var(--bg-light);
    color: var(--fg-dark);
    border-bottom: 3px solid var(--bg-dark);
    border-right: 3px solid var(--bg-dark);
    font-size: 0.9em;
    padding: 10px 14px;
  }

  #tab:last-child {
    border-right: none;
  }

  #tab.active {
    color: var(--fg-primary);
  }
</style>
<script>
  export let active = false;
  export let onClick;

  function handleClick(e) {
      e.preventDefault();
      console.log('click');
      onClick();
  }
</script>
<a id="tab" href={onClick ? "#" : undefined} on:click={handleClick} class={active ? "active" : ""}>
  <slot />
</a>
