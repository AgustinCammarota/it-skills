enum Path {
  en = "/",
  es = "/en/",
}

enum Language {
  en = "English",
  es = "Español",
}

export const defaultLang = "es";

export const PATHS = Object.freeze({
  en: Path.en,
  es: Path.es,
});

export const LANGUAGES = {
  en: Language.en,
  es: Language.es,
};

export const ROUTES: string[] = ["about", "solutions", "careers", "contact"];
