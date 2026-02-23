import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, FileText, Users, Lightbulb, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const researchAreas = [
  { name: "Artificial Intelligence", count: 45, active: true },
  { name: "Machine Learning", count: 38 },
  { name: "Cybersecurity", count: 24 },
  { name: "Data Analytics", count: 31 },
  { name: "IoT & Embedded Systems", count: 18 },
];

const featuredProjects = [
  {
    title: "Autonomous Drone Navigation System",
    lead: "Dr. Rajesh Kumar",
    domain: "AI & Robotics",
    year: "2025",
    description: "Developing AI-powered navigation for drones in GPS-denied environments using computer vision.",
    publications: 3,
    contributors: 8,
    image: "https://images.unsplash.com/photo-1508614999368-9260051641f4?w=600&q=80",
  },
  {
    title: "Blockchain for Healthcare Records",
    lead: "Dr. Ananya Sharma",
    domain: "Blockchain",
    year: "2024",
    description: "Secure, decentralized system for managing patient records with privacy-preserving protocols.",
    publications: 5,
    contributors: 6,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
  },
  {
    title: "Real-time Malware Detection",
    lead: "Dr. Vikram Singh",
    domain: "Cybersecurity",
    year: "2025",
    description: "Deep learning-based system for detecting zero-day malware with 99.2% accuracy.",
    publications: 4,
    contributors: 5,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80",
  },
];

const ResearchSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedArea, setSelectedArea] = useState("Artificial Intelligence");

  return (
    <section id="research" className="py-24 bg-secondary/30" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Research & Innovation
          </span>
          <h2 className="section-title mb-4">
            Pioneering <span className="text-gradient">Research</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Our faculty and students are pushing the boundaries of technology 
            through cutting-edge research and innovation.
          </p>
        </motion.div>

        {/* Research Areas Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {researchAreas.map((area) => (
            <button
              key={area.name}
              onClick={() => setSelectedArea(area.name)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                selectedArea === area.name
                  ? "bg-primary text-primary-foreground shadow-red"
                  : "bg-card text-foreground/70 hover:bg-secondary border border-border"
              }`}
            >
              {area.name}
              <span className={`ml-2 ${selectedArea === area.name ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                ({area.count})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group bg-card rounded-3xl overflow-hidden border border-border card-hover"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    {project.domain}
                  </span>
                  <span className="px-3 py-1 bg-black/50 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Lead: <span className="text-foreground">{project.lead}</span>
                </p>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-5 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>{project.publications} Publications</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{project.contributors} Contributors</span>
                  </div>
                </div>

                {/* CTA */}
                <Button variant="ghost" className="text-primary hover:text-primary p-0 h-auto font-semibold text-sm group/btn">
                  View Research
                  <ExternalLink className="w-4 h-4 ml-1.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid sm:grid-cols-3 gap-6"
        >
          {[
            { icon: FileText, value: "150+", label: "Research Papers" },
            { icon: Lightbulb, value: "25+", label: "Patents Filed" },
            { icon: Users, value: "₹5 Cr+", label: "Research Grants" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-card rounded-2xl p-6 border border-border text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchSection;
