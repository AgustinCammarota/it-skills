<script lang="ts">
  import { getLangFromUrl, useTranslations } from "@i18n/utils";
  import { Tween } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount }  from 'svelte';


  let {
    currentUrl
  } : { currentUrl: URL } = $props();

  const lang = getLangFromUrl(currentUrl);
  const t = useTranslations(lang);

  let container: HTMLElement;
  let visible = $state(false);
  const founded = new Tween(2000, {
    duration: 1000,
    easing: cubicOut
  });
  const operating = new Tween(0, {
    duration: 1000,
    easing: cubicOut
  });
  const companies = new Tween(0, {
    duration: 1000,
    easing: cubicOut
  });

  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) {
        visible = true;
        founded.set(2006);
        operating.set(20);
        companies.set(30);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(container);
  });
</script>

<section class="highlights-section" bind:this={container}>
    <div class="highlights">
        {#key visible}
            <div class="highlight-container">
                <h3 class="highlight-text" id="founded">
                    <span class="highlight-title">{t('highlight.founded.title')}</span>
                    <span class="highlight-number">{Math.round(founded.current)}</span>
                    <span class="highlight-subtitle">{t('highlight.founded.subtitle')}</span>
                </h3>
            </div>

            <div class="highlight-container" id="operating">
                <h3 class="highlight-text">
                    <span class="highlight-title">{t('highlight.operating.title')}</span>
                    <span class="highlight-number">+{Math.round(operating.current)}</span>
                    <span class="highlight-subtitle"> {t('highlight.operating.subtitle')}</span>
                </h3>
            </div>

            <div class="highlight-container" id="companies">
                <h3 class="highlight-text">
                    <span class="highlight-title">{t('highlight.companies.title')}</span>
                    <span class="highlight-number">+{Math.round(companies.current)}</span>
                    <span class="highlight-subtitle">{t('highlight.companies.subtitle')}</span>
                </h3>
            </div>
        {/key}
    </div>
</section>

<style>
    .highlights-section {
        width: 100%;
        height: auto;
        background: var(--secondary-color);
    }
    .highlights {
        display: grid;
        padding: 48px 16px;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        justify-content: center;
        place-items: center center;
        gap: 42px;
    }
    .highlight-text {
        max-width: 300px;
        margin: 0;
        font-weight: 500;
        text-align: center;
        color: var(--darkest-color);
    }
    .highlight-number {
        display: block;
        line-height: 34px;
        font-size: 32px;
        font-weight: 800;
        color: var(--primary-color);
    }
    .highlight-subtitle,
    .highlight-title {
        display: block;
    }

    @media (width >= 768px) {
        .highlights {
            padding: 64px 16px;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr;
        }
    }

    @media (width >= 1025px) {
        .highlights {
            max-width: 1800px;
            margin: 0 auto;
            padding: 64px 80px;
        }
    }
</style>
