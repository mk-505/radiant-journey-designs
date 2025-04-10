
import { ArrowRight, Globe, Palette, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function Services() {
  const services = [
    {
      title: "Landing Page Development",
      description: "Eye-catching, conversion-focused landing pages designed to turn visitors into customers.",
      icon: <Globe className="h-8 w-8 text-afterdark-400" />,
    },
    {
      title: "Multi-page Website Development",
      description: "Comprehensive websites with seamless navigation and consistent branding across all pages.",
      icon: <Zap className="h-8 w-8 text-afterdark-400" />,
    },
    {
      title: "Custom Animations & Effects",
      description: "Engaging visual elements that enhance user experience and make your brand memorable.",
      icon: <Palette className="h-8 w-8 text-afterdark-400" />,
    },
  ];

  return (
    <section id="services" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
          Our Services
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          We offer a range of web development services tailored to meet your unique business needs.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {services.map((service) => (
            <Card key={service.title} className="bg-background border-border hover:border-afterdark-400 transition-colors">
              <CardHeader>
                <div className="mb-4">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-lg mb-6">
            Ready to bring your vision to life? Get a free quote for your project!
          </p>
          <Button 
            size="lg" 
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get a Free Quote
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
