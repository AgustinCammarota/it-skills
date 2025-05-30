<script lang="ts">
  import type {CompanyCard} from "@interfaces/company.interface.ts";
    import {onMount} from "svelte";

    let {
      link,
      name,
      icon,
      transitionDelay = '0s'
    }: CompanyCard = $props();

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

<div class="company-card-container"
     style="opacity: {opacity}; transition: opacity 1.5s; transition-delay: {transitionDelay};"
     bind:this={container}>
    <a class="company-card-link" href={link} title={name} aria-label={name} target="_blank" rel="noopener noreferrer">
        {@html icon}
    </a>
</div>

<style>
    .company-card-container {
        width: 100%;
        height: 100%;
    }
    .company-card-link {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
