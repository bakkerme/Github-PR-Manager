<style>
  #container {
    background-color: var(--bg-light);
  }
</style>
<script>
  export let width = 20;
  export let height = 20;
  export let onClick = () => {};
</script>
<div
    id="container"
    style:width={width}
    style:height={height}
    on:click={onClick}
    >
  <slot />
</div>
