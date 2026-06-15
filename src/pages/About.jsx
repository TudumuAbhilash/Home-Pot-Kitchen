import Navbar from "../components/Navbar";
import AboutHero from "../components/AboutHero";
import AboutStory from "../components/AboutStory";
import KitchenStandards from "../components/KitchenStandards";
import Footer from "../components/Footer";
import MeetKitchen from "../components/MeetKitchen";
import AboutTestimonials from "../components/AboutTestimonials";

function About() {
  return (
    <>
      <Navbar />

      <AboutHero />

      <AboutStory />

      <KitchenStandards />

      <MeetKitchen />
      
      <AboutTestimonials />

      <Footer />
    </>
  );
}

export default About;