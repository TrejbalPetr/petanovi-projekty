"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { colors, mono, sans } from "@/lib/typography";
import type { Post } from "@/lib/types";
import type { HomepageSettings } from "@/lib/posts";

interface BlogStats { total: number; diy: number; expedice: number; documents: number; lastUpdate: string; }

function useLiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function HeroSection({ post, stats, settings }: { post: Post; stats: BlogStats; settings: HomepageSettings }) {
  const [hovered, setHovered] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const [focusVisible, setFocusVisible] = useState(true);
  const router = useRouter();
  const now = useLiveClock();

  useEffect(() => {
    const words = settings.heroBodyFocusWords;
    if (words.length <= 1) return;
    const id = setInterval(() => {
      setFocusVisible(false);
      setTimeout(() => {
        setFocusIndex((i) => (i + 1) % words.length);
        setFocusVisible(true);
      }, 300);
    }, 2000);
    return () => clearInterval(id);
  }, [settings.heroBodyFocusWords.length]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const timeStr = now
    ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    : "00:00:00";
  const dateStr = now
    ? `${pad(now.getDate())}.${pad(now.getMonth() + 1)}.${now.getFullYear()}`
    : "";

  const lineBase: React.CSSProperties = {
    position: "absolute", top: 0, left: 0, height: "5px", pointerEvents: "none",
    transition: "width 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease", zIndex: 10,
  };

  const counters = [
    { value: pad(stats.diy), label: "DIY BUILD" },
    { value: pad(stats.expedice), label: "EXPEDICE" },
    { value: pad(stats.documents), label: "DOCS" },
  ];

  return (
    <section className="hero-section" style={{ paddingBottom: "2rem" }}>

      {/* ── Status bar — full width, header-style ── */}
      <div
        style={{
          padding: "0 2rem",
          marginBottom: "clamp(2rem, 4vw, 3.5rem)",
          borderBottom: `1px solid ${colors.borderSubtle}`,
          backgroundColor: "rgba(12, 28, 52, 0.55)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div className="font-mono" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0.25rem 0", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: mono.xs, letterSpacing: "0.12em", color: colors.textSecondary }}>
          <span className="hidden md:inline">FIELD_STATION // HOME</span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              {/* inline style ensures yellow regardless of CSS cache */}
              <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", backgroundColor: colors.yellow, flexShrink: 0, animation: "live-blink 1.5s ease-in-out infinite" }} />
              <span style={{ color: colors.blue }}>LIVE</span>
            </span>
            <span style={{ color: colors.borderStrong }}>|</span>
            <span style={{ color: colors.textPrimary }}>{timeStr}</span>
            <span style={{ color: colors.borderStrong }}>|</span>
            <span style={{ color: colors.textPrimary }}>{dateStr}</span>
            <span className="hidden md:inline" style={{ color: colors.borderStrong }}>|</span>
            <span className="hidden md:inline" style={{ color: colors.blue }}>{settings.gpsCoordinates}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "0 2rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* ── Grid: editorial left | LATEST POST right (50/50) ── */}
        <div className="grid md:grid-cols-2" style={{ gap: "3rem", alignItems: "start" }}>

          {/* ── LEFT: Editorial ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            <span className="font-mono" style={{ color: colors.textSecondary, fontSize: mono.xs, letterSpacing: "0.15em" }}>
              // {settings.heroLabel}
            </span>

            <h1 style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)", fontWeight: 700, color: colors.textPrimary, letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
              {settings.heroHeadline}{" "}
              <span style={{ color: colors.yellow }}>{settings.heroHeadlineAccent}</span>
            </h1>

            <div className="font-mono" style={{ fontSize: mono.xs, letterSpacing: "0.15em", color: colors.textSecondary }}>
              BODY ZÁJMU:{" "}
              <span style={{ color: colors.yellow, opacity: focusVisible ? 1 : 0, transition: "opacity 0.25s ease", display: "inline-block" }}>
                {settings.heroBodyFocusWords[focusIndex]}_
              </span>
            </div>

            <p className="hidden md:block" style={{ color: colors.textSecondary, fontSize: sans.base, lineHeight: 1.7, margin: 0, whiteSpace: "pre-line" }}>
              {settings.heroDescription}
            </p>

            {/* Counters */}
            <div className="hidden md:grid md:grid-cols-3" style={{ border: `1px solid ${colors.border}` }}>
              {counters.map(({ value, label }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-3 md:block"
                  style={{
                    padding: "0.75rem 1rem",
                    borderRight: i < counters.length - 1 ? `1px solid ${colors.border}` : "none",
                    borderBottom: i < counters.length - 1 ? `1px solid ${colors.border}` : "none",
                  }}
                >
                  <div className="font-mono" style={{ color: colors.yellow, fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>
                    {value}
                  </div>
                  <div className="font-mono hidden md:block" style={{ color: colors.textSecondary, fontSize: mono.xs, letterSpacing: "0.1em", marginTop: "0.3rem", textTransform: "uppercase" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <div className="hidden md:block">
                <Link href={`/blog/${post.slug}`} className="btn-primary">
                  › NEJNOVĚJŠÍ LOG
                </Link>
              </div>
              <Link href="/blog" className="btn-secondary">
                ARCHIV →
              </Link>
            </div>

          </div>

          {/* ── RIGHT: LATEST POST ── */}
          <div
            className="article-card"
            style={{ position: "relative", display: "flex", flexDirection: "column", gap: "0.85rem", padding: "1.25rem", cursor: "pointer", border: `1px solid ${colors.border}`, backgroundColor: colors.surfaceCard }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => router.push(`/blog/${post.slug}`)}
          >
            <div style={{ ...lineBase, width: hovered ? "100%" : "40%", opacity: hovered ? 0 : 1, background: `linear-gradient(to right, ${colors.orange}, ${colors.yellow})` }} />
            <div style={{ ...lineBase, width: hovered ? "100%" : "40%", opacity: hovered ? 1 : 0, background: `linear-gradient(to right, ${colors.blue}, ${colors.yellow})` }} />

            {/* Header row: badge + category + img label */}
            <div className="flex items-center justify-between" style={{ position: "relative", zIndex: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span className="font-mono" style={{ backgroundColor: colors.yellow, color: colors.bg, fontSize: mono.sm, fontWeight: 700, letterSpacing: "0.12em", padding: "3px 8px", textTransform: "uppercase" }}>
                  LATEST POST
                </span>
                <span className="font-mono" style={{ color: colors.blue, fontSize: mono.xs, letterSpacing: "0.1em" }}>
                  // {post.category.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Cover image */}
            <div style={{ position: "relative", aspectRatio: "3/2", border: `1px solid ${colors.border}`, overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
                {post.coverImage ? (
                  <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} sizes="500px" priority />
                ) : (
                  <div style={{ width: "100%", height: "100%", backgroundColor: colors.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="font-mono" style={{ color: colors.textMuted, fontSize: mono.xs }}>COVER_IMAGE_01</span>
                  </div>
                )}
              </div>
              <div className="font-mono" style={{ position: "absolute", bottom: "0.5rem", left: "0.5rem", zIndex: 2, backgroundColor: colors.surfaceOverlay, border: `1px solid ${colors.border}`, color: colors.textSecondary, fontSize: mono.xs, letterSpacing: "0.1em", padding: "2px 6px", textTransform: "uppercase" }}>
                Img. 01
              </div>
            </div>

            {/* Datum s ikonou */}
            <div className="font-mono flex items-center gap-1.5" style={{ position: "relative", zIndex: 2, fontSize: mono.xs, color: colors.textSecondary, letterSpacing: "0.06em" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.7 }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {formatDate(post.date)}
            </div>

            {/* Title */}
            <h2 style={{ position: "relative", zIndex: 2, fontSize: sans.lg, fontWeight: 700, color: colors.textPrimary, letterSpacing: "-0.02em", lineHeight: 1.2, margin: 0 }}>
              {post.title}
            </h2>

            {/* Souřadnice pod nadpisem */}
            {(post.coordinates ?? "N 50°05′ E 14°28′") && (
              <div className="font-mono" style={{ position: "relative", zIndex: 2, fontSize: mono.xs, color: colors.blue, letterSpacing: "0.08em" }}>
                {post.coordinates ?? "N 50°05′ E 14°28′"}
              </div>
            )}

            {/* Excerpt */}
            <p style={{ position: "relative", zIndex: 2, color: colors.textSecondary, fontSize: sans.sm, lineHeight: 1.6, margin: 0 }}>
              {post.excerpt}
            </p>

            {/* Footer: čas čtení + akce */}
            <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.75rem", borderTop: `1px solid ${colors.borderSubtle}`, marginTop: "auto" }}>
              <div className="font-mono flex items-center gap-1.5" style={{ fontSize: mono.xs, color: colors.textSecondary, letterSpacing: "0.06em" }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.7 }}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {post.readingTime} MIN
              </div>
              <span className="font-mono" style={{ color: colors.yellow, fontSize: mono.sm, letterSpacing: "0.1em" }}>
                FULL_ARTICLE →
              </span>
            </div>
          </div>

        </div>
      </div>
      </div>
    </section>
  );
}
