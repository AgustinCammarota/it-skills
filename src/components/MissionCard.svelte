<script lang="ts">
  import {onMount, type Snippet} from "svelte";

  interface Props {
    title: string;
    description: string;
    transitionDelay: string;
    icon: Snippet;
  }

  const {
    title,
    description,
    transitionDelay = '0s',
    icon
  }: Props = $props();

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

<div class="mission-card"
     style="opacity: {opacity}; transition: opacity 1.5s ease {transitionDelay}, transform 0.2s ease;"
     bind:this={container}>
    <div class="icon-card">
        {@render icon()}
    </div>
    <div class="text-card">
        <h3 class="title-text gradient-title">
            {title}
        </h3>
        <p class="description-text">
            {description}
        </p>
    </div>
</div>

<style>
    .mission-card {
        width: 100%;
        height: 100%;
        margin-bottom: 32px;
        padding: 16px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 16px;
        background: var(--lightest-color);
        border-radius: 8px;
        box-shadow: 0 2px 8px rgb(0 0 0 / 12%);
    }
    .icon-card {
        width: 60px;
        height: 40px;
        color: var(--primary-color);
    }
    .title-text {
        margin: 11px 0 16px;
    }
    .description-text {
        margin: 0;
        line-height: var(--lh-relaxed);
        text-wrap: balance;
    }

    @media (width >= 768px) {
        .mission-card {
            transform: scale(1);
        }
        .mission-card:hover {
            transform: scale(1.05);
        }
    }
</style>
