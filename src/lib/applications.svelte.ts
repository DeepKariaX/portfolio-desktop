import { App, MenuBarItem, MenuItem, Shortcut } from "./core";
import About from "./apps/about/about.svelte";
import Browser from "./apps/browser/browser.svelte";
import Debug from "./apps/debug/debug.svelte";
import Iframe from "./apps/iframe/iframe.svelte";
import Resume from "./apps/resume/resume.svelte";
import Settings from "./apps/settings/settings.svelte";
import { query } from "./images";
import { launchpad } from "./meta.svelte";
import Monaco from "./apps/monaco/monaco.svelte";
import Calculator from "./apps/calculator/calculator.svelte";
import Chat from "./apps/chat/chat.svelte";

export const applications: App[] = $state([
  new App("dev.deepkaria.resume", "Resume", query("icons/file.png"))
    .setBody(Resume)
    .setDefaultSize({ x: 400, y: 450 }),
  new App("dev.deepkaria.launchpad", "Launchpad", query("icons/launchpad.png"))
    .setCallback(() => {
      launchpad.current?.show();
    })
    .hideFromLaunchpad(),
  new App("dev.deepkaria.about", "About", query("icons/about.png"))
    .setBody(About)
    .disableTitlebar()
    .setDefaultSize({ x: 280, y: 500 })
    .setMinSize({ x: 280, y: 500 })
    .setMenuBarItems(
      new MenuBarItem("file", "File", [
        new MenuItem("Open LinkedIn", () => {
          window.open("https://www.linkedin.com/in/deep-karia/", "_blank");
        }),
        new MenuItem("Open GitHub", () => {
          window.open("https://github.com/DeepKariaX", "_blank");
        })
      ]),
      new MenuBarItem("edit", "Edit", [
        new MenuItem(
          "Copy Email",
          () => {
            navigator.clipboard.writeText("dkariax@gmail.com");
          },
          [new Shortcut("command-key"), new Shortcut("c")]
        )
      ])
    )
    .hideFromDock(),
  new App("dev.deepkaria.settings", "System Settings", query("icons/settings.png"))
    .setBody(Settings)
    .disableTitlebar()
    .setDefaultSize({
      x: 600,
      y: 500,
    })
    .setControlsSize("standard"),
  new App("dev.deepkaria.browser", "Browser", query("icons/chromium.png"))
    .setBody(Browser)
    .setDefaultSize({
      x: 600,
      y: 500,
    })
    .setMinSize({
      x: 300,
      y: 52,
    })
    .disableTitlebar()
    .setControlsSize("standard")
    .allowMultipleWindows(),
  new App("dev.deepkaria.debug", "Debug", query("icons/debug.png"))
    .setBody(Debug)
    .disableTitlebar()
    .setDefaultSize({ x: 280, y: 400 })
    .setMinSize({ x: 280, y: 400 })
    .setDefaultPosition({ x: 40, y: 40 })
    .hideFromDock(),
  new App("dev.deepkaria.minesweeper", "Minesweeper", query("icons/minesweeper.png"))
    .setBody(Iframe)
    .setProps({ src: "https://minesweeper.online/", title: "Minesweeper" })
    .setDefaultSize({
      x: 600,
      y: 500,
    })
    .setMinSize({
      x: 300,
      y: 58,
    })
    .hideFromDock(),
  new App("dev.deepkaria.monaco", "Text Editor", query("icons/monaco.png"))
    .setBody(Monaco)
    .setDefaultSize({
      x: 600,
      y: 500,
    })
    .disableTitlebar()
    .setControlsSize("standard")
    .setMinSize({
      x: 300,
      y: 52,
    }),
  new App("dev.deepkaria.calculator", "Calculator", query("icons/calculator.png"))
    .setBody(Calculator)
    .setDefaultSize({ x: 340, y: 520 })
    .setMinSize({ x: 240, y: 400 })
    .setControlsSize("standard")
    .hideFromDock(),
  new App("dev.deepkaria.chat", "AI Chat", query("icons/chat.png"))
    .setBody(Chat)
    .setDefaultSize({
      x: 600,
      y: 500,
    })
    .setMinSize({
      x: 400,
      y: 300,
    })
    .setControlsSize("standard"),
]);
