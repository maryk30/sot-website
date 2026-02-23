import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Lightbulb, CheckCircle } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const values = [
    { icon: Target, title: "Mission", description: "To nurture world-class technologists through industry-aligned education, innovative research, and hands-on learning experiences that prepare students for global careers." },
    { icon: Eye, title: "Vision", description: "To be a globally recognized center of excellence in technology education, driving innovation and producing leaders who shape the future of the digital world." },
    { icon: Lightbulb, title: "Innovation", description: "We foster a culture of creativity and experimentation, encouraging students to challenge conventions and develop breakthrough solutions." },
  ];

  const highlights = [
    "NAAC A+ Accredited University",
    "Industry-Aligned Curriculum",
    "100% Placement Support",
    "World-Class Infrastructure",
    "Expert Faculty from IITs & IIMs",
    "Global Exchange Programs",
    "24/7 Learning Labs Access",
    "Mentorship from Industry Leaders",
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
              About Our School
            </span>
            <h2 className="section-title mb-6">
              Shaping Tomorrow's <span className="text-gradient">Tech Leaders</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Woxsen School of Technology is part of Woxsen University, a premier private university 
              committed to delivering world-class education. Our technology programs are designed in 
              collaboration with industry giants like Google, Microsoft, and Amazon to ensure 
              students are job-ready from day one.
            </p>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground/80 text-sm font-medium">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Values Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group bg-card rounded-2xl p-6 border border-border card-hover"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <value.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
