<script lang="ts">
  import { onMount } from "svelte";
  import { marked } from "marked";
  import { getRelativeLocaleUrl } from "astro:i18n";
  import { getLangFromUrl, useTranslations  } from "@i18n/utils";
  import type { Career } from "@interfaces/career.interface.ts";

  interface Props {
    career: Career;
    transitionDelay: string;
    currentUrl: URL;
  }

  const {
    career,
    currentUrl,
    transitionDelay = '0s'
  }: Props = $props();

  const lang = getLangFromUrl(currentUrl);
  const t = useTranslations(lang);

  let description = $derived(marked.parse(career.description));
  let date = $derived.by(() => {
    const date = new Date(career.date);
    return new Intl.DateTimeFormat(lang, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date).replaceAll('/', '-');
  });

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

<a class="career-card"
   href={getRelativeLocaleUrl(lang, '/careers/' + career.slug)}
   title={t('career.card.detail')}
   data-astro-prefetch="hover"
   style="opacity: {opacity}; transition: opacity 1.5s ease {transitionDelay}, transform 0.2s ease;"
   bind:this={container}>
    <div class="card-content">
        <h3 class="card-title">{career.title} | {career.modality}</h3>
        <address class="card-location">
            {career.location}
        </address>

        <div class="description-container">
            {@html description}
        </div>
    </div>

    <div class="card-footer">
        <time class="card-footer-time">{date}</time>
        <p class="card-footer-text">{t('career.card.detail')}</p>
    </div>
</a>

<style>
    .career-card {
        max-width: 400px;
        min-width: 200px;
        height: 400px;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: flex-start;
        overflow: hidden;
        background-color: var(--lightest-color);
        border: 1px solid var(--primary-color);
        border-radius: 12px;
    }
    .card-content {
        width: 100%;
        height: auto;
        max-height: 340px;
        padding: 16px;
        overflow: hidden;
        position: relative;
    }
    .card-content::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 96px;
        background: linear-gradient(to bottom, transparent, var(--lightest-color));
    }
    .card-footer {
        width: 100%;
        padding: 12px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--primary-color);
    }
    .card-title {
        margin: 12px 0 0;
        text-wrap: wrap;
    }
    .card-footer-text {
        margin: 0;
        color: var(--lightest-color);
        font-weight: 800;
        cursor: pointer;
    }
    .card-footer-time {
        font-weight: 200;
        color: var(--lightest-color);
    }
    .card-location {
        margin: 0 0 12px;
        text-wrap: wrap;
    }
    .description-container {
        height: auto;
        width: 100%;
        border-top: 1px solid var(--primary-color);
    }
    .description-container :global {
        p, strong {
            height: 100%;
            margin: 8px 0;
            text-wrap: balance;
            font-size: var(--fs-sm);
            line-height: var(--lh-relaxed);
        }
    }

    @media (width >= 768px) {
        .career-card {
            transform: scale(1);
        }
        .career-card:hover {
            transform: scale(1.05);
        }
        .card-footer-text {
            border-bottom: 1px solid transparent;
        }
        .card-footer-text:hover {
            border-bottom: 1px solid var(--lightest-color);
        }
    }
</style>
