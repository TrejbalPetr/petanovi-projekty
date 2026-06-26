"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { colors, mono, sans } from "@/lib/typography";
import type { Post } from "@/lib/types";

function CategoryTag({ category }: { category: Post["category"] }) {
  return (
    <span className="font-mono" style={{ color: colors.yellow, backgroundColor: colors.surfaceOverlay, border: `1px solid ${colors.yellowBorder}`, fontSize: mono.md, letterSpacing: "0.1em", padding: "3px 8px", textTransform: "uppercase" }}>
      {category}
    </span>
  );
}

function shortDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2,"0")}.${String(d.getMonth()+1).padStart(2,"0")}.${String(d.getFullYear()).slice(2)}`;
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

      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
        <div className="font-mono flex items-center justify-between" style={{ fontSize: mono.base }}>
          <span style={{ color: colors.yellow }}>DATUM: {shortDate(post.date)}</span>
          {post.coordinates && <span style={{ color: colors.blue }}>{post.coordinates}</span>}
        </div>
        <h3 style={{ fontSize: sans.h3, fontWeight: 600, color: colors.textPrimary, letterSpacing: "-0.02em", lineHeight: 1.3, margin: 0 }}>
          {post.title}
        </h3>
        <p style={{ color: colors.textSecondary, fontSize: sans.sm, lineHeight: 1.6, margin: 0, textAlign: "justify", flex: 1 }}>
          {post.excerpt.slice(0, 140)}…
        </p>
        <div className="font-mono flex items-center justify-between" style={{ marginTop: "0.4rem", fontSize: mono.base }}>
          <span style={{ color: colors.blue }}>ČAS: {post.readingTime} min</span>
          <span style={{ color: hovered ? colors.yellow : colors.textSecondary, transition: "color 0.2s ease", letterSpacing: "0.06em" }}>
            Read_log —&gt;
          </span>
        </div>
      </div>
    </article>
  );
}
