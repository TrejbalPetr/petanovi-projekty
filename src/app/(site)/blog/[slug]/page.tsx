import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import TableOfContents from "@/components/TableOfContents";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Peťanovi Projekty`,
    description: post.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div style={{ padding: "4rem 2rem 6rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Breadcrumb */}
        <nav
          className="font-mono flex items-center gap-2"
          style={{
            color: "#C2C2C2",
            fontSize: "0.65rem",
            marginBottom: "3rem",
            letterSpacing: "0.05em",
          }}
        >
          <Link href="/" style={{ color: "#0796B1", textDecoration: "none" }}>Úvod</Link>
          <span style={{ color: "#2D4A6F" }}>/</span>
          <Link href="/blog" style={{ color: "#0796B1", textDecoration: "none" }}>Blog</Link>
          <span style={{ color: "#2D4A6F" }}>/</span>
          <span>{post.slug}</span>
        </nav>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 260px",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          {/* Left — article content */}
          <article>
            {/* Category tag */}
            <div style={{ marginBottom: "1.25rem" }}>
              <span
                className="font-mono"
                style={{
                  color:
                    post.category === "DIY"
                      ? "#FBBF24"
                      : post.category === "Expedice"
                      ? "#0796B1"
                      : "#C2C2C2",
                  border: `1px solid ${
                    post.category === "DIY"
                      ? "#FBBF24"
                      : post.category === "Expedice"
                      ? "#0796B1"
                      : "#C2C2C2"
                  }`,
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  padding: "2px 8px",
                  textTransform: "uppercase",
                }}
              >
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                fontWeight: 700,
                color: "#E3E3E3",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
              }}
            >
              {post.title}
            </h1>

            {/* Metadata */}
            <div
              className="font-mono flex flex-wrap items-center gap-4"
              style={{
                color: "#0796B1",
                fontSize: "0.7rem",
                letterSpacing: "0.05em",
                marginBottom: "2.5rem",
                paddingBottom: "2rem",
                borderBottom: "1px solid rgba(30,58,95,0.5)",
              }}
            >
              <span>{formatDate(post.date)}</span>
              <span style={{ color: "#1E3A5F" }}>—</span>
              <span>{post.readingTime} min čtení</span>
              {post.coordinates && (
                <>
                  <span style={{ color: "#1E3A5F" }}>—</span>
                  <span>{post.coordinates}</span>
                </>
              )}
            </div>

            {/* Cover image */}
            <div style={{ position: "relative", height: "360px", border: "1px solid #1E3A5F", overflow: "hidden", marginBottom: "2.5rem" }}>
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 1200px) 100vw, 800px"
                  priority
                />
              ) : (
                <div style={{ width: "100%", height: "100%", backgroundColor: "#0d2540", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="font-mono" style={{ color: "#2D4A6F", fontSize: "0.65rem", letterSpacing: "0.1em" }}>COVER_IMAGE // {post.slug.toUpperCase()}</span>
                </div>
              )}
            </div>

            {/* Article body */}
            <MarkdownRenderer content={post.content} />
          </article>

          {/* Right — sticky sidebar */}
          <aside>
            <TableOfContents content={post.content} />
          </aside>
        </div>

        {/* Back link */}
        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(30,58,95,0.4)" }}>
          <Link
            href="/blog"
            className="font-mono"
            style={{
              color: "#C2C2C2",
              textDecoration: "none",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
            }}
          >
            ← Zpět na Blog
          </Link>
        </div>
      </div>

      {/* Floating edit button */}
      <a
        href={`/keystatic/collection/posts/item/${slug}`}
        title="Upravit v Keystatic"
        style={{
          position: "fixed",
          right: "2rem",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 40,
          backgroundColor: "rgba(13, 37, 64, 0.9)",
          border: "1px solid #1E3A5F",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
          transition: "border-color 0.15s ease",
        }}
      >
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="#C2C2C2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </a>
    </div>
  );
}
