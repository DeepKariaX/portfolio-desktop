<script lang="ts">
  import { theme } from "$lib/theme";
  export let className = "";
</script>

<select bind:value={$theme} class={`select w-32 ${className}`}>
  <option value="dark">Dark</option>
  <option value="light">Light</option>
</select>

<style>
:global([data-theme="deepkaria-dark"]) select,
:global([data-theme="deepkaria-dark"]) select option {
  color: #fff !important;
  background: #222 !important;
}
</style>
