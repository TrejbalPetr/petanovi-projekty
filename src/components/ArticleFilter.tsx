"use client";

import { useState } from "react";
import { colors, mono, sans } from "@/lib/typography";
import type { Post } from "@/lib/types";
import ArticleRow from "@/components/ArticleRow";

type Category = "All" | Post["category"];
const CATEGORIES: Category[] = ["All", "DIY", "Expedice", "Documents"];

export default function ArticleFilter({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<Category>("All");
  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex items-center gap-1" style={{ marginBottom: "3rem" }}>
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
        <span className="font-mono" style={{ color: colors.textMuted, fontSize: mono.md, marginLeft: "auto" }}>
          {filtered.length}{" "}
          {filtered.length === 1 ? "záznam" : filtered.length < 5 ? "záznamy" : "záznamů"}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {filtered.map((post) => (
          <ArticleRow key={post.slug} post={post} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="font-mono" style={{ textAlign: "center", color: colors.textMuted, fontSize: mono.lg, padding: "4rem 0" }}>
          // Žádné záznamy v kategorii {active}
        </div>
      )}
    </div>
  );
}
