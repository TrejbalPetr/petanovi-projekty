"use client";

import { useEffect, useState } from "react";
import { slugify } from "@/lib/utils";
import { colors, mono } from "@/lib/typography";

type Heading = { id: string; text: string; level: number };

function extractHeadings(content: string): Heading[] {
  return content
    .split("\n")
    .filter((line) => /^#{2}\s/.test(line))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length ?? 2;
      const text = line.replace(/^#+\s*/, "");
      return { id: slugify(text), text, level };
    });
}

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const headings = extractHeadings(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); }); },
      { rootMargin: "0px 0px -70% 0px" }
    );
    headings.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav>
      <div className="font-mono" style={{ color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: `1px solid ${colors.borderMedium}` }}>
        LEGENDA — OBSAH
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="font-mono"
              style={{
                display: "block",
                padding: "0.3rem 0",
                paddingLeft: "0.875rem",
                color: activeId === h.id ? colors.yellow : colors.textSecondary,
                textDecoration: "none",
                fontSize: mono.md,
                lineHeight: 1.5,
                transition: "color 0.2s ease",
                borderLeft: activeId === h.id ? `2px solid ${colors.yellow}` : "2px solid transparent",
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
