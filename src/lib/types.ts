export type DownloadFile = {
  label?: string;
  filename?: string;
  file: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: "DIY" | "Expedice" | "Documents";
  excerpt: string;
  readingTime: number;
  coverImage?: string;
  coordinates?: string;
  content: string;
  downloads?: DownloadFile[];
  metaDescription?: string;
  ogImage?: string;
};
