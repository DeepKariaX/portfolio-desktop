<script lang="ts">
  import { settings } from "../settings";
  import FormGroup from "$lib/components/ui/form-group.svelte";
  import FormRow from "$lib/components/ui/form-row.svelte";
  import ThemeSelector from "../theme-selector.svelte";

  let gradient = "default";
  $: settings.subscribe(val => { gradient = val.gradient || "default" });
  function onGradientChange(e) {
    settings.update(s => ({ ...s, gradient: e.target.value }));
  }
</script>

<FormGroup>
  <FormRow label="Appearance">
    <ThemeSelector className="select select-sm w-20" />
  </FormRow>
  <FormRow label="Wallpaper Gradient">
    <select on:change={onGradientChange} bind:value={gradient} class="select select-sm w-32 gradient-select">
      <option value="gold">Gold (Default)</option>
      <option value="default">Blue/Purple</option>
      <option value="bw">Black & White</option>
      <option value="red">Red / Maroon</option>
      <option value="pink">Pink</option>
    </select>
  </FormRow>
</FormGroup>

<style>
  :global([data-theme="deepkaria-dark"]) .gradient-select,
  :global([data-theme="deepkaria-dark"]) .gradient-select option {
    color: #fff !important;
    background: #222 !important;
  }
</style>
