import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Clock, GraduationCap, Briefcase, Code, Brain, Database, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    icon: Code,
    title: "B.Tech Computer Science",
    description: "Master programming, software development, and system design with industry-aligned curriculum.",
    duration: "4 Years",
    careers: ["Software Engineer", "Full Stack Developer", "System Architect"],
    color: "bg-blue-500",
  },
  {
    icon: Brain,
    title: "B.Tech AI & Machine Learning",
    description: "Dive deep into artificial intelligence, neural networks, and intelligent system development.",
    duration: "4 Years",
    careers: ["AI Engineer", "ML Specialist", "Research Scientist"],
    color: "bg-purple-500",
  },
  {
    icon: Database,
    title: "B.Tech Data Science",
    description: "Learn to extract insights from data using statistical analysis and advanced analytics.",
    duration: "4 Years",
    careers: ["Data Scientist", "Analytics Manager", "Business Intelligence"],
    color: "bg-green-500",
  },
  {
    icon: Shield,
    title: "B.Tech Cybersecurity",
    description: "Protect digital infrastructure with cutting-edge security protocols and ethical hacking.",
    duration: "4 Years",
    careers: ["Security Analyst", "Ethical Hacker", "Security Architect"],
    color: "bg-orange-500",
  },
];

const ProgramsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="programs" className="py-24 bg-secondary/30" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Our Programs
          </span>
          <h2 className="section-title mb-4">
            Industry-Aligned <span className="text-gradient">Tech Programs</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Choose from our comprehensive undergraduate programs designed in collaboration 
            with industry leaders to prepare you for tomorrow's tech landscape.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              id={program.title.toLowerCase().replace(/ & | /g, "-")} // e.g., "B.Tech CS" → "b-tech-cs"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card rounded-3xl p-8 border border-border card-hover cursor-pointer"
            >
              <div className="flex items-start gap-5 mb-6">
                <div className={`w-16 h-16 ${program.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <program.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {program.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      Full-time
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {program.description}
              </p>

              <div className="mb-6">
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Career Paths
                </p>
                <div className="flex flex-wrap gap-2">
                  {program.careers.map((career) => (
                    <span
                      key={career}
                      className="px-3 py-1 bg-secondary text-foreground/70 text-sm rounded-full"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>

              <Button variant="ghost" className="group/btn text-primary hover:text-primary p-0 h-auto font-semibold">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button className="btn-primary">
            View All Programs
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProgramsSection;
