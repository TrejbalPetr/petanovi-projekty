"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/types";

interface BlogStats {
  total: number;
  diy: number;
  expedice: number;
  documents: number;
  lastUpdate: string;
}

export default function HeroSection({ post, stats }: { post: Post; stats: BlogStats }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const lineBase: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "5px",
    pointerEvents: "none",
    transition: "width 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
    zIndex: 10,
  };

  return (
    <section style={{ padding: "5rem 2rem 4rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "3rem", alignItems: "start" }}>

          {/* Left — 2/3, plně klikatelné */}
          <div
            style={{ position: "relative", display: "flex", flexDirection: "column", gap: "1.25rem", paddingTop: "1.5rem", cursor: "pointer" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => router.push(`/blog/${post.slug}`)}
          >

            {/* Animované čáry */}
            <div style={{ ...lineBase, width: hovered ? "100%" : "40%", opacity: hovered ? 0 : 1, background: "linear-gradient(to right, #F97316, #FBBF24)" }} />
            <div style={{ ...lineBase, width: hovered ? "100%" : "40%", opacity: hovered ? 1 : 0, background: "linear-gradient(to right, #0796B1, #FBBF24)" }} />

            {/* Tag */}
            <div className="flex items-center gap-3" style={{ position: "relative", zIndex: 2 }}>
              <span className="font-mono" style={{ backgroundColor: "#FBBF24", color: "#0F2B47", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", padding: "3px 8px", textTransform: "uppercase" }}>
                LATEST POST
              </span>
              <span className="font-mono" style={{ color: "#FBBF24", fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                // {post.category}
              </span>
            </div>

            {/* Nadpis */}
            <h1 style={{ position: "relative",fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)", fontWeight: 700, color: "#E3E3E3", letterSpacing: "-0.03em", lineHeight: 1.15, margin: 0 }}>
              {post.title}
            </h1>

            {/* Perex */}
            <p style={{ position: "relative",color: "#C2C2C2", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
              {post.excerpt}
            </p>

            {/* Metadata */}
            <div className="font-mono" style={{ position: "relative",color: "#0796B1", fontSize: "0.65rem", letterSpacing: "0.08em" }}>
              DATUM: {formatDate(post.date)}, ODHAD. ČAS: {post.readingTime} min
              {post.coordinates && <span style={{ marginLeft: "1rem", color: "#C2C2C2" }}>{post.coordinates}</span>}
            </div>

            {/* Obrázek — hover trigger */}
            <div style={{ position: "relative", aspectRatio: "3/2", border: "1px solid #1E3A5F", overflow: "hidden" }}>
              <div style={{
                position: "absolute", inset: 0,
                transform: hovered ? "scale(1.07)" : "scale(1)",
                transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}>
                {post.coverImage ? (
                  <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 1200px) 66vw, 780px" priority />
                ) : (
                  <div style={{ width: "100%", height: "100%", backgroundColor: "#0d2540", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="font-mono" style={{ color: "#2D4A6F", fontSize: "0.65rem" }}>COVER_IMAGE_01</span>
                  </div>
                )}
              </div>
              {/* Label nad scale wrapperem */}
              <div className="font-mono" style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", zIndex: 2, backgroundColor: "rgba(15,43,71,0.85)", border: "1px solid #1E3A5F", color: "#C2C2C2", fontSize: "0.55rem", letterSpacing: "0.1em", padding: "2px 8px", textTransform: "uppercase" }}>
                Img. 01: View_A
              </div>
            </div>

            {/* CTA — vizuální, klik řeší overlay link */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <span className="font-mono" style={{ color: "#FBBF24", fontSize: "0.75rem", letterSpacing: "0.1em", paddingBottom: "2px" }}>
                FULL_ARTICLE —&gt;
              </span>
            </div>
          </div>

          {/* Right — 1/3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

            {/* Tech data tabulka */}
            <div style={{ border: "1px solid #1E3A5F" }}>
              <div className="font-mono" style={{ color: "#FBBF24", fontSize: "0.5rem", letterSpacing: "0.15em", padding: "0.4rem 0.75rem", borderBottom: "1px solid rgba(30,58,95,0.5)", textTransform: "uppercase" }}>
                TECH_DATA // REV 1.0
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>
                  {[
                    ["Date", formatDate(post.date)],
                    ["Scale", "1:1"],
                    ["Status", "PUBLISHED"],
                    ["REF", post.slug.toUpperCase().slice(0, 12)],
                  ].map(([label, value]) => (
                    <tr key={label} style={{ borderBottom: "1px solid rgba(30,58,95,0.4)" }}>
                      <td className="font-mono" style={{ color: "#C2C2C2", fontSize: "0.55rem", letterSpacing: "0.08em", padding: "0.4rem 0.75rem", borderRight: "1px solid rgba(30,58,95,0.5)", width: "40%", textTransform: "uppercase" }}>
                        {label}
                      </td>
                      <td className="font-mono" style={{ color: "#E3E3E3", fontSize: "0.6rem", padding: "0.4rem 0.75rem" }}>
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Blog statistiky */}
            <div style={{ border: "1px solid #1E3A5F" }}>
              <div className="font-mono" style={{ color: "#FBBF24", fontSize: "0.5rem", letterSpacing: "0.15em", padding: "0.4rem 0.75rem", borderBottom: "1px solid rgba(30,58,95,0.5)", textTransform: "uppercase" }}>
                BLOG_STATS // LIVE
              </div>
              <div style={{ padding: "0.6rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                <div className="font-mono flex justify-between" style={{ fontSize: "0.6rem" }}>
                  <span style={{ color: "#C2C2C2", textTransform: "uppercase", letterSpacing: "0.08em" }}>Total</span>
                  <span style={{ color: "#E3E3E3" }}>{stats.total} articles</span>
                </div>
                <div style={{ borderTop: "1px solid rgba(30,58,95,0.4)", paddingTop: "0.35rem", display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  {[
                    ["DIY", stats.diy],
                    ["Expedice", stats.expedice],
                    ["Documents", stats.documents],
                  ].map(([cat, count]) => (
                    <div key={String(cat)} className="font-mono flex justify-between" style={{ fontSize: "0.55rem" }}>
                      <span style={{ color: "#C2C2C2", textTransform: "uppercase", letterSpacing: "0.06em" }}>{cat}</span>
                      <span style={{ color: "#0796B1" }}>{count}</span>
                    </div>
                  ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(30,58,95,0.4)", paddingTop: "0.35rem" }}>
                  <div className="font-mono" style={{ fontSize: "0.5rem", color: "#C2C2C2", letterSpacing: "0.06em" }}>
                    LAST UPDATE: <span style={{ color: "#FBBF24" }}>{formatDate(stats.lastUpdate)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Author card */}
            <div style={{ border: "1px solid #1E3A5F" }}>
              <div className="font-mono" style={{ color: "#FBBF24", fontSize: "0.5rem", letterSpacing: "0.15em", padding: "0.4rem 0.75rem", borderBottom: "1px solid rgba(30,58,95,0.5)", textTransform: "uppercase" }}>
                AUTHOR_CARD // REV 2.0
              </div>
              <div style={{ padding: "0.75rem" }}>
                {/* Foto + jméno */}
                <div className="flex gap-3" style={{ alignItems: "center", marginBottom: "0.75rem" }}>
                  <div style={{ width: "56px", height: "56px", flexShrink: 0, border: "1px solid #1E3A5F", overflow: "hidden", backgroundColor: "#0d2540", position: "relative" }}>
                    <Image src="/images/author.jpg" alt="Petr N." fill style={{ objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Image src="/icons/Petanovi-projekty-LOGO-Ikona-Handmade-Figma.svg" alt="avatar" width={32} height={32} />
                    </div>
                  </div>
                  <div>
                    <div style={{ color: "#E3E3E3", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "-0.01em" }}>Petr N.</div>
                    <div className="font-mono" style={{ color: "#0796B1", fontSize: "0.5rem", letterSpacing: "0.08em" }}>REF: CZ-2026-001</div>
                  </div>
                </div>
                {/* Technické údaje */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                  {[
                    ["Výška / Váha", "182 cm / 78 kg"],
                    ["Věk", "26 let"],
                    ["Lokace", "50°05′N 14°28′E"],
                    ["Spec.", "DIY · Outdoors · 3D Tisk"],
                    ["Kafe / den", "≥ 3 ☕"],
                    ["Výška terénu", "2 000 m+"],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="font-mono flex justify-between gap-2" style={{ fontSize: "0.52rem" }}>
                      <span style={{ color: "#C2C2C2", textTransform: "uppercase", letterSpacing: "0.06em", flexShrink: 0 }}>{label}</span>
                      <span style={{ color: "#E3E3E3", textAlign: "right" }}>{value}</span>
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
