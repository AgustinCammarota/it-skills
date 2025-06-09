import type { Snippet } from "svelte";

export interface Company {
  name: string;
  link: string;
  icon: string;
}

export interface CompanyCard {
  name: string;
  link: string;
  icon: Snippet;
  transitionDelay?: string;
}
