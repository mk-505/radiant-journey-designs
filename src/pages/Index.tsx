
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { BackgroundMusic } from "@/components/BackgroundMusic";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
      <BackgroundMusic />
      
      {/* Animated background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-afterdark-400/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-2/3 left-1/2 w-72 h-72 rounded-full bg-pink-600/10 blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
        
        {/* Adding some small decorative dots that match the butterfly colors */}
        <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-afterdark-400 opacity-70 animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-2/5 right-1/4 w-2 h-2 rounded-full bg-purple-500 opacity-60 animate-pulse" style={{ animationDelay: "2.5s" }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 rounded-full bg-afterdark-500 opacity-50 animate-pulse" style={{ animationDelay: "3.2s" }}></div>
      </div>
    </div>
  );
};

export default Index;
