"use client";

import type { DownloadFile } from "@/lib/types";
import { colors, mono } from "@/lib/typography";

type FileCategory = "pdf" | "image" | "3d" | "vector" | "archive" | "other";

function getFileCategory(filename: string): FileCategory {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "pdf") return "pdf";
  if (["png", "jpg", "jpeg", "webp", "gif", "bmp", "tiff"].includes(ext)) return "image";
  if (ext === "svg") return "vector";
  if (["stl", "obj", "3mf", "step", "stp", "iges", "igs", "fbx", "gltf", "glb"].includes(ext)) return "3d";
  if (["zip", "rar", "7z", "tar", "gz", "bz2"].includes(ext)) return "archive";
  return "other";
}

const CATEGORY_CONFIG: Record<FileCategory, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  pdf: {
    label: "PDF",
    color: "#F97316",
    bg: "rgba(249, 115, 22, 0.08)",
    border: "rgba(249, 115, 22, 0.25)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="9" y1="15" x2="15" y2="15" />
        <line x1="9" y1="11" x2="11" y2="11" />
      </svg>
    ),
  },
  image: {
    label: "IMG",
    color: "#0796B1",
    bg: "rgba(7, 150, 177, 0.08)",
    border: "rgba(7, 150, 177, 0.25)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21,15 16,10 5,21" />
      </svg>
    ),
  },
  vector: {
    label: "SVG",
    color: "#A78BFA",
    bg: "rgba(167, 139, 250, 0.08)",
    border: "rgba(167, 139, 250, 0.25)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="8.5" x2="22" y2="8.5" />
        <line x1="2" y1="15.5" x2="22" y2="15.5" />
      </svg>
    ),
  },
  "3d": {
    label: "3D",
    color: "#FBBF24",
    bg: "rgba(251, 191, 36, 0.08)",
    border: "rgba(251, 191, 36, 0.25)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  archive: {
    label: "ZIP",
    color: "#34D399",
    bg: "rgba(52, 211, 153, 0.08)",
    border: "rgba(52, 211, 153, 0.25)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        <line x1="12" y1="11" x2="12" y2="17" />
        <line x1="9" y1="14" x2="15" y2="14" />
      </svg>
    ),
  },
  other: {
    label: "FILE",
    color: "#C2C2C2",
    bg: "rgba(194, 194, 194, 0.06)",
    border: "rgba(194, 194, 194, 0.2)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14,2 14,8 20,8" />
      </svg>
    ),
  },
};

function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toUpperCase() ?? "FILE";
}

function getFileName(filepath: string): string {
  return filepath.split("/").pop() ?? filepath;
}


export default function DownloadsSection({ downloads }: { downloads: DownloadFile[] }) {
  if (!downloads || downloads.length === 0) return null;

  return (
    <section style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: `1px solid ${colors.border}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <span className="font-mono" style={{ color: colors.yellow, fontSize: mono.base, letterSpacing: "0.1em" }}>
          //
        </span>
        <h2
          className="font-mono"
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: colors.textPrimary,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Ke stažení
        </h2>
        <span
          className="font-mono"
          style={{
            color: colors.textSecondary,
            fontSize: mono.sm,
            letterSpacing: "0.06em",
            marginLeft: "auto",
          }}
        >
          {downloads.length} {downloads.length === 1 ? "soubor" : downloads.length < 5 ? "soubory" : "souborů"}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {downloads.map((item, i) => {
          const displayFilename = item.filename || getFileName(item.file);
          const category = getFileCategory(displayFilename);
          const cfg = CATEGORY_CONFIG[category];
          const ext = getFileExtension(displayFilename);

          return (
            <a
              key={i}
              href={item.file}
              download={displayFilename}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                padding: "0.75rem 1rem",
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                textDecoration: "none",
                transition: "border-color 0.15s ease, background-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = cfg.color;
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = cfg.bg.replace("0.08", "0.14");
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = cfg.border;
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = cfg.bg;
              }}
            >
              {/* Ikona typu */}
              <span style={{ color: cfg.color, flexShrink: 0, lineHeight: 0 }}>
                {cfg.icon}
              </span>

              {/* Popisek a název souboru */}
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", color: colors.textPrimary, fontSize: "0.9rem", fontWeight: 500 }}>
                  {item.label || displayFilename}
                </span>
                {item.label && item.label !== displayFilename && (
                  <span className="font-mono" style={{ display: "block", color: colors.textSecondary, fontSize: mono.sm, letterSpacing: "0.04em", marginTop: "1px" }}>
                    {displayFilename}
                  </span>
                )}
              </span>

              {/* Typ badge + download ikona */}
              <span style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
                <span
                  className="font-mono"
                  style={{
                    color: cfg.color,
                    background: cfg.bg,
                    border: `1px solid ${cfg.border}`,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    padding: "2px 6px",
                  }}
                >
                  {ext}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.textSecondary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
