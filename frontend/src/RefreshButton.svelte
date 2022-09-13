<script>
  import Button from './Button.svelte';
  import RefreshIcon from './assets/refresh.svelte';

  export let width = 20;
  export let height = 20;
  export let onClick = () => {};
</script>
<style>
  #container {
    margin-left: 20px;
  }
</style>
<div id="container">
  <Button width={width} height={height} onClick={onClick}>
    <RefreshIcon />
  </Button>
</div>
