import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import CallToActionSection from "@/components/modules/home/landing/CallToActionSection";
import FrequentQuestion from "@/components/modules/home/landing/FrequentQuestion";
import HeroSection from "@/components/modules/home/landing/HeroSection";
import Footer from "@/components/shared/Footer";

const HomePage = () => {
  return (
    <div className="bg-white">
      <HeroSection />

      <FeaturedProducts />

      <CallToActionSection />
      <FrequentQuestion />
      <Footer />
    </div>
  );
};

export default HomePage;
