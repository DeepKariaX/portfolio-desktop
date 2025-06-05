<script lang="ts">
  import { applications } from "$lib/applications.svelte";
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import ToolbarButton from "$lib/components/ui/toolbar-button.svelte";
  import Toolbar from "$lib/components/ui/toolbar.svelte";
  import WindowDialog from "$lib/components/ui/window-dialog.svelte";

  const app = applications.find((app) => app.id === "dev.deepkaria.calculator");

  let display = "0";
  let operator: string | null = null;
  let operand: number | null = null;
  let waitingForOperand = false;
  let dialogOpen = false;

  function inputDigit(digit: string) {
    if (waitingForOperand) {
      display = digit;
      waitingForOperand = false;
    } else {
      display = display === "0" ? digit : display + digit;
    }
  }

  function inputDot() {
    if (!display.includes(".")) {
      display += ".";
    }
  }

  function clear() {
    display = "0";
    operator = null;
    operand = null;
    waitingForOperand = false;
  }

  function toggleSign() {
    display = (parseFloat(display) * -1).toString();
  }

  function percent() {
    display = (parseFloat(display) / 100).toString();
  }

  function performOperation(nextOperator: string) {
    const inputValue = parseFloat(display);
    if (operand === null) {
      operand = inputValue;
    } else if (operator) {
      switch (operator) {
        case "+":
          operand += inputValue;
          break;
        case "-":
          operand -= inputValue;
          break;
        case "*":
          operand *= inputValue;
          break;
        case "/":
          operand /= inputValue;
          break;
      }
      display = operand.toString();
    }
    operator = nextOperator;
    waitingForOperand = true;
  }

  function equals() {
    if (operator !== null) {
      performOperation(operator);
      operator = null;
      waitingForOperand = true;
    }
  }
</script>

<Toolbar>
  {#snippet leading()}
    <ToolbarButton onclick={() => { dialogOpen = true; }}>Calculator</ToolbarButton>
  {/snippet}
  {#snippet trailing()}
    <p class="text-base-content/50 px-2 font-semibold">{display}</p>
  {/snippet}
</Toolbar>
<div class="relative z-10 h-full flex flex-col items-center justify-center p-4">
  {#if operand !== null && operator}
    <div class="w-full max-w-xs text-right text-base text-base-content/60 mb-1 pr-2 select-none">
      {operand} {operator}
    </div>
  {/if}
  <div class="mb-4 w-full max-w-xs rounded-lg bg-base-200 p-6 text-right text-3xl font-mono min-h-[3.5rem] flex items-center justify-end">{display}</div>
  <div class="grid w-full max-w-xs grid-cols-4 gap-2">
    <button class="btn" onclick={clear}>C</button>
    <button class="btn" onclick={toggleSign}>±</button>
    <button class="btn" onclick={percent}>%</button>
    <button class="btn btn-accent" onclick={() => performOperation("/")}>÷</button>
    <button class="btn" onclick={() => inputDigit("7")}>7</button>
    <button class="btn" onclick={() => inputDigit("8")}>8</button>
    <button class="btn" onclick={() => inputDigit("9")}>9</button>
    <button class="btn btn-accent" onclick={() => performOperation("*")}>×</button>
    <button class="btn" onclick={() => inputDigit("4")}>4</button>
    <button class="btn" onclick={() => inputDigit("5")}>5</button>
    <button class="btn" onclick={() => inputDigit("6")}>6</button>
    <button class="btn btn-accent" onclick={() => performOperation("-")}>−</button>
    <button class="btn" onclick={() => inputDigit("1")}>1</button>
    <button class="btn" onclick={() => inputDigit("2")}>2</button>
    <button class="btn" onclick={() => inputDigit("3")}>3</button>
    <button class="btn btn-accent" onclick={() => performOperation("+")}>+</button>
    <button class="btn col-span-2" onclick={() => inputDigit("0")}>0</button>
    <button class="btn" onclick={inputDot}>.</button>
    <button class="btn btn-accent" onclick={equals}>=</button>
  </div>
</div>
{#if dialogOpen}
  <WindowDialog>
    {#if app}
      <AppIcon src={app.icon.default} />
    {/if}
    <p class="font-bold">Calculator App</p>
    <p class="text-[11px]">A simple calculator for basic arithmetic operations.</p>
    <div class="mt-3 flex w-full items-center justify-between gap-2">
      <div></div>
      <div class="flex items-center gap-2">
        <button class="btn w-20" onclick={() => { dialogOpen = false; }}>Close</button>
      </div>
    </div>
  </WindowDialog>
{/if} 