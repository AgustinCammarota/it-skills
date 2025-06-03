import { Path, Language } from "@interfaces/routes.interface.ts";

export const defaultLang = "es";

export const PATHS = Object.freeze({
  en: Path.en,
  es: Path.es,
});

export const LANGUAGES = {
  en: Language.en,
  es: Language.es,
};
