"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { colors, mono, sans } from "@/lib/typography";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/keystatic";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) { router.push(from); } else { setError("Špatné heslo. Zkus to znovu."); setLoading(false); }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "360px" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ marginBottom: "0.75rem" }}>
            <Image src="/icons/Petanovi-projekty-LOGO-Ikona-Handmade-Figma.svg" alt="Logo" width={48} height={48} />
          </div>
          <h1 style={{ color: colors.textPrimary, fontSize: sans.lg, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
            Peťanovi Projekty
          </h1>
          <p className="font-mono" style={{ color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.1em" }}>
            ADMIN / REV A.01
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ border: `1px solid ${colors.border}`, backgroundColor: "rgba(12, 28, 52, 0.6)", backdropFilter: "blur(12px)", padding: "2rem" }}>
          <div className="font-mono" style={{ color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.15em", marginBottom: "1.5rem" }}>
            ACCESS_CONTROL // ENTER PASSWORD
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label className="font-mono" style={{ display: "block", color: colors.textSecondary, fontSize: mono.sm, letterSpacing: "0.08em", marginBottom: "0.5rem", textTransform: "uppercase" }}>
              Heslo
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              style={{
                width: "100%",
                backgroundColor: "rgba(15, 40, 71, 0.8)",
                border: `1px solid ${error ? colors.orange : colors.border}`,
                color: colors.textPrimary,
                fontSize: sans.sm,
                padding: "0.6rem 0.75rem",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "var(--font-jetbrains-mono), monospace",
              }}
            />
          </div>

          {error && (
            <p className="font-mono" style={{ color: colors.orange, fontSize: mono.sm, letterSpacing: "0.05em", marginBottom: "1rem" }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading}
            style={{
              width: "100%",
              backgroundColor: loading ? "rgba(251,191,36,0.4)" : colors.yellow,
              color: colors.bg,
              border: "none",
              padding: "0.65rem",
              fontWeight: 700,
              fontSize: mono.base,
              letterSpacing: "0.1em",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              transition: "background-color 0.15s ease",
            }}
          >
            {loading ? "OVĚŘUJI..." : "VSTOUPIT →"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return <Suspense><LoginForm /></Suspense>;
}
