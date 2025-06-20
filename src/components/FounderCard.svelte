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
   style="opacity: {opacity}; transition: opacity 1.5s ease {transitionDelay}, transform 0.2s ease;"
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
        max-width: 330px;
        min-width: 230px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--lightest-color);
        box-shadow: 0 2px 8px rgb(0 0 0 / 12%);
        border-radius: 16px;
    }
    .founder-card-image {
        width: 150px;
        height: 150px;
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
            height: 340px;
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
            height: 360px;
            padding: 40px 16px;
        }
    }
</style>
