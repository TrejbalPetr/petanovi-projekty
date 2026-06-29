import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { colors, mono, sans } from "@/lib/typography";
import TableOfContents from "@/components/TableOfContents";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import DownloadsSection from "@/components/DownloadsSection";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const description = post.metaDescription || post.excerpt;
  const ogImg = post.ogImage || post.coverImage;
  return {
    title: `${post.title} — Peťanovi Projekty`,
    description,
    openGraph: {
      title: post.title,
      description,
      ...(ogImg ? { images: [{ url: ogImg }] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const categoryColor = post.category === "DIY" ? colors.yellow : post.category === "Expedice" ? colors.blue : colors.textSecondary;

  return (
    <div style={{ padding: "4rem 2rem 6rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <nav className="font-mono flex items-center gap-2" style={{ color: colors.textSecondary, fontSize: mono.base, marginBottom: "3rem", letterSpacing: "0.05em" }}>
          <Link href="/" style={{ color: colors.blue, textDecoration: "none" }}>Úvod</Link>
          <span style={{ color: colors.textMuted }}>/</span>
          <Link href="/blog" style={{ color: colors.blue, textDecoration: "none" }}>Blog</Link>
          <span style={{ color: colors.textMuted }}>/</span>
          <span>{post.slug}</span>
        </nav>

        <div style={{ marginBottom: "1.25rem" }}>
          <span className="font-mono" style={{ color: categoryColor, border: `1px solid ${categoryColor}`, fontSize: mono.lg, letterSpacing: "0.1em", padding: "3px 10px", textTransform: "uppercase" }}>
            {post.category}
          </span>
        </div>

        <h1 style={{ fontSize: sans.h1, fontWeight: 700, color: colors.textPrimary, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "1.25rem" }}>
          {post.title}
        </h1>

        <div className="font-mono flex flex-wrap items-center gap-4" style={{ color: colors.blue, fontSize: mono.md, letterSpacing: "0.05em", marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: `1px solid ${colors.borderMedium}` }}>
          <span>{formatDate(post.date)}</span>
          <span style={{ color: colors.border }}>—</span>
          <span>{post.readingTime} min čtení</span>
          {post.coordinates && (<><span style={{ color: colors.border }}>—</span><span>{post.coordinates}</span></>)}
        </div>

        <div className="article-layout">
          <div className="article-cover" style={{ position: "relative", aspectRatio: "3/2", border: `1px solid ${colors.border}`, overflow: "hidden" }}>
            {post.coverImage ? (
              <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 900px) 100vw, 740px" priority />
            ) : (
              <div style={{ width: "100%", height: "100%", backgroundColor: colors.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="font-mono" style={{ color: colors.textMuted, fontSize: mono.base, letterSpacing: "0.1em" }}>COVER_IMAGE // {post.slug.toUpperCase()}</span>
              </div>
            )}
          </div>

          <aside>
            <div className="toc-sticky">
              <TableOfContents content={post.content} />
            </div>
          </aside>

          <article style={{ alignSelf: "start" }}>
            <MarkdownRenderer content={post.content} />
            {post.downloads && post.downloads.length > 0 && (
              <DownloadsSection downloads={post.downloads} />
            )}
          </article>
        </div>

        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: `1px solid rgba(30,58,95,0.4)` }}>
          <Link href="/blog" className="font-mono" style={{ color: colors.textSecondary, textDecoration: "none", fontSize: mono.base, letterSpacing: "0.08em" }}>
            ← Zpět na Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
