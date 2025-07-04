import HeroSection from "@/components/blocks/hero-02/HeroSection";
import FeaturesPage from "@/components/features-01/features";
import Navbar02Page from "@/components/navbar-02/navbar-02";

const Home = () => {
  
  return (
    <section className="min-h-screen ">
      <Navbar02Page />
      <HeroSection />
      <FeaturesPage />
    
    </section>
  );
};

export default Home;
