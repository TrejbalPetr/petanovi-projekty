import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/blog", label: "Blog archiv" },
  { href: "/o-blogu", label: "O mně" },
  { href: "/#kontakt", label: "Kontakty" },
  { href: "/zasady", label: "Zásady a pravidla" },
];

const SOCIALS = [
  { name: "Instagram", icon: "/icons/Instagram_logo_2022.svg", href: "#" },
  { name: "Strava", icon: "/icons/strava-svgrepo-com.svg", href: "#" },
  { name: "Printables", icon: "/icons/printables-logo.svg", href: "#" },
  { name: "Makerworld", icon: "/icons/maker-world-dark.svg", href: "#" },
];

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(30, 58, 95, 0.6)",
        backgroundColor: "rgba(17, 17, 17, 0.5)",
        marginTop: "6rem",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr",
            gap: "3rem",
          }}
        >
          {/* Left — logo + popis */}
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: "0.75rem" }}>
              <Image src="/icons/Petanovi-projekty-LOGO-Ikona-Handmade-Figma.svg" alt="Logo" width={30} height={30} />
              <span className="font-bold" style={{ color: "#E3E3E3", fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
                Peťanovi Projekty
              </span>
            </div>
            <p style={{ color: "#C2C2C2", fontSize: "0.8rem", lineHeight: 1.7, margin: 0 }}>
              Projekty zdokumentované, otestované a připravené k replikaci. DIY, 3D tisk a outdoorové výpravy.
            </p>
          </div>

          {/* Middle — LINKS */}
          <div>
            <h3
              className="font-mono"
              style={{
                color: "#FBBF24",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              LINKS
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{ color: "#C2C2C2", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.15s ease" }}
                    className="nav-link"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — CONNECT */}
          <div>
            <h3
              className="font-mono"
              style={{
                color: "#FBBF24",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              CONNECT
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {SOCIALS.map(({ name, icon, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    className="flex items-center gap-3"
                    style={{ textDecoration: "none", color: "#C2C2C2", fontSize: "0.85rem", transition: "color 0.15s ease" }}
                  >
                    <span style={{ width: "28px", height: "28px", flexShrink: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
        <div
          className="flex justify-between items-center font-mono"
          style={{
            borderTop: "1px solid rgba(30, 58, 95, 0.4)",
            marginTop: "2.5rem",
            paddingTop: "1.5rem",
          }}
        >
          <span style={{ color: "#C2C2C2", fontSize: "0.72rem", letterSpacing: "0.05em" }}>
            @2026 Made by Me 😁 | ALL RIGHTS RESERVED
          </span>
          <span style={{ color: "#C2C2C2", fontSize: "0.6rem", letterSpacing: "0.08em" }}>
            SYSTEM STATUS: OPERATIONAL
          </span>
        </div>
      </div>
    </footer>
  );
}
