import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peťanovi Projekty",
  description: "Technický blog o DIY projektech, expedících a dokumentech.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://petanovi-projekty.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body
        className="antialiased"
        style={{ background: "linear-gradient(to bottom, #0F2847 0%, #111111 100%)", color: "#E3E3E3", minHeight: "100vh" }}
      >
        {children}
      </body>
    </html>
  );
}
