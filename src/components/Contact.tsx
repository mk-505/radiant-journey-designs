
import { useState, useEffect } from "react";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import emailjs from '@emailjs/browser';
import { fetchIpAddress, fetchGeolocation } from "@/utils/ipFetcher";

// Initialize EmailJS with public key
emailjs.init("phRhTu5vVK0cs5920");

export function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userIp, setUserIp] = useState<string>("");
  const [userLocation, setUserLocation] = useState<{
    latitude: string;
    longitude: string;
  }>({ latitude: "", longitude: "" });

  // Fetch IP address and geolocation when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch IP address
      const ip = await fetchIpAddress();
      setUserIp(ip);
      console.log("IP Address fetched:", ip);
      
      // Fetch geolocation
      const location = await fetchGeolocation();
      setUserLocation(location);
      console.log("Location fetched:", location);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // If data wasn't collected yet, try one more time
      if (!userIp || !userLocation.latitude) {
        await fetchUserData();
      }

      // Log the data and template params for debugging
      console.log("Sending email with IP:", userIp);
      console.log("Sending email with location:", userLocation);
      
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'After Dark Creative',
        reply_to: formData.email,
        user_ip: userIp || 'IP not available',
        ip_address: userIp || 'IP not available',
        user_latitude: userLocation.latitude || 'Location not available',
        user_longitude: userLocation.longitude || 'Location not available',
        location_coords: `${userLocation.latitude}, ${userLocation.longitude}` || 'Location not available',
      };
      
      console.log("Template params:", templateParams);

      await emailjs.send(
        'service_y22zw4i',
        'template_6fkbmtb',
        templateParams
      );

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">
          Let's Create Something Amazing
        </h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Us for a Free Online Consultation</h3>
            <div className="space-y-6">
              <a
                href="mailto:afterdark.creativ@gmail.com"
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5 mr-3" />
                afterdark.creativ@gmail.com
              </a>
              <a
                href="tel:6479221412"
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-5 w-5 mr-3" />
                (647) 922-1412
              </a>
              <a
                href="sms:6479221412"
                className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageSquare className="h-5 w-5 mr-3" />
                Send us a text
              </a>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="min-h-[150px]"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
