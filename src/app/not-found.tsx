import Link from "next/link";
import { colors, mono } from "@/lib/typography";

export default function NotFound() {
  return (
    <div
      className="blueprint-grid"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backgroundColor: colors.bg,
      }}
    >
      <div
        className="font-mono"
        style={{
          width: "100%",
          maxWidth: "620px",
          border: `2px dashed ${colors.yellow}`,
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0.5rem 1rem",
            borderBottom: `1px dashed ${colors.yellow}`,
          }}
        >
          <span style={{ color: colors.yellow, fontSize: mono.base }}>[Peťanovi Projekty]</span>
          <span style={{ color: colors.yellow, fontSize: mono.base }}>[Status: FAILED]</span>
        </div>

        {/* Body */}
        <div style={{ padding: "2rem" }}>
          <h1
            style={{
              color: colors.yellow,
              fontSize: "1.4rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              marginBottom: "2rem",
            }}
          >
            ⚠ ERROR 404: SYSTÉMOVÁ CHYBA
          </h1>

          <p style={{ color: colors.yellow, fontSize: mono.base, marginBottom: "0.75rem" }}>
            &gt; SYSTEM DIAGNOSTICS LOG:
          </p>

          <ul
            style={{
              listStyle: "none",
              padding: "0 0 0 1rem",
              margin: "0 0 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            <li style={{ color: colors.textPrimary, fontSize: mono.base }}>
              <span style={{ color: colors.yellow }}>• </span>
              Status: <span style={{ color: "#ef4444" }}>FAILED</span>
            </li>
            <li style={{ color: colors.textPrimary, fontSize: mono.base }}>
              <span style={{ color: colors.yellow }}>• </span>
              Error Code: <span style={{ color: colors.orange }}>404_PAGE_NOT_FOUND</span>
            </li>
            <li style={{ color: colors.textPrimary, fontSize: mono.base }}>
              <span style={{ color: colors.yellow }}>• </span>
              Subjekt: Hledaný projekt nebo souřadnice
            </li>
            <li style={{ color: colors.textPrimary, fontSize: mono.base }}>
              <span style={{ color: colors.yellow }}>• </span>
              Reason: Stránka neexistuje, nebo byla archivována
            </li>
          </ul>

          <p style={{ color: colors.yellow, fontSize: mono.base, marginBottom: "0.75rem" }}>
            &gt; NÁPRAVNÉ OPATŘENÍ:
          </p>

          <div
            style={{
              padding: "0 0 0 1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
            }}
          >
            <p style={{ color: colors.textPrimary, fontSize: mono.base, margin: 0 }}>
              [1] Zkontrolovat URL (není tam někde překlep?)
            </p>
            <p style={{ color: colors.textPrimary, fontSize: mono.base, margin: 0 }}>
              [2] Vrátit se na startovní souřadnice
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderTop: `1px dashed ${colors.yellow}`,
          }}
        >
          <Link href="/" className="btn-primary" style={{ width: "100%", padding: "1.1rem", fontSize: mono.lg, letterSpacing: "0.1em" }}>
            REBOOT SYSTEM
          </Link>
          <Link href="/game" className="btn-secondary" style={{ width: "100%", padding: "1.1rem", fontSize: mono.lg, letterSpacing: "0.1em", borderLeft: "none", borderTop: "none", borderBottom: "none" }}>
            PLAY GAME
          </Link>
        </div>
      </div>
    </div>
  );
}
