import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-afterdark-900/20 via-background to-background z-0" />
      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text animate-fade-up [--animate-delay:200ms]">
            Crafting Digital Experiences That Leave a Lasting Impression
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-up [--animate-delay:400ms]">
            We transform your vision into stunning websites that captivate and convert.
          </p>
          <Button
            size="lg"
            className="animate-fade-up [--animate-delay:600ms]"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Your Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}