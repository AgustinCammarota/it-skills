export interface Company {
  name: string;
  link: string;
  icon: string;
}

export interface CompanyCard extends Company {
  transitionDelay?: string;
}
