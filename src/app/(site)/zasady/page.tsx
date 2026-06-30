import { getPageContent } from "@/lib/posts";
import { colors, mono, sans } from "@/lib/typography";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageContent("zasady");
  const title = (page?.data.metaTitle as string) ?? "Zásady ochrany osobních údajů — Peťanovi Projekty";
  const description = (page?.data.metaDescription as string) ?? "Informace o zpracování osobních údajů na blogu Peťanovi Projekty.";
  const ogImage = page?.data.ogImage as string | undefined;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default function ZasadyPage() {
  const page = getPageContent("zasady");

  return (
    <div style={{ padding: "5rem 2rem 8rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        <span className="font-mono" style={{ color: colors.blue, fontSize: mono.base, letterSpacing: "0.1em", display: "block", marginBottom: "1rem" }}>
          DOCUMENTS // ZÁSADY
        </span>

        <h1 style={{ fontSize: sans.h1, fontWeight: 700, color: colors.textPrimary, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "3rem" }}>
          Zásady ochrany osobních údajů
        </h1>

        {page ? (
          <MarkdownRenderer content={page.content} />
        ) : (
          <p style={{ color: colors.textSecondary }}>Obsah není k dispozici.</p>
        )}

      </div>
    </div>
  );
}
