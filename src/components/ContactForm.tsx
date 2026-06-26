"use client";

import { useState, FormEvent } from "react";

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "rgba(10, 25, 45, 0.6)",
  border: "1px solid #1E3A5F",
  color: "#E3E3E3",
  fontSize: "0.95rem",
  padding: "0.65rem 0.875rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s ease",
  fontFamily: "var(--font-inter), system-ui, sans-serif",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#E3E3E3",
  fontSize: "0.875rem",
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

    if (res.ok) {
      setSuccess(true);
    } else {
      setError("Nepodařilo se odeslat zprávu. Zkus to prosím znovu.");
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div style={{ border: "1px solid rgba(251,191,36,0.4)", backgroundColor: "rgba(251,191,36,0.05)", padding: "2rem" }}>
        <div className="font-mono" style={{ color: "#FBBF24", fontSize: "0.65rem", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>
          STATUS: MESSAGE_SENT ✓
        </div>
        <p style={{ color: "#E3E3E3", fontSize: "1rem", margin: 0 }}>
          Zpráva dorazila — díky! Ozvu se, jakmile to půjde.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Jméno */}
      <div>
        <label style={labelStyle}>Jméno/přezdívka *</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#FBBF24")}
          onBlur={(e) => (e.target.style.borderColor = "#1E3A5F")}
        />
      </div>

      {/* Email */}
      <div>
        <label style={labelStyle}>Email (pokud chceš kontaktovat zpět ;)</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nekdo@neco.cz"
          style={{ ...inputStyle, color: email ? "#E3E3E3" : undefined }}
          onFocus={(e) => (e.target.style.borderColor = "#FBBF24")}
          onBlur={(e) => (e.target.style.borderColor = "#1E3A5F")}
        />
      </div>

      {/* Zpráva */}
      <div>
        <label style={labelStyle}>Zpráva *</label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="..."
          rows={5}
          style={{ ...inputStyle, resize: "vertical", minHeight: "120px", fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          onFocus={(e) => (e.target.style.borderColor = "#FBBF24")}
          onBlur={(e) => (e.target.style.borderColor = "#1E3A5F")}
        />
      </div>

      {/* Souhlas */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          style={{ width: "16px", height: "16px", marginTop: "2px", flexShrink: 0, accentColor: "#FBBF24", cursor: "pointer" }}
        />
        <label htmlFor="consent" style={{ ...labelStyle, marginBottom: 0, cursor: "pointer", color: "#C2C2C2", fontSize: "0.875rem" }}>
          Tímto souhlasím se zpracováním poskytnutých údajů *
        </label>
      </div>

      {/* Povinné */}
      <p style={{ color: "#C2C2C2", fontSize: "0.78rem", margin: 0 }}>
        * Povinné údaje k vyplnění
      </p>

      {/* Chyba */}
      {error && (
        <p className="font-mono" style={{ color: "#F97316", fontSize: "0.78rem", margin: 0 }}>{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: loading ? "rgba(251,191,36,0.5)" : "#FBBF24",
          color: "#0F2B47",
          border: "none",
          padding: "0.9rem 2rem",
          fontSize: "1rem",
          fontWeight: 700,
          letterSpacing: "0.05em",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background-color 0.15s ease",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
        }}
      >
        {loading ? "Odesílám..." : "Odeslat -->"}
      </button>
    </form>
  );
}
