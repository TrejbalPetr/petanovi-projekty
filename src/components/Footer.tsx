import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(30, 58, 95, 0.6)",
        backgroundColor: "rgba(11, 30, 50, 0.8)",
        marginTop: "6rem",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 0rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "4rem",
          }}
        >
          {/* Left — description */}
          <div>
            <div
              className="flex items-center gap-2"
              style={{ marginBottom: "1rem" }}
            >
              <span style={{ fontSize: "1.25rem" }}>🐻</span>
              <span
                className="font-bold"
                style={{ color: "#E3E3E3", fontSize: "0.9rem" }}
              >
                Peťanovi Projekty
              </span>
            </div>
            <p
              style={{
                color: "#C2C2C2",
                fontSize: "0.8rem",
                lineHeight: 1.7,
              }}
            >
              Projekty, dokumentace a dobrodružství z terénu. Zápisník z dílny,
              hor a všude jinde.
            </p>
          </div>

          {/* Middle — links */}
          <div>
            <h3
              className="font-mono"
              style={{
                color: "#FBBF24",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              LINKS
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { href: "/blog", label: "Blog" },
                { href: "/o-blogu", label: "O projektu" },
                { href: "/kontakty", label: "Kontakty" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      color: "#C2C2C2",
                      fontSize: "0.8rem",
                      textDecoration: "none",
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — connect */}
          <div>
            <h3
              className="font-mono"
              style={{
                color: "#FBBF24",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              CONNECT
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["Instagram", "Strava", "Sloventrail", "Summitpost"].map(
                (name) => (
                  <li key={name}>
                    <a
                      href="#"
                      style={{
                        color: "#C2C2C2",
                        fontSize: "0.8rem",
                        textDecoration: "none",
                      }}
                    >
                      {name}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex justify-between items-center"
          style={{
            borderTop: "1px solid rgba(30, 58, 95, 0.4)",
            marginTop: "2rem",
            paddingTop: "1.5rem",
          }}
        >
          <span
            className="font-mono"
            style={{ color: "#C2C2C2", fontSize: "0.65rem", letterSpacing: "0.05em" }}
          >
            © 2026 PEŤANOVI PROJEKTY / ALL RIGHTS RESERVED
          </span>
          <span
            className="font-mono"
            style={{ color: "#C2C2C2", fontSize: "0.65rem", letterSpacing: "0.05em" }}
          >
            SYSTEM STATUS: OPERATIONAL
          </span>
        </div>
      </div>
    </footer>
  );
}
