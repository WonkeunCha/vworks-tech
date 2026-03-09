import HeroSection from "@/components/sections/HeroSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import ReferenceSection from "@/components/sections/ReferenceSection";
import PartnersSection from "@/components/sections/PartnersSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050d1a] text-[#e8f1ff]">
      <HeroSection />
      <SolutionsSection />
      <ReferenceSection />
      <PartnersSection />
    </main>
  );
}
