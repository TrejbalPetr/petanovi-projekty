"use client";

import dynamic from "next/dynamic";
import { colors, mono } from "@/lib/typography";

const GpxViewerClient = dynamic(() => import("./GpxViewerClient"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        border: `1px solid ${colors.border}`,
        background: colors.surface,
        height: "520px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "2rem 0",
      }}
    >
      <span
        className="font-mono"
        style={{
          color: colors.textMuted,
          fontSize: mono.base,
          letterSpacing: "0.15em",
        }}
      >
        LOADING_MAP...
      </span>
    </div>
  ),
});

interface GpxViewerProps {
  gpxFile?: string | null;
  title?: string;
}

export default function GpxViewer({ gpxFile, title }: GpxViewerProps) {
  if (!gpxFile) {
    return (
      <div
        style={{
          border: `1px solid ${colors.border}`,
          background: colors.surface,
          padding: "1.5rem",
          margin: "2rem 0",
        }}
      >
        <span
          className="font-mono"
          style={{
            color: colors.orange,
            fontSize: mono.base,
            letterSpacing: "0.1em",
          }}
        >
          ERR // gpxFile prop is required
        </span>
      </div>
    );
  }

  return <GpxViewerClient gpxFile={gpxFile} title={title} />;
}
