import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const events = [
  {
    title: "Tech Summit 2026",
    date: "March 15-17, 2026",
    time: "9:00 AM - 6:00 PM",
    location: "Main Auditorium",
    category: "Conference",
    description: "Annual technology conference featuring industry leaders from Google, Microsoft, and Meta.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    featured: true,
  },
  {
    title: "Hackathon: Code for Change",
    date: "April 5-6, 2026",
    time: "24 Hours",
    location: "Innovation Hub",
    category: "Hackathon",
    description: "48-hour coding marathon to build solutions for social impact. Prizes worth ₹5 Lakhs.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
    featured: false,
  },
  {
    title: "AI Workshop Series",
    date: "Every Saturday",
    time: "2:00 PM - 5:00 PM",
    location: "AI Lab",
    category: "Workshop",
    description: "Hands-on workshops on machine learning, deep learning, and generative AI.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    featured: false,
  },
  {
    title: "Industry Connect: Career Fair",
    date: "May 10, 2026",
    time: "10:00 AM - 4:00 PM",
    location: "Campus Grounds",
    category: "Career",
    description: "Meet 100+ companies recruiting for internships and full-time positions.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&q=80",
    featured: false,
  },
];

const EventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="events" className="py-24 bg-background" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Events & Workshops
          </span>
          <h2 className="section-title mb-4">
            Upcoming <span className="text-gradient">Events</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Stay updated with our latest workshops, conferences, hackathons, and career events.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Event */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:row-span-2 group relative bg-card rounded-3xl overflow-hidden border border-border card-hover"
          >
            <div className="relative h-64 lg:h-80 overflow-hidden">
              <img
                src={events[0].image}
                alt={events[0].title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
              
              <span className="absolute top-6 left-6 px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                {events[0].category}
              </span>
            </div>
            
            <div className="p-8">
              <h3 className="font-heading font-bold text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                {events[0].title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {events[0].description}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-foreground/70">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{events[0].date}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/70">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{events[0].time}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/70">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{events[0].location}</span>
                </div>
              </div>
              
              <Button className="btn-primary w-full">
                Register Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>

          {/* Other Events */}
          {events.slice(1).map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group bg-card rounded-2xl p-6 border border-border card-hover flex gap-6"
            >
              <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {event.category}
                  </span>
                </div>
                
                <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors truncate">
                  {event.title}
                </h3>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                </div>
                
                <Button variant="ghost" className="text-primary hover:text-primary p-0 h-auto font-semibold text-sm group/btn">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8">
            View All Events
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsSection;
