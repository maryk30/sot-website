import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Cpu, FlaskConical, Cog, Monitor, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScheduleVisitDialog from "@/components/forms/ScheduleVisitDialog";

const labs = [
  {
    icon: Cpu,
    title: "AI & ML Lab",
    description: "Hands-on experience with neural networks, deep learning frameworks, and GPU-accelerated computing.",
    features: ["TensorFlow & PyTorch", "GPU Cluster", "Real-time Inference"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
  },
  {
    icon: Monitor,
    title: "Cloud Computing Lab",
    description: "Multi-cloud environments with AWS, Azure, and GCP for scalable application development.",
    features: ["AWS Academy", "Azure DevOps", "Kubernetes Clusters"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  },
  {
    icon: FlaskConical,
    title: "IoT & Robotics Lab",
    description: "Design and build connected devices, sensors, and autonomous robotic systems.",
    features: ["Arduino & Raspberry Pi", "Drone Programming", "Sensor Networks"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
  },
  {
    icon: Cog,
    title: "Cybersecurity Lab",
    description: "Simulate cyber attacks, practice ethical hacking, and build secure systems.",
    features: ["Penetration Testing", "SOC Simulation", "Forensics Tools"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
  },
];

const VirtualLabsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isVisitOpen, setIsVisitOpen] = useState(false);

  return (
    <>
      <ScheduleVisitDialog isOpen={isVisitOpen} onClose={() => setIsVisitOpen(false)} />
      <section id="labs" className="py-24 bg-background" ref={ref}>
        <div className="section-container">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
              Virtual Labs
            </span>
            <h2 className="section-title mb-4">
              State-of-the-Art <span className="text-gradient">Learning Labs</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Experience hands-on learning in our cutting-edge virtual and physical laboratories
              equipped with industry-standard tools and technologies.
            </p>
          </motion.div>

          {/* Labs Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {labs.map((lab, index) => (
              <motion.div
                key={lab.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-card rounded-3xl overflow-hidden border border-border card-hover"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={lab.image}
                    alt={lab.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                  {/* Floating Icon */}
                  <div className="absolute bottom-4 left-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-red">
                      <lab.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-4">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {lab.title}
                  </h3>
                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    {lab.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {lab.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button variant="ghost" className="group/btn text-primary hover:text-primary p-0 h-auto font-semibold">
                    Explore Lab
                    <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-accent p-8 md:p-12"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Ready to Experience Our Labs?
                </h3>
                <p className="text-white/80">
                  Schedule a virtual tour or visit our campus to explore our state-of-the-art facilities.
                </p>
              </div>
              <Button className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 rounded-xl whitespace-nowrap" onClick={() => setIsVisitOpen(true)}>
                Schedule a Tour
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default VirtualLabsSection;
