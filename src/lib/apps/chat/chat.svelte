<script lang="ts">
  import WindowContent from "$lib/components/window/window-content.svelte";
  import { onMount } from "svelte";
  import SimpleIconsGithub from "~icons/simple-icons/github";
  import SimpleIconsLinkedin from "~icons/simple-icons/linkedin";
  import SimpleIconsMedium from "~icons/simple-icons/medium";
  import SimpleIconsHuggingface from "~icons/simple-icons/huggingface";

  let messages: { role: 'user' | 'assistant', content: string }[] = [];
  let inputMessage = '';
  let isLoading = false;

  let showSettings = false;
  let groqApiKey = '';
  let tempApiKey = '';

  let model = 'llama-3.3-70b-versatile';
  let availableModels = [
    {
      id: 'llama-3.3-70b-versatile',
      name: 'Llama 3.3 70B Versatile',
      desc: 'Latest, largest, and most capable Llama 3 model for general-purpose chat and reasoning.'
    },
    {
      id: 'llama-3.1-8b-instant',
      name: 'Llama 3.1 8B Instant',
      desc: 'Fast, smaller Llama 3 model for lower latency and cost.'
    },
    {
      id: 'gemma2-9b-it',
      name: 'Gemma 2 9B IT',
      desc: "Google's latest open model, good for instruction following and general chat."
    }
  ];

  // Load key from localStorage on mount
  onMount(() => {
    groqApiKey = localStorage.getItem('groqApiKey') || '';
    model = localStorage.getItem('groqModel') || 'llama-3.3-70b-versatile';
  });

  function openSettings() {
    tempApiKey = groqApiKey;
    showSettings = true;
  }
  function closeSettings() {
    showSettings = false;
  }
  function saveApiKey() {
    groqApiKey = tempApiKey.trim();
    localStorage.setItem('groqApiKey', groqApiKey);
    showSettings = false;
  }

  function saveModel() {
    localStorage.setItem('groqModel', model);
  }

  async function handleSubmit() {
    if (!inputMessage.trim() || !groqApiKey) return;
    const userMessage = inputMessage;
    messages = [...messages, { role: 'user', content: userMessage }];
    inputMessage = '';
    isLoading = true;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage, apiKey: groqApiKey, model }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      const data = await response.json();
      messages = [...messages, { role: 'assistant', content: data.response }];
    } catch (error) {
      messages = [...messages, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }];
    } finally {
      isLoading = false;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }
</script>

<WindowContent>
  <div class="flex h-full flex-col">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-2xl font-bold">AI Assistant</h2>
      <div class="flex items-center gap-3">
        <button class="btn btn-xs btn-ghost flex items-center justify-center align-middle" title="Settings" aria-label="Settings" on:click={openSettings} style="padding:0.25rem;display:flex;align-items:center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings w-6 h-6">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 5 8.6a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09c0 .66.42 1.24 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.66 0 1.24.42 1.51 1H21a2 2 0 0 1 0 4h-.09c-.27 0-.52.11-.71.29-.19.19-.29.44-.29.71z" />
          </svg>
        </button>
        <a
          class="btn btn-sm btn-ghost flex items-center gap-1"
          href="https://github.com/DeepKariaX"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <SimpleIconsGithub class="w-6 h-6" />
        </a>
      </div>
    </div>

    {#if showSettings}
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div class="bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-xs flex flex-col gap-4">
          <h3 class="text-lg font-semibold mb-2">GROQ API Key</h3>
          <input
            type="password"
            class="input input-bordered w-full"
            placeholder="Enter your GROQ API key"
            bind:value={tempApiKey}
          />
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold" for="model-select">Model</label>
            <select id="model-select" class="select select-bordered w-full" bind:value={model} on:change={saveModel}>
              {#each availableModels as m}
                <option value={m.id}>{m.name}</option>
              {/each}
            </select>
            <div class="text-xs text-base-content/60 mt-1">{availableModels.find(m => m.id === model)?.desc}</div>
          </div>
          <div class="flex gap-2 justify-end mt-2">
            <button class="btn btn-sm" on:click={closeSettings}>Cancel</button>
            <button class="btn btn-sm btn-primary" on:click={saveApiKey} disabled={!tempApiKey.trim()}>Save</button>
          </div>
          <p class="text-xs text-base-content/60">Your key and model are stored locally in your browser.</p>
        </div>
      </div>
    {/if}

    <div class="flex-1 overflow-y-auto space-y-4 mb-4">
      {#each messages as message}
        <div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
          <div class="max-w-[80%] rounded-lg p-3 {
            message.role === 'user' 
              ? 'bg-primary text-primary-content' 
              : 'bg-base-200'
          }">
            {message.content}
          </div>
        </div>
      {/each}
      {#if isLoading}
        <div class="flex justify-start">
          <div class="bg-base-200 rounded-lg p-3">
            <div class="flex gap-2">
              <div class="w-2 h-2 bg-base-content/50 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-base-content/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div class="w-2 h-2 bg-base-content/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        </div>
      {/if}
    </div>

    <div class="flex gap-2">
      <textarea
        bind:value={inputMessage}
        on:keydown={handleKeydown}
        placeholder={groqApiKey ? "Type your message..." : "Enter your GROQ API key in settings first"}
        class="textarea textarea-bordered flex-1 resize-none"
        rows="2"
        disabled={!groqApiKey}
      ></textarea>
      <button 
        class="btn btn-primary self-end"
        on:click={handleSubmit}
        disabled={isLoading || !inputMessage.trim() || !groqApiKey}
      >
        Send
      </button>
    </div>
  </div>
</WindowContent>

<style>
  :global(.textarea) {
    min-height: 2.5rem;
    max-height: 10rem;
  }
  :global([data-window-controls]) {
    margin-top: 0 !important;
    margin-left: 0.75rem !important;
    height: 1.75rem !important; /* Match h-7 (title bar height) */
    display: flex !important;
    align-items: center !important;
  }
  :global([data-window-controls] > div) {
    /* Optional: vertically center the buttons if needed */
    align-items: center !important;
  }
  :global([data-window-controls]) {
    /* Remove excessive margin on the right if present */
    margin-right: 0 !important;
  }
  :global([data-window-controls]) {
    /* Remove excessive margin on the bottom if present */
    margin-bottom: 0 !important;
  }
</style> 