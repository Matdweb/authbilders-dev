
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import InteractiveFeatures from "@/components/InteractiveFeatures";
// import FeatureShowcase from "@/components/FeatureShowcase";
import HowItWorksSection from "@/components/HowItWorksSection";
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
        <HowItWorksSection />
        <InteractiveFeatures />
        {/* <FeatureShowcase /> */}
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
