"use client";

import { useState } from "react";
import { colors, mono } from "@/lib/typography";
import type { Post } from "@/lib/types";
import ArticleCard from "@/components/ArticleCard";

type Category = "All" | Post["category"];
const CATEGORIES: Category[] = ["All", "DIY", "Expedice", "Documents"];

export default function ArticleGrid({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <div className="flex items-center gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="font-mono"
              style={{
                fontSize: mono.lg,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "6px 14px",
                border: "1px solid",
                borderColor: active === cat ? colors.yellow : "rgba(30,58,95,0.7)",
                backgroundColor: active === cat ? colors.yellowMuted : "transparent",
                color: active === cat ? colors.yellow : colors.textSecondary,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="font-mono" style={{ display: "block", color: colors.textMuted, fontSize: mono.xs, letterSpacing: "0.05em", marginTop: "0.4rem", paddingLeft: "2px" }}>
          {filtered.length}{" "}
          {filtered.length === 1 ? "záznam" : filtered.length < 5 ? "záznamy" : "záznamů"}
        </span>
      </div>

      {filtered.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {filtered.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="font-mono" style={{ textAlign: "center", color: colors.textMuted, fontSize: mono.lg, padding: "3rem 0" }}>
          // Žádné záznamy v kategorii {active}
        </div>
      )}
    </div>
  );
}
