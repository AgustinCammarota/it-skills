export interface Career {
  id: number;
  documentId: string;
  title: string;
  description: string;
  active: boolean;
  date: string;
  slug: string;
  modality: string;
  link: string;
  location: string;
  image: CareerImage;
}

interface CareerImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
}
