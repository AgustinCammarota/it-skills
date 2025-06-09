<script lang="ts">
  import { getLangFromUrl, useTranslations  } from "@i18n/utils";

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

  const emailPattern = '[\\-a-zA-Z0-9~!$%^&amp;*_=+\\}\\{\'?]+(\\.[\\-a-zA-Z0-9~!$%^&amp;*_=+\\}\\{\'?]+)*@[a-zA-Z0-9_][\\-a-zA-Z0-9_]*(\\.[\\-a-zA-Z0-9_]+)*\\.[cC][oO][mM](:[0-9]{1,5})?';
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
      console.log('entre')
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

  function onSubmitForm(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    if (!form.checkValidity()) {
      return;
    }

    console.log(values)
    // TODO Enviar formulario
  }
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
               maxlength="10">
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
               maxlength="50">
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
                maxlength="1000"
                rows="5"
                required
        ></textarea>
    </div>

    <button class="contact-form-button" type="submit">{t('contact.form.button')} 🚀</button>
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
        height: auto;
        padding: 6px 12px;
        border: 1px solid var(--darker-color);
        font-size: var(--fs-sm);
        line-height: var(--lh-loose);
        border-radius: 2px;
    }
    .contact-form-select {
        padding: 11px 8px;
    }
    .form-select-disabled {
        color: var(--disabled-color);
    }
    .contact-form-input[data-input-error="true"] {
        outline-color: var(--error-color);
    }
    .contact-form-textarea {
        height: 140px;
        margin-top: 16px;
        resize: none;
    }
    .contact-form-button {
        padding: 8px 16px;
        border: none;
        border-radius: 8px;
        background: linear-gradient(90deg, var(--light-color), var(--primary-color), var(--dark-color));
        color: var(--lightest-color);
        font-size: var(--fs-base);
        font-weight: 600;
        cursor: pointer;
    }
    .contact-form-input:focus-visible,
    .contact-form-select:focus-visible,
    .contact-form-textarea:focus-visible {
        outline-color: var(--primary-color);
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
        .contact-form-button:hover {
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
