import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyChooseUs from "../components/WhyChooseUs";
import PopularDishes from "../components/PopularDishes";
import ChefSpecial from "../components/ChefSpecial";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import HowItWorks from "../components/HowItWorks";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />
      <WhyChooseUs />
      <PopularDishes />
      <ChefSpecial />
      <Testimonials />
      <HowItWorks />
      <CTA />
      <Footer />

      <WhatsAppButton />
    </>
  );
}

export default Home;