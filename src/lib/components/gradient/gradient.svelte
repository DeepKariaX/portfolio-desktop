<script lang="ts">
  import { onMount } from "svelte";
  import { Gradient } from "./gradient";
  import { theme } from "$lib/theme";
  import { settings } from "$lib/apps/settings/settings";

  let gradient = "default";
  $: settings.subscribe(val => { gradient = val.gradient || "default" });
  let currentTheme;
  theme.subscribe(val => { currentTheme = val; });

  function propagateGradientVars() {
    const canvas = document.querySelector("#gradient-canvas");
    if (!canvas) return;
    const style = getComputedStyle(canvas);
    [
      "--gradient-color-1",
      "--gradient-color-2",
      "--gradient-color-3",
      "--gradient-color-4",
      "--accent-gradient"
    ].forEach((v) => {
      document.documentElement.style.setProperty(v, style.getPropertyValue(v));
    });
  }

  const init = () => {
    if (typeof document !== "undefined") {
      new Gradient().initGradient("#gradient-canvas");
      setTimeout(propagateGradientVars, 100); // Wait for CSS vars to be set
    }
  };

  onMount(() => {
    init();
    theme.subscribe(init);
  });

  // Re-initialize when gradient changes (client only)
  $: if (typeof document !== "undefined" && gradient) {
    init();
  }
</script>

<div data-gradient={gradient} data-theme={currentTheme} style="width:100%;height:100%">
  <canvas id="gradient-canvas"></canvas>
</div>

<style>
  #gradient-canvas {
    width: 100%;
    height: 100%;
  }

  :global([data-gradient="default"] #gradient-canvas) {
    --gradient-color-1: #7780f8;
    --gradient-color-2: #5661d9;
    --gradient-color-3: #ffffff;
    --gradient-color-4: #a279f4;
  }
  :global([data-gradient="default"][data-theme="deepkaria-dark"] #gradient-canvas),
  :global([data-gradient="default"][data-theme="dark"] #gradient-canvas) {
    --gradient-color-1: #00032a;
    --gradient-color-2: #060e60;
    --gradient-color-3: #000000;
    --gradient-color-4: #600cae;
  }

  :global([data-gradient="bw"] #gradient-canvas) {
    --gradient-color-1: #000000;
    --gradient-color-2: #222222;
    --gradient-color-3: #ffffff;
    --gradient-color-4: #888888;
  }
  :global([data-gradient="bw"][data-theme="deepkaria-dark"] #gradient-canvas),
  :global([data-gradient="bw"][data-theme="dark"] #gradient-canvas) {
    --gradient-color-1: #111111;
    --gradient-color-2: #333333;
    --gradient-color-3: #bbbbbb;
    --gradient-color-4: #444444;
  }

  :global([data-gradient="red"] #gradient-canvas) {
    --gradient-color-1: #ffb3b3;
    --gradient-color-2: #ff5252;
    --gradient-color-3: #fff0f0;
    --gradient-color-4: #a31545;
  }
  :global([data-gradient="red"][data-theme="deepkaria-dark"] #gradient-canvas),
  :global([data-gradient="red"][data-theme="dark"] #gradient-canvas) {
    --gradient-color-1: #6e0b14;
    --gradient-color-2: #b71c1c;
    --gradient-color-3: #3a1a1a;
    --gradient-color-4: #a31545;
  }

  :global([data-gradient="pink"] #gradient-canvas) {
    --gradient-color-1: #ffd6ec;
    --gradient-color-2: #ff69b4;
    --gradient-color-3: #fff0f6;
    --gradient-color-4: #d72660;
  }
  :global([data-gradient="pink"][data-theme="deepkaria-dark"] #gradient-canvas),
  :global([data-gradient="pink"][data-theme="dark"] #gradient-canvas) {
    --gradient-color-1: #a31545;
    --gradient-color-2: #d72660;
    --gradient-color-3: #3a1a2a;
    --gradient-color-4: #ff69b4;
  }

  :global([data-gradient="gold"] #gradient-canvas) {
    --gradient-color-1: #f6e7b4;
    --gradient-color-2: #e6c766;
    --gradient-color-3: #bfa100;
    --gradient-color-4: #8c7a2a;
  }
  :global([data-gradient="gold"][data-theme="deepkaria-dark"] #gradient-canvas),
  :global([data-gradient="gold"][data-theme="dark"] #gradient-canvas) {
    --gradient-color-1: #3a2c00;
    --gradient-color-2: #8c7a2a;
    --gradient-color-3: #bfa100;
    --gradient-color-4: #e6c766;
  }

  :global([data-gradient="gold"]) {
    --sidebar-selected-bg: #bfa100;
    --sidebar-selected-color: #fff;
    --accent-gradient: #bfa100;
  }
  :global([data-gradient="default"]) {
    --sidebar-selected-bg: #5661d9;
    --sidebar-selected-color: #fff;
    --accent-gradient: #5661d9;
  }
  :global([data-gradient="bw"]) {
    --sidebar-selected-bg: #444;
    --sidebar-selected-color: #fff;
    --accent-gradient: #444;
  }
  :global([data-gradient="red"]) {
    --sidebar-selected-bg: #b71c1c;
    --sidebar-selected-color: #fff;
    --accent-gradient: #b71c1c;
  }
  :global([data-gradient="pink"]) {
    --sidebar-selected-bg: #d72660;
    --sidebar-selected-color: #fff;
    --accent-gradient: #d72660;
  }
</style>
