
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote: "AfterDark Creatives transformed our online presence completely. Their attention to detail and creative approach helped us stand out in a crowded market.",
      author: "Sarah Johnson",
      company: "Bloom Florals",
    },
    {
      quote: "Working with this team was a breeze. They understood our vision immediately and delivered a website that exceeded our expectations.",
      author: "Michael Chen",
      company: "ASL Learn",
    },
    {
      quote: "The custom animations they created for our site have received countless compliments from our customers. Truly top-notch work!",
      author: "Jessica Williams",
      company: "Stellar Digital",
    },
  ];

  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
          What Our Clients Say
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-secondary border-0 hover:bg-secondary/80 transition-colors">
              <CardContent className="pt-8">
                <Quote className="h-8 w-8 text-afterdark-400 mb-4" />
                <p className="mb-6 italic">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
