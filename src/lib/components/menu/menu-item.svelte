<script lang="ts">
  import type { Snippet } from "svelte";
  import { deactivateMenuBar } from "./helpers.svelte";

  let self: HTMLElement | null = $state(null);

  let {
    children,
    disabled = false,
    hidden,
    shortcuts = [],
    onclick,
  }: {
    children?: Snippet;
    disabled?: boolean;
    hidden?: boolean;
    shortcuts?: string[];
    onclick?: () => void;
  } = $props();
</script>

<button
  bind:this={self}
  data-menu-item
  tabindex={hidden ? -1 : 0}
  class="rounded-field text-base-content/85 disabled:text-base-content/25 flex h-[22px] items-center gap-2 px-[10px] text-sm menu-item-btn"
  {disabled}
  onclick={() => {
    onclick?.();
    if (self?.closest('[data-menu-bar]')) {
      deactivateMenuBar();
    }
  }}
>
  {@render children?.()}
  {#if shortcuts.length > 0}
    <div class="ml-auto flex shrink-0 gap-[2px]">
      {#each shortcuts as shortcuts}
        <span
          class="text-base-content/25 flex w-[12px] items-center justify-center text-sm uppercase"
        >
          {shortcuts}
        </span>
      {/each}
    </div>
  {/if}
</button>

<style>
.menu-item-btn:hover,
.menu-item-btn:focus,
.menu-item-btn:active {
  background: linear-gradient(90deg, var(--accent-gradient, #3b47ff), var(--gradient-color-2, #d72660));
  color: var(--accent-content, #fff);
}
</style>
