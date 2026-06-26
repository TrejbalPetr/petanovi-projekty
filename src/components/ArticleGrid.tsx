"use client";

import { useState } from "react";
import type { Post } from "@/lib/types";
import ArticleCard from "@/components/ArticleCard";

type Category = "All" | Post["category"];

const CATEGORIES: Category[] = ["All", "DIY", "Expedice", "Documents"];

export default function ArticleGrid({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex items-center gap-1" style={{ marginBottom: "2rem" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="font-mono"
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "6px 14px",
              border: "1px solid",
              borderColor: active === cat ? "#FBBF24" : "rgba(30,58,95,0.7)",
              backgroundColor: active === cat ? "rgba(251,191,36,0.08)" : "transparent",
              color: active === cat ? "#FBBF24" : "#C2C2C2",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {cat}
          </button>
        ))}
        <span className="font-mono" style={{ color: "#2D4A6F", fontSize: "0.72rem", marginLeft: "auto" }}>
          {filtered.length}{" "}
          {filtered.length === 1 ? "záznam" : filtered.length < 5 ? "záznamy" : "záznamů"}
        </span>
      </div>

      {/* Grid karet */}
      {filtered.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {filtered.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="font-mono" style={{ textAlign: "center", color: "#2D4A6F", fontSize: "0.75rem", padding: "3rem 0" }}>
          // Žádné záznamy v kategorii {active}
        </div>
      )}
    </div>
  );
}
