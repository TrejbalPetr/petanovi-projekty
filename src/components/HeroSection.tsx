"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { colors, mono, sans } from "@/lib/typography";
import type { Post } from "@/lib/types";

interface BlogStats { total: number; diy: number; expedice: number; documents: number; lastUpdate: string; }

export default function HeroSection({ post, stats }: { post: Post; stats: BlogStats }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const lineBase: React.CSSProperties = {
    position: "absolute", top: 0, left: 0, height: "5px", pointerEvents: "none",
    transition: "width 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease", zIndex: 10,
  };

  const panelHeader = { color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.15em", padding: "0.4rem 0.75rem", borderBottom: `1px solid ${colors.borderMedium}`, textTransform: "uppercase" as const };

  return (
    <section className="hero-section" style={{ padding: "clamp(3rem, 6vw, 5rem) 1.5rem 4rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Grid: 1 col mobile → 2fr 1fr desktop */}
        <div className="grid md:grid-cols-[2fr_1fr]" style={{ gap: "3rem", alignItems: "start" }}>

          {/* ── LATEST POST ── */}
          <div
            className="article-card"
            style={{ position: "relative", display: "flex", flexDirection: "column", gap: "1.25rem", padding: "1.5rem", paddingTop: "1.5rem", cursor: "pointer", border: `1px solid ${colors.border}`, backgroundColor: colors.surfaceCard }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => router.push(`/blog/${post.slug}`)}
          >
            <div style={{ ...lineBase, width: hovered ? "100%" : "40%", opacity: hovered ? 0 : 1, background: `linear-gradient(to right, ${colors.orange}, ${colors.yellow})` }} />
            <div style={{ ...lineBase, width: hovered ? "100%" : "40%", opacity: hovered ? 1 : 0, background: `linear-gradient(to right, ${colors.blue}, ${colors.yellow})` }} />

            <div className="flex items-center gap-3" style={{ position: "relative", zIndex: 2 }}>
              <span className="font-mono" style={{ backgroundColor: colors.yellow, color: colors.bg, fontSize: mono.base, fontWeight: 700, letterSpacing: "0.12em", padding: "3px 8px", textTransform: "uppercase" }}>
                LATEST POST
              </span>
              <span className="font-mono" style={{ color: colors.yellow, fontSize: mono.base, letterSpacing: "0.1em" }}>
                // {post.category}
              </span>
            </div>

            <h1 style={{ position: "relative", fontSize: sans.hero, fontWeight: 700, color: colors.textPrimary, letterSpacing: "-0.03em", lineHeight: 1.15, margin: 0 }}>
              {post.title}
            </h1>

            <p style={{ position: "relative", color: colors.textSecondary, fontSize: sans.sm, lineHeight: 1.7, margin: 0 }}>
              {post.excerpt}
            </p>

            <div className="font-mono" style={{ position: "relative", color: colors.blue, fontSize: mono.md, letterSpacing: "0.08em", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <span>DATUM: {formatDate(post.date)}</span>
              <span>ODHAD. ČAS: {post.readingTime} min</span>
              {post.coordinates && <span style={{ color: colors.textSecondary }}>{post.coordinates}</span>}
            </div>

            <div style={{ position: "relative", aspectRatio: "3/2", border: `1px solid ${colors.border}`, overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
                {post.coverImage ? (
                  <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 800px) 100vw, 66vw" priority />
                ) : (
                  <div style={{ width: "100%", height: "100%", backgroundColor: colors.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="font-mono" style={{ color: colors.textMuted, fontSize: mono.base }}>COVER_IMAGE_01</span>
                  </div>
                )}
              </div>
              <div className="font-mono" style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", zIndex: 2, backgroundColor: "rgba(15,43,71,0.85)", border: `1px solid ${colors.border}`, color: colors.textSecondary, fontSize: mono.sm, letterSpacing: "0.1em", padding: "2px 8px", textTransform: "uppercase" }}>
                Img. 01: View_A
              </div>
            </div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <span className="font-mono" style={{ color: colors.yellow, fontSize: mono.lg, letterSpacing: "0.1em" }}>
                FULL_ARTICLE —&gt;
              </span>
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* TECH_DATA — pouze desktop */}
            <div className="hidden md:block" style={{ border: `1px solid ${colors.border}` }}>
              <div className="font-mono" style={panelHeader}>TECH_DATA // REV 1.0</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {[["Date", formatDate(post.date)], ["Scale", "1:1"], ["Status", "PUBLISHED"], ["REF", post.slug.toUpperCase().slice(0, 12)]].map(([label, value]) => (
                    <tr key={label} style={{ borderBottom: `1px solid ${colors.borderSubtle}` }}>
                      <td className="font-mono" style={{ color: colors.textSecondary, fontSize: mono.sm, letterSpacing: "0.08em", padding: "0.4rem 0.75rem", borderRight: `1px solid ${colors.borderMedium}`, width: "40%", textTransform: "uppercase" }}>{label}</td>
                      <td className="font-mono" style={{ color: colors.textPrimary, fontSize: mono.base, padding: "0.4rem 0.75rem" }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BLOG_STATS — vždy viditelné, na mobilu kompaktní */}
            <div style={{ border: `1px solid ${colors.border}` }}>
              <div className="font-mono" style={panelHeader}>BLOG_STATS // LIVE</div>
              <div style={{ padding: "0.6rem 0.75rem" }}>

                {/* Mobile: vodorovný layout */}
                <div className="flex md:hidden justify-between" style={{ gap: "1rem" }}>
                  <div className="font-mono" style={{ fontSize: mono.sm }}>
                    <span style={{ color: colors.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em" }}>Celkem </span>
                    <span style={{ color: colors.textPrimary, fontWeight: 600 }}>{stats.total}</span>
                  </div>
                  {[["DIY", stats.diy], ["Expedice", stats.expedice], ["Docs", stats.documents]].map(([cat, count]) => (
                    <div key={String(cat)} className="font-mono" style={{ fontSize: mono.sm }}>
                      <span style={{ color: colors.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em" }}>{cat} </span>
                      <span style={{ color: colors.blue }}>{count}</span>
                    </div>
                  ))}
                </div>

                {/* Desktop: původní svislý layout */}
                <div className="hidden md:flex flex-col" style={{ gap: "0.35rem" }}>
                  <div className="font-mono flex justify-between" style={{ fontSize: mono.base }}>
                    <span style={{ color: colors.textSecondary, textTransform: "uppercase", letterSpacing: "0.08em" }}>Total</span>
                    <span style={{ color: colors.textPrimary }}>{stats.total} articles</span>
                  </div>
                  <div style={{ borderTop: `1px solid ${colors.borderSubtle}`, paddingTop: "0.35rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                    {[["DIY", stats.diy], ["Expedice", stats.expedice], ["Documents", stats.documents]].map(([cat, count]) => (
                      <div key={String(cat)} className="font-mono flex justify-between" style={{ fontSize: mono.sm }}>
                        <span style={{ color: colors.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em" }}>{cat}</span>
                        <span style={{ color: colors.blue }}>{count}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: `1px solid ${colors.borderSubtle}`, paddingTop: "0.35rem" }}>
                    <div className="font-mono" style={{ fontSize: mono.xs, color: colors.textSecondary, letterSpacing: "0.06em" }}>
                      LAST UPDATE: <span style={{ color: colors.yellow }}>{formatDate(stats.lastUpdate)}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* AUTHOR_CARD — pouze desktop */}
            <div className="hidden md:block" style={{ border: `1px solid ${colors.border}` }}>
              <div className="font-mono" style={panelHeader}>AUTHOR_CARD // REV 2.0</div>
              <div style={{ padding: "0.75rem" }}>
                <div className="flex gap-3" style={{ alignItems: "center", marginBottom: "0.75rem" }}>
                  <div style={{ width: "56px", height: "56px", flexShrink: 0, border: `1px solid ${colors.border}`, overflow: "hidden", backgroundColor: colors.surface, position: "relative" }}>
                    <Image src="/images/author.jpg" alt="Petr N." fill style={{ objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Image src="/icons/Petanovi-projekty-LOGO-Ikona-Handmade-Figma.svg" alt="avatar" width={32} height={32} />
                    </div>
                  </div>
                  <div>
                    <div style={{ color: colors.textPrimary, fontSize: sans.sm, fontWeight: 600, letterSpacing: "-0.01em" }}>Petr N.</div>
                    <div className="font-mono" style={{ color: colors.blue, fontSize: mono.xs, letterSpacing: "0.08em" }}>REF: CZ-2026-001</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  {[["Výška / Váha", "182 cm / 78 kg"], ["Věk", "26 let"], ["Lokace", "50°05′N 14°28′E"], ["Spec.", "DIY · Outdoors · 3D Tisk"], ["Kafe / den", "≥ 3 ☕"], ["Výška terénu", "2 000 m+"]].map(([label, value]) => (
                    <div key={String(label)} className="font-mono flex justify-between gap-2" style={{ fontSize: mono.sm }}>
                      <span style={{ color: colors.textSecondary, textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0 }}>{label}</span>
                      <span style={{ color: colors.textPrimary, textAlign: "right" }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
