import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { colors, mono, sans } from "@/lib/typography";
import HeroSection from "@/components/HeroSection";
import ArticleGrid from "@/components/ArticleGrid";
import ContactForm from "@/components/ContactForm";
import StatsCounter from "@/components/StatsCounter";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const posts = getAllPosts();
  const latestPost = posts[0];
  const otherPosts = posts.slice(1);

  const stats = {
    total: posts.length,
    diy: posts.filter((p) => p.category === "DIY").length,
    expedice: posts.filter((p) => p.category === "Expedice").length,
    documents: posts.filter((p) => p.category === "Documents").length,
    lastUpdate: posts[0]?.date ?? "",
  };

  return (
    <>
      {latestPost ? (
        <HeroSection post={latestPost} stats={stats} />
      ) : (
        <div style={{ padding: "5rem 4rem", textAlign: "center", color: colors.textSecondary }}>
          Žádné články k zobrazení.
        </div>
      )}

      <div style={{ borderTop: `1px solid ${colors.borderMedium}`, margin: "0 4rem" }} />

      <StatsCounter
        total={stats.total}
        diy={stats.diy}
        expedice={stats.expedice}
        documents={stats.documents}
        lastUpdate={stats.lastUpdate ? formatDate(stats.lastUpdate) : ""}
      />

      <div style={{ borderTop: `1px solid ${colors.borderMedium}`, margin: "0 4rem" }} />

      {otherPosts.length > 0 && (
        <section style={{ padding: "4rem 2rem" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div className="flex items-center justify-between" style={{ marginBottom: "2rem" }}>
              <h2 className="font-mono" style={{ color: colors.textSecondary, fontSize: mono.xs, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                — BLOG
              </h2>
              <Link href="/blog" className="font-mono" style={{ color: colors.yellow, textDecoration: "none", fontSize: mono.xs, letterSpacing: "0.1em" }}>
                Všechny články —&gt;
              </Link>
            </div>
            <ArticleGrid posts={otherPosts} />
          </div>
        </section>
      )}

      <section id="kontakt" style={{ padding: "5rem 2rem 6rem", borderTop: `1px solid ${colors.borderMedium}`, marginTop: "2rem", scrollMarginTop: "6rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="grid md:grid-cols-2" style={{ gap: "3rem", alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: sans.h1, fontWeight: 700, color: colors.textPrimary, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "2rem" }}>
                Chceš se o něco podělit?
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <p style={{ color: colors.textSecondary, fontSize: sans.base, lineHeight: 1.7, margin: 0 }}>Máš dotaz, nápad, návrh nebo se chceš pochlubit?</p>
                <p style={{ color: colors.textSecondary, fontSize: sans.base, lineHeight: 1.7, margin: 0 }}>Našel si chybu na webu nebo v mých projektech?</p>
                <p style={{ color: colors.textSecondary, fontSize: sans.base, lineHeight: 1.7, margin: 0 }}>Ani kritika není nežádoucí.</p>
                <p style={{ color: colors.textSecondary, fontSize: sans.base, lineHeight: 1.7, margin: "0.75rem 0 0" }}>Napiš a nějak to vyřešíme 😊</p>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
