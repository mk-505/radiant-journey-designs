
import { ArrowRight, Globe, Palette, Zap, Code, Server, Users } from "lucide-react";
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
    {
      title: "Modern Frontend Frameworks",
      description: "Leveraging React, Next.js, and other cutting-edge technologies for optimal performance.",
      icon: <Code className="h-8 w-8 text-afterdark-400" />,
    },
    {
      title: "Backend Integration",
      description: "Seamless connection with APIs, databases, and third-party services for dynamic functionality.",
      icon: <Server className="h-8 w-8 text-afterdark-400" />,
    },
    {
      title: "User Experience Design",
      description: "Intuitive interfaces that guide users naturally through your digital experience.",
      icon: <Users className="h-8 w-8 text-afterdark-400" />,
    },
  ];

  return (
    <section id="services" className="py-20 bg-secondary relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-transparent opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
          Our Services
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          We offer a range of web development services tailored to meet your unique business needs.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="bg-background border-border hover:border-afterdark-400 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-afterdark-400/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="mb-4 p-3 bg-secondary inline-block rounded-lg">{service.icon}</div>
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
        
        <div className="text-center bg-background/50 backdrop-blur-sm p-8 rounded-lg max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Ready to bring your vision to life?</h3>
          <p className="text-lg mb-6">
            Our team of experts is ready to help you create a stunning digital experience that elevates your brand.
          </p>
          <Button 
            size="lg" 
            className="group"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get a Free Quote
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
