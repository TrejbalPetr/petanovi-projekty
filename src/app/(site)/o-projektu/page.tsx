import { getPageContent } from "@/lib/posts";
import { colors, mono, sans } from "@/lib/typography";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import SkillMatrix from "@/components/SkillMatrix";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = getPageContent("o-projektu");
  const title = page?.data.metaTitle ?? "O projektu — Peťanovi Projekty";
  const description = page?.data.metaDescription ?? "Peťanovi Projekty je technický blog o DIY projektech, expedičních zápiscích a vychytávkách.";
  const ogImage = page?.data.ogImage;
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

const SPEC_ROWS = [
  { param: "Jméno", value: "Peťan", note: "České lidové označení pro Petra" },
  { param: "Vzdělání", value: "Elektrotechnik", note: "Vystudováno a otestováno" },
  { param: "Made in", value: "Czech Republic", note: "@1996" },
  { param: "Předchozí build", value: "Hokejista", note: "Dvojnásobný vítěz krajské ligy (v nohách to pořád je)" },
  { param: "Palivo", value: "Espresso", note: "Spotřeba PÚ složitosti projektu" },
  { param: "Velikost bot", value: "44⅓ EU", note: "V lezečkách o -3 → řízená bolest" },
  { param: "Altitude židle", value: "218 m n.m.", note: "Dle nastavení pístu u židle" },
];

export default function OProjektuPage() {
  const page = getPageContent("o-projektu");

  return (
    <div style={{ padding: "5rem 2rem 8rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Tag */}
        <span className="font-mono" style={{ color: colors.blue, fontSize: mono.base, letterSpacing: "0.1em", display: "block", marginBottom: "1rem" }}>
          DOCUMENTS // O PROJEKTU
        </span>

        {/* H1 */}
        <h1 style={{ fontSize: sans.h1, fontWeight: 700, color: colors.textPrimary, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: "0.75rem" }}>
          O projektu
        </h1>
        <p style={{ color: colors.textSecondary, fontSize: sans.lg, lineHeight: 1.6, marginBottom: "3.5rem" }}>
          Kdo za tím stojí, co tu najdeš, a proč to celé vzniklo.
        </p>

        {/* Tech spec table */}
        <section style={{ marginBottom: "3.5rem" }}>
          <h2 className="font-mono" style={{ color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
            — TECH_SPEC // UNIT_01
          </h2>
          <div style={{ border: `1px solid ${colors.border}`, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: sans.sm }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${colors.yellow}`, backgroundColor: "rgba(251,191,36,0.07)" }}>
                  <th className="font-mono" style={{ padding: "0.75rem 1rem", textAlign: "left", color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.08em", textTransform: "uppercase", border: `1px solid ${colors.border}` }}>Parametr</th>
                  <th className="font-mono" style={{ padding: "0.75rem 1rem", textAlign: "left", color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.08em", textTransform: "uppercase", border: `1px solid ${colors.border}` }}>Hodnota</th>
                  <th className="font-mono" style={{ padding: "0.75rem 1rem", textAlign: "left", color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.08em", textTransform: "uppercase", border: `1px solid ${colors.border}` }}>Poznámka</th>
                </tr>
              </thead>
              <tbody>
                {SPEC_ROWS.map((row, i) => (
                  <tr
                    key={row.param}
                    style={{
                      backgroundColor: i % 2 === 0 ? "transparent" : "rgba(17,45,74,0.4)",
                      transition: "background-color 0.15s ease",
                    }}
                    className="spec-row"
                  >
                    <td className="font-mono" style={{ padding: "0.65rem 1rem", color: colors.blue, fontSize: mono.base, border: `1px solid ${colors.border}`, whiteSpace: "nowrap" }}>{row.param}</td>
                    <td style={{ padding: "0.65rem 1rem", color: colors.textPrimary, fontWeight: 600, border: `1px solid ${colors.border}` }}>{row.value}</td>
                    <td style={{ padding: "0.65rem 1rem", color: colors.textSecondary, border: `1px solid ${colors.border}` }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SkillMatrix — interactive element */}
        <SkillMatrix />

        {/* MDX body */}
        {page && (
          <div style={{ marginTop: "3.5rem" }}>
            <MarkdownRenderer content={page.content} />
          </div>
        )}

      </div>
    </div>
  );
}
