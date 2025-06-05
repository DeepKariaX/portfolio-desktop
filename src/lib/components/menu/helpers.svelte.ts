import { applications } from "$lib/applications.svelte";
import { MenuBarItem, MenuItem, MenuSeparator } from "$lib/core";
import { menuBar } from "$lib/meta.svelte";

export function deactivateMenuBar(): void {
  document.querySelector("[data-menu-bar-active]")?.removeAttribute("data-menu-bar-active");
  menuBar.active = false;
  menuBar.activeId = "";
}

export function activateMenuBar(id: string): void {
  document.querySelector("[data-menu-bar]")?.setAttribute("data-menu-bar-active", "");
  menuBar.active = true;
  menuBar.activeId = id;
}

export const systemMenu = new MenuBarItem("system", "", [
  new MenuItem("About This System", () => {
    applications.find((app) => app.id === "dev.deepkaria.about")?.open();
  }),
  new MenuSeparator(),
  new MenuItem("System Settings...", () => {
    applications.find((app) => app.id === "dev.deepkaria.settings")?.open();
  }),
  new MenuItem("Debug", () => {
    applications.find((app) => app.id === "dev.deepkaria.debug")?.open();
  }),
]);

export const systemActiveMenu = new MenuBarItem("system-active", "Deep Karia", []);

export const systemMenuBarItems = [systemMenu];

export let disableTimeout: NodeJS.Timeout;
export const menuBarState: {
  visitCount: number;
  skipPointerUp: boolean;
} = $state({
  visitCount: 0,
  skipPointerUp: false,
});

export function startDisableTimeout(): void {
  cancelDisableTimeout();

  disableTimeout = setTimeout(() => {
    menuBarState.skipPointerUp = true;
  }, 1000);
}

export function cancelDisableTimeout(): void {
  menuBarState.skipPointerUp = false;
  clearTimeout(disableTimeout);
}
