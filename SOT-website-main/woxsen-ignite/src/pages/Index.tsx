import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import StatsSection from "@/components/sections/StatsSection";
import VirtualLabsSection from "@/components/sections/VirtualLabsSection";
import ResearchSection from "@/components/sections/ResearchSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import EventsSection from "@/components/sections/EventsSection";
import FacultySection from "@/components/sections/Faculty"; // <- New
import Footer from "@/components/layout/Footer";
import AIChatbot from "@/components/chat/AIChatbot";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ProgramsSection />
      <FacultySection /> {/* <- Added Faculty section */}
      <VirtualLabsSection />
      <ResearchSection />
      <AchievementsSection />
      <EventsSection />
      <Footer />
      <AIChatbot />
    </main>
  );
};

export default Index;