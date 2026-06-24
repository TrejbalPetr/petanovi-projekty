import Link from "next/link";

export default function Header() {
  return (
    <header
      className="sticky top-0"
      style={{
        zIndex: 50,
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        backgroundColor: "rgba(12, 28, 52, 0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 auto" }}>
      <div
        className="flex items-center justify-between"
        style={{ padding: "1.25rem 0" }}
      >
        {/* Logo */}
        <Link href="/" className="flex flex-col gap-0.5 no-underline" style={{ textDecoration: "none" }}>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>🐻</span>
            <span
              className="font-bold"
              style={{
                color: "#E3E3E3",
                fontSize: "1rem",
                letterSpacing: "-0.02em",
              }}
            >
              Peťanovi Projekty
            </span>
          </div>
          <span
            className="font-mono"
            style={{
              color: "#FBBF24",
              fontSize: "0.65rem",
              letterSpacing: "0.05em",
              paddingLeft: "2.4rem",
            }}
          >
            Sheet 1 of 1 / REV A.01
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {[
            { href: "/", label: "Úvod" },
            { href: "/blog", label: "Blog" },
            { href: "/o-blogu", label: "O" },
            { href: "/kontakty", label: "Kontakty" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
          <button className="icon-btn" aria-label="Hledat">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </nav>
      </div>
      </div>
    </header>
  );
}
