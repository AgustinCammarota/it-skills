module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-html/svelte",
    "stylelint-config-html/astro",
  ],
  overrides: [
    {
      files: ["**/*.svelte"],
      customSyntax: "postcss-html",
    },
  ],
  rules: {
    "rule-empty-line-before": null,
    "selector-pseudo-class-no-unknown": null,
    "media-feature-range-notation": "context",
  },
};
