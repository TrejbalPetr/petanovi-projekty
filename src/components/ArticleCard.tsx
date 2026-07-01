"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { colors, mono, sans } from "@/lib/typography";
import type { Post } from "@/lib/types";

function CategoryTag({ category }: { category: Post["category"] }) {
  return (
    <span className="font-mono" style={{ color: colors.yellow, backgroundColor: colors.surfaceOverlay, border: `1px solid ${colors.yellowBorder}`, fontSize: mono.md, letterSpacing: "0.1em", padding: "3px 8px", textTransform: "uppercase" }}>
      {category}
    </span>
  );
}

export default function ArticleCard({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(`/blog/${post.slug}`)}
      style={{
        border: `1px solid ${hovered ? colors.yellowHover : colors.border}`,
        backgroundColor: hovered ? colors.surfaceHover : colors.surfaceCard,
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.25s ease, background-color 0.2s ease",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "3/2", borderBottom: `1px solid ${colors.border}`, overflow: "hidden", flexShrink: 0 }}>
        <div style={{ position: "absolute", inset: 0, transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
          {post.coverImage ? (
            <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 100vw, 400px" />
          ) : (
            <div style={{ width: "100%", height: "100%", backgroundColor: colors.surface, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="font-mono" style={{ color: colors.textMuted, fontSize: mono.md }}>IMG_PLACEHOLDER</span>
            </div>
          )}
        </div>
        <div style={{ position: "absolute", inset: 0, background: colors.yellowMuted, opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease", pointerEvents: "none", zIndex: 2 }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: hovered ? 0.6 : 0, transition: "opacity 0.35s ease", pointerEvents: "none", zIndex: 3 }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none">
          <circle cx="50" cy="50" r="11" stroke="white" strokeWidth="0.25" />
          <circle cx="50" cy="50" r="1" fill="white" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.2" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.2" />
        </svg>
        <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", zIndex: 4 }}>
          <CategoryTag category={post.category} />
        </div>
      </div>

      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>

        {/* Datum s ikonou */}
        <div className="font-mono flex items-center gap-1.5" style={{ fontSize: mono.xs, color: colors.textSecondary, letterSpacing: "0.06em" }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.7 }}>
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {formatDate(post.date)}
        </div>

        {/* Nadpis */}
        <h3 style={{ fontSize: sans.h3, fontWeight: 600, color: colors.textPrimary, letterSpacing: "-0.02em", lineHeight: 1.3, margin: 0 }}>
          {post.title}
        </h3>

        {/* Souřadnice pod nadpisem */}
        {post.coordinates && (
          <div className="font-mono" style={{ fontSize: mono.xs, color: colors.blue, letterSpacing: "0.08em" }}>
            {post.coordinates}
          </div>
        )}

        {/* Perex */}
        <p style={{ color: colors.textSecondary, fontSize: sans.sm, lineHeight: 1.6, margin: 0, textAlign: "justify", flex: 1 }}>
          {post.excerpt.slice(0, 140)}…
        </p>

        {/* Spodní řádek: čas čtení + akce */}
        <div className="font-mono flex items-center justify-between" style={{ marginTop: "0.4rem" }}>
          <span className="flex items-center gap-1.5" style={{ fontSize: mono.xs, color: colors.textSecondary, letterSpacing: "0.06em" }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.7 }}>
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {post.readingTime} MIN
          </span>
          <span style={{ color: colors.yellow, fontSize: mono.lg, letterSpacing: "0.08em", transition: "opacity 0.2s ease", opacity: hovered ? 1 : 0.75 }}>
            READ_LOG →
          </span>
        </div>

      </div>
    </article>
  );
}
