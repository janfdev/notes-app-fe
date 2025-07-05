import HeroSection from "@/components/blocks/hero-02/HeroSection";
import FeaturesPage from "@/components/features-01/features";
import FooterPage from "@/components/footer-05/footer-05";
import Navbar02Page from "@/components/navbar-02/navbar-02";
import StepBar from "@/components/Step/StepBar";

const Home = () => {
  return (
    <section className="min-h-screen ">
      <Navbar02Page />
      <HeroSection />
      <FeaturesPage />
      <StepBar />
      <FooterPage />
    </section>
  );
};

export default Home;
