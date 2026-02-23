import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Medal, Star, Award, ExternalLink } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "Google Summer of Code 2025",
    description: "15 students selected for GSoC, contributing to open-source projects globally.",
    category: "Global Recognition",
    highlight: "15 Selected",
  },
  {
    icon: Medal,
    title: "ICPC Regional Finals",
    description: "First-year students outperformed final-year IITians in international coding olympiad.",
    category: "Competitive Programming",
    highlight: "Top 10 Rank",
  },
  {
    icon: Star,
    title: "Smart India Hackathon",
    description: "Won 3 out of 5 problem statements at the national-level hackathon.",
    category: "Innovation",
    highlight: "3 Wins",
  },
  {
    icon: Award,
    title: "Research Publications",
    description: "Published 50+ papers in IEEE and ACM conferences in the past year.",
    category: "Research Excellence",
    highlight: "50+ Papers",
  },
];

const studentStories = [
  {
    name: "Priya Sharma",
    role: "B.Tech CS, 2024",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    quote: "From knowing nothing about coding to cracking Google — my journey at Woxsen transformed my career.",
    achievement: "Software Engineer at Google",
  },
  {
    name: "Arjun Patel",
    role: "B.Tech AI, 2024",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    quote: "The AI labs and mentorship helped me build a startup that raised $2M in seed funding.",
    achievement: "Founder, AI Startup",
  },
  {
    name: "Sneha Reddy",
    role: "B.Tech DS, 2023",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    quote: "Real-world projects and industry exposure made me job-ready from day one.",
    achievement: "Data Scientist at Amazon",
  },
];

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="py-24 bg-secondary/30" ref={ref}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold text-sm rounded-full mb-4">
            Achievements
          </span>
          <h2 className="section-title mb-4">
            Our Students <span className="text-gradient">Excel Everywhere</span>
          </h2>
          <p className="section-subtitle mx-auto">
            From global competitions to industry placements, our students consistently 
            demonstrate excellence and innovation.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 border border-border card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <achievement.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {achievement.category}
                </span>
              </div>
              
              <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                {achievement.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {achievement.description}
              </p>
              
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold text-sm rounded-full">
                {achievement.highlight}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Student Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            Student Success Stories
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {studentStories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="group bg-card rounded-3xl p-8 border border-border card-hover"
            >
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div>
                  <h4 className="font-heading font-bold text-foreground">{story.name}</h4>
                  <p className="text-muted-foreground text-sm">{story.role}</p>
                </div>
              </div>
              
              <blockquote className="text-foreground/80 italic mb-6 leading-relaxed">
                "{story.quote}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">{story.achievement}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
