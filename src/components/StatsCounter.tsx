"use client";

import { useEffect, useRef, useState } from "react";
import { colors, mono, sans } from "@/lib/typography";

type Stat = { label: string; value: number; unit?: string; tag: string };

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (target === 0) { setCount(0); return; }
    const start = performance.now();
    let raf: number;
    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);
  return count;
}

function StatCard({ label, value, unit, tag, active }: Stat & { active: boolean }) {
  const count = useCountUp(value, 1400, active);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.5rem 1.25rem",
        border: `1px solid ${hovered ? colors.yellowBorder : colors.border}`,
        backgroundColor: hovered ? colors.yellowMuted : "transparent",
        transition: "border-color 0.2s ease, background-color 0.2s ease",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent line top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        backgroundColor: hovered ? colors.yellow : "transparent",
        transition: "background-color 0.2s ease",
      }} />

      <span className="font-mono" style={{ color: colors.textMuted, fontSize: mono.xs, letterSpacing: "0.1em", display: "block", marginBottom: "0.5rem" }}>
        {tag}
      </span>

      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "0.25rem" }}>
        <span style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, color: colors.yellow, letterSpacing: "-0.04em", lineHeight: 1 }}>
          {count}
        </span>
        {unit && (
          <span className="font-mono" style={{ color: colors.yellow, fontSize: mono.base }}>
            {unit}
          </span>
        )}
      </div>

      <span style={{ color: colors.textSecondary, fontSize: sans.sm, display: "block", marginTop: "0.5rem" }}>
        {label}
      </span>
    </div>
  );
}

type Props = {
  total: number;
  diy: number;
  expedice: number;
  documents: number;
  lastUpdate: string;
};

export default function StatsCounter({ total, diy, expedice, documents, lastUpdate }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const STATS: Stat[] = [
    { label: "Celkem článků", value: total, tag: "TOTAL_LOGS" },
    { label: "DIY projekty", value: diy, tag: "DIY_BUILD" },
    { label: "Expedice", value: expedice, tag: "FIELD_OPS" },
    { label: "Dokumenty", value: documents, tag: "ARCHIVES" },
  ];

  return (
    <section ref={ref} style={{ padding: "3rem 2rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h2 className="font-mono" style={{ color: colors.textSecondary, fontSize: mono.xs, letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>
            — SYSTEM_STATUS // DATABÁZE
          </h2>
          {lastUpdate && (
            <span className="font-mono" style={{ color: colors.textMuted, fontSize: mono.xs, letterSpacing: "0.08em" }}>
              LAST_UPDATE: {lastUpdate}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: "2px" }}>
          {STATS.map((s) => (
            <StatCard key={s.tag} {...s} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
