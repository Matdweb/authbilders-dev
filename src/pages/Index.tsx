
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import CallToAction from "@/components/CallToAction";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 relative z-10">
        <HeroSection />
        <FeaturesSection />
        <FeatureShowcase />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
