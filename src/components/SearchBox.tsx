"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { formatDate } from "@/lib/utils";
import { colors, mono, sans } from "@/lib/typography";

type SearchPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: number;
  content: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

const CATEGORY_COLORS: Record<string, string> = {
  DIY: colors.orange,
  Expedice: colors.blue,
  Documents: colors.yellow,
};

function highlight(text: string, query: string, maxLen = 160): string {
  const trimmed = text.length > maxLen ? text.slice(0, maxLen) + "…" : text;
  if (!query) return trimmed;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return trimmed.replace(new RegExp(`(${escaped})`, "gi"), "**$1**");
}

function Snippet({ text, query }: { text: string; query: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark
            key={i}
            style={{
              background: "rgba(251, 191, 36, 0.25)",
              color: colors.yellow,
              borderRadius: "2px",
              padding: "0 2px",
            }}
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

export default function SearchBox({ open, onClose }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchPost[]>([]);
  const [results, setResults] = useState<SearchPost[]>([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fuseRef = useRef<Fuse<SearchPost> | null>(null);

  // Načti index při prvním otevření
  useEffect(() => {
    if (!open || index.length > 0) return;
    setLoading(true);
    fetch("/api/search")
      .then((r) => r.json())
      .then((data: SearchPost[]) => {
        setIndex(data);
        fuseRef.current = new Fuse(data, {
          keys: [
            { name: "title", weight: 1.0 },
            { name: "excerpt", weight: 0.7 },
            { name: "content", weight: 0.5 },
            { name: "category", weight: 0.2 },
          ],
          threshold: 0.35,
          includeScore: true,
          minMatchCharLength: 2,
          ignoreLocation: true,
        });
      })
      .finally(() => setLoading(false));
  }, [open, index.length]);

  // Focus input při otevření
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setResults([]);
      setSelected(0);
    }
  }, [open]);

  // Vyhledávání
  useEffect(() => {
    if (!fuseRef.current || !query.trim()) {
      setResults([]);
      setSelected(0);
      return;
    }
    const raw = fuseRef.current.search(query.trim());
    setResults(raw.slice(0, 8).map((r) => r.item));
    setSelected(0);
  }, [query]);

  const navigate = useCallback(
    (slug: string) => {
      onClose();
      router.push(`/blog/${slug}`);
    },
    [onClose, router]
  );

  // Klávesnice
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && results[selected]) {
        navigate(results[selected].slug);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, selected, navigate, onClose]);

  if (!open) return null;

  const showEmpty = query.trim().length >= 2 && !loading && results.length === 0;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        backgroundColor: "rgba(9, 20, 38, 0.85)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px 1.5rem 2rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "680px",
          display: "flex",
          flexDirection: "column",
          gap: "0",
        }}
      >
        {/* Search input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(13, 37, 64, 0.97)",
            border: `1px solid ${query ? colors.yellow : colors.border}`,
            padding: "14px 18px",
            transition: "border-color 0.15s ease",
          }}
        >
          <svg
            width="18"
            height="18"
            fill="none"
            stroke={colors.textMuted}
            viewBox="0 0 24 24"
            style={{ flexShrink: 0 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hledat články…"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: colors.textPrimary,
              fontSize: sans.base,
              fontFamily: "inherit",
            }}
          />
          {loading && (
            <span
              className="font-mono"
              style={{ color: colors.textMuted, fontSize: mono.xs, letterSpacing: "0.08em" }}
            >
              LOADING…
            </span>
          )}
          <button
            onClick={onClose}
            className="font-mono"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: colors.textMuted,
              fontSize: mono.xs,
              letterSpacing: "0.08em",
              padding: "2px 6px",
              flexShrink: 0,
            }}
          >
            ESC
          </button>
        </div>

        {/* Výsledky */}
        {results.length > 0 && (
          <div
            style={{
              background: "rgba(13, 37, 64, 0.97)",
              borderLeft: `1px solid ${colors.border}`,
              borderRight: `1px solid ${colors.border}`,
              borderBottom: `1px solid ${colors.border}`,
              maxHeight: "60vh",
              overflowY: "auto",
            }}
          >
            {results.map((post, i) => {
              const catColor = CATEGORY_COLORS[post.category] ?? colors.yellow;
              const isActive = i === selected;
              const snippet = highlight(post.excerpt || post.content, query);
              return (
                <button
                  key={post.slug}
                  onClick={() => navigate(post.slug)}
                  onMouseEnter={() => setSelected(i)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: isActive ? "rgba(251, 191, 36, 0.06)" : "transparent",
                    borderBottom: `1px solid ${colors.borderSubtle}`,
                    padding: "14px 18px",
                    cursor: "pointer",
                    transition: "background 0.1s ease",
                    borderLeft: isActive ? `2px solid ${colors.yellow}` : "2px solid transparent",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: mono.xs,
                        letterSpacing: "0.1em",
                        color: catColor,
                        textTransform: "uppercase",
                      }}
                    >
                      {post.category}
                    </span>
                    <span
                      className="font-mono"
                      style={{ fontSize: mono.xs, color: colors.textMuted, letterSpacing: "0.05em" }}
                    >
                      {formatDate(post.date)}
                    </span>
                    <span
                      className="font-mono"
                      style={{ fontSize: mono.xs, color: colors.textMuted, letterSpacing: "0.05em" }}
                    >
                      {post.readingTime} min
                    </span>
                  </div>
                  <div
                    style={{
                      color: isActive ? colors.textPrimary : colors.textSecondary,
                      fontSize: sans.sm,
                      fontWeight: 600,
                      marginBottom: "4px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {post.title}
                  </div>
                  <div
                    style={{
                      color: colors.textMuted,
                      fontSize: sans.xs,
                      lineHeight: 1.5,
                    }}
                  >
                    <Snippet text={snippet} query={query} />
                  </div>
                </button>
              );
            })}
            <div
              className="font-mono"
              style={{
                padding: "8px 18px",
                fontSize: mono.xs,
                color: colors.textMuted,
                letterSpacing: "0.06em",
                borderTop: `1px solid ${colors.borderSubtle}`,
              }}
            >
              {results.length} výsledk{results.length === 1 ? "" : results.length < 5 ? "y" : "ů"} // ↑↓ navigace // ENTER otevřít
            </div>
          </div>
        )}

        {/* Prázdný stav */}
        {showEmpty && (
          <div
            style={{
              background: "rgba(13, 37, 64, 0.97)",
              border: `1px solid ${colors.border}`,
              borderTop: "none",
              padding: "24px 18px",
              textAlign: "center",
            }}
          >
            <span
              className="font-mono"
              style={{ color: colors.textMuted, fontSize: mono.xs, letterSpacing: "0.08em" }}
            >
              // NO_RESULTS FOR "{query.toUpperCase()}"
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
