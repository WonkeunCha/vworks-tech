import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
