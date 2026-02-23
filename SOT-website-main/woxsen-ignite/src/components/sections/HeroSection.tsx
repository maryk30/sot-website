import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Award, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApplyNowDialog from "@/components/forms/ApplyNowDialog";

const HeroSection = () => {
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  return (
    <>
      <ApplyNowDialog isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/Dr3guNv3H0A?autoplay=1&mute=1&loop=1&playlist=Dr3guNv3H0A&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=https://lovable.dev"
            title="Background Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ border: 'none' }}
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />

        {/* Content */}
        <div className="relative z-10 section-container w-full py-20 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="pt-24 lg:pt-0"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6"
              >
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-white/90 text-sm font-medium">Industry-Aligned Curriculum</span>
              </motion.div>

              <h1 className="hero-title mb-6">
                <span className="block">Transform Your</span>
                <span className="block text-gradient bg-gradient-to-r from-primary via-red-400 to-primary">Future in Tech</span>
              </h1>

              <p className="hero-subtitle mb-8 max-w-lg">
                Woxsen School of Technology offers cutting-edge undergraduate programs in
                Computer Science, AI, Machine Learning & Data Science with 100% placement support.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 mb-10">
                {[
                  { icon: Users, value: "2000+", label: "Students" },
                  { icon: Award, value: "95%", label: "Placement Rate" },
                  { icon: BookOpen, value: "15+", label: "Programs" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-xl">{stat.value}</p>
                      <p className="text-white/60 text-sm">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <Button className="btn-primary group" onClick={() => setIsApplyOpen(true)}>
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  variant="outline"
                  className="btn-outline group bg-primary text-white border-primary hover:bg-primary/90 hover:text-white"
                  onClick={() => window.open('https://youtu.be/ylmRK_1X_yc?si=QAXI9_-LlE3dLp_4', '_blank')}
                >
                  <Play className="w-5 h-5 mr-2 text-white" />
                  Watch Campus Tour
                </Button>
              </motion.div>
            </motion.div>


          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
