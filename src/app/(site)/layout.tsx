import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlueprintGrid from "@/components/BlueprintGrid";
import ScrollToTop from "@/components/ScrollToTop";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlueprintGrid />
      <ScrollToTop />
      <div className="relative flex flex-col min-h-screen" style={{ zIndex: 1 }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
