import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import HeroSection from "@/components/HeroSection";
import ArticleGrid from "@/components/ArticleGrid";
import ContactForm from "@/components/ContactForm";

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
      {/* Hero */}
      {latestPost ? (
        <HeroSection post={latestPost} stats={stats} />
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
              style={{ marginBottom: "2rem" }}
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

            <ArticleGrid posts={otherPosts} />
          </div>
        </section>
      )}
      {/* Kontakt */}
      <section id="kontakt" style={{ padding: "5rem 2rem 6rem", borderTop: "1px solid rgba(30,58,95,0.5)", marginTop: "2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", fontWeight: 700, color: "#E3E3E3", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "2rem" }}>
                Chceš se o něco podělit?
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <p style={{ color: "#C2C2C2", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>Máš dotaz, nápad, návrh nebo se chceš pochlubit?</p>
                <p style={{ color: "#C2C2C2", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>Našel si chybu na webu nebo v mých projektech?</p>
                <p style={{ color: "#C2C2C2", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>Ani kritika není nežádoucí.</p>
                <p style={{ color: "#C2C2C2", fontSize: "1rem", lineHeight: 1.7, margin: "0.75rem 0 0" }}>Napiš a nějak to vyřešíme 😊</p>
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
