import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Award, Building, Briefcase } from "lucide-react";

const stats = [
  { icon: Users, value: 2500, suffix: "+", label: "Students Enrolled", description: "Across all programs" },
  { icon: Award, value: 95, suffix: "%", label: "Placement Rate", description: "Industry-leading outcomes" },
  { icon: Building, value: 150, suffix: "+", label: "Partner Companies", description: "Top tech companies" },
  { icon: Briefcase, value: 12, suffix: " LPA", label: "Average Package", description: "Highest: 45 LPA" },
];

const AnimatedCounter = ({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span className="stat-number">
      {count}
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-20 bg-gradient-to-br from-foreground to-woxsen-charcoal relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Numbers That <span className="text-primary">Speak</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Our achievements reflect our commitment to excellence in technology education
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="mb-6 relative inline-block">
                <div className="w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                  <stat.icon className="w-9 h-9 text-primary" />
                </div>
                <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
              </div>
              
              <h3 className="text-white font-semibold text-lg mb-1">{stat.label}</h3>
              <p className="text-white/50 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Partner Logos Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20"
        >
          <p className="text-center text-white/40 text-sm uppercase tracking-wider mb-8">
            Trusted by Leading Companies
          </p>
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-foreground to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-foreground to-transparent z-10" />
            
            <div className="flex animate-marquee">
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center gap-16 px-8">
                  {["Google", "Microsoft", "Amazon", "Meta", "Apple", "IBM", "Oracle", "SAP", "Infosys", "TCS"].map((company) => (
                    <div
                      key={`${setIndex}-${company}`}
                      className="text-white/30 hover:text-white/60 transition-colors font-heading font-bold text-xl whitespace-nowrap"
                    >
                      {company}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
