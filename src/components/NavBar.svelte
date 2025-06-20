<script lang="ts">
  import { navigate } from 'astro:transitions/client';
  import { getRelativeLocaleUrl } from "astro:i18n";
  import { fly } from 'svelte/transition';
  import { getLangFromUrl, useTranslations  } from "@i18n/utils";
  import { LANGUAGES } from "@i18n/ui.ts";
  import type { Routes } from "@interfaces/routes.interface";
  import Menu from '@assets/icons/menu.svg?raw';
  import Close from '@assets/icons/close.svg?raw';
  import Logo from '@assets/icons/full-logo.svg?raw';

  let {
    currentUrl
  } : {
    currentUrl: URL
  } = $props();

  const lang = getLangFromUrl(currentUrl);
  const t = useTranslations(lang);

  let isSidebarOpen: boolean = $state(false);
  let selected: 'es' | 'en' = $state(lang);
  let routes: Routes[] = $state.raw([
    {
      name: t('navbar.link.about'),
      path: "/"
    },
    {
      name: t('navbar.link.solutions'),
      path: "/solutions"
    },
    {
      name: t('navbar.link.careers'),
      path: "/careers/1"
    },
    {
      name: t('navbar.link.contact'),
      path: "/contact"
    }
  ]);

  let currentLink: string | undefined = $derived.by(() => {
    const route = currentUrl.pathname.split("/")
      .filter(value => value !== 'en' && value !== 'es' && Boolean(value));

    return `${route?.[0] ?? ''}/${route?.[1] ?? ''}`;
  });

  function setActiveLink(currentPath: string): boolean {
    const activeSegments = currentUrl.pathname.split('/').filter(value => value !== 'en' && value !== 'es' && Boolean(value));
    const targetSegments = currentPath.split('/').filter(Boolean);
    return activeSegments?.[0] === targetSegments?.[0];
  }
</script>

{#snippet listOptions()}
    <ul class="option-list">
        {#each routes as route, index (route.name)}
            <li class="option-list-item" data-index={index}>
                <a class={setActiveLink(route.path)
                    ? 'option-list-link option-list-link-active'
                    : 'option-list-link'}
                   href={getRelativeLocaleUrl(lang, route.path)}
                   title={route.name}
                   data-astro-prefetch="tap"
                   onclick={() => isSidebarOpen = false}>
                    {route.name}
                </a>
            </li>
        {/each}
    </ul>
{/snippet}

{#snippet selectLanguage()}
    <select class="language-select"
            name="language"
            bind:value={selected}
            onchange={() => navigate(getRelativeLocaleUrl(selected, currentLink ?? '/'))}>
        <option value="es">
            &#x1F1EA;&#x1F1F8; {LANGUAGES['es']}
        </option>
        <option value="en">
            &#x1F1FA;&#x1F1F8; {LANGUAGES['en']}
        </option>
    </select>
{/snippet}

<nav class="navbar">
    <section class="logo-section">
        <a class="logo-link"
           href={getRelativeLocaleUrl(lang, '/')}
           title={t("navbar.logo.option")}
           data-astro-prefetch="tap"
           onclick={() => isSidebarOpen = false}>
            <span class="logo-link-icon"
                  aria-label={t("navbar.logo.option")}>
                {@html Logo}
            </span>
        </a>
    </section>

    <section class="option-section">
        <div class="button-container">
            {@render  selectLanguage()}

            <button class="menu-button"
                    type="button"
                    onclick={() => isSidebarOpen = !isSidebarOpen}>
                <span class="menu-button-icon"
                      aria-label={isSidebarOpen ? t("navbar.close.option") : t("navbar.menu.option")}>
                    {@html isSidebarOpen ? Close : Menu}
                </span>
            </button>
        </div>


        {#if isSidebarOpen}
            <aside class="aside-container" transition:fly>
                {@render listOptions()}
            </aside>
        {/if}

        <div class="option-list-container">
            {@render listOptions()}
            {@render selectLanguage()}
        </div>
    </section>
</nav>

<style>
    .navbar {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
    }
    .aside-container {
        width: 100%;
        height: 100dvh;
        padding-top: 75px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        pointer-events: none;
    }
    .option-list {
        width: 100%;
        height: 100%;
        padding-top: 12px;
        background-color: var(--lightest-color);
        pointer-events: visible;
        border-top: 1px solid var(--lighter-color);
    }
    .option-list-item {
        padding: 4px 16px;
    }
    .option-list-link {
        width: 100%;
        height: auto;
        display: block;
        font-size: var(--fs-md);
        font-weight: 500;
    }
    .logo-link {
        width: 100%;
        height: 100%;
        display: inline-flex;
    }
    .logo-link-icon {
        width: 130px;
        height: 40px;
    }
    .button-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
    }
    .language-select {
        padding: 6px 1px;
        border: none;
        font-size: var(--fs-base);
        font-weight: 800;
        background-color: var(--lightest-color);
        cursor: pointer;
    }
    .language-select:focus {
        outline: none;
    }
    .menu-button {
        border: none;
        appearance: none;
        background: none;
    }
    .menu-button-icon {
        display: block;
        width: 40px;
        height: 40px;
        color: var(--primary-color);
    }
    .option-list-container {
        display: none;
    }

    @media (width >= 768px) {
        .navbar {
            max-width: 1800px;
            margin: 0 auto;
        }
        .option-list-container {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .aside-container,
        .button-container {
            display: none;
        }
        .option-list {
            margin-right: 12px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 0;
            border: none;
        }
        .language-select {
            font-size: var(--fs-sm);
            border-left: 1px solid var(--darkest-color);
            padding: 2px 0 2px 16px;
        }
        .option-list-item {
            padding: 0 12px;
        }
        .logo-link-icon {
            width: 160px;
            height: 50px;
        }
        .option-list-link {
            transform: scale(1);
            transition: transform 0.3s ease;
            font-weight: 700;
            font-size: var(--fs-base);
        }
        .option-list-link:hover,
        .option-list-link-active {
            color: var(--primary-color);
            transform: scale(1.03);
        }
    }
</style>
