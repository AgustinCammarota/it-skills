<script lang="ts">
  import type {CompanyCard} from "@interfaces/company.interface.ts";
    import {onMount} from "svelte";

    let {
      link,
      name,
      icon,
      transitionDelay = '0s'
    }: CompanyCard = $props();

    let opacity = $state('0');
    let container: HTMLElement;

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
     style="opacity: {opacity}; transition-delay: {transitionDelay};"
     bind:this={container}>
    <a class="company-card-link" href={link} title={name} target="_blank" rel="noopener noreferrer">
        {@render icon()}
    </a>
</div>

<style>
    .company-card-container {
        width: 100%;
        height: 100%;
        max-width: 200px;
        transition: opacity 1.5s;
    }
    .company-card-link {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
    }

    @media (width >= 768px) {
        .company-card-link {
            transform: scale(1);
        }
        .company-card-link:hover {
            transform: scale(1.05);
        }
    }
</style>
