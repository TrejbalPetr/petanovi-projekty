"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type Category = "All" | Post["category"];

const CATEGORIES: Category[] = ["All", "DIY", "Expedice", "Documents"];

function CategoryTag({ category }: { category: Post["category"] }) {
  const colors: Record<Post["category"], string> = {
    DIY: "#FBBF24",
    Expedice: "#0796B1",
    Documents: "#C2C2C2",
  };
  return (
    <span
      className="font-mono"
      style={{
        color: colors[category],
        border: `1px solid ${colors[category]}`,
        fontSize: "0.6rem",
        letterSpacing: "0.12em",
        padding: "2px 8px",
        textTransform: "uppercase",
      }}
    >
      {category}
    </span>
  );
}

export default function ArticleFilter({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter tabs */}
      <div
        className="flex items-center gap-1"
        style={{ marginBottom: "3rem" }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="font-mono"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "6px 14px",
              border: "1px solid",
              borderColor:
                active === cat ? "#FBBF24" : "rgba(30,58,95,0.7)",
              backgroundColor:
                active === cat ? "rgba(251,191,36,0.08)" : "transparent",
              color: active === cat ? "#FBBF24" : "#C2C2C2",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {cat}
          </button>
        ))}
        <span
          className="font-mono"
          style={{
            color: "#2D4A6F",
            fontSize: "0.6rem",
            marginLeft: "auto",
          }}
        >
          {filtered.length}{" "}
          {filtered.length === 1
            ? "záznam"
            : filtered.length < 5
            ? "záznamy"
            : "záznamů"}
        </span>
      </div>

      {/* Article list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {filtered.map((post) => (
          <article
            key={post.slug}
            className="card-hover"
            style={{
              display: "grid",
              gridTemplateColumns: "240px 1fr",
              gap: "0",
              border: "1px solid #1E3A5F",
              backgroundColor: "rgba(13, 37, 64, 0.4)",
            }}
          >
            {/* Image */}
            <div
              style={{
                backgroundColor: "#0d2540",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "180px",
                borderRight: "1px solid #1E3A5F",
              }}
            >
              <span
                className="font-mono"
                style={{ color: "#2D4A6F", fontSize: "0.55rem" }}
              >
                IMG
              </span>
            </div>

            {/* Content */}
            <div style={{ padding: "1.5rem" }}>
              <div
                className="flex items-center gap-3"
                style={{ marginBottom: "0.75rem" }}
              >
                <CategoryTag category={post.category} />
                {post.coordinates && (
                  <span
                    className="font-mono"
                    style={{ color: "#0796B1", fontSize: "0.6rem" }}
                  >
                    {post.coordinates}
                  </span>
                )}
              </div>

              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "#E3E3E3",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.3,
                  marginBottom: "0.5rem",
                }}
              >
                {post.title}
              </h2>

              <div
                className="font-mono flex gap-3"
                style={{
                  color: "#0796B1",
                  fontSize: "0.6rem",
                  marginBottom: "0.75rem",
                }}
              >
                <span>{formatDate(post.date)}</span>
                <span style={{ color: "#1E3A5F" }}>—</span>
                <span>{post.readingTime} min čtení</span>
              </div>

              <p
                style={{
                  color: "#C2C2C2",
                  fontSize: "0.85rem",
                  lineHeight: 1.65,
                  marginBottom: "1.25rem",
                }}
              >
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="font-mono"
                style={{
                  color: "#FBBF24",
                  textDecoration: "none",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                }}
              >
                Read_log —&gt;
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div
          className="font-mono"
          style={{
            textAlign: "center",
            color: "#2D4A6F",
            fontSize: "0.75rem",
            padding: "4rem 0",
          }}
        >
          // Žádné záznamy v kategorii {active}
        </div>
      )}
    </div>
  );
}
