<script lang="ts">
  import { controlCenter, launchpad, menuBar } from "$lib/meta.svelte";
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  import TablerCircleFilled from "~icons/tabler/circle-filled";
  import { activeWindow } from "../window/windows.svelte";
  import MenuBarItem from "./menu-bar-item.svelte";
  import {
    activateMenuBar,
    deactivateMenuBar,
    menuBarState,
    startDisableTimeout,
    systemActiveMenu,
    systemMenu,
    systemMenuBarItems,
  } from "./helpers.svelte";
  import ControlCenterIcon from "~icons/custom/control-center";
  import ControlCenter from "../control-center/control-center.svelte";
  import MenuBarButton from "./menu-bar-button.svelte";
  import { fade } from "svelte/transition";
  import { theme, themeName } from "$lib/theme";

  let time: string = $state("");

  update();

  onMount(() => {
    setInterval(update, 1000);
  });

  function update() {
    time = dayjs().format("ddd MMM D h:mm A");
  }

  function toggleTheme() {
    if ($theme === "dark" || $theme === themeName.dark) {
      theme.set("light");
    } else {
      theme.set("dark");
    }
  }

  function onpointerdown(e: PointerEvent) {
    const target = e.target as HTMLElement;
    const item = target?.closest("[data-menu-bar-item]") as HTMLElement;

    if (menuBarState.visitCount > 1) {
      menuBarState.visitCount = 0;
    }

    if (item !== null) {
      const id = item.getAttribute("data-menu-bar-item");
      if (id === null) return;

      if (id !== menuBar.activeId) {
        menuBarState.visitCount = 0;
      }

      startDisableTimeout();
      activateMenuBar(id);
    } else {
      deactivateMenuBar();
    }
  }

  function onpointermove(e: PointerEvent) {
    const target = e.target as HTMLElement;
    const item = target?.closest("[data-menu-bar-item]") as HTMLElement;

    if (!menuBar.active) return;

    if (item !== null) {
      const id = item.getAttribute("data-menu-bar-item");
      if (id !== null && id !== menuBar.activeId) {
        activateMenuBar(id);
      }
    }
  }

  function onpointerup(e: PointerEvent) {
    const target = e.target as HTMLElement;
    const item = target?.closest("[data-menu-bar-item]") as HTMLElement;

    if (target.closest("[data-menu-bar-ignore]")) return;

    if (!target.closest("[data-menu]")) {
      if (menuBarState.skipPointerUp) {
        if (item === null) return;
        deactivateMenuBar();
      }

      if (menuBarState.visitCount > 0) {
        deactivateMenuBar();
      }
      menuBarState.visitCount++;
    }
  }
</script>

<svelte:document {onpointerdown} {onpointermove} {onpointerup} />

<menu
  data-menu-bar
  class={{
    "absolute flex h-8 w-full items-center bg-white/50 px-2 backdrop-blur-[50px] transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-black/18": true,
    "opacity-0": launchpad.open,
    "opacity-100": !launchpad.open,
  }}
>
  <MenuBarItem type="logo" data={systemMenu}><span class="text-lg filter grayscale relative" style="top: -2px;">🐱</span></MenuBarItem>
  {#if activeWindow.menuBarActive !== null}
    <MenuBarItem type="name" data={activeWindow.menuBarActive} />
    {#each activeWindow.menuBarItems as data}
      <MenuBarItem {data} />
    {/each}
  {:else}
    <MenuBarButton>
      <span class="font-bold text-[13px] align-middle">Deep Karia</span>
    </MenuBarButton>
  {/if}
  <div class="flex-1"></div>
  <MenuBarButton
    aria-label="Toggle theme"
    onclick={toggleTheme}
    style="margin-right: 0.25rem; background: none; border: none; box-shadow: none; padding: 0;"
  >
    {#if $theme === "dark" || $theme === themeName.dark}
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="5" stroke="#f9d423" stroke-width="2" fill="#ffe066"/>
        <g stroke="#f9d423" stroke-width="2">
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#000">
        <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="#000" stroke="#000" stroke-width="2"/>
      </svg>
    {/if}
  </MenuBarButton>
  <MenuBarButton
    controls="control-center"
    bind:active={controlCenter.open}
    onclick={() => {
      controlCenter.open = !controlCenter.open;
    }}
  >
    <span class="text-[11px]">
      <ControlCenterIcon />
    </span>
  </MenuBarButton>
  <MenuBarButton>
    {time}
  </MenuBarButton>
  {#if controlCenter.open}
    <div out:fade={{ duration: 200 }} class="absolute top-full right-0">
      <ControlCenter />
    </div>
  {/if}
</menu>

<style>
/* Remove toggle switch styles */
</style>
