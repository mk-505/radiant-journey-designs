import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { BackgroundMusic } from "@/components/BackgroundMusic";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Contact />
      <BackgroundMusic />
    </div>
  );
};

export default Index;