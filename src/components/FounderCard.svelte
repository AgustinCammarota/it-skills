<script lang="ts">
  import Linkedin from '@assets/icons/linkedin.svg?raw';
  import type {GetImageResult} from "astro";
  import { onMount } from 'svelte';

  const {
    name,
    role,
    link,
    linkTitle,
    imageConfig
  }: {
    name: string;
    role: string;
    link: string;
    linkTitle: string;
    imageConfig: GetImageResult;
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

<div class="founder-card-container"
     style="opacity: {opacity}; transition: opacity 1.5s;"
     bind:this={container}>
    <img class="founder-card-image"
         src={imageConfig.src}
         srcset={imageConfig.srcSet.attribute}
         loading={imageConfig.attributes.loading}
         title={imageConfig.attributes.alt}
         alt={imageConfig.attributes.alt}
         sizes={imageConfig.attributes.sizes}
         decoding={imageConfig.attributes.decoding}
         fetchpriority={imageConfig.attributes.fetchpriority}
         style={imageConfig.attributes.style}
         width={imageConfig.attributes.width}
         height={imageConfig.attributes.height}>

    <h3 class="founder-card-name">
        {name}
    </h3>
    <p class="founder-card-role">
        {role}
    </p>
    <a class="founder-card-link" href={link} title={linkTitle} target="_blank" rel="noopener noreferrer">
        {@html Linkedin}
    </a>
</div>

<style>
    .founder-card-container {
        width: 280px;
        height: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--lightest-color);
        border-radius: 16px;
    }
    .founder-card-image {
        object-fit: var(--fit);
        object-position: var(--pos);
        border-radius: 50%;
    }
    .founder-card-name {
        margin-top: 8px;
        margin-bottom: 0;
        color: var(--darkest-color);
    }
    .founder-card-role {
        margin: 0;
        line-height: 18px;
        font-weight: 200;
    }
    .founder-card-link {
        width: 40px;
        height: 40px;
        display: inline-flex;
        margin-top: 8px;
    }
</style>
