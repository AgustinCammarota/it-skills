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
        flex: 1 1 300px;
        width: 100%;
        height: auto;
        max-width: 400px;
        margin-bottom: 32px;
        padding: 24px 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
        background: var(--secondary-color);
        border-radius: 8px;
        box-shadow: 0 2px 8px rgb(0 0 0 / 12%);
    }
    .icon-card {
        width: 70px;
        height: 60px;
        color: var(--primary-color);
    }
    .title-text {
        margin: 12px 0;
        text-align: center;
    }
    .description-text {
        margin: 0;
        line-height: var(--lh-relaxed);
        font-size: var(--fs-sm);
        text-wrap: wrap;
        text-align: center;
    }

    @media (width >= 768px) {
        .mission-card {
            justify-content: start;
            transform: scale(1);
        }
        .mission-card:hover {
            transform: scale(1.05);
        }
    }
</style>
