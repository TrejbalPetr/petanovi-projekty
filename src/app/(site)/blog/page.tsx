import { getAllPosts } from "@/lib/posts";
import { colors, mono, sans } from "@/lib/typography";
import ArticleFilter from "@/components/ArticleFilter";

export const metadata = { title: "Blog — Peťanovi Projekty" };

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div style={{ padding: "5rem 2rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ marginBottom: "4rem" }}>
          <div className="font-mono" style={{ color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.15em", marginBottom: "1rem", textTransform: "uppercase" }}>
            SECTION: BLOG // STATUS: ACTIVE
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, color: colors.textPrimary, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Všechny články
          </h1>
          <div style={{ borderTop: `1px solid ${colors.border}`, marginTop: "2rem" }} />
        </div>
        <ArticleFilter posts={posts} />
      </div>
    </div>
  );
}
