import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const quickLinks = [
  {
    title: "Programs",
    links: [
      { label: "B.Tech Computer Science", href: "#b.tech-computer-science" },
      { label: "B.Tech AI & ML", href: "#b.tech-ai--machine-learning" },
      { label: "B.Tech Data Science", href: "#b.tech-data-science" },
      { label: "B.Tech Cybersecurity", href: "#b.tech-cybersecurity" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Virtual Labs", href: "#labs" },
      { label: "Research", href: "#research" },
      { label: "Library", href: "#library" },
      { label: "Career Services", href: "#careers" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "#about" },
      { label: "Faculty", href: "#faculty" },
      { label: "Campus", href: "#campus" },
      { label: "Accreditations", href: "#accreditations" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/woxsen/", label: "Facebook" },
  { icon: Twitter, href: "https://x.com/Woxsen", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/school/woxsen-university/posts/?feedView=all", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/woxsen_university/", label: "Instagram" },
  { icon: Youtube, href: "https://www.youtube.com/c/WoxsenUniversity", label: "YouTube" },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="section-container py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            <div className="lg:max-w-lg">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Stay Updated with <span className="text-primary">Woxsen Tech</span>
              </h3>
              <p className="text-white/60">
                Get the latest news about admissions, events, and opportunities directly in your inbox.
              </p>
            </div>
            
            <div className="flex gap-3 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-primary min-w-[280px]"
              />
              <Button className="bg-primary hover:bg-accent text-primary-foreground px-6 whitespace-nowrap">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-container py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Brand & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-xl">W</span>
              </div>
              <div>
                <p className="font-heading font-bold text-lg">Woxsen</p>
                <p className="text-white/60 text-sm">School of Technology</p>
              </div>
            </div>
            
            <p className="text-white/60 mb-6 leading-relaxed max-w-md">
              Woxsen School of Technology is dedicated to shaping the next generation of 
              tech leaders through industry-aligned education and cutting-edge research.
            </p>
            
            <div className="space-y-3 text-white/60">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <a
                  href="https://goo.gl/maps/YourCampusLocationHere"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Woxsen University, Kamkole, Sadasivpet, Hyderabad, Telangana 502345
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+911800xxxxxxx" className="hover:underline">+91 1800-xxx-xxxx</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:admissions@woxsen.edu.in" className="hover:underline">admissions@woxsen.edu.in</a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          {quickLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <h4 className="font-heading font-bold text-lg mb-5">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Woxsen School of Technology. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;