"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { colors, mono, sans } from "@/lib/typography";

const SOCIALS = [
  { name: "Instagram", icon: "/icons/Instagram_logo_2022.svg", href: "https://www.instagram.com/trejbal_petr/" },
  { name: "Strava", icon: "/icons/strava-svgrepo-com.svg", href: "https://www.strava.com/athletes/112294070" },
  { name: "Printables", icon: "/icons/printables-logo.svg", href: "https://www.printables.com/@Trejby_81_191561" },
  { name: "Makerworld", icon: "/icons/maker-world-dark.svg", href: "https://makerworld.com/cs/@trejby_81" },
];

export default function Footer() {
  const pathname = usePathname();

  function scrollToTopIfHome(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = "";
      });
    }
  }

  const linkStyle = { color: colors.textSecondary, fontSize: sans.sm, textDecoration: "none", transition: "color 0.15s ease" };

  return (
    <footer style={{ borderTop: `1px solid ${colors.borderStrong}`, backgroundColor: "rgba(17, 17, 17, 0.5)", marginTop: "6rem" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 2rem" }}>
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr]" style={{ gap: "2rem" }}>

          {/* Left */}
          <div>
            <Link href="/" onClick={scrollToTopIfHome} className="flex items-center gap-2" style={{ textDecoration: "none", marginBottom: "0.75rem", display: "inline-flex" }}>
              <Image src="/icons/Petanovi-projekty-LOGO-Ikona-Handmade-Figma.svg" alt="Logo" width={30} height={30} />
              <span className="font-bold" style={{ color: colors.textPrimary, fontSize: sans.base, letterSpacing: "-0.01em" }}>
                Peťanovi Projekty
              </span>
            </Link>
            <p style={{ color: colors.textSecondary, fontSize: sans.sm, lineHeight: 1.7, margin: 0 }}>
              Projekty zdokumentované, otestované a připravené k replikaci. DIY, 3D tisk a outdoorové výpravy.
            </p>
          </div>

          {/* Middle — Links */}
          <div>
            <h3 className="font-mono" style={{ color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              LINKS
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <li><Link href="/" onClick={scrollToTopIfHome} className="nav-link" style={linkStyle}>Úvod</Link></li>
              <li><Link href="/blog" className="nav-link" style={linkStyle}>Blog</Link></li>
              <li><Link href="/o-blogu" className="nav-link" style={linkStyle}>O mně</Link></li>
              <li><Link href="/#kontakt" className="nav-link" style={linkStyle}>Kontakty</Link></li>
              <li><Link href="/zasady" className="nav-link" style={linkStyle}>Zásady ochrany osobních údajů</Link></li>
            </ul>
          </div>

          {/* Right — Connect */}
          <div>
            <h3 className="font-mono" style={{ color: colors.yellow, fontSize: mono.xs, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              CONNECT
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {SOCIALS.map(({ name, icon, href }) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3" style={{ ...linkStyle, display: "flex" }}>
                    <span style={{ width: "28px", height: "28px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Image src={icon} alt={name} width={28} height={28} style={{ objectFit: "contain" }} />
                    </span>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center font-mono" style={{ borderTop: `1px solid ${colors.borderSubtle}`, marginTop: "2.5rem", paddingTop: "1.5rem", gap: "0.5rem" }}>
          <span style={{ color: colors.textSecondary, fontSize: mono.base, letterSpacing: "0.05em" }}>
            @2026 Made by Me 😁 | ALL RIGHTS RESERVED
          </span>
          <span style={{ color: colors.textSecondary, fontSize: mono.xs, letterSpacing: "0.08em" }}>
            SYSTEM STATUS: OPERATIONAL
          </span>
        </div>
      </div>
    </footer>
  );
}
