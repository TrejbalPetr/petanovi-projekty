"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { colors, mono, sans } from "@/lib/typography";
import SearchBox from "@/components/SearchBox";

const NAV_LINKS = [
  { href: "/", label: "Úvod", home: true },
  { href: "/blog", label: "Blog" },
  { href: "/o-blogu", label: "O" },
  { href: "/#kontakt", label: "Kontakty" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Zavři menu při změně stránky
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Zamkni scroll při otevřeném menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function scrollToTopIfHome(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      requestAnimationFrame(() => { document.documentElement.style.scrollBehavior = ""; });
    }
  }

  return (
    <>
      <header
        className="sticky top-0"
        style={{
          zIndex: 50,
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
          backgroundColor: "rgba(12, 28, 52, 0.95)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="flex items-center justify-between" style={{ padding: "1rem 0" }}>

            {/* Logo */}
            <Link href="/" onClick={scrollToTopIfHome} className="flex items-center gap-3" style={{ textDecoration: "none" }}>
              <Image src="/icons/Petanovi-projekty-LOGO-Ikona-Handmade-Figma.svg" alt="Logo" width={36} height={36} />
              <div className="flex flex-col gap-0.5">
                <span className="font-bold" style={{ color: colors.textPrimary, fontSize: sans.lg, letterSpacing: "-0.02em", lineHeight: 1 }}>
                  Peťanovi Projekty
                </span>
                <span className="font-mono" style={{ color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.05em" }}>
                  Sheet 1 of 1 / REV A.01
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ href, label, home }) =>
                home ? (
                  <Link key={href} href={href} onClick={scrollToTopIfHome} className="nav-link">{label}</Link>
                ) : (
                  <Link key={href} href={href} className="nav-link">{label}</Link>
                )
              )}
              <button className="icon-btn" aria-label="Hledat" onClick={() => setSearchOpen(true)}>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </nav>

            {/* Mobile hamburger */}
            <button
              className="flex md:hidden icon-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
              style={{ padding: "6px", color: colors.textPrimary }}
            >
              {menuOpen ? (
                // X icon
                <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger icon
                <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="flex md:hidden flex-col"
          style={{
            position: "fixed",
            top: "61px",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 49,
            backgroundColor: "rgba(12, 28, 52, 0.98)",
            backdropFilter: "blur(12px)",
            borderTop: `1px solid ${colors.borderStrong}`,
            padding: "2rem 1.5rem",
            overflowY: "auto",
          }}
        >
          {/* Nav links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {NAV_LINKS.map(({ href, label, home }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => { setMenuOpen(false); if (home) scrollToTopIfHome(e); }}
                style={{
                  color: colors.textPrimary,
                  textDecoration: "none",
                  fontSize: sans.xl,
                  fontWeight: 600,
                  padding: "1rem 0",
                  borderBottom: `1px solid ${colors.borderSubtle}`,
                  letterSpacing: "-0.01em",
                  transition: "color 0.15s ease",
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Sociální sítě v menu */}
          <div style={{ marginTop: "2.5rem" }}>
            <span className="font-mono" style={{ color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.12em", display: "block", marginBottom: "1rem" }}>
              CONNECT
            </span>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[
                { href: "https://www.instagram.com/trejbal_petr/", icon: "/icons/Instagram_logo_2022.svg", label: "Instagram" },
                { href: "https://www.strava.com/athletes/112294070", icon: "/icons/strava-svgrepo-com.svg", label: "Strava" },
                { href: "https://www.printables.com/@Trejby_81_191561", icon: "/icons/printables-logo.svg", label: "Printables" },
                { href: "https://makerworld.com/cs/@trejby_81", icon: "/icons/maker-world-dark.svg", label: "Makerworld" },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Image src={icon} alt={label} width={28} height={28} style={{ objectFit: "contain" }} />
                </a>
              ))}
            </div>
          </div>

          {/* REV tag dole */}
          <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
            <span className="font-mono" style={{ color: colors.textMuted, fontSize: mono.xs, letterSpacing: "0.08em" }}>
              Sheet 1 of 1 / REV A.01
            </span>
          </div>
        </div>
      )}

      <SearchBox open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
