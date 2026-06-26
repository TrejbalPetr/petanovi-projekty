"use client";

import { useState, FormEvent } from "react";
import { colors, mono, sans } from "@/lib/typography";

const inputStyle = (hasError = false): React.CSSProperties => ({
  width: "100%",
  backgroundColor: "rgba(10, 25, 45, 0.6)",
  border: `1px solid ${hasError ? colors.orange : colors.border}`,
  color: colors.textPrimary,
  fontSize: sans.base,
  padding: "0.65rem 0.875rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s ease",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
});

const labelStyle: React.CSSProperties = {
  display: "block",
  color: colors.textPrimary,
  fontSize: sans.sm,
  marginBottom: "0.4rem",
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!consent) { setError("Je třeba souhlasit se zpracováním údajů."); return; }
    setLoading(true);
    setError("");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    if (res.ok) { setSuccess(true); } else { setError("Nepodařilo se odeslat zprávu. Zkus to prosím znovu."); }
    setLoading(false);
  }

  if (success) {
    return (
      <div style={{ border: `1px solid rgba(251,191,36,0.4)`, backgroundColor: colors.yellowMuted, padding: "2rem" }}>
        <div className="font-mono" style={{ color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.15em", marginBottom: "0.75rem" }}>
          STATUS: MESSAGE_SENT ✓
        </div>
        <p style={{ color: colors.textPrimary, fontSize: sans.base, margin: 0 }}>
          Zpráva dorazila — díky! Ozvu se, jakmile to půjde.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <label style={labelStyle}>Jméno/přezdívka *</label>
        <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
          style={inputStyle()}
          onFocus={(e) => (e.target.style.borderColor = colors.yellow)}
          onBlur={(e) => (e.target.style.borderColor = colors.border)}
        />
      </div>

      <div>
        <label style={labelStyle}>Email (pokud chceš kontaktovat zpět ;)</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nekdo@neco.cz"
          style={inputStyle()}
          onFocus={(e) => (e.target.style.borderColor = colors.yellow)}
          onBlur={(e) => (e.target.style.borderColor = colors.border)}
        />
      </div>

      <div>
        <label style={labelStyle}>Zpráva *</label>
        <textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="..." rows={5}
          style={{ ...inputStyle(), resize: "vertical", minHeight: "120px", fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          onFocus={(e) => (e.target.style.borderColor = colors.yellow)}
          onBlur={(e) => (e.target.style.borderColor = colors.border)}
        />
      </div>

      <div className="flex items-start gap-3">
        <input type="checkbox" id="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)}
          style={{ width: "16px", height: "16px", marginTop: "2px", flexShrink: 0, accentColor: colors.yellow, cursor: "pointer" }}
        />
        <label htmlFor="consent" style={{ ...labelStyle, marginBottom: 0, cursor: "pointer", color: colors.textSecondary }}>
          Tímto souhlasím se zpracováním poskytnutých údajů *
        </label>
      </div>

      <p style={{ color: colors.textSecondary, fontSize: sans.xs, margin: 0 }}>
        * Povinné údaje k vyplnění
      </p>

      {error && (
        <p className="font-mono" style={{ color: colors.orange, fontSize: sans.xs, margin: 0 }}>{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary"
        style={{
          opacity: loading ? 0.5 : 1,
          cursor: loading ? "not-allowed" : "pointer",
          pointerEvents: loading ? "none" : "auto",
        }}
      >
        {loading ? "Odesílám..." : "Odeslat →"}
      </button>
    </form>
  );
}
