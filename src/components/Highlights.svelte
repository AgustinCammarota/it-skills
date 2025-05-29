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
  const founded = new Tween(0, {
    duration: 2000,
    easing: cubicOut
  });
  const operating = new Tween(0, {
    duration: 2000,
    easing: cubicOut
  });
  const companies = new Tween(0, {
    duration: 2000,
    easing: cubicOut
  });

  onMount(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) {
        visible = true;
        founded.set(2006);
        operating.set(100);
        companies.set(20);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(container);
  });
</script>

<section class="highlights-section" bind:this={container}>
    {#key visible}
        <div class="highlight-container">
            <h3 class="highlight-title" id="founded">
                {t('highlight.founded.title')}
                <span class="highlight-number">{Math.round(founded.current)}</span>
                <span class="highlight-subtitle">{t('highlight.founded.subtitle')}</span>
            </h3>
        </div>

        <div class="highlight-container" id="operating">
            <h3 class="highlight-title">
                {t('highlight.operating.title')}
                <span class="highlight-number">{Math.round(operating.current)}% {t('highlight.operating.number')}</span>
                <span class="highlight-subtitle"> {t('highlight.operating.subtitle')}</span>
            </h3>
        </div>

        <div class="highlight-container" id="companies">
            <h3 class="highlight-title">
                {t('highlight.companies.title')}
                <span class="highlight-number">{Math.round(companies.current)}+ {t('highlight.companies.number')}</span>
                <span class="highlight-subtitle">{t('highlight.companies.subtitle')}</span>
            </h3>
        </div>
    {/key}
</section>

<style>
    .highlights-section {
        width: 100%;
        height: auto;
        display: grid;
        padding: 42px 0;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        justify-content: center;
        align-items: center;
        justify-items: center;
        gap: 42px;
    }
    .highlight-title {
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
    .highlight-subtitle {
        display: block;
    }
</style>
