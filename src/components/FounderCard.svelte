<script lang="ts">
  import Linkedin from '@assets/icons/linkedin.svg?raw';
  import { onMount } from 'svelte';
  import type { Snippet } from 'svelte';

  const {
    name,
    role,
    link,
    linkTitle,
    transitionDelay = '0s',
    image
  }: {
    name: string;
    role: string;
    link: string;
    linkTitle: string;
    transitionDelay: string;
    image: Snippet;
  } = $props();

  let container: HTMLElement;
  let opacity = $state('0');

  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && opacity === '0') {
        opacity = '1';
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(container);
  });
</script>

<a class="founder-card-container"
   href={link} title={linkTitle} target="_blank" rel="noopener noreferrer"
   style="opacity: {opacity}; transition-delay: {transitionDelay};"
   bind:this={container}>
    <div class="founder-card-image">
        {@render image()}
    </div>
    <h3 class="founder-card-name">
        {name}
    </h3>
    <p class="founder-card-role">
        {role}
    </p>
    <span class="founder-card-icon">
        {@html Linkedin}
    </span>
</a>

<style>
    .founder-card-container {
        width: 100%;
        height: 100%;
        max-width: 350px;
        min-width: 250px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--lightest-color);
        border-radius: 16px;
        transition: opacity 1.5s, transform 0.2s ease;
    }
    .founder-card-name {
        margin-top: 8px;
        margin-bottom: 0;
        color: var(--darkest-color);
        text-align: center;
    }
    .founder-card-role {
        margin: 0;
        line-height: 18px;
        font-weight: 200;
        text-align: center;
    }
    .founder-card-icon {
        width: 40px;
        height: 40px;
        display: inline-flex;
        margin-top: 8px;
    }

    @media (width >= 768px) {
        .founder-card-container {
            justify-content: flex-start;
            transform: scale(1);
            gap: 8px;
        }
        .founder-card-icon {
            margin: 0;
        }
        .founder-card-container:hover {
            transform: scale(1.05);
        }
    }

    @media (width >= 1025px) {
        .founder-card-container {
            padding: 40px 16px;
        }
    }
</style>
