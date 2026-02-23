import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApplyNowDialog from "@/components/forms/ApplyNowDialog";

const navItems = [
  { label: "Home", href: "#home" },
  {
    label: "Programs",
    href: "#programs",
    submenu: [
      { label: "B.Tech Computer Science", href: "#b-tech-computer-science" },
      { label: "B.Tech AI & ML", href: "#b-tech-ai--machine-learning" },
      { label: "B.Tech Data Science", href: "#b-tech-data-science" },
      { label: "B.Tech Cybersecurity", href: "#b-tech-cybersecurity" },
    ], 
  },
  { label: "Research", href: "#research" },
  { label: "Virtual Labs", href: "#labs" },
  { label: "Achievements", href: "#achievements" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ApplyNowDialog isOpen={isApplyOpen} onClose={() => setIsApplyOpen(false)} />
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-medium py-3"
          : "bg-transparent py-5"
          }`}
      >
        <div className="section-container">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src= "/woxsen_logo.png"
                alt="Woxsen Logo"
                className="w-12 h-12 object-contain"
              />
              <div className="hidden sm:block">
                <p className={`font-heading font-bold text-lg leading-tight ${isScrolled ? "text-foreground" : "text-white"}`}>
                  Woxsen
                </p>
                <p className={`text-xs font-medium ${isScrolled ? "text-muted-foreground" : "text-white/80"}`}>
                  School of Technology
                </p>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-1 ${isScrolled
                      ? "text-foreground/80 hover:text-primary hover:bg-secondary"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    {item.label}
                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                  </a>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.submenu && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-background rounded-xl shadow-strong border border-border overflow-hidden"
                      >
                        {item.submenu.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-foreground/80 hover:text-primary hover:bg-secondary transition-colors"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="default"
                className="bg-primary hover:bg-accent text-primary-foreground font-semibold px-6 shadow-red hover:shadow-lg transition-all duration-300 hover:scale-105"
                onClick={() => setIsApplyOpen(true)}
              >
                Apply Now
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? "text-foreground hover:bg-secondary" : "text-white hover:bg-white/10"
                }`}
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-4 bg-background rounded-2xl shadow-strong border border-border overflow-hidden"
              >
                <div className="p-4 space-y-2">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block px-4 py-3 rounded-lg text-foreground/80 hover:text-primary hover:bg-secondary transition-colors font-medium"
                    >
                      {item.label}
                    </a>
                  ))}
                  <div className="pt-4 border-t border-border">
                    <Button className="w-full bg-primary hover:bg-accent text-primary-foreground font-semibold shadow-red" onClick={() => { setIsApplyOpen(true); setIsMobileOpen(false); }}>
                      Apply Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
