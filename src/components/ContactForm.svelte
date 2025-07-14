<script lang="ts">
  import { actions } from 'astro:actions';
  import { getLangFromUrl, useTranslations  } from "@i18n/utils";
  import { onMount, onDestroy } from "svelte";
  import { PUBLIC_RECAPTCHA_SITE_KEY } from "astro:env/client";

  let {
    currentUrl
  } : {
    currentUrl: URL
  } = $props();

  let errors = $state({
    name: false,
    email: false,
    subject: false,
    options: false,
    message: false
  });

  let selectValue = $state('');
  let status: 'success' | 'pending' | 'error' | 'loading' = $state('pending');
  let script: HTMLScriptElement | null = $state(null);

  const emailPattern = '[\\-a-zA-Z0-9~!$%^&amp;*_=+\\}\\{\'?]+(\\.[\\-a-zA-Z0-9~!$%^&amp;*_=+\\}\\{\'?]+)*@[a-zA-Z0-9_][\\-a-zA-Z0-9_]*(\\.[\\-a-zA-Z0-9_]+)*\\.[a-zA-Z]{2,}(:[0-9]{1,5})?';
  const inputPattern = '^[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+$';
  const lang = getLangFromUrl(currentUrl);
  const t = useTranslations(lang);
  const selectOptions = $state.raw([
    {
      value: t('contact.select.recruitment')
    },
    {
      value: t('contact.select.psychotechnical'),
      excludeLang: 'en'
    },
    {
      value: t('contact.select.graphological'),
      excludeLang: 'en'
    },
    {
      value: t('contact.select.potential'),
      excludeLang: 'en'
    },
    {
      value: t('contact.select.coaching.individual')
    },
    {
      value: t('contact.select.coaching.organizational')
    },
    {
      value: t('contact.select.mentoring.individual')
    },
    {
      value: t('contact.select.other')
    }
  ]);

  function onSetCustomValidity(event: Event): void {
    const input = event.target as HTMLInputElement;
    const name = input.name;

    input.setCustomValidity('');
    if (input.validity.valid) return onResetErrors(input);

    errors = {
      ...errors,
      [name]: !input.validity.valid
    };

    if (input?.validity?.valueMissing) {
      input.setCustomValidity(t('contact.form.value.missing'));
      return;
    }

    if (input?.validity?.patternMismatch) {
      const text = name === 'email'
        ? t('contact.form.email.pattern.mismatch')
        : t('contact.form.input.pattern.mismatch');
      input.setCustomValidity(text);
      return;
    }

    if (input?.validity?.typeMismatch) {
      input.setCustomValidity(t('contact.form.type.mismatch'));
      return;
    }
  }

  function onResetErrors(input: HTMLInputElement): void {
    const name = input.name;

    errors = {
      ...errors,
      [name]: false
    };
  }

  async function executeCaptcha(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!window.grecaptcha) {
        return reject(new Error('Recaptcha not loaded.'));
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(PUBLIC_RECAPTCHA_SITE_KEY, { action: 'contact' })
          .then(resolve)
          .catch(reject);
      });
    });
  }

  async function validateRecaptchaToken(): Promise<boolean> {
    try {
      const token = await executeCaptcha();
      const { data, error } = await actions.recaptchaAction.verifyCaptcha({ token });

      if (error || data?.code !== 200) {
        status = 'error';
        return false;
      }

      return true;
    } catch {
      status = 'error';
      return false;
    }
  }

  async function onSubmitForm(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    if (!form.checkValidity()) return;

    status = 'loading';

    const captchaIsValid = await validateRecaptchaToken();
    if (!captchaIsValid) return;

    const { data, error } = await actions.email.sendEmail(formData);

    if (error?.code) {
      status = 'error';
      return;
    }

    form.reset();
    status = data?.status ?? 'success';
  }

  onMount(() => {
    if (!window.grecaptcha) {
      script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?trustedtypes=true&render=${PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = executeCaptcha;
      document.head.appendChild(script);
    }
  });

  onDestroy(() => {
    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
      script = null;
    }

    window.grecaptcha = undefined;
  });
</script>

<form class="contact-form" onsubmit={onSubmitForm}>
    <div class="contact-form-field">
        <label class="sr-only" for="name">{t('contact.form.name')}</label>
        <input type="text"
               name="name"
               class="contact-form-input"
               id="name"
               placeholder={t('contact.form.name')}
               required
               data-input-error={errors.name}
               oninput={onSetCustomValidity}
               oninvalid={onSetCustomValidity}
               pattern={inputPattern}
               maxlength="100">
    </div>

    <div class="contact-form-field">
        <label class="sr-only" for="email">{t('contact.form.email')}</label>
        <input type="email"
               name="email"
               class="contact-form-input"
               id="email"
               required
               placeholder={t('contact.form.email')}
               data-input-error={errors.email}
               oninput={onSetCustomValidity}
               oninvalid={onSetCustomValidity}
               pattern={emailPattern}
               maxlength="100">
    </div>

    <div class="contact-form-field">
        <label class="sr-only" for="subject">{t('contact.form.subject')}</label>
        <input type="text"
               name="subject"
               class="contact-form-input"
               id="subject"
               placeholder={t('contact.form.subject')}
               data-input-error={errors.subject}
               oninput={onSetCustomValidity}
               oninvalid={onSetCustomValidity}
               required
               maxlength="100">
    </div>

    <div class="contact-form-field">
        <label class="sr-only" for="options">{t('contact.form.option')}</label>
        <select class={!selectValue ? 'contact-form-select form-select-disabled' : 'contact-form-select' }
                name="options"
                id="options"
                bind:value={selectValue}
                data-input-error={errors.options}
                oninput={onSetCustomValidity}
                oninvalid={onSetCustomValidity}
                required>
            <option value="" disabled selected>{t('contact.form.option')}</option>
            {#each (selectOptions.filter(option => option.excludeLang !== lang)) as option (option.value)}
                <option value={option.value}>{option.value}</option>
            {/each}
        </select>
    </div>

    <div class="contact-form-field">
        <label class="sr-only" for="message">{t('contact.form.message')}</label>
        <textarea
                name="message"
                class="contact-form-textarea"
                id="message"
                data-input-error={errors.options}
                oninput={onSetCustomValidity}
                oninvalid={onSetCustomValidity}
                placeholder={t('contact.form.message')}
                maxlength="3000"
                rows="5"
                required
        ></textarea>
    </div>

    <button class="contact-form-button"
            type="submit"
            disabled={status === 'success' || status === 'loading'}
            aria-disabled={status === 'success' || status === 'loading'}>
        {#if status === 'pending'}
            <span>{t('contact.form.button.pending')} &#x1F680;</span>
        {/if}
        {#if status === 'loading'}
            <span>{t('contact.form.button.loading')} &#x23F3;</span>
        {/if}
        {#if status === 'success'}
            <span>{t('contact.form.button.success')} &#x2705;</span>
        {/if}
        {#if status === 'error'}
            <span>{t('contact.form.button.error')} &#x274C;</span>
        {/if}
    </button>
</form>

<style>
    .contact-form {
        width: 100%;
        height: auto;
    }
    .contact-form-field {
        position: relative;
        width: 100%;
        height: auto;
        margin-bottom: 16px;
    }
    .contact-form-input,
    .contact-form-select,
    .contact-form-textarea {
        width: 100%;
        height: 43px;
        padding: 6px 12px;
        border: 1px solid var(--darker-color);
        background-color: var(--secondary-color);
        font-size: var(--fs-base);
        line-height: var(--lh-loose);
        border-radius: 4px;
    }
    .contact-form-select {
        padding: 11px 8px;
    }
    .form-select-disabled {
        color: var(--disabled-color);
    }
    .contact-form-textarea {
        height: 140px;
        margin-top: 16px;
        resize: none;
    }
    .contact-form-button {
        padding: 4px 16px;
        border: none;
        border-radius: 8px;
        background: linear-gradient(90deg, var(--light-color), var(--primary-color), var(--dark-color));
        color: var(--lightest-color);
        font-size: var(--fs-base);
        font-weight: 600;
        cursor: pointer;
    }
    .contact-form-button[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
    }
    .contact-form-input:focus-visible,
    .contact-form-select:focus-visible,
    .contact-form-textarea:focus-visible {
        outline-color: var(--primary-color);
    }
    .contact-form-input[data-input-error="true"]:focus-visible {
         outline-color: var(--error-color);
    }

    @media (width >= 768px) {
        .contact-form-field {
            margin-bottom: 18px;
        }
        .contact-form-input,
        .contact-form-select,
        .contact-form-textarea {
            font-size: 1.6rem;
        }
        .contact-form-textarea {
            margin-top: 18px;
        }
        .contact-form-button:not([disabled]):hover {
            background: linear-gradient(
                    270deg,
                    var(--lightest-color),
                    var(--lighter-color),
                    var(--light-color)
            );
            color: var(--darkest-color);
        }
    }
</style>
