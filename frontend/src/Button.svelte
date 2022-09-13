<style>
  #container {
    background-color: var(--bg-light);
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;

    width: 20px;
    height: 20px;
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
