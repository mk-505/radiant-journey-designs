import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function About() {
  const founders = [
    {
      name: "Shaun Arulanandam",
      portfolio: "https://shaun2005.netlify.app/",
      image: "/shauna.JPG",
    },
    {
      name: "Manroop Kalsi",
      portfolio: "https://manroopkalsi.notion.site/",
      image: "/manroop.jpg",
    },
  ];

  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
          Meet Our Creative Minds
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder) => (
            <Card key={founder.name} className="p-6 bg-background/50 backdrop-blur-sm">
              <img
                src={founder.image}
                alt={founder.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-center mb-2">{founder.name}</h3>
              <p className="text-muted-foreground text-center mb-4">
                Passionate about creation and making a positive impact in the world
              </p>
              <a
                href={founder.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center text-sm text-afterdark-400 hover:text-afterdark-300 transition-colors"
              >
                View Portfolio
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
