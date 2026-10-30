import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, ArrowRight, ArrowUp, ExternalLink, X } from 'lucide-react';

const ImageSlider = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Activity"
        />
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All Projects');
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [bnspTab, setBnspTab] = useState('front');
  const [modalMedia, setModalMedia] = useState(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalMedia(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // We will fetch from FastAPI backend later
    // axios.get('http://127.0.0.1:8000/portfolio-data').then(res => setPortfolioData(res.data));
    
    // Simulate loading delay for splash screen effect
    setTimeout(() => {
      setPortfolioData({
      profile: {
          name: "Mochamad Rois Nabhan",
          title: "Material Physics & Data Science",
          description: "Data Analyst and Machine Learning enthusiast with a solid background in Material Physics and advanced scientific research. I'd thrive at the intersection of mathematical theory and practical software engineering. Proven ability to architect end-to-end data pipelines, develop sophisticated predictive algorithms, and deploy analytical solutions that solve real-world problems. Committed to continuous learning, I'd leverage my deep analytical mindset to transform complex datasets into clear, data-driven decisions that propel business growth and technological advancement.",
          location: "South Jakarta, DKI Jakarta"
      },
      education: {
          institution: "Universitas Pendidikan Indonesia",
          location: "Bandung, Indonesia",
          type: "University",
          year: "2025",
          degree: "Bachelor of Science (S.Si), Physics",
          gpa: "3.40/4.0",
          ptesol: "510",
          awards: [
              "An awardee of Faculty of Mathematics and Natural Science IoT Appreciation. (2021 – 2022)",
              "An awardee of Faculty of Mathematics and Natural Science Senior Innovator Appreciation (2022 – 2023)"
          ]
      },
      experience: [
          {
              company: "PT Bank Rakyat Indonesia Tbk (BRI) • Danantara Indonesia",
              role: "Data Analyst",
              duration: "Juni 2026 - Present",
              idCard: "/danantara-bri-id-card.jpg",
              sliderImages: [
                  "/bri_nrf_activities/img_1.jpg",
                  "/bri_nrf_activities/img_2.jpg",
                  "/bri_nrf_activities/img_3.jpg",
                  "/bri_nrf_activities/img_4.jpg",
                  "/bri_nrf_activities/img_5.jpg",
                  "/bri_nrf_activities/img_6.jpg"
              ],
              highlights: [
                  "Evaluated risk profiles to ensure all credit card approvals strictly aligned with internal compliance and target market policies.",
                  "Conducted end to end applicant data validation across multiple financial systems to prevent fraud.",
                  "Analyzed applicant incomes and existing banking assets to make data driven, responsible credit limit recommendations.",
                  "Evaluation process for diverse card products, including Co-Branded, Regular, and Virtual Credit Cards (VCC)."
              ]
          },
          {
              company: "PT Bank Rakyat Indonesia Tbk (BRI)",
              role: "Junior Data Analyst",
              duration: "November 2025 - Mei 2026",
              idCard: "/bri-id-card.jpg",
              sliderImages: Array.from({length: 5}, (_, i) => `/crm_bri_activities/img_${i+1}.jpg`),
              highlights: [
                  "Engineered an interactive internal web application for scorecard management, integrating dynamic risk grading, manual override capabilities, and captive filtering to streamline the credit decision workflow.",
                  "Conducted the technical review and performance validation of the merged (NFI-FI) Credit Scorecard model, ensuring predictive robustness by evaluating the Kolmogorov-Smirnov (KS) Statistic, Population Stability Index (PSI), and Score Banding.",
                  "Supported the end-to-end development lifecycle of Application, Behavior, and Collection (A/B/C) scorecards, optimizing the institution's automated credit risk assessment parameters.",
                  "Executed rigorous data preprocessing and feature engineering, utilizing Information Value (IV) and Weight of Evidence (WoE) binning to strengthen Probability of Default (PD) prediction models."
              ]
          },
          {
              company: "Balai Besar Keramik (BBSPJIKMN)",
              role: "Research Internship",
              duration: "Februari 2024 - Juni 2024",
              idCard: "/thervek-sack.png",
              sliderImages: Array.from({length: 10}, (_, i) => `/bbk_activities/img_${i+1}.jpg`),
              highlights: [
                  "Conducted comprehensive physical and mechanical testing of THERVEK F monolithic refractories (AGC Plibrico) according to international ASTM standards, including Bulk Density, Apparent Porosity, and Modulus of Rupture (MOR) evaluations.",
                  "Executed high-temperature thermal analyses, such as Pyrometric Cone Equivalent (PCE) and Permanent Linear Change (PLC) testing, to accurately determine the refractoriness and dimensional stability of castable materials.",
                  "Performed rigorous Abrasion Resistance (ASTM C 704) and Thermal Shock (ASTM C 1171) tests to evaluate the material's durability and structural integrity under extreme operating conditions.",
                  "Processed and analyzed complex experimental data to generate detailed quality control reports, ensuring the refractory materials met stringent industrial requirements for high-temperature applications."
              ]
          },
          {
              company: "Badan Riset dan Inovasi Nasional (BRIN)",
              role: "Researcher Internship",
              duration: "Januari 2023 - Juli 2023",
              idCard: "/brin-id-card.png",
              sliderImages: Array.from({length: 8}, (_, i) => `/brin_activities/img_${i+1}.jpg`),
              highlights: [
                  "Spearheaded the research and development of high-performance activated carbon materials specifically optimized for the efficient removal of Methylene Blue dye.",
                  "Conducted comprehensive quantitative studies on adsorption isotherms and reaction kinetics to evaluate material efficiency and maximize adsorption capacity.",
                  "Performed advanced structural and morphological characterization of synthesized materials utilizing Scanning Electron Microscopy (SEM) and X-Ray Diffraction (XRD)."
              ]
          },
          {
              company: "Kampus Mengajar",
              role: "Tutor Junior High School",
              duration: "August 2021 - December 2021",
              idCard: "/kampus_mengajar_plaque.jpg",
              sliderImages: Array.from({length: 5}, (_, i) => `/kampus_mengajar_activities/img_${i+1}.jpg`),
              highlights: [
                  "Designed and delivered structured curricula in physics, mathematics, and logical reasoning for junior high school students.",
                  "Monitored and evaluated student progress, implementing targeted learning strategies to enhance comprehension.",
                  "Fostered an engaging learning environment, resulting in measurable improvements in students' analytical skills."
              ]
          }
      ],
      projects: [
          {
              title: "Credit Data System",
              category: "Data Analytics",
              year: "2026",
              desc: "Comprehensive credit record search, automated pre-approval calculation, and SLIK applicant validation platform for enterprise credit workflow.",
              tags: ["React", "FastAPI", "SQL", "Risk Scoring", "SLIK"],
              badge: "Enterprise Platform",
              image: "/credit_lookup/img_1.jpg",
              sliderImages: [
                  "/credit_lookup/img_1.jpg",
                  "/credit_lookup/img_2.jpg",
                  "/credit_lookup/img_3.jpg",
                  "/credit_lookup/img_4.jpg",
                  "/credit_lookup/img_5.jpg"
              ]
          },
          {
              title: "NLP Voice Scoring (Sentinel)",
              category: "AI & Machine Learning",
              year: "2026",
              desc: "Deep dive analysis and voice scoring dashboard with light glassmorphism UI for audio emotion & sentiment analysis.",
              tags: ["Python", "NLP", "Machine Learning", "FastText", "Speech Analytics"],
              badge: "AI Powered",
              image: "/nlp-voice-scoring.gif"
          },
          {
              title: "Merged Credit Scorecard Model",
              category: "Data Science",
              year: "2026",
              desc: "Technical review and advanced statistical analysis for risk prediction evaluating KS Statistic, PSI, and score banding.",
              tags: ["Python", "Risk Modeling", "KS Stat", "PSI", "WoE / IV"],
              badge: "Financial Modeling",
              image: "/merged-credit-scorecard.gif"
          },
          {
              title: "Scorecard Builder App",
              category: "Data Analytics",
              year: "2026",
              desc: "Interactive web application for credit scorecard management with dynamic risk grading and manual override capabilities.",
              tags: ["Web App", "Python", "Interactive Analytics", "Risk Decisioning"],
              badge: "Internal Tool",
              image: "/scorecard-builder.gif"
          },
          {
              title: "Activated Carbon Dye Removal",
              category: "Material Science",
              year: "2025",
              desc: "Research on adsorption isotherms and reaction kinetics for Methylene Blue dye removal using high-performance activated carbon.",
              tags: ["Material Physics", "Adsorption Kinetics", "SEM & XRD", "BRIN Research"],
              badge: "National Research",
              image: "/activated-carbon.gif"
          },
          {
              title: "CalGen",
              category: "Software",
              year: "2022",
              desc: "Customizable Calculating App Generator Platform designed to assist students and researchers in mathematical computing.",
              tags: ["Software Dev", "Algorithm", "App Generator", "Python"],
              badge: "🥈 Silver Award - MIIX 2022",
              image: "/calgen.gif"
          },
          {
              title: "AFIF - TDCS",
              category: "IoT",
              year: "2021",
              desc: "Automatic Fish Feeder and Turbidity Device Censored System integrating sensors, automated microcontrollers, and live monitoring.",
              tags: ["IoT Hardware", "Microcontroller", "Turbidity Sensor", "Automation"],
              badge: "🥉 Bronze Award - IIIC 2021",
              image: "/afif-tdcs.gif"
          }
      ],
      achievements: [
          { title: "FPMIPA Awards & HMF Appreciation 2021", role: "Awardee", date: "August - December 2021", desc: "Received awards for IoT projects that have been completed in international events" },
          { title: "International Invention and Innovative Competition 2021", role: "Bronze Award", date: "June 2021", desc: "Contributed as a Project Leader and Initiator of a project named \"AFIF - TDCS\" (Automatic Fish Feeder and Turbidity Device Censored System)" },
          { title: "Lecturer and Laborant Assistant - Basic Physics Laboratory", role: "Lab Assistant", date: "July 2021", desc: "Assisted Lecturer and laborant preparing their asynchronous learning video for junior scholar" },
          { title: "Malaysia Invention and Inovation Expo 2022", role: "Silver Award", date: "April 2022", desc: "Contributed as a part Initiator and project scriptwriter of a project named \"CalGen\" (Customizable Calculating App Generator Platform)" },
          { title: "FPMIPA Awards & HMF Appreciation 2022", role: "Awardee", date: "January 2023", desc: "Received awards for Senior Innovator that have been completed in international events" },
          { title: "Sertifikasi Kompetensi Asisten Pengembang Web", role: "Certified Competent", date: "Juli 2026", desc: "Certified by Badan Nasional Sertifikasi Profesi (BNSP) & LSP BBPVP Bekasi on 6 core software development competency units." }
      ],
      development: [
          { title: "Sertifikasi Asisten Pengembang Web (Web Developer) | BNSP", date: "Juli 2026 - Juli 2029" },
          { title: "Seminar Nasional Fisika – XI (Article Presenter)", date: "16 Agustus 2025" },
          { title: "Quality Assurance Course | Binar Academy", date: "February - April 2023" },
          { title: "Google Data Analytics | Kemkominfo Digitalents Scholarship", date: "September - November 2022" },
          { title: "Artificial Intelligence Mastery Program | Orbit Future Academy", date: "August - December 2022" },
          { title: "E-Governance Program | Microsoft x Pijar Foundation", date: "July - October 2022" }
      ]
      });
      setIsLoading(false);
    }, 1500); // 1.5 second loading screen
  }, []);

  const categories = portfolioData ? ['All Projects', ...new Set(portfolioData.projects.map(p => p.category))] : [];
  const filteredProjects = portfolioData ? portfolioData.projects.filter(proj => activeFilter === 'All Projects' || proj.category === activeFilter) : [];

  const getBentoLayout = (idx, total) => {
    // Single item filter: Full spotlight card
    if (total === 1) {
      return {
        span: 'col-span-12',
        aspect: 'aspect-[16/10] md:aspect-[21/9]',
        isFeatured: true
      };
    }
    // 2 items: 50/50 balance
    if (total === 2) {
      return {
        span: 'col-span-12 md:col-span-6',
        aspect: 'aspect-[16/10]',
        isFeatured: false
      };
    }
    // 3 items: 1 wide spotlight (8 cols) + 2 compact cards (4 cols each)
    if (total === 3) {
      if (idx === 0) {
        return {
          span: 'col-span-12 lg:col-span-8',
          aspect: 'aspect-[16/10] lg:aspect-[16/9]',
          isFeatured: true
        };
      }
      return {
        span: 'col-span-12 sm:col-span-6 lg:col-span-4',
        aspect: 'aspect-[16/10]',
        isFeatured: false
      };
    }
    // 4 items: 2x2 grid
    if (total === 4) {
      return {
        span: 'col-span-12 sm:col-span-6',
        aspect: 'aspect-[16/10]',
        isFeatured: false
      };
    }

    // Default 'All Projects' (7 items) - Full Responsive Bento Grid:
    // Row 1: Item 0 (span 8) + Item 1 (span 4) = 12 cols
    // Row 2: Item 2 (span 4) + Item 3 (span 4) + Item 4 (span 4) = 12 cols
    // Row 3: Item 5 (span 6) + Item 6 (span 6) = 12 cols
    const bentoConfig = [
      { span: 'col-span-12 lg:col-span-8', aspect: 'aspect-[16/10] md:aspect-[16/9]', isFeatured: true },
      { span: 'col-span-12 sm:col-span-6 lg:col-span-4', aspect: 'aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10]', isFeatured: false },
      { span: 'col-span-12 sm:col-span-6 lg:col-span-4', aspect: 'aspect-[16/10]', isFeatured: false },
      { span: 'col-span-12 sm:col-span-6 lg:col-span-4', aspect: 'aspect-[16/10]', isFeatured: false },
      { span: 'col-span-12 sm:col-span-6 lg:col-span-4', aspect: 'aspect-[16/10]', isFeatured: false },
      { span: 'col-span-12 sm:col-span-6 lg:col-span-6', aspect: 'aspect-[16/10] lg:aspect-[16/9]', isFeatured: true },
      { span: 'col-span-12 sm:col-span-6 lg:col-span-6', aspect: 'aspect-[16/10] lg:aspect-[16/9]', isFeatured: true },
    ];

    return bentoConfig[idx % bentoConfig.length] || { span: 'col-span-12 md:col-span-6', aspect: 'aspect-[16/10]', isFeatured: false };
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="splash-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
          >
            <div className="relative w-32 h-32 flex items-center justify-center mb-8">
              <div className="absolute inset-0 rounded-full border-t-4 border-tertiary animate-spin opacity-80" style={{ animationDuration: '2s' }}></div>
              <div className="absolute inset-2 rounded-full border-b-4 border-secondary animate-spin opacity-80" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              <div className="absolute inset-4 rounded-full border-l-4 border-primary animate-spin opacity-50" style={{ animationDuration: '3s' }}></div>
              <span className="text-on-surface font-display-xl font-bold text-3xl tracking-tighter">RN</span>
            </div>
            <div className="font-label-caps text-tertiary tracking-[0.4em] text-[12px] animate-pulse">
              INITIALIZING KINETIC NOIR...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && portfolioData && (
        <div className="bg-background text-on-surface font-body-md min-h-screen relative overflow-x-hidden selection:bg-tertiary selection:text-tertiary-container">
            <motion.div
                className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-secondary via-tertiary to-primary origin-left z-50"
                style={{ scaleX }}
            />
      {/* Global Background Blobs */}
      <div className="blob-bg"></div>
      <div className="bg-blob bg-secondary w-[600px] h-[600px] top-[-100px] left-[-100px]"></div>
      <div className="bg-blob bg-tertiary w-[500px] h-[500px] bottom-1/4 right-[-50px]"></div>

      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/40 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all cubic-bezier(0.4, 0, 0.2, 1)">
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 max-w-7xl mx-auto">
          <div className="text-xl sm:text-2xl font-black tracking-tighter text-white font-display-xl uppercase">PORTFOLIO</div>
          <ul className="hidden md:flex gap-8 items-center font-label-caps uppercase text-sm tracking-wide">
            <li><a className="text-zinc-400 hover:text-white transition-colors duration-300 font-semibold hover:scale-105 hover:text-tertiary" href="#home">Home</a></li>
            <li><a className="text-zinc-400 hover:text-white transition-colors duration-300 font-semibold hover:scale-105 hover:text-tertiary" href="#portfolio">Portfolio</a></li>
            <li><a className="text-zinc-400 hover:text-white transition-colors duration-300 font-semibold hover:scale-105 hover:text-tertiary" href="#experience">Resume</a></li>
            <li><a className="text-zinc-400 hover:text-white transition-colors duration-300 font-semibold hover:scale-105 hover:text-tertiary" href="#achievements">Skills</a></li>
            <li><a className="text-zinc-400 hover:text-white transition-colors duration-300 font-semibold hover:scale-105 hover:text-tertiary" href="#contact">Contact</a></li>
          </ul>
          <a className="hidden md:inline-block font-label-caps uppercase bg-secondary-container text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform duration-300" href="#contact">Let's Connect</a>
          <button className="md:hidden text-on-surface p-1">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <main className="pt-[80px] sm:pt-[100px]">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center relative px-4 sm:px-6 md:px-8 mt-8 sm:mt-16 mb-12">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="col-span-1 md:col-span-8 md:pr-12 relative z-20"
            >
              <div className="inline-block px-4 py-1 mb-6 rounded-full bg-surface-container-high border border-outline-variant">
                <span className="font-label-caps text-[12px] sm:text-[14px] text-tertiary tracking-widest uppercase">{portfolioData.profile.title}</span>
              </div>
              <h1 className="font-display-xl text-[36px] sm:text-[54px] md:text-[80px] font-extrabold text-on-surface leading-[1.1] mb-6 sm:mb-8">
                HI, I'M <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-tertiary italic font-black uppercase py-2 pr-4">{portfolioData.profile.name}</span><br/>
                DATA <span className="font-light italic text-on-surface-variant">DRIVEN</span>.
              </h1>
              <p className="font-body-lg text-[15px] sm:text-[18px] text-on-surface-variant max-w-xl mb-8 sm:mb-10 leading-relaxed">
                {portfolioData.profile.description}
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
                <a className="bg-secondary-container text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-label-caps text-[13px] sm:text-[14px] uppercase tracking-wider hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(49,49,192,0.4)]" href="#portfolio">View Work</a>
                <a className="glass-panel text-on-surface px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-label-caps text-[13px] sm:text-[14px] uppercase tracking-wider border-tertiary border hover:scale-105 transition-transform duration-300 flex items-center gap-2" href="#contact">
                  Our Approach <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="col-span-1 md:col-span-4 relative mt-8 md:mt-0 z-10 md:-ml-12"
            >
              <div className="relative w-full aspect-[3/4] rounded-[24px] overflow-hidden glass-panel bg-surface-container-highest flex items-center justify-center dynamic-neon-frame">
                <img src="/nabhan-batik.png" alt="Hero Portrait" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute -bottom-4 -left-2 sm:-bottom-8 sm:-left-8 glass-panel p-4 sm:p-6 rounded-[16px] backdrop-blur-xl border border-white/10 shadow-2xl z-30">
                <div className="font-display-xl text-[30px] sm:text-[40px] font-black leading-none text-tertiary">S.Si</div>
                <div className="font-label-caps text-[12px] sm:text-[14px] text-on-surface-variant uppercase mt-1">Material Physics</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Gallery Section */}
        <section id="portfolio" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 pt-20 md:pt-32 pb-16">
          <header className="mb-12">
              <h1 className="font-display-xl text-[34px] sm:text-[48px] md:text-[60px] text-primary mb-2 font-bold uppercase leading-tight">Selected Works</h1>
              <p className="font-body-lg text-[15px] sm:text-[18px] text-on-surface-variant max-w-2xl">Exploring the intersection of physics and data science. A collection of experimental research and data models.</p>
          </header>
          <div className="mb-12 flex flex-wrap gap-4 items-center">
              {categories.map(category => (
                  <button 
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`glass-panel px-6 py-2 rounded-full font-label-caps text-[14px] transition-colors ${
                          activeFilter === category
                              ? 'text-tertiary border border-tertiary/30 bg-tertiary/10'
                              : 'text-on-surface-variant border border-transparent hover:border-on-surface/20'
                      }`}
                  >
                      {category}
                  </button>
              ))}
          </div>
          <div className="grid grid-cols-12 gap-6 md:gap-8 items-stretch">
              {filteredProjects.map((proj, idx) => {
                  const bento = getBentoLayout(idx, filteredProjects.length);
                  return (
                      <motion.article 
                          key={proj.title || idx} 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.6, delay: idx * 0.08 }}
                          onClick={() => setModalMedia({
                              ...proj,
                              type: 'project'
                          })}
                          className={`${bento.span} glass-card dynamic-neon-frame rounded-2xl md:rounded-3xl p-5 md:p-6 group hover-lift cursor-pointer flex flex-col justify-between transition-all duration-500 border border-white/5 hover:border-tertiary/40 bg-surface-container-low/80 backdrop-blur-xl relative overflow-hidden`}
                      >
                          {/* Accent Top Gradient Line */}
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-tertiary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Image Container with Dynamic Bento Aspect */}
                          <div className={`relative rounded-xl overflow-hidden ${bento.aspect} mb-5 bg-black/40 flex items-center justify-center border border-white/5 group-hover:border-tertiary/30 transition-colors`}>
                              {proj.sliderImages && proj.sliderImages.length > 0 ? (
                                  <ImageSlider images={proj.sliderImages} interval={3200} />
                              ) : proj.image ? (
                                  <img 
                                      src={proj.image} 
                                      alt={proj.title} 
                                      className={`absolute inset-0 w-full h-full ${proj.objectFit || 'object-cover'} opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 z-0`} 
                                  />
                              ) : (
                                  <span className="text-on-surface-variant font-label-caps tracking-widest z-10">[ IMAGE PLACEHOLDER ]</span>
                              )}
                              
                              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity z-10 pointer-events-none"></div>

                              {/* Corner Quick View Button */}
                              <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-background/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-on-surface-variant group-hover:text-tertiary group-hover:scale-110 group-hover:border-tertiary/40 transition-all shadow-lg">
                                  <ExternalLink className="w-4 h-4" />
                              </div>

                              {/* Floating Badges */}
                              <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5">
                                      <span className="bg-background/85 backdrop-blur-md px-2.5 py-0.5 rounded-full font-label-caps text-[11px] text-tertiary uppercase tracking-wider border border-tertiary/30 font-semibold shadow-sm">
                                          {proj.category}
                                      </span>
                                      <span className="bg-background/85 backdrop-blur-md px-2.5 py-0.5 rounded-full font-label-caps text-[11px] text-on-surface-variant uppercase tracking-wider border border-white/10 shadow-sm">
                                          {proj.year}
                                      </span>
                                  </div>
                                  {proj.badge && (
                                      <span className="bg-primary/25 backdrop-blur-md px-2.5 py-0.5 rounded-full font-label-caps text-[10px] text-primary border border-primary/30 font-bold uppercase tracking-wider shadow-sm">
                                          {proj.badge}
                                      </span>
                                  )}
                              </div>
                          </div>

                          {/* Text & Content Block */}
                          <div className="flex flex-col flex-grow justify-between gap-3">
                              <div>
                                  <h2 className="font-headline-lg text-[20px] md:text-[24px] font-bold text-on-surface group-hover:text-primary transition-colors leading-snug">
                                      {proj.title}
                                  </h2>
                                  <p className="font-body-md text-[13px] md:text-[14px] text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
                                      {proj.desc}
                                  </p>
                              </div>

                              {/* Tech Stack Tags */}
                              {proj.tags && proj.tags.length > 0 && (
                                  <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5 mt-2">
                                      {proj.tags.map((tag, tIdx) => (
                                          <span key={tIdx} className="text-[11px] px-2 py-0.5 rounded-md bg-surface-container/60 border border-white/5 text-on-surface-variant font-mono">
                                              #{tag}
                                          </span>
                                      ))}
                                  </div>
                              )}
                          </div>
                      </motion.article>
                  );
              })}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="pt-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
            <header className="mb-16 md:mb-24">
                <h1 className="font-display-xl text-[32px] sm:text-[42px] md:text-[60px] font-bold text-on-surface mb-2 uppercase leading-tight">Experience &amp; Education.</h1>
                <p className="font-body-lg text-[15px] md:text-[18px] text-on-surface-variant max-w-2xl">A history of building high-quality results in research, data analytics, and technological innovation.</p>
            </header>
            
            {/* Education Block - Responsive Bento Grid for all devices */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="mb-12 md:mb-16 glass-card dynamic-neon-frame rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-12 relative overflow-hidden group bg-surface-container-low/90 backdrop-blur-xl border border-white/5 shadow-2xl"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-tertiary to-primary"></div>
                
                {/* Header with Institution & Year Badge */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-tertiary text-sm">🎓</span>
                            <h2 className="font-display-xl text-[26px] sm:text-[32px] md:text-[40px] font-bold text-on-surface tracking-tight">EDUCATION</h2>
                        </div>
                        <h3 className="font-headline-md text-[18px] sm:text-[20px] md:text-[24px] text-primary leading-snug font-semibold">
                            {portfolioData.education.institution}
                            <span className="text-on-surface-variant font-body-md text-[14px] sm:text-[16px] md:text-[18px] block sm:inline sm:ml-2">
                                — {portfolioData.education.location} | {portfolioData.education.type}
                            </span>
                        </h3>
                    </div>
                    <div className="bg-surface-container px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-label-caps text-tertiary tracking-widest text-[12px] sm:text-[14px] shrink-0 border border-tertiary/20 font-bold shadow-sm">
                        {portfolioData.education.year}
                    </div>
                </div>
                
                {/* Bento Grid: Left Credentials Tile + Right Two Portrait Graduation Tiles */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
                    {/* Left Bento: Academic Details */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-5 bg-surface-container/40 rounded-2xl p-5 sm:p-7 border border-white/5">
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-baseline gap-2">
                                <span className="font-body-lg text-[16px] sm:text-[18px] font-bold text-secondary leading-snug">
                                    {portfolioData.education.degree}
                                </span>
                            </div>
                            
                            {/* Key Stats Pills */}
                            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
                                <div className="px-3.5 py-1.5 rounded-xl bg-surface-container border border-white/10 flex items-center gap-2 shadow-sm">
                                    <span className="text-on-surface-variant text-xs uppercase tracking-wider font-semibold">Cumulative GPA:</span>
                                    <span className="text-tertiary font-bold text-sm sm:text-base">{portfolioData.education.gpa}</span>
                                </div>
                                <div className="px-3.5 py-1.5 rounded-xl bg-surface-container border border-white/10 flex items-center gap-2 shadow-sm">
                                    <span className="text-on-surface-variant text-xs uppercase tracking-wider font-semibold">PTESOL Score:</span>
                                    <span className="text-tertiary font-bold text-sm sm:text-base">{portfolioData.education.ptesol}</span>
                                </div>
                            </div>
                        </div>

                        {/* Honors & Awards */}
                        <div className="pt-4 border-t border-white/10">
                            <p className="text-[12px] uppercase tracking-wider text-on-surface-variant font-semibold mb-3 flex items-center gap-1.5">
                                <span className="text-tertiary">🏆</span> Honors &amp; Awards:
                            </p>
                            <ul className="space-y-2.5">
                                {portfolioData.education.awards.map((award, i) => (
                                    <li key={i} className="flex items-start text-on-surface-variant font-body-md text-[13px] sm:text-[15px] leading-relaxed">
                                        <span className="text-tertiary mr-2.5 mt-0.5 shrink-0 text-xs">✦</span>
                                        <span>{award}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    {/* Right Bento: 2 Portrait Graduation Photos Side-by-Side (Bento Layout for ALL Devices) */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-5 items-stretch">
                        {/* Graduation Photo 1 */}
                        <div 
                            onClick={() => setModalMedia({
                                title: "Academic Convocation Ceremony - UPI",
                                image: "/track_record_image.jpg",
                                category: "Graduation Milestones",
                                desc: "Prosesi Wisuda Sarjana Fisika (S.Si) Universitas Pendidikan Indonesia bersama map kelulusan.",
                                type: "education"
                            })}
                            className="w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto lg:h-full rounded-xl sm:rounded-2xl overflow-hidden glass-panel bg-surface-container flex items-center justify-center dynamic-neon-frame group/img relative cursor-zoom-in border border-white/5 shadow-xl hover-lift"
                        >
                            <img 
                                src="/track_record_image.jpg" 
                                alt="Track Record & Graduation" 
                                className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover/img:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-2 sm:p-3">
                                <span className="text-[10px] sm:text-[11px] font-label-caps text-on-surface uppercase tracking-wider font-semibold flex items-center gap-1">
                                    <ExternalLink className="w-3 h-3 text-tertiary" /> Perbesar
                                </span>
                            </div>
                        </div>

                        {/* Graduation Photo 2 */}
                        <div 
                            onClick={() => setModalMedia({
                                title: "Bachelor of Science (S.Si) Portrait",
                                image: "/college_image.jpg",
                                category: "Academic Graduation",
                                desc: "Potret resmi kelulusan Sarjana Sains Fisika dengan toga akademik dan selempang kehormatan.",
                                type: "education"
                            })}
                            className="w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto lg:h-full rounded-xl sm:rounded-2xl overflow-hidden glass-panel bg-surface-container flex items-center justify-center dynamic-neon-frame group/img relative cursor-zoom-in border border-white/5 shadow-xl hover-lift"
                        >
                            <img 
                                src="/college_image.jpg" 
                                alt="College Graduation Portrait" 
                                className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover/img:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-2 sm:p-3">
                                <span className="text-[10px] sm:text-[11px] font-label-caps text-on-surface uppercase tracking-wider font-semibold flex items-center gap-1">
                                    <ExternalLink className="w-3 h-3 text-tertiary" /> Perbesar
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            
            {/* Certification Proof Block */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="mb-14 md:mb-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            >
                {/* Certificate 1 */}
                <div 
                    onClick={() => setModalMedia({
                        title: "Juara 3 - Malaysia Invention and Innovation Expo 2022",
                        image: "/certificate1.png",
                        category: "Piagam Penghargaan • FPMIPA UPI",
                        desc: "Penghargaan atas kontribusi inovasi proyek CalGen (Customizable Calculating App Generator Platform) pada ajang internasional Malaysia Invention and Innovation Expo 2022.",
                        type: "certificate"
                    })}
                    className="w-full rounded-2xl overflow-hidden glass-card p-4 md:p-6 dynamic-neon-frame relative group/img bg-surface-container-low flex flex-col gap-4 cursor-zoom-in hover-lift transition-all"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-tertiary"></div>
                    <div className="w-full aspect-[1.414/1] rounded-xl overflow-hidden bg-black/20 relative">
                        <img src="/certificate1.png" alt="Malaysia Invention and Innovation Expo 2022" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <ExternalLink className="w-3.5 h-3.5 text-tertiary" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 px-2 pb-2">
                        <h4 className="font-headline-md text-[18px] font-bold text-on-surface group-hover/img:text-primary transition-colors">Juara 3 - Malaysia Invention and Innovation Expo 2022</h4>
                        <p className="font-body-sm text-[14px] text-tertiary uppercase tracking-wider font-semibold">Piagam Penghargaan • FPMIPA UPI</p>
                    </div>
                </div>

                {/* Certificate 2 */}
                <div 
                    onClick={() => setModalMedia({
                        title: "Juara 3 - International Invention & Innovative Competition 2021",
                        image: "/certificate2.png",
                        category: "Piagam Penghargaan • MNNF Network",
                        desc: "Penghargaan Bronze Award atas kontribusi sebagai Project Leader dan Inisiator proyek AFIF-TDCS (Automatic Fish Feeder and Turbidity Device Censored System) pada ajang IIIC 2021.",
                        type: "certificate"
                    })}
                    className="w-full rounded-2xl overflow-hidden glass-card p-4 md:p-6 dynamic-neon-frame relative group/img bg-surface-container-low flex flex-col gap-4 cursor-zoom-in hover-lift transition-all"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-tertiary"></div>
                    <div className="w-full aspect-[1.414/1] rounded-xl overflow-hidden bg-black/20 relative">
                        <img src="/certificate2.png" alt="International Invention & Innovative Competition 2021" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <ExternalLink className="w-3.5 h-3.5 text-tertiary" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 px-2 pb-2">
                        <h4 className="font-headline-md text-[18px] font-bold text-on-surface group-hover/img:text-primary transition-colors">Juara 3 - International Invention &amp; Innovative Competition 2021</h4>
                        <p className="font-body-sm text-[14px] text-tertiary uppercase tracking-wider font-semibold">Piagam Penghargaan • MNNF Network</p>
                    </div>
                </div>

                {/* Certificate 3 */}
                <div 
                    onClick={() => setModalMedia({
                        title: "Presenter Seminar - Physics for a Better World",
                        image: "/certificate3.png",
                        category: "Sertifikat • Seminar Nasional Fisika (SinaFi XI)",
                        desc: "Sertifikat atas partisipasi sebagai Article Presenter dalam kegiatan Seminar Nasional Fisika ke-11 (SinaFi XI) di FPMIPA Universitas Pendidikan Indonesia.",
                        type: "certificate"
                    })}
                    className="w-full rounded-2xl overflow-hidden glass-card p-4 md:p-6 dynamic-neon-frame relative group/img bg-surface-container-low flex flex-col gap-4 cursor-zoom-in hover-lift transition-all"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-tertiary"></div>
                    <div className="w-full aspect-[1.414/1] rounded-xl overflow-hidden bg-black/20 relative">
                        <img src="/certificate3.png" alt="Seminar Nasional Fisika" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <ExternalLink className="w-3.5 h-3.5 text-tertiary" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 px-2 pb-2">
                        <h4 className="font-headline-md text-[18px] font-bold text-on-surface group-hover/img:text-primary transition-colors">Presenter Seminar - Physics for a Better World: Harmonization in Research and Education</h4>
                        <p className="font-body-sm text-[14px] text-tertiary uppercase tracking-wider font-semibold">Sertifikat • Seminar Nasional Fisika (SinaFi XI)</p>
                    </div>
                </div>

                {/* Certificate 4 */}
                <div 
                    onClick={() => setModalMedia({
                        title: "Internship Assistant - Data Analytic",
                        image: "/certificate4.png",
                        category: "Sertifikat Magang • PT Bank Rakyat Indonesia (Persero) Tbk",
                        desc: "Sertifikat resmi Program Pemagangan Lulusan Perguruan Tinggi Kemnaker di PT Bank Rakyat Indonesia (Persero) Tbk posisi Internship Assistant - Data Analytic dengan predikat Sangat Baik.",
                        type: "certificate"
                    })}
                    className="w-full rounded-2xl overflow-hidden glass-card p-4 md:p-6 dynamic-neon-frame relative group/img bg-surface-container-low flex flex-col gap-4 cursor-zoom-in hover-lift transition-all"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-tertiary"></div>
                    <div className="w-full aspect-[1.414/1] rounded-xl overflow-hidden bg-black/20 relative">
                        <img src="/certificate4.png" alt="BRI Internship" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <ExternalLink className="w-3.5 h-3.5 text-tertiary" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 px-2 pb-2">
                        <h4 className="font-headline-md text-[18px] font-bold text-on-surface group-hover/img:text-primary transition-colors">Internship Assistant - Data Analytic</h4>
                        <p className="font-body-sm text-[14px] text-tertiary uppercase tracking-wider font-semibold">Sertifikat Magang • PT Bank Rakyat Indonesia (Persero) Tbk</p>
                    </div>
                </div>

                {/* Certificate 5: Highlight Sertifikat BNSP Web Developer */}
                <div className="md:col-span-2 w-full rounded-2xl md:rounded-3xl overflow-hidden glass-card p-4 sm:p-6 md:p-8 dynamic-neon-frame relative group/img bg-surface-container-low flex flex-col lg:flex-row gap-6 md:gap-8 items-center border border-primary/20 shadow-[0_0_25px_rgba(45,156,219,0.08)]">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-tertiary"></div>
                    
                    {/* Left: Certificate Preview Frame */}
                    <div className="w-full lg:w-5/12 flex flex-col gap-3 shrink-0">
                        <div className={`w-full ${bnspTab === 'all' ? 'aspect-[1.414/1]' : 'aspect-[1/1.3] sm:aspect-[1/1.414]'} rounded-xl overflow-hidden bg-black/40 relative flex items-center justify-center p-2.5 border border-white/5 transition-all`}>
                            {/* Ambient background blur */}
                            <img 
                                src={bnspTab === 'back' ? '/bnsp-certificate-page2.png' : bnspTab === 'all' ? '/bnsp-certificate-combined.png' : '/bnsp-certificate-page1.png'} 
                                alt="" 
                                aria-hidden="true"
                                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 scale-125 pointer-events-none" 
                            />
                            {/* Main Certificate image */}
                            <div 
                                onClick={() => setModalMedia({
                                    title: "Asisten Pengembang Web (Assistant Web Developer)",
                                    image: bnspTab === 'back' ? '/bnsp-certificate-page2.png' : bnspTab === 'all' ? '/bnsp-certificate-combined.png' : '/bnsp-certificate-page1.png',
                                    category: "Sertifikat Kompetensi • BNSP RI & LSP BBPVP Bekasi",
                                    desc: "Sertifikasi Kompetensi Resmi Badan Nasional Sertifikasi Profesi (BNSP) No. Registrasi 2513.J62.3.2.1957.00143.2.0721 Bidang Software Development, berlaku 3 tahun (2026 - 2029) mencakup 6 unit kompetensi SKKNI.",
                                    tags: ["BNSP", "SKKNI", "Web Developer", "Software Development", "LSP BBPVP Bekasi"],
                                    pdf: "/bnsp-sertifikat-web-developer.pdf",
                                    type: "certificate"
                                })}
                                title="Klik untuk memperbesar sertifikat"
                                className="relative z-10 w-full h-full flex items-center justify-center cursor-zoom-in group/img"
                            >
                                <img 
                                    src={bnspTab === 'back' ? '/bnsp-certificate-page2.png' : bnspTab === 'all' ? '/bnsp-certificate-combined.png' : '/bnsp-certificate-page1.png'} 
                                    alt="Sertifikat BNSP Web Developer - Mochamad Rois Nabhan" 
                                    className={`max-h-full max-w-full ${bnspTab === 'all' ? 'object-cover w-full h-full' : 'object-contain'} rounded-lg shadow-2xl transition-transform duration-500 hover:scale-[1.03]`} 
                                />
                                <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant opacity-0 group-hover/img:opacity-100 transition-opacity">
                                    <ExternalLink className="w-3.5 h-3.5 text-tertiary" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Page Switcher Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-surface-container/60 border border-white/5 text-[11px] font-semibold">
                            <button 
                                type="button" 
                                onClick={() => setBnspTab('front')} 
                                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${bnspTab === 'front' ? 'bg-primary text-background font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                            >
                                Sertifikat Utama
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setBnspTab('back')} 
                                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${bnspTab === 'back' ? 'bg-primary text-background font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                            >
                                Unit Kompetensi
                            </button>
                            <button 
                                type="button" 
                                onClick={() => setBnspTab('all')} 
                                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${bnspTab === 'all' ? 'bg-primary text-background font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                            >
                                Lengkap (2 Hal)
                            </button>
                        </div>
                    </div>

                    {/* Right: Certificate Details */}
                    <div className="w-full lg:w-7/12 flex flex-col gap-3.5">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="px-3 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-[11px] font-bold uppercase tracking-wider">
                                🎖️ Highlight Sertifikasi Nasional BNSP
                            </span>
                            <span className="px-3 py-0.5 rounded-full bg-tertiary/10 text-tertiary border border-tertiary/20 text-[11px] font-semibold tracking-wider">
                                2026 - 2029 (Berlaku 3 Tahun)
                            </span>
                        </div>

                        <div>
                            <h3 className="font-headline-md text-[18px] sm:text-[22px] md:text-[24px] font-bold text-on-surface group-hover/img:text-primary transition-colors leading-snug">
                                Asisten Pengembang Web (Assistant Web Developer)
                            </h3>
                            <p className="font-body-sm text-[13px] md:text-[14px] text-tertiary uppercase tracking-wider font-semibold mt-1">
                                Sertifikat Kompetensi • Badan Nasional Sertifikasi Profesi (BNSP) &amp; BBPVP Bekasi
                            </p>
                            <p className="text-[12px] text-on-surface-variant font-mono mt-1 break-words">
                                No. Registrasi: <span className="text-secondary font-semibold">2513.J62.3.2.1957.00143.2.0721</span> • Bidang Software Development
                            </p>
                        </div>

                        {/* Verified Competencies */}
                        <div className="pt-2 border-t border-white/10">
                            <p className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold mb-2">
                                6 Unit Kompetensi Terverifikasi (SKKNI):
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                {[
                                    "Mengimplementasikan UI",
                                    "Eksekusi Bahasa Pemrograman",
                                    "Pengorganisasian File & Modul Rapi",
                                    "Guidelines & Best Practices",
                                    "Pemrograman Terstruktur",
                                    "Library & Komponen Pre-Existing"
                                ].map((unit, idx) => (
                                    <div key={idx} className="text-[11px] px-2.5 py-1.5 rounded-lg bg-surface-container/70 border border-white/5 text-on-surface/90 flex items-center gap-1.5">
                                        <span className="text-tertiary text-xs shrink-0">✦</span>
                                        <span className="leading-snug">{unit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                            <a 
                                href="/bnsp-sertifikat-web-developer.pdf" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-background font-bold text-[13px] hover:shadow-[0_0_15px_rgba(45,156,219,0.4)] transition-all transform hover:-translate-y-0.5"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Buka Dokumen Asli (PDF)
                            </a>
                            <span className="text-[11px] text-on-surface-variant">
                                Terakreditasi Standar Kompetensi Kerja Nasional (SKKNI)
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
                {/* Timeline Center Line (Desktop) / Left Line (Mobile) */}
                <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] timeline-line md:-translate-x-1/2 z-0"></div>
                
                {portfolioData.experience.map((exp, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                        <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className={`col-span-1 md:col-span-12 relative flex items-start md:items-center w-full mb-20 group ${isEven ? 'flex-col-reverse md:flex-row' : 'flex-col md:flex-row'}`}
                        >
                            {/* Dot */}
                            <div className={`absolute left-[16px] md:left-1/2 top-[40px] md:top-auto rounded-full -translate-x-1/2 z-10 transition-transform group-hover:scale-150 duration-300 ${isEven ? 'w-4 h-4 bg-tertiary shadow-[0_0_15px_rgba(60,221,199,0.8)]' : 'w-3 h-3 border-2 border-tertiary bg-background'}`}></div>
                            
                            {/* Left Column (md:w-1/2) */}
                            <div className={`w-full md:w-1/2 flex flex-col justify-center pl-12 md:pl-0 md:pr-16 ${isEven ? 'mt-8 md:mt-0' : ''}`}>
                                {!isEven ? (
                                    /* Odd Items Text Card (Left side) */
                                    <div className="glass-card rounded-xl p-8 hover:bg-surface-container-highest transition-colors duration-300 w-full text-left">
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-4 gap-4">
                                            <h3 className="font-headline-md text-[24px] font-bold text-on-surface">{exp.role}</h3>
                                            <span className="font-label-caps text-[12px] bg-surface-container px-3 py-1 rounded text-tertiary shrink-0">{exp.duration}</span>
                                        </div>
                                        <p className="font-label-caps text-[14px] text-on-surface-variant mb-6 uppercase">{exp.company}</p>
                                        <ul className="space-y-2 w-full flex flex-col items-start">
                                            {exp.highlights.map((h, i) => (
                                                <li key={i} className="flex items-start text-on-surface-variant font-body-md text-[16px] text-left">
                                                    <span className="text-tertiary text-sm mr-2 mt-1">▶</span>
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    /* Even Items Image (Left side) */
                                    <div className="w-full max-w-[650px] ml-auto flex items-center gap-4 md:gap-6">
                                        {(exp.idCard || exp.company.includes('(BRI)') || exp.company.includes('Kampus') || exp.company.includes('BRIN') || exp.company.includes('Keramik')) && (
                                            <div className="w-2/5 aspect-[3/4] shrink-0 rounded-xl overflow-hidden glass-panel bg-surface-container flex items-center justify-center dynamic-neon-frame group/img shadow-2xl relative bg-white/5">
                                                {exp.idCard ? (
                                                    <img src={exp.idCard} alt="ID Card" className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover/img:scale-105" />
                                                ) : exp.company.includes('(BRI)') ? (
                                                    <img src="/bri-id-card.jpg" alt="ID Card" className="w-full h-full object-cover rounded-xl" />
                                                ) : exp.company.includes('BRIN') ? (
                                                    <img src="/brin-id-card.png" alt="BRIN ID Card" className="w-full h-full object-cover rounded-xl" />
                                                ) : exp.company.includes('Kampus') ? (
                                                    <img src="/kampus_mengajar_plaque.jpg" alt="Kampus Mengajar Plaque" className="w-full h-full object-cover rounded-xl" />
                                                ) : exp.company.includes('Keramik') ? (
                                                    <img src="/thervek-sack.png" alt="Thervek Sack" className={`w-full h-full object-cover ${isEven ? 'rounded-xl' : 'transition-transform duration-700 group-hover/img:scale-105'}`} />
                                                ) : null}
                                            </div>
                                        )}
                                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden glass-panel bg-surface-container-low flex items-center justify-center dynamic-neon-frame relative group/img shadow-2xl p-0">
                                            {exp.sliderImages && exp.sliderImages.length > 0 ? (
                                                <ImageSlider images={exp.sliderImages} interval={2500} />
                                            ) : exp.company.includes('(BRI)') ? (
                                                <ImageSlider images={Array.from({length: 5}, (_, i) => `/crm_bri_activities/img_${i+1}.jpg`)} interval={2500} />
                                            ) : exp.company.includes('Kampus') ? (
                                                <ImageSlider images={Array.from({length: 5}, (_, i) => `/kampus_mengajar_activities/img_${i+1}.jpg`)} interval={2500} />
                                            ) : exp.company.includes('BRIN') ? (
                                                <ImageSlider images={Array.from({length: 8}, (_, i) => `/brin_activities/img_${i+1}.jpg`)} interval={3000} />
                                            ) : exp.company.includes('Keramik') ? (
                                                <ImageSlider images={Array.from({length: 10}, (_, i) => `/bbk_activities/img_${i+1}.jpg`)} interval={2500} />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-on-surface-variant font-label-caps tracking-widest text-[12px] text-center px-2">[ ACTIVITY IMAGE PLACEHOLDER ]</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Column (md:w-1/2) */}
                            <div className={`w-full md:w-1/2 flex flex-col justify-center pl-12 md:pl-16 ${!isEven ? 'mt-8 md:mt-0' : ''}`}>
                                {isEven ? (
                                    /* Even Items Text Card (Right side) */
                                    <div className="glass-card rounded-xl p-8 hover:bg-surface-container-highest transition-colors duration-300 w-full text-left">
                                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full mb-4 gap-4">
                                            <h3 className="font-headline-md text-[24px] font-bold text-on-surface">{exp.role}</h3>
                                            <span className="font-label-caps text-[12px] bg-surface-container px-3 py-1 rounded text-tertiary shrink-0">{exp.duration}</span>
                                        </div>
                                        <p className="font-label-caps text-[14px] text-on-surface-variant mb-6 uppercase">{exp.company}</p>
                                        <ul className="space-y-2 w-full flex flex-col items-start">
                                            {exp.highlights.map((h, i) => (
                                                <li key={i} className="flex items-start text-on-surface-variant font-body-md text-[16px] text-left">
                                                    <span className="text-tertiary text-sm mr-2 mt-1">▶</span>
                                                    <span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    /* Odd Items Image (Right side) */
                                    <div className="w-full max-w-[650px] mr-auto flex items-center gap-4 md:gap-6">
                                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden glass-panel bg-surface-container flex items-center justify-center dynamic-neon-frame relative group/img shadow-2xl p-0">
                                            {exp.sliderImages && exp.sliderImages.length > 0 ? (
                                                <ImageSlider images={exp.sliderImages} interval={2500} />
                                            ) : exp.company.includes('(BRI)') ? (
                                                <ImageSlider images={Array.from({length: 5}, (_, i) => `/crm_bri_activities/img_${i+1}.jpg`)} interval={2500} />
                                            ) : exp.company.includes('Kampus') ? (
                                                <ImageSlider images={Array.from({length: 5}, (_, i) => `/kampus_mengajar_activities/img_${i+1}.jpg`)} interval={2500} />
                                            ) : exp.company.includes('BRIN') ? (
                                                <ImageSlider images={Array.from({length: 8}, (_, i) => `/brin_activities/img_${i+1}.jpg`)} interval={3000} />
                                            ) : exp.company.includes('Keramik') ? (
                                                <ImageSlider images={Array.from({length: 10}, (_, i) => `/bbk_activities/img_${i+1}.jpg`)} interval={2500} />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-on-surface-variant font-label-caps tracking-widest text-[12px] text-center px-2">[ ACTIVITY IMAGE PLACEHOLDER ]</span>
                                                </div>
                                            )}
                                        </div>
                                        {(exp.idCard || exp.company.includes('(BRI)') || exp.company.includes('Kampus') || exp.company.includes('BRIN') || exp.company.includes('Keramik')) && (
                                            <div className="w-2/5 aspect-[3/4] shrink-0 rounded-xl overflow-hidden glass-panel bg-surface-container flex items-center justify-center dynamic-neon-frame group/img shadow-2xl relative bg-white/5">
                                                <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none"></div>
                                                {exp.idCard ? (
                                                    <img src={exp.idCard} alt="ID Card" className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover/img:scale-105" />
                                                ) : exp.company.includes('(BRI)') ? (
                                                    <img src="/bri-id-card.jpg" alt="ID Card" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                                                ) : exp.company.includes('BRIN') ? (
                                                    <img src="/brin-id-card.png" alt="BRIN ID Card" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                                                ) : exp.company.includes('Kampus') ? (
                                                    <img src="/kampus_mengajar_plaque.jpg" alt="Kampus Mengajar Plaque" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                                                ) : exp.company.includes('Keramik') ? (
                                                    <img src="/thervek-sack.png" alt="Thervek Sack" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                                                ) : null}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>

        {/* Self Development & Achievements Section */}
        <section id="achievements" className="pt-16 pb-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto relative z-10">
            <header className="mb-14 md:mb-20">
                <h1 className="font-display-xl text-[32px] sm:text-[44px] md:text-[60px] font-bold text-on-surface mb-6 md:mb-8 max-w-4xl uppercase leading-tight">
                    Self Development &amp; <span className="text-tertiary italic">Achievements</span>
                </h1>
                <p className="font-body-lg text-[15px] sm:text-[18px] text-on-surface-variant max-w-2xl leading-relaxed">
                    A comprehensive track record of my professional growth, academic excellence, and technical certifications.
                </p>
            </header>

            {/* Desktop Layout (Symmetrical Grid) */}
            <div className="hidden lg:grid grid-cols-2 gap-x-12 gap-y-8 mb-16 items-center">
                {/* Headers */}
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-tertiary font-bold text-3xl">🏆</span>
                    <h2 className="font-headline-lg text-[26px] sm:text-[32px] text-on-surface uppercase tracking-wider">Achievements</h2>
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-secondary font-bold text-3xl">🚀</span>
                    <h2 className="font-headline-lg text-[26px] sm:text-[32px] text-on-surface uppercase tracking-wider">Self Development</h2>
                </div>

                {/* Symmetrical Rows */}
                {Array.from({ length: Math.max(portfolioData.achievements.length, portfolioData.development.length) }).map((_, idx) => {
                    const achievement = portfolioData.achievements[idx];
                    const dev = portfolioData.development[idx];

                    return (
                        <React.Fragment key={idx}>
                            {/* Left: Achievement */}
                            {achievement ? (
                                <motion.div 
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className="glass-card dynamic-neon-frame hover-lift cursor-pointer rounded-xl p-5 sm:p-7 md:p-8 flex flex-col gap-4 group"
                                >
                                    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
                                        <h3 className="font-headline-md text-[18px] sm:text-[20px] font-bold text-primary group-hover:text-tertiary transition-colors">{achievement.title}</h3>
                                        <span className="font-label-caps text-[12px] bg-surface-container px-3 py-1 rounded text-tertiary shrink-0 mt-1">{achievement.date}</span>
                                    </div>
                                    <div className="font-label-caps text-[13px] sm:text-[14px] text-on-surface uppercase">{achievement.role}</div>
                                    {achievement.desc && <p className="font-body-md text-[14px] sm:text-[16px] text-on-surface-variant leading-relaxed mt-auto">{achievement.desc}</p>}
                                </motion.div>
                            ) : <div></div>}

                            {/* Right: Development */}
                            {dev ? (
                                <motion.div 
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className="glass-card dynamic-neon-frame hover-lift cursor-pointer rounded-xl p-5 sm:p-7 md:p-8 flex flex-col gap-4 group"
                                >
                                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                                        <h3 className="font-headline-md text-[18px] sm:text-[20px] font-bold text-primary group-hover:text-secondary transition-colors">{dev.title}</h3>
                                        <span className="font-label-caps text-[12px] bg-surface-container px-3 py-1 rounded text-secondary shrink-0">{dev.date}</span>
                                    </div>
                                </motion.div>
                            ) : <div></div>}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Mobile Layout (Stacked Columns) */}
            <div className="grid lg:hidden grid-cols-1 gap-12 sm:gap-16 mb-16">
                {/* Left Column: Achievements */}
                <div className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex items-center gap-3 sm:gap-4 mb-2">
                        <span className="text-tertiary font-bold text-2xl sm:text-3xl">🏆</span>
                        <h2 className="font-headline-lg text-[24px] sm:text-[32px] text-on-surface uppercase tracking-wider">Achievements</h2>
                    </div>
                    {portfolioData.achievements.map((item, idx) => (
                        <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="glass-card dynamic-neon-frame hover-lift cursor-pointer rounded-xl p-5 sm:p-7 md:p-8 flex flex-col gap-4 group"
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <h3 className="font-headline-md text-[18px] sm:text-[20px] font-bold text-primary group-hover:text-tertiary transition-colors leading-snug">{item.title}</h3>
                                <span className="font-label-caps text-[12px] bg-surface-container px-3 py-1 rounded text-tertiary shrink-0 mt-1">{item.date}</span>
                            </div>
                            <div className="font-label-caps text-[13px] sm:text-[14px] text-on-surface uppercase">{item.role}</div>
                            {item.desc && <p className="font-body-md text-[14px] sm:text-[16px] text-on-surface-variant leading-relaxed">{item.desc}</p>}
                        </motion.div>
                    ))}
                </div>

                {/* Right Column: Self Development */}
                <div className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex items-center gap-3 sm:gap-4 mb-2">
                        <span className="text-secondary font-bold text-2xl sm:text-3xl">🚀</span>
                        <h2 className="font-headline-lg text-[24px] sm:text-[32px] text-on-surface uppercase tracking-wider">Self Development</h2>
                    </div>
                    {portfolioData.development.map((item, idx) => (
                        <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="glass-card dynamic-neon-frame hover-lift cursor-pointer rounded-xl p-5 sm:p-7 md:p-8 flex flex-col gap-4 group"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h3 className="font-headline-md text-[18px] sm:text-[20px] font-bold text-primary group-hover:text-secondary transition-colors leading-snug">{item.title}</h3>
                                <span className="font-label-caps text-[12px] bg-surface-container px-3 py-1 rounded text-secondary shrink-0">{item.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="pt-20 md:pt-32 pb-24 md:pb-32 px-4 sm:px-6 md:px-8 relative z-10 w-full max-w-7xl mx-auto">
            {/* Deep Background Blur for Contact */}
            <div className="fixed inset-0 pointer-events-none z-0 hidden lg:block">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#07006c] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#005047] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                {/* Left Column: Headline & Info */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                    <span className="font-label-caps text-[12px] sm:text-[14px] text-tertiary bg-surface-container-high px-4 py-2 rounded-full inline-block w-max mb-4 uppercase">Contact</span>
                    <h1 className="font-display-xl text-[36px] sm:text-[48px] md:text-[60px] font-bold text-on-surface mb-6 md:mb-8 leading-tight">Let's Work<br/>Together</h1>
                    <p className="font-body-lg text-[15px] sm:text-[18px] text-on-surface-variant mb-8 sm:mb-12 max-w-md leading-relaxed">
                        Looking to start a new project or just want to say hi? Send me a message and I'll get back to you as soon as possible.
                    </p>
                    
                    {/* Location / Map Glass Card */}
                    <a href="https://maps.app.goo.gl/JboCVxf6oDzdKERb6" target="_blank" rel="noopener noreferrer" className="glass-card dynamic-neon-frame group cursor-pointer rounded-xl p-5 sm:p-6 relative overflow-hidden h-[180px] sm:h-[200px] flex flex-col justify-end block">
                        <div className="absolute inset-0 bg-surface-container flex items-center justify-center overflow-hidden">
                           <img src="/south_jakarta_map.png" alt="South Jakarta Map" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                                <span className="bg-primary text-on-primary px-4 py-2 rounded-full font-label-large flex items-center gap-2 text-xs sm:text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                                    Open in Maps
                                </span>
                           </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80 z-10 pointer-events-none"></div>
                        <div className="relative z-20 flex items-center gap-3 pointer-events-none">
                            <span className="text-tertiary text-xl">📍</span>
                            <span className="font-body-md text-[15px] sm:text-[16px] text-on-surface font-semibold">{portfolioData.profile.location}</span>
                        </div>
                    </a>
                </div>
                
                {/* Right Column: Form */}
                <div className="lg:col-span-6 lg:col-start-7 lg:mt-12">
                    <div className="glass-card dynamic-neon-frame rounded-[24px] p-5 sm:p-8 md:p-12">
                        <form className="flex flex-col gap-8" onSubmit={(e) => { 
                            e.preventDefault(); 
                            const name = e.target.name.value;
                            const email = e.target.email.value;
                            const message = e.target.message.value;
                            
                            axios.post('/api/contact', { name, email, message })
                                .then(res => {
                                    alert("Message sent successfully!");
                                    e.target.reset();
                                })
                                .catch(err => {
                                    console.error(err);
                                    alert("Oops! Something went wrong. Please try again.");
                                });
                        }}>
                            <div className="relative">
                                <input type="text" id="name" name="name" placeholder=" " required
                                    className="block w-full appearance-none focus:outline-none bg-transparent border-0 border-b-2 border-outline-variant px-0 py-3 text-on-surface font-body-lg text-[18px] focus:ring-0 peer input-glow transition-colors duration-300"
                                />
                                <label htmlFor="name" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-on-surface-variant font-body-md text-[16px] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-tertiary">
                                    Your Name
                                </label>
                            </div>
                            <div className="relative mt-4">
                                <input type="email" id="email" name="email" placeholder=" " required
                                    className="block w-full appearance-none focus:outline-none bg-transparent border-0 border-b-2 border-outline-variant px-0 py-3 text-on-surface font-body-lg text-[18px] focus:ring-0 peer input-glow transition-colors duration-300"
                                />
                                <label htmlFor="email" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-on-surface-variant font-body-md text-[16px] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-tertiary">
                                    Email Address
                                </label>
                            </div>
                            <div className="relative mt-4">
                                <textarea id="message" name="message" placeholder=" " required rows="4"
                                    className="block w-full appearance-none focus:outline-none bg-transparent border-0 border-b-2 border-outline-variant px-0 py-3 text-on-surface font-body-lg text-[18px] focus:ring-0 peer input-glow transition-colors duration-300 resize-none"
                                ></textarea>
                                <label htmlFor="message" className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-on-surface-variant font-body-md text-[16px] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-tertiary">
                                    Message
                                </label>
                            </div>
                            <button type="submit" className="mt-8 self-start bg-secondary-container text-on-surface font-label-caps text-[14px] font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-200 flex items-center gap-2 tracking-widest">
                                SEND MESSAGE
                                <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <footer className="w-full py-14 md:py-20 px-4 sm:px-6 md:px-8 bg-zinc-950 border-t border-white/5 relative z-10 transition-all ease-in-out duration-300">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 max-w-7xl mx-auto">
          <span className="text-zinc-50 font-black font-display-xl text-2xl tracking-tighter uppercase">RN PORTFOLIO</span>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <a className="flex items-center gap-2 font-label-caps text-[12px] font-bold tracking-[0.2em] uppercase text-zinc-600 hover:text-[#0A66C2] transition-colors duration-300" href="https://www.linkedin.com/in/mchronn/" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
            <a className="flex items-center gap-2 font-label-caps text-[12px] font-bold tracking-[0.2em] uppercase text-zinc-600 hover:text-[#E1306C] transition-colors duration-300" href="https://www.instagram.com/mchronn_" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              Instagram
            </a>
            <a className="flex items-center gap-2 font-label-caps text-[12px] font-bold tracking-[0.2em] uppercase text-zinc-600 hover:text-[#25D366] transition-colors duration-300" href="https://wa.me/qr/FYCCXHVF7LOJE1" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              WhatsApp
            </a>
          </div>
          <span className="font-label-caps text-[12px] font-bold tracking-[0.2em] uppercase text-indigo-500">© 2026 MOCHAMAD ROIS NABHAN. BUILT FOR THE FUTURE.</span>
        </div>
      </footer>
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-surface-container border border-outline-variant rounded-full flex items-center justify-center text-on-surface-variant hover:text-[#4facfe] hover:border-[#4facfe] transition-colors z-50 shadow-lg group hover:shadow-[0_0_15px_rgba(79,172,254,0.3)]"
          >
            <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Fullscreen Bento Lightbox Modal */}
      <AnimatePresence>
        {modalMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalMedia(null)}
            className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-container-low border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden max-w-5xl w-full max-h-[92vh] flex flex-col shadow-[0_0_60px_rgba(45,156,219,0.25)] dynamic-neon-frame relative"
            >
              {/* Modal Top Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10 bg-surface-container/60">
                <div className="flex flex-col gap-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-tertiary font-label-caps text-[11px] uppercase tracking-wider font-semibold">
                      {modalMedia.category} {modalMedia.year ? `• ${modalMedia.year}` : ''}
                    </span>
                    {modalMedia.badge && (
                      <span className="bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {modalMedia.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-headline-md text-[18px] md:text-[22px] font-bold text-on-surface">
                    {modalMedia.title}
                  </h3>
                </div>
                <button 
                  type="button" 
                  onClick={() => setModalMedia(null)}
                  aria-label="Tutup preview"
                  className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-white transition-all shrink-0 cursor-pointer shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Media Body */}
              <div className="p-4 md:p-6 overflow-y-auto flex flex-col gap-5 items-center bg-black/40">
                <div className="w-full flex items-center justify-center rounded-xl overflow-hidden max-h-[60vh] bg-black/50 border border-white/5 relative">
                  {modalMedia.sliderImages && modalMedia.sliderImages.length > 0 ? (
                    <div className="w-full aspect-[16/10] max-h-[60vh]">
                      <ImageSlider images={modalMedia.sliderImages} interval={3500} />
                    </div>
                  ) : (
                    <img 
                      src={modalMedia.image} 
                      alt={modalMedia.title} 
                      className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg shadow-2xl" 
                    />
                  )}
                </div>

                {/* Modal Description & Actions */}
                <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-3 border-t border-white/10">
                  <div className="flex flex-col gap-2 max-w-2xl">
                    {modalMedia.desc && (
                      <p className="text-[13px] md:text-[14px] text-on-surface-variant leading-relaxed">
                        {modalMedia.desc}
                      </p>
                    )}
                    {modalMedia.tags && modalMedia.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {modalMedia.tags.map((t, i) => (
                          <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full bg-surface-container border border-white/5 text-primary font-mono">
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {modalMedia.pdf ? (
                      <a 
                        href={modalMedia.pdf} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-background font-bold text-[13px] hover:shadow-[0_0_20px_rgba(45,156,219,0.5)] transition-all flex items-center gap-1.5"
                      >
                        Buka Dokumen PDF
                      </a>
                    ) : modalMedia.image ? (
                      <a 
                        href={modalMedia.image} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high border border-white/10 text-on-surface font-semibold text-[13px] transition-all flex items-center gap-1.5"
                      >
                        Buka Resolusi Penuh <ExternalLink className="w-3.5 h-3.5 text-tertiary" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
      )}
    </>
  );
}
