import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/types";

function CategoryTag({ category }: { category: Post["category"] }) {
  const colors: Record<Post["category"], string> = {
    DIY: "#FBBF24",
    Expedice: "#0796B1",
    Documents: "#C2C2C2",
  };
  return (
    <span
      className="font-mono"
      style={{
        color: colors[category],
        border: `1px solid ${colors[category]}`,
        fontSize: "0.6rem",
        letterSpacing: "0.12em",
        padding: "2px 8px",
        textTransform: "uppercase",
      }}
    >
      {category}
    </span>
  );
}

function HeroSection({ post }: { post: Post }) {
  return (
    <section style={{ padding: "5rem 2rem 4rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left — 2/3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Latest post tag */}
            <div>
              <span
                className="font-mono"
                style={{
                  color: "#FBBF24",
                  backgroundColor: "rgba(251,191,36,0.12)",
                  border: "1px solid rgba(251,191,36,0.4)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  padding: "4px 10px",
                  textTransform: "uppercase",
                }}
              >
                LATEST POST
              </span>
              <span
                className="font-mono"
                style={{ color: "#0796B1", fontSize: "0.6rem", letterSpacing: "0.1em", marginLeft: "0.5rem" }}
              >
                // {post.category}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                fontWeight: 700,
                color: "#E3E3E3",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              {post.title}
            </h1>

            {/* Excerpt */}
            <p
              style={{
                color: "#C2C2C2",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {post.excerpt}
            </p>

            {/* Metadata */}
            <div
              className="font-mono"
              style={{
                color: "#0796B1",
                fontSize: "0.65rem",
                letterSpacing: "0.08em",
              }}
            >
              DATUM: {formatDate(post.date)}, ODHAD. ČAS: {post.readingTime} min
              {post.coordinates && <span style={{ marginLeft: "1rem", color: "#C2C2C2" }}>{post.coordinates}</span>}
            </div>

            {/* Cover image */}
            <div style={{ position: "relative", aspectRatio: "3/2", border: "1px solid #1E3A5F", overflow: "hidden" }}>
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 1200px) 66vw, 780px"
                  priority
                />
              ) : (
                <div style={{ width: "100%", height: "100%", backgroundColor: "#0d2540", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="font-mono" style={{ color: "#2D4A6F", fontSize: "0.65rem", letterSpacing: "0.1em" }}>COVER_IMAGE_01</span>
                </div>
              )}
              {/* Image label */}
              <div
                className="font-mono"
                style={{
                  position: "absolute",
                  bottom: "0.75rem",
                  left: "0.75rem",
                  backgroundColor: "rgba(15,43,71,0.85)",
                  border: "1px solid #1E3A5F",
                  color: "#C2C2C2",
                  fontSize: "0.55rem",
                  letterSpacing: "0.1em",
                  padding: "2px 8px",
                  textTransform: "uppercase",
                }}
              >
                Img. 01: View_A
              </div>
            </div>

            {/* CTA */}
            <div>
              <Link
                href={`/blog/${post.slug}`}
                className="font-mono"
                style={{
                  color: "#FBBF24",
                  textDecoration: "none",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  borderBottom: "1px solid rgba(251,191,36,0.3)",
                  paddingBottom: "2px",
                  transition: "border-color 0.15s ease",
                }}
              >
                FULL_ARTICLE —&gt;
              </Link>
            </div>
          </div>

          {/* Right — 1/3: table + author card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Technical table */}
            <div style={{ border: "1px solid #1E3A5F" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {[
                    ["Date", formatDate(post.date)],
                    ["Scale", "1:1"],
                    ["Status", "PUBLISHED"],
                    ["REF", post.slug.toUpperCase().slice(0, 12)],
                  ].map(([label, value]) => (
                    <tr key={label} style={{ borderBottom: "1px solid rgba(30,58,95,0.5)" }}>
                      <td
                        className="font-mono"
                        style={{
                          color: "#C2C2C2",
                          fontSize: "0.6rem",
                          letterSpacing: "0.08em",
                          padding: "0.5rem 0.75rem",
                          borderRight: "1px solid rgba(30,58,95,0.5)",
                          width: "40%",
                          textTransform: "uppercase",
                        }}
                      >
                        {label}
                      </td>
                      <td
                        className="font-mono"
                        style={{
                          color: "#E3E3E3",
                          fontSize: "0.65rem",
                          letterSpacing: "0.05em",
                          padding: "0.5rem 0.75rem",
                        }}
                      >
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Author card */}
            <div style={{ border: "1px solid #1E3A5F", padding: "1rem" }}>
              <div
                className="font-mono"
                style={{
                  color: "#FBBF24",
                  fontSize: "0.55rem",
                  letterSpacing: "0.15em",
                  marginBottom: "0.75rem",
                  textTransform: "uppercase",
                }}
              >
                AUTHOR_CARD / REV 1.0
              </div>
              <div className="flex gap-3" style={{ alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "#112d4a",
                    border: "1px solid #1E3A5F",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  🐻
                </div>
                <div>
                  <div style={{ color: "#E3E3E3", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                    Petr N.
                  </div>
                  <div className="font-mono" style={{ color: "#C2C2C2", fontSize: "0.6rem", lineHeight: 1.8 }}>
                    <div>182 cm / 78 kg / 26 let</div>
                    <div>50°05&apos;N 14°28&apos;E</div>
                    <div style={{ color: "#0796B1" }}>REF: CZ-2026-001</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ post }: { post: Post }) {
  return (
    <article
      style={{
        border: "1px solid #1E3A5F",
        backgroundColor: "rgba(13, 37, 64, 0.5)",
        transition: "border-color 0.15s ease, background-color 0.15s ease",
      }}
    >
      {/* Card cover image */}
      <div style={{ position: "relative", height: "180px", borderBottom: "1px solid #1E3A5F", overflow: "hidden" }}>
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div style={{ width: "100%", height: "100%", backgroundColor: "#0d2540", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="font-mono" style={{ color: "#2D4A6F", fontSize: "0.6rem", letterSpacing: "0.1em" }}>IMG_PLACEHOLDER</span>
          </div>
        )}
      </div>

      <div style={{ padding: "1.25rem" }}>
        {/* Category + coords row */}
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: "0.75rem" }}
        >
          <CategoryTag category={post.category} />
          {post.coordinates && (
            <span
              className="font-mono"
              style={{ color: "#0796B1", fontSize: "0.6rem" }}
            >
              {post.coordinates}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "#E3E3E3",
            letterSpacing: "-0.02em",
            lineHeight: 1.3,
            marginBottom: "0.625rem",
          }}
        >
          {post.title}
        </h3>

        {/* Metadata */}
        <div
          className="font-mono flex gap-3"
          style={{ color: "#0796B1", fontSize: "0.6rem", marginBottom: "0.75rem" }}
        >
          <span>{formatDate(post.date)}</span>
          <span style={{ color: "#1E3A5F" }}>—</span>
          <span>{post.readingTime} min</span>
        </div>

        {/* Excerpt */}
        <p
          style={{
            color: "#C2C2C2",
            fontSize: "0.8rem",
            lineHeight: 1.6,
            marginBottom: "1rem",
          }}
        >
          {post.excerpt.slice(0, 140)}…
        </p>

        {/* Link */}
        <Link
          href={`/blog/${post.slug}`}
          className="font-mono"
          style={{
            color: "#FBBF24",
            textDecoration: "none",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
          }}
        >
          Read_log —&gt;
        </Link>
      </div>
    </article>
  );
}

export default async function HomePage() {
  const posts = getAllPosts();
  const latestPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <>
      {/* Hero */}
      {latestPost ? (
        <HeroSection post={latestPost} />
      ) : (
        <div style={{ padding: "5rem 4rem", textAlign: "center", color: "#C2C2C2" }}>
          Žádné články k zobrazení.
        </div>
      )}

      {/* Divider */}
      <div
        style={{
          borderTop: "1px solid rgba(30,58,95,0.5)",
          margin: "0 4rem",
        }}
      />

      {/* Articles section */}
      {otherPosts.length > 0 && (
        <section style={{ padding: "4rem 2rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: "2.5rem" }}
            >
              <h2
                className="font-mono"
                style={{
                  color: "#C2C2C2",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                — BLOG
              </h2>
              <Link
                href="/blog"
                className="font-mono"
                style={{
                  color: "#FBBF24",
                  textDecoration: "none",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                }}
              >
                Všechny články —&gt;
              </Link>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {otherPosts.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
