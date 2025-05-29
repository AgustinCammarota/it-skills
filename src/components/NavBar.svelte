<script lang="ts">
  import { fly } from 'svelte/transition';
  import { getLangFromUrl, useTranslations } from "@i18n/utils";
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
      path: "/careers"
    },
    {
      name: t('navbar.link.contact'),
      path: "/contact"
    }
  ]);
</script>

{#snippet listOptions()}
    <ul class="option-list">
        {#each routes as route, index (route.name)}
            <li class="option-list-item" data-index={index}>
                <a class="option-list-link"
                   href={route.path}
                   title={route.name}
                   data-astro-prefetch="tap"
                   onclick={() => isSidebarOpen = false}>
                    {route.name}
                </a>
            </li>
        {/each}
    </ul>
{/snippet}

<nav class="navbar">
    <section class="logo-section">
        <a class="logo-link"
           href="/"
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
        <button class="menu-button"
                type="button"
                onclick={() => isSidebarOpen = !isSidebarOpen}>
            <span class="menu-button-icon"
                  aria-label={isSidebarOpen ? t("navbar.close.option") : t("navbar.menu.option")}>
                {@html isSidebarOpen ? Close : Menu}
            </span>
        </button>

        {#if isSidebarOpen}
            <aside class="aside-container" transition:fly>
                {@render listOptions()}
            </aside>
        {/if}

        <div class="option-list-container">
            {@render listOptions()}
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
        padding-top: 77px;
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
</style>
