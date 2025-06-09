<script lang="ts">
  import { onMount } from 'svelte';
  import {
    PUBLIC_CALENDLY_URL,
    PUBLIC_CALENDLY_WIDGET
  } from "astro:env/client";

  onMount(() => {
    const scriptId = 'calendly-widget-script';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = PUBLIC_CALENDLY_WIDGET;
      script.async = true;
      document.body.appendChild(script);
    }
  });
</script>

<!-- Calendly inline widget -->
<div class="calendly-inline-widget"
        data-url={PUBLIC_CALENDLY_URL}
></div>

<style>
    .calendly-inline-widget {
        height: 600px;
        width: 100%;
        max-width: 500px;
        min-width: 300px;
        margin: 0;
    }

    @media (width >= 768px) {
        .calendly-inline-widget {
            max-width: 600px;
        }
    }
</style>
