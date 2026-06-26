"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/types";

export default function ArticleRow({ post }: { post: Post }) {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(`/blog/${post.slug}`)}
      style={{
        display: "flex",
        height: "200px",
        border: `1px solid ${hovered ? "rgba(251,191,36,0.65)" : "#1E3A5F"}`,
        backgroundColor: hovered ? "rgba(13,37,64,0.75)" : "rgba(13,37,64,0.4)",
        cursor: "pointer",
        overflow: "hidden",
        transition: "border-color 0.25s ease, background-color 0.2s ease",
      }}
    >
      {/* Obrázek 300×200px = 3:2 */}
      <div style={{ position: "relative", width: "300px", flexShrink: 0, borderRight: `1px solid ${hovered ? "rgba(251,191,36,0.3)" : "#1E3A5F"}`, overflow: "hidden", backgroundColor: "#0d2540", transition: "border-color 0.25s ease" }}>
        <div style={{ position: "absolute", inset: 0, transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
          {post.coverImage ? (
            <Image src={post.coverImage} alt={post.title} fill style={{ objectFit: "cover" }} sizes="300px" />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="font-mono" style={{ color: "#2D4A6F", fontSize: "0.68rem" }}>IMG</span>
            </div>
          )}
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(251,191,36,0.07)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease", pointerEvents: "none", zIndex: 2 }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: hovered ? 0.6 : 0, transition: "opacity 0.35s ease", pointerEvents: "none", zIndex: 3 }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none">
          <circle cx="50" cy="50" r="11" stroke="white" strokeWidth="0.25" />
          <circle cx="50" cy="50" r="1" fill="white" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.2" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.2" />
        </svg>
        <div style={{ position: "absolute", top: "0.6rem", left: "0.6rem", zIndex: 4 }}>
          <span className="font-mono" style={{ color: "#FBBF24", backgroundColor: "rgba(13,37,64,0.85)", border: "1px solid rgba(251,191,36,0.5)", fontSize: "0.68rem", letterSpacing: "0.1em", padding: "2px 8px", textTransform: "uppercase" }}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Textový obsah */}
      <div style={{ padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, overflow: "hidden" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {post.coordinates && (
            <div className="font-mono" style={{ fontSize: "0.72rem", color: "#0796B1" }}>
              {post.coordinates}
            </div>
          )}
          <h2 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#E3E3E3", letterSpacing: "-0.025em", lineHeight: 1.3, margin: 0 }}>
            {post.title}
          </h2>
          <div className="font-mono flex items-center gap-3" style={{ fontSize: "0.72rem", color: "#0796B1" }}>
            <span>{formatDate(post.date)}</span>
            <span style={{ color: "#1E3A5F" }}>—</span>
            <span>{post.readingTime} min čtení</span>
          </div>
          <p style={{ color: "#C2C2C2", fontSize: "0.875rem", lineHeight: 1.6, margin: 0, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
            {post.excerpt}
          </p>
        </div>
        <div className="font-mono" style={{ fontSize: "0.75rem", color: hovered ? "#FBBF24" : "#C2C2C2", transition: "color 0.2s ease", letterSpacing: "0.06em" }}>
          Read_log —&gt;
        </div>
      </div>
    </article>
  );
}
