<script lang="ts">
  import { page } from "$app/state";
  import { applications } from "$lib/applications.svelte";
  import { settings } from "$lib/apps/settings/settings";
  import Dock from "$lib/components/dock/dock.svelte";
  import Gradient from "$lib/components/gradient/gradient.svelte";
  import Launchpad from "$lib/components/launchpad/launchpad.svelte";
  import MenuBar from "$lib/components/menu/menu-bar.svelte";
  import Search from "$lib/components/search/search.svelte";
  import WindowManager from "$lib/components/window/window-manager.svelte";
  import { commandKey, launchpad, search } from "$lib/meta.svelte";
  import { onMount } from "svelte";
  import { MetaTags, deepMerge } from "svelte-meta-tags";
  import "../app.css";
  import { brightness } from "$lib/stores/brightness";
  import { theme } from "$lib/theme";
  const minBrightness = 0.2; // 20% minimum brightness

  let { data, children } = $props();

  let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags));

  onMount(() => {
    const isMobile = window.innerWidth < 600;
    const resumeApp = applications.find((app) => app.id === "dev.deepkaria.resume");
    const aboutApp = applications.find((app) => app.id === "dev.deepkaria.about");

    if (isMobile) {
      // Open only Resume, centered
      resumeApp?.setDefaultPosition({ x: 20, y: 20 });
      resumeApp?.open();
    } else {
      // Desktop: open both, left and right
      if (resumeApp) {
        resumeApp.setDefaultPosition({ x: 60, y: 60 });
        resumeApp.open();
      }
      if (aboutApp) {
        aboutApp.setDefaultPosition({ x: Math.floor(window.innerWidth * 0.6), y: 60 });
        aboutApp.open();
      }
      setTimeout(() => {
        resumeApp?.open();
      }, 200);
    }
  });
</script>

<MetaTags {...metaTags} />

<div
  class="fixed inset-0 h-full w-full flex flex-col overflow-hidden"
  style="transition: border-radius 0.2s;"
  data-gradient={$settings.gradient}
  data-theme={$theme}
>
  <!-- Brightness overlay -->
  <div style="pointer-events:none; position:absolute; inset:0; z-index:99999; background:rgba(0,0,0,{(1 - (minBrightness + ($brightness / 100) * (1 - minBrightness))).toFixed(2)}); transition:background 0.2s;" aria-hidden="true"></div>
  <div class="absolute inset-0">
    <Gradient />
  </div>
  {@render children()}
  <main class="fixed top-8 right-0 bottom-18 left-0 overflow-hidden">
    <WindowManager />
  </main>
  <MenuBar />
  <Dock />
  <Launchpad bind:this={launchpad.current} />
  <Search bind:this={search.current} />
</div>

<svelte:window
  onkeydown={(e) => {
    if (commandKey(e)) {
      if (e.key === "l") {
        e.preventDefault();
        launchpad.current?.toggle();
        search.current?.close();
      }
      if (e.key === "k") {
        if (launchpad.open) return;
        e.preventDefault();
        search.current?.toggle();
      }
    }
  }}
/>
