"use client";

import { useEffect, useRef, useState } from "react";
import { colors, mono, sans } from "@/lib/typography";

const SKILLS = [
  { label: "3D Tisk & Prototypování", value: 92, tag: "ADDITIVE_MFG" },
  { label: "DIY Engineering", value: 88, tag: "HANDS_ON" },
  { label: "Lezení", value: 80, tag: "VERTICAL_MOBILITY" },
  { label: "Cyklistika", value: 75, tag: "PEDAL_POWER" },
  { label: "Elektronika", value: 70, tag: "CIRCUIT_WORK" },
  { label: "Espresso Engineering", value: 99, tag: "MISSION_CRITICAL" },
];

function SkillBar({ label, value, tag, animate }: { label: string; value: number; tag: string; animate: boolean }) {
  const [hovered, setHovered] = useState(false);

  const barColor =
    value >= 90 ? colors.yellow :
    value >= 75 ? colors.blue :
    colors.textSecondary;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "0.75rem 1rem",
        border: `1px solid ${hovered ? colors.yellow : colors.border}`,
        backgroundColor: hovered ? "rgba(251,191,36,0.04)" : "transparent",
        transition: "border-color 0.2s ease, background-color 0.2s ease",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
        <span style={{ color: hovered ? colors.textPrimary : colors.textSecondary, fontSize: sans.sm, fontWeight: hovered ? 600 : 400, transition: "color 0.2s ease, font-weight 0.2s ease" }}>
          {label}
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span className="font-mono" style={{ color: colors.textMuted, fontSize: mono.xs, letterSpacing: "0.06em", opacity: hovered ? 1 : 0, transition: "opacity 0.2s ease" }}>
            {tag}
          </span>
          <span className="font-mono" style={{ color: barColor, fontSize: mono.base, letterSpacing: "0.04em" }}>
            {value}%
          </span>
        </div>
      </div>
      {/* Track */}
      <div style={{ height: "3px", backgroundColor: colors.border, position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: animate ? `${value}%` : "0%",
            backgroundColor: barColor,
            transition: animate ? "width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)" : "none",
          }}
        />
      </div>
    </div>
  );
}

export default function SkillMatrix() {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ marginBottom: "0" }}>
      <h2 className="font-mono" style={{ color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
        — SKILL_MATRIX // PROFICIENCY_SCAN
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {SKILLS.map((skill) => (
          <SkillBar key={skill.tag} {...skill} animate={animate} />
        ))}
      </div>
      <div className="font-mono" style={{ color: colors.textMuted, fontSize: mono.xs, letterSpacing: "0.06em", marginTop: "0.75rem", textAlign: "right" }}>
        SCAN COMPLETE // {SKILLS.length} MODULES DETECTED
      </div>
    </section>
  );
}
