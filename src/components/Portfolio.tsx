import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function Portfolio() {
  const projects = [
    {
      title: "Bloom Website",
      description: "Modern flower shop website with elegant design and seamless user experience",
      image: "/flowershop.png",
      link: "https://harmonious-tarsier-ac50b6.netlify.app/about",
    },
    {
      title: "ASL Learn",
      description: "Interactive platform for learning American Sign Language",
      image: "/asl.png",
      link: "https://asl-sign-sensei-avk1nlvqg-mk-505s-projects.vercel.app/",
    },
  ];

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
          Our Latest Work
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="group overflow-hidden bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-afterdark-400 hover:text-afterdark-300 transition-colors"
                >
                  View Project
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}