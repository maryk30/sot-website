import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const facultyMembers = [
  {
    name: "Dr Pep Lluis Esteva",
    role: "Dean",
  },
  {
    name: "Dr. Amogh Deshmukh",
    role: "Associate Dean",
  },
  {
    name: "Dr. Syed Javeed",
    role: "Associate Professor",
  },
  {
    name: "Dr. Brundhaban Mishra",
    role: "Associate Professor",
  },
];

const Faculty = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faculty" className="py-24 bg-secondary/30" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Our Faculty
          </span>
          <h2 className="section-title mb-4">
            Meet <span className="text-gradient">Our Experts</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Our world-class faculty members are dedicated to mentoring and shaping the next generation of tech leaders.
          </p>
        </motion.div>

        {/* Faculty Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facultyMembers.map((faculty, index) => (
            <motion.div
              key={faculty.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card rounded-3xl p-6 flex flex-col items-center text-center border border-border hover:shadow-strong transition-shadow"
            >
              {/* Image removed */}
              <h3 className="font-heading font-bold text-lg text-foreground mb-1">{faculty.name}</h3>
              <p className="text-muted-foreground text-sm">{faculty.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faculty;