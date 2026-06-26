/**
 * Centrální design tokeny — barvy, typografie.
 * Používej tyto konstanty místo pevných hodnot v celém projektu.
 */

// ─── Barvy ──────────────────────────────────────────────────────────────────

export const colors = {
  // Pozadí
  bg:             "#0F2B47",
  surface:        "#0d2540",
  surfaceCard:    "rgba(13, 37, 64, 0.5)",
  surfaceHover:   "rgba(13, 37, 64, 0.75)",
  surfaceOverlay: "rgba(13, 37, 64, 0.85)",

  // Akcenty
  yellow:        "#FBBF24",
  yellowMuted:   "rgba(251, 191, 36, 0.08)",
  yellowBorder:  "rgba(251, 191, 36, 0.5)",
  yellowHover:   "rgba(251, 191, 36, 0.65)",
  orange:        "#F97316",
  blue:          "#0796B1",

  // Text
  textPrimary:   "#E3E3E3",
  textSecondary: "#C2C2C2",
  textMuted:     "#2D4A6F",

  // Borders
  border:        "#1E3A5F",
  borderSubtle:  "rgba(30, 58, 95, 0.4)",
  borderMedium:  "rgba(30, 58, 95, 0.5)",
  borderStrong:  "rgba(30, 58, 95, 0.6)",
} as const;

// ─── Monospace škála ─────────────────────────────────────────────────────────

export const mono = {
  xs:   "0.75rem",   // tiny štítky: hlavičky panelů (TECH_DATA, LEGENDA…)
  sm:   "0.75rem",   // malé: tabulkové popisky, autor specs, image label
  base: "0.75rem",  // základ: metadata datum/čas, koordináty, breadcrumb
  md:   "0.8rem",   // střední: kategorie badge, TOC položky, filter count
  lg:   "0.85rem",  // velké: CTA (Read_log, FULL_ARTICLE), filter tlačítka
} as const;

// ─── Sans-serif škála ────────────────────────────────────────────────────────

export const sans = {
  xs:   "0.75rem",   // nejmenší body text
  sm:   "0.875rem",  // běžný body text v kartách, perex
  base: "1rem",      // standardní text, navigace
  lg:   "1.1rem",    // název webu v headeru, větší popisky
  xl:   "1.25rem",   // velký text
  h4:   "1.15rem",   // nadpis karty (ArticleRow)
  h3:   "1.05rem",   // nadpis karty (ArticleCard)
  h2:   "1.5rem",    // nadpis sekce (prose h2)
  h1:   "clamp(1.75rem, 3.5vw, 3rem)",    // hlavní nadpisy stránek
  hero: "clamp(1.5rem, 2.5vw, 2.25rem)",  // nadpis hero článku
} as const;
