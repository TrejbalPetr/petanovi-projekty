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

export function getPageContent(pageName: string): { data: Record<string, string>; content: string } | null {
  try {
    const fullPath = path.join(process.cwd(), `content/pages/${pageName}.mdx`);
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { data: data as Record<string, string>, content };
  } catch {
    return null;
  }
}
