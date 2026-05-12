import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="bg-stone-950 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <PortfolioSection />
      <AboutSection />
      <FooterSection />
    </main>
  );
}
