
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote: "AfterDark Creatives transformed our online presence completely. Their attention to detail and creative approach helped us stand out in a crowded market.",
      author: "Suneet",
      company: "Defense Attorney",
      rating: 5,
    },
    {
      quote: "Working with this team was a breeze. They understood our vision immediately and delivered a website that exceeded our expectations.",
      author: "David",
      company: "ASL Learn",
      rating: 5,
    },
    {
      quote: "The custom animations they created for our site have received countless compliments from our customers. Truly top-notch work!",
      author: "Mary",
      company: "Bloom",
      rating: 4,
    },
  ];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-900/10 to-afterdark-400/10 opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
          What Our Clients Say
        </h2>
        
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Don't just take our word for it - hear what our clients have to say about working with AfterDark Creatives
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-secondary border-0 hover:shadow-lg hover:shadow-afterdark-400/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="pt-8 relative">
                <div className="absolute top-4 right-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i + testimonial.rating} className="h-4 w-4 text-gray-400" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-afterdark-400 mb-4" />
                <p className="mb-6 italic">{testimonial.quote}</p>
                <div className="pt-4 border-t border-muted">
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
