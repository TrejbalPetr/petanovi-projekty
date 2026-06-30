import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post } from "./types";

export type { Post };
export { formatDate } from "./utils";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, "");
      return getPostBySlug(slug);
    })
    .filter((post): post is Post => post !== null);

  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const extensions = [".md", ".mdx"];
    let fileContents: string | null = null;

    for (const ext of extensions) {
      const fullPath = path.join(postsDirectory, `${slug}${ext}`);
      if (fs.existsSync(fullPath)) {
        fileContents = fs.readFileSync(fullPath, "utf8");
        break;
      }
    }

    if (!fileContents) return null;

    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      category: data.category || "Documents",
      excerpt: data.excerpt || "",
      readingTime: data.readingTime || 5,
      coverImage: data.coverImage,
      coordinates: data.coordinates,
      content,
      downloads: Array.isArray(data.downloads) ? data.downloads : undefined,
      metaDescription: data.metaDescription || undefined,
      ogImage: data.ogImage || undefined,
    };
  } catch {
    return null;
  }
}

export interface HomepageSettings {
  heroLabel: string;
  heroHeadline: string;
  heroHeadlineAccent: string;
  heroBodyFocusWords: string[];
  heroDescription: string;
  gpsCoordinates: string;
  contactHeading: string;
  contactDescription: string;
}

export function getHomepageSettings(): HomepageSettings {
  const defaults: HomepageSettings = {
    heroLabel: "DIGITÁLNÍ DENÍK",
    heroHeadline: "Deník pokusů, omylů a",
    heroHeadlineAccent: "výprav.",
    heroBodyFocusWords: ["TRÉNINK", "DIY", "LEZENÍ", "3D TISK", "CYKLITIKA", "ELEKTRONIKA", "FERRATY", "MECHANIKA", "SLACKLINING"],
    heroDescription: "DIY projekty, 3D tisk a outdoorové výpravy.\nZdokumentované, otestované a připravené k replikaci.",
    gpsCoordinates: "N 50°05′ E 14°28′",
    contactHeading: "Chceš se o něco podělit?",
    contactDescription: "Máš dotaz, nápad, návrh nebo se chceš pochlubit?\nNašel si chybu na webu nebo v mých projektech?\nAni kritika není nežádoucí.\nNapiš a nějak to vyřešíme 😊",
  };
  const page = getPageContent("homepage");
  if (!page) return defaults;
  const d = page.data;
  return {
    heroLabel: (d.heroLabel as string) || defaults.heroLabel,
    heroHeadline: (d.heroHeadline as string) || defaults.heroHeadline,
    heroHeadlineAccent: (d.heroHeadlineAccent as string) || defaults.heroHeadlineAccent,
    heroBodyFocusWords: Array.isArray(d.heroBodyFocusWords) && d.heroBodyFocusWords.length > 0
      ? (d.heroBodyFocusWords as string[])
      : defaults.heroBodyFocusWords,
    heroDescription: (d.heroDescription as string) || defaults.heroDescription,
    gpsCoordinates: (d.gpsCoordinates as string) || defaults.gpsCoordinates,
    contactHeading: (d.contactHeading as string) || defaults.contactHeading,
    contactDescription: (d.contactDescription as string) || defaults.contactDescription,
  };
}

export function getPageContent(pageName: string): { data: Record<string, unknown>; content: string } | null {
  try {
    const fullPath = path.join(process.cwd(), `content/pages/${pageName}.mdx`);
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { data: data as Record<string, unknown>, content };
  } catch {
    return null;
  }
}
