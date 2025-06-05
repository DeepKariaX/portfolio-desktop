<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    selected = $bindable(false),
    onclick,
    children,
  }: {
    onclick?: () => void;
    selected?: boolean;
    children?: Snippet;
  } = $props();
</script>

<li>
  <button
    {onclick}
    class={{
      "rounded-field text-base-content/85 flex h-7 w-full cursor-default items-center px-1.5": true,
      "sidebar-selected": selected,
    }}
  >
    <div class="flex items-center gap-1.5 not-window-active:opacity-50">
      {@render children?.()}
    </div>
  </button>
</li>

<style>
  .sidebar-selected {
    background: var(--sidebar-selected-bg, #0fa);
    color: var(--sidebar-selected-color, #fff);
  }
</style>
