<script lang="ts">
  import AppIcon from "$lib/components/app/app-icon.svelte";
  import WindowContent from "$lib/components/window/window-content.svelte";
  import { query } from "$lib/images";
  import { modifiers } from "$lib/meta.svelte";
  import ResumeRole from "./resume-role.svelte";
  import ResumeSection from "./resume-section.svelte";
  import SimpleIconsGithub from "~icons/simple-icons/github";
  import SimpleIconsLinkedin from "~icons/simple-icons/linkedin";
  import SimpleIconsMedium from "~icons/simple-icons/medium";
  import SimpleIconsHuggingface from "~icons/simple-icons/huggingface";
  import { fly, fade, scale } from 'svelte/transition';
</script>

<WindowContent>
  <div class="resume-window computer-font">
    <div class="flex flex-col items-center animate-resume-bg">
      <!-- Animated Profile Photo -->
      <div class="profile-photo-wrapper gradient-border">
        <AppIcon src={query("icons/desktop.png").default} alt="Profile Photo" size="xl" />
      </div>
      <!-- Name and Resume Button Row -->
      <div class="flex flex-col items-center w-full mt-2 mb-1">
        <h2 class="text-2xl font-bold text-center w-full computer-font">Deep Karia</h2>
        <!-- Animated Cartoon Character -->
        <div class="cartoon-walk-container">
          <div class="cartoon-walk">
            <!-- Simple SVG cartoon character -->
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="22" r="12" fill="#ffe066" stroke="#232323" stroke-width="2"/>
              <ellipse cx="30" cy="45" rx="15" ry="8" fill="#ffe066" stroke="#232323" stroke-width="2"/>
              <ellipse cx="25" cy="20" rx="2" ry="3" fill="#232323"/>
              <ellipse cx="35" cy="20" rx="2" ry="3" fill="#232323"/>
              <path d="M25 28 Q30 32 35 28" stroke="#232323" stroke-width="2" fill="none"/>
              <!-- Arms -->
              <path d="M15 35 Q10 40 20 42" stroke="#232323" stroke-width="2" fill="none"/>
              <path d="M45 35 Q50 40 40 42" stroke="#232323" stroke-width="2" fill="none"/>
              <!-- Legs (animated) -->
              <g class="cartoon-legs">
                <path d="M25 53 Q23 58 28 58" stroke="#232323" stroke-width="2" fill="none"/>
                <path d="M35 53 Q37 58 32 58" stroke="#232323" stroke-width="2" fill="none"/>
              </g>
            </svg>
            <!-- Speech bubble -->
            <a
              class="speech-bubble clickable-bubble"
              href="https://drive.google.com/file/d/1oMX--f5WzVTtFcI6_n9cE3vYdihJTed5/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hey! <br />View Full Resume!
            </a>
          </div>
        </div>
      </div>
      <!-- Social/Profile Buttons with Hover/Scale -->
  <div class="mt-3 flex flex-wrap items-center gap-2">
    <a
          class="btn btn-sm btn-ghost flex items-center gap-1 animated-btn"
      href="https://github.com/DeepKariaX"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <SimpleIconsGithub class="w-5 h-5" />
      <span class="hidden sm:inline">GitHub</span>
    </a>
    <a
          class="btn btn-sm btn-ghost flex items-center gap-1 animated-btn"
      href="https://www.linkedin.com/in/deep-karia/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
    >
      <SimpleIconsLinkedin class="w-5 h-5" />
      <span class="hidden sm:inline">LinkedIn</span>
    </a>
    <a
          class="btn btn-sm btn-ghost flex items-center gap-1 animated-btn"
      href="https://deepkaria.medium.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Medium"
    >
      <SimpleIconsMedium class="w-5 h-5" />
      <span class="hidden sm:inline">Medium</span>
    </a>
    <a
          class="btn btn-sm btn-ghost flex items-center gap-1 animated-btn"
      href="https://huggingface.co/deepkaria"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="HuggingFace"
    >
      <SimpleIconsHuggingface class="w-5 h-5" />
      <span class="hidden sm:inline">HuggingFace</span>
    </a>
  </div>
      <!-- Animated Sections -->
      <div class="w-full mt-6 flex flex-col gap-4">
        <div in:fly={{ y: 40, duration: 600 }}>
          <ResumeSection title="EXPERIENCE">
    <ResumeRole title=" Generative AI Engineer" date="Sep 2023 - Feb 2025">
      <ul class="text-base-content/75 list-disc pl-6 text-xs">
        <li>
                  Designed and deployed 50+ advanced AI features for enterprise GPT systems and agentic platforms.
        </li>
        <li>
                  Assembled more than 5 custom AI solutions for clients, including KYC pipelines utilizing vision models for document processing & extraction, AI-powered stock analysis workflows providing actionable insights and visualizations, and sentiment analysis automation for email responses.
        </li>
                <li>Applied advanced retrieval techniques—including hybrid search, and reranking—to improve information retrieval accuracy by 45%. Optimized document parsing and context refinement processes, delivering faster and more precise results for complex queries across diverse datasets.</li>
      </ul>
    </ResumeRole>
  </ResumeSection>
        </div>
        <div in:fly={{ y: 40, duration: 700 }}>
          <ResumeSection title="EDUCATION">
    <ResumeRole title="Ganpat University- (IBM Career Education)" date="Jun 2019 - May 2023">
       Bachelor of Technology in Computer Science & Engineering with Specialization in Data Science
    </ResumeRole>
  </ResumeSection>
        </div>
        <div in:fly={{ y: 40, duration: 800 }}>
          <ResumeSection title="SKILLS">
    <ul class="text-base-content/75 list-disc pl-6 text-xs">
              <li><b>Artificial Intelligence</b>: Natural Language Processing (NLP), Large Language Models (LLMs), Information Retrieval (IR), Machine Learning (ML), Reinforcement Learning (RL), AI Safety & Interpretability, Multimodal AI</li>
              <li><b>Programming & Frameworks</b>: Python, Java, C/C++, R, JavaScript, TensorFlow, PyTorch, scikit-learn, Pandas, NumPy, OpenCV, LangChain, Flask, FastAPI, Django</li>
      <li><b>Cloud & DevOps</b>: AWS, Azure, Docker, Kubernetes, CI/CD, MLOps, Jenkins, GitHub</li>
              <li><b>Leadership & Problem-Solving</b>: Team Leadership, Cross-functional Collaboration, Research Communication, Project Coordination, Strategic Planning, Analytical Thinking, Process Optimization, Creative Problem-Solving, Mentorship</li>
    </ul>
  </ResumeSection>
        </div>
      </div>
    </div>
  </div>
</WindowContent>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;700&display=swap');
  .computer-font {
    font-family: 'Fira Mono', 'Consolas', 'Courier New', monospace;
    font-variant-ligatures: none;
    letter-spacing: 0.01em;
  }
  .resume-window {
    background: #f8f8f8;
    border: 2px solid #bdbdbd;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #bdbdbd;
    padding: 1.5rem 2rem 2rem 2rem;
    border-radius: 10px;
    max-width: 540px;
    margin: 0.5rem auto 0 auto;
    color: #232323;
  }
  :global([data-theme="deepkaria-dark"]) .resume-window {
    background: #232323;
    color: #f8f8f8;
  }
  .resume-window *,
  .resume-window svg,
  .resume-window .btn,
  .resume-window .btn svg {
    color: inherit !important;
    fill: currentColor !important;
    opacity: 1 !important;
  }
  .resume-window ul,
  .resume-window li,
  .resume-window .text-base-content\/75,
  .resume-window .text-xs,
  .resume-window .text-base-content\/50,
  .resume-window span,
  .resume-window p {
    color: inherit !important;
    opacity: 1 !important;
  }
  .resume-window a {
    color: inherit;
    text-decoration: underline;
  }
  .resume-window .btn {
    text-decoration: none;
  }
  .resume-window h2,
  .resume-window .resume-section-title,
  .resume-window [class*="ResumeSection"] h2 {
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.04em;
    font-size: 1.3em;
    margin-bottom: 0.5em;
  }
  .profile-photo-wrapper.gradient-border {
    margin-top: 1.2rem;
    margin-bottom: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: floatPhoto 3s ease-in-out infinite;
    border-radius: 50%;
    padding: 0.32rem;
    background: var(--accent-gradient, linear-gradient(135deg, #5661d9 0%, #a1c4fd 100%, #43e97b 100%));
    box-shadow: 0 0 0 4px rgba(86, 97, 217, 0.15), 0 8px 32px 0 rgba(86, 97, 217, 0.15);
  }
  @keyframes floatPhoto {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-16px) scale(1.04); box-shadow: 0 0 0 8px rgba(86, 97, 217, 0.18), 0 16px 32px 0 rgba(86, 97, 217, 0.18); }
    100% { transform: translateY(0px); }
  }
  .animated-btn {
    transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s;
    will-change: transform;
  }
  .animated-btn:hover {
    transform: scale(1.08) translateY(-2px) rotate(-2deg);
    box-shadow: 0 4px 16px 0 rgba(86, 97, 217, 0.18);
    z-index: 1;
  }
  .animated-btn:focus {
    outline: none;
  }
  .animated-btn:active {
    transform: none;
    box-shadow: 0 2px 8px 0 rgba(86, 97, 217, 0.12);
  }
  .animate-resume-bg {
    animation: fadeInResumeBg 1.2s cubic-bezier(0.22,1,0.36,1);
  }
  @keyframes fadeInResumeBg {
    from { opacity: 0; transform: translateY(32px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .cartoon-walk-container {
    width: 100%;
    height: 70px;
    position: relative;
    overflow: visible;
    margin-bottom: 0.5rem;
    max-width: 100%;
  }
  .cartoon-walk {
    position: absolute;
    left: 0;
    top: 0;
    animation: walkAcross 4s linear infinite;
    max-width: calc(100% - 120px); /* cartoon + bubble width */
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
  }
  @keyframes walkAcross {
    0% { left: 0; }
    80% { left: calc(100% - 120px); }
    100% { left: 0; }
  }
  .cartoon-walk svg {
    width: 60px;
    height: 60px;
    display: block;
    z-index: 2;
  }
  .cartoon-legs {
    animation: legsWalk 0.7s infinite alternate cubic-bezier(0.22,1,0.36,1);
    transform-origin: 30px 53px;
  }
  @keyframes legsWalk {
    0% { transform: rotate(-10deg); }
    100% { transform: rotate(10deg); }
  }
  .speech-bubble {
    position: absolute;
    left: 65px;
    top: 0;
    min-width: 80px;
    background: #fffbe6;
    color: #232323;
    border-radius: 12px;
    border: 2px solid #232323;
    padding: 0.25rem 0.6rem;
    font-size: 0.92rem;
    font-family: 'Fira Mono', monospace;
    box-shadow: 0 2px 8px 0 rgba(86, 97, 217, 0.10);
    opacity: 0;
    transform: scale(0.7) translateY(-20px);
    animation: bubbleAppear 1.2s 0.7s forwards cubic-bezier(0.22,1,0.36,1);
    z-index: 3;
    pointer-events: auto;
  }
  :global([data-theme="deepkaria-dark"]) .speech-bubble {
    color: #fff;
    background: #3a2c2c;
    border-color: #fff;
  }
  @keyframes bubbleAppear {
    0% { opacity: 0; transform: scale(0.7) translateY(-20px); }
    60% { opacity: 1; transform: scale(1.1) translateY(-2px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
  .clickable-bubble {
    cursor: pointer;
    text-decoration: underline dotted #bfa100;
    transition: background 0.18s, box-shadow 0.18s;
  }
  .clickable-bubble:hover, .clickable-bubble:focus {
    background: linear-gradient(90deg, var(--accent-gradient, #ffe066), var(--gradient-color-2, #ffe066));
    box-shadow: 0 4px 16px 0 rgba(191, 161, 0, 0.18);
    outline: none;
  }
</style>
