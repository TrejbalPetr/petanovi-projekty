"use client";

import { useEffect, useState } from "react";

type Heading = {
  id: string;
  text: string;
  level: number;
};

function extractHeadings(content: string): Heading[] {
  const lines = content.split("\n");
  return lines
    .filter((line) => line.startsWith("##"))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length ?? 2;
      const text = line.replace(/^#+\s*/, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9À-ɏ\s]/g, "")
        .replace(/\s+/g, "-");
      return { id, text, level };
    });
}

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const headings = extractHeadings(content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav style={{ position: "sticky", top: "6rem" }}>
      <div
        className="font-mono"
        style={{
          color: "#FBBF24",
          fontSize: "0.55rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "1rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid rgba(30,58,95,0.5)",
        }}
      >
        LEGENDA — OBSAH
      </div>
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {headings.map((h, i) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="font-mono"
              style={{
                display: "block",
                padding: "0.3rem 0",
                paddingLeft: h.level > 2 ? "1rem" : "0",
                color: activeId === h.id ? "#FBBF24" : "#C2C2C2",
                textDecoration: "none",
                fontSize: "0.7rem",
                lineHeight: 1.5,
                transition: "color 0.15s ease",
                borderLeft:
                  activeId === h.id
                    ? "2px solid #FBBF24"
                    : "2px solid transparent",
                paddingLeft:
                  activeId === h.id
                    ? (h.level > 2 ? "1.5rem" : "0.5rem")
                    : h.level > 2
                    ? "1rem"
                    : "0",
              }}
            >
              {i + 1}. {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
