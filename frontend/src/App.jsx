import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { portfolioData } from './data/portfolioData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import CredentialsSection from './components/CredentialsSection';
import ContactSection from './components/ContactSection';
import MediaLightbox from './components/MediaLightbox';
import Footer from './components/Footer';

export default function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [modalMedia, setModalMediaState] = useState(null);
  const [activeModalSlide, setActiveModalSlide] = useState(0);

  const setModalMedia = useCallback((media) => {
    setActiveModalSlide(0);
    setModalMediaState(media);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 450);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalMedia(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setModalMedia]);

  useEffect(() => {
    document.body.style.overflow = modalMedia ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalMedia]);

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F2F1ED] relative overflow-x-hidden">
      {/* Subtle Top Reading Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#2DD4BF] origin-left z-[60]"
        style={{ scaleX }}
      />

      <Navbar />

      <main>
        <Hero profile={portfolioData.profile} keyFacts={portfolioData.keyFacts} />

        <ProjectsSection
          projects={portfolioData.projects}
          onOpenModal={setModalMedia}
        />

        <ExperienceSection
          experience={portfolioData.experience}
          education={portfolioData.education}
          onOpenModal={setModalMedia}
        />

        <CredentialsSection
          bnspCertification={portfolioData.bnspCertification}
          certificates={portfolioData.certificates}
          achievements={portfolioData.achievements}
          development={portfolioData.development}
          onOpenModal={setModalMedia}
        />

        <ContactSection profile={portfolioData.profile} />
      </main>

      <Footer profile={portfolioData.profile} />

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll back to top"
            className="fixed bottom-6 right-6 w-10 h-10 rounded-md bg-[#111317] border border-white/[0.12] flex items-center justify-center text-[#9BA1A6] hover:text-[#F2F1ED] hover:border-white/30 transition-colors z-40 shadow-lg cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <MediaLightbox
        modalMedia={modalMedia}
        activeSlide={activeModalSlide}
        onSlideChange={setActiveModalSlide}
        onClose={() => setModalMedia(null)}
      />
    </div>
  );
}
