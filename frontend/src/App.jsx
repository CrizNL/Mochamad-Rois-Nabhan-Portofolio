import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, ArrowRight, ArrowUp } from 'lucide-react';

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
              company: "PT Bank Rakyat Indonesia Tbk (BRI)",
              role: "Junior Data Analyst",
              duration: "November 2025 - Mei 2026",
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
              highlights: [
                  "Designed and delivered structured curricula in physics, mathematics, and logical reasoning for junior high school students.",
                  "Monitored and evaluated student progress, implementing targeted learning strategies to enhance comprehension.",
                  "Fostered an engaging learning environment, resulting in measurable improvements in students' analytical skills."
              ]
          }
      ],
      projects: [
          {
              title: "NLP Voice Scoring (Sentinel)",
              category: "AI & Machine Learning",
              year: "2026",
              desc: "Deep dive analysis and voice scoring dashboard with light glassmorphism UI.",
              span: "md:col-span-6",
              aspect: "aspect-[16/9]",
              image: "/nlp-voice-scoring.gif"
          },
          {
              title: "Merged Credit Scorecard Model",
              category: "Data Science",
              year: "2026",
              desc: "Technical review and advanced statistical analysis for risk prediction.",
              span: "md:col-span-6",
              aspect: "aspect-[16/9]",
              image: "/merged-credit-scorecard.gif"
          },
          {
              title: "Scorecard Builder App",
              category: "Data Analytics",
              year: "2026",
              desc: "Interactive builder for credit scorecards using advanced statistical metrics.",
              span: "md:col-span-6",
              aspect: "aspect-[16/9]",
              image: "/scorecard-builder.gif"
          },
          {
              title: "Activated Carbon Dye Removal",
              category: "Material Science",
              year: "2025",
              desc: "Research on adsorption isotherms and kinetics.",
              span: "md:col-span-6",
              aspect: "aspect-[16/9]",
              image: "/activated-carbon.gif"
          },
          {
              title: "AFIF - TDCS",
              category: "IoT",
              year: "2021",
              desc: "Automatic Fish Feeder and Turbidity Device Censored System.",
              span: "md:col-span-6",
              aspect: "aspect-[16/9]",
              image: "/afif-tdcs.gif"
          },
          {
              title: "CalGen",
              category: "Software",
              year: "2022",
              desc: "Customizable Calculating App Generator Platform.",
              span: "md:col-span-6",
              aspect: "aspect-[16/9]",
              image: "/calgen.gif"
          }
      ],
      achievements: [
          { title: "FPMIPA Awards & HMF Appreciation 2021", role: "Awardee", date: "August - December 2021", desc: "Received awards for IoT projects that have been completed in international events" },
          { title: "International Invention and Innovative Competition 2021", role: "Bronze Award", date: "June 2021", desc: "Contributed as a Project Leader and Initiator of a project named \"AFIF - TDCS\" (Automatic Fish Feeder and Turbidity Device Censored System)" },
          { title: "Lecturer and Laborant Assistant - Basic Physics Laboratory", role: "Lab Assistant", date: "July 2021", desc: "Assisted Lecturer and laborant preparing their asynchronous learning video for junior scholar" },
          { title: "Malaysia Invention and Inovation Expo 2022", role: "Silver Award", date: "April 2022", desc: "Contributed as a part Initiator and project scriptwriter of a project named \"CalGen\" (Customizable Calculating App Generator Platform)" },
          { title: "FPMIPA Awards & HMF Appreciation 2022", role: "Awardee", date: "January 2023", desc: "Received awards for Senior Innovator that have been completed in international events" }
      ],
      development: [
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
        <div className="flex justify-between items-center px-8 py-5 max-w-7xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-white font-display-xl uppercase">PORTFOLIO</div>
          <ul className="hidden md:flex gap-8 items-center font-label-caps uppercase text-sm tracking-wide">
            <li><a className="text-zinc-400 hover:text-white transition-colors duration-300 font-semibold hover:scale-105 hover:text-tertiary" href="#home">Home</a></li>
            <li><a className="text-zinc-400 hover:text-white transition-colors duration-300 font-semibold hover:scale-105 hover:text-tertiary" href="#portfolio">Portfolio</a></li>
            <li><a className="text-zinc-400 hover:text-white transition-colors duration-300 font-semibold hover:scale-105 hover:text-tertiary" href="#experience">Resume</a></li>
            <li><a className="text-zinc-400 hover:text-white transition-colors duration-300 font-semibold hover:scale-105 hover:text-tertiary" href="#achievements">Skills</a></li>
            <li><a className="text-zinc-400 hover:text-white transition-colors duration-300 font-semibold hover:scale-105 hover:text-tertiary" href="#contact">Contact</a></li>
          </ul>
          <a className="hidden md:inline-block font-label-caps uppercase bg-secondary-container text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform duration-300" href="#contact">Let's Connect</a>
          <button className="md:hidden text-on-surface">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <main className="pt-[100px]">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center relative px-8 mt-16 mb-12">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="col-span-1 md:col-span-8 md:pr-12 relative z-20"
            >
              <div className="inline-block px-4 py-1 mb-6 rounded-full bg-surface-container-high border border-outline-variant">
                <span className="font-label-caps text-[14px] text-tertiary tracking-widest uppercase">{portfolioData.profile.title}</span>
              </div>
              <h1 className="font-display-xl text-[60px] md:text-[80px] font-extrabold text-on-surface leading-[1.1] mb-8">
                HI, I'M <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-tertiary italic font-black uppercase py-2 pr-4">{portfolioData.profile.name}</span><br/>
                DATA <span className="font-light italic text-on-surface-variant">DRIVEN</span>.
              </h1>
              <p className="font-body-lg text-[18px] text-on-surface-variant max-w-xl mb-10">
                {portfolioData.profile.description}
              </p>
              <div className="flex gap-6 items-center">
                <a className="bg-secondary-container text-white px-8 py-4 rounded-full font-label-caps text-[14px] uppercase tracking-wider hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(49,49,192,0.4)]" href="#portfolio">View Work</a>
                <a className="glass-panel text-on-surface px-8 py-4 rounded-full font-label-caps text-[14px] uppercase tracking-wider border-tertiary border hover:scale-105 transition-transform duration-300 flex items-center gap-2" href="#contact">
                  Our Approach <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="col-span-1 md:col-span-4 relative mt-12 md:mt-0 z-10 md:-ml-12"
            >
              <div className="relative w-full aspect-[3/4] rounded-[24px] overflow-hidden glass-panel bg-surface-container-highest flex items-center justify-center dynamic-neon-frame">
                <img src="/nabhan-batik.png" alt="Hero Portrait" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute -bottom-8 -left-8 glass-panel p-6 rounded-[16px] backdrop-blur-xl border border-white/10 shadow-2xl z-30">
                <div className="font-display-xl text-[40px] font-black leading-none text-tertiary">S.Si</div>
                <div className="font-label-caps text-[14px] text-on-surface-variant uppercase mt-1">Material Physics</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Gallery Section */}
        <section id="portfolio" className="max-w-7xl mx-auto px-8 relative z-10 pt-32 pb-16">
          <header className="mb-12">
              <h1 className="font-display-xl text-[48px] md:text-[60px] text-primary mb-2 font-bold uppercase">Selected Works</h1>
              <p className="font-body-lg text-[18px] text-on-surface-variant max-w-2xl">Exploring the intersection of physics and data science. A collection of experimental research and data models.</p>
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 items-start">
              {filteredProjects.map((proj, idx) => (
                  <motion.article 
                      key={idx} 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className={`${proj.span} group hover-lift transition-all duration-500 ease-out cursor-pointer`}
                  >
                      <div className={`relative rounded-2xl overflow-hidden ${proj.aspect} mb-4 glass-panel bg-surface-container flex items-center justify-center dynamic-neon-frame`}>
                          {proj.image ? (
                              <img src={proj.image} alt={proj.title} className={`absolute inset-0 w-full h-full ${proj.objectFit || 'object-cover'} opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 z-0`} />
                          ) : (
                              <span className="text-on-surface-variant font-label-caps tracking-widest z-10">[ IMAGE PLACEHOLDER ]</span>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80 z-20 pointer-events-none"></div>
                          <div className="absolute bottom-6 left-6 right-6 z-30">
                              <div className="flex gap-2 mb-3">
                                  <span className="bg-surface/80 backdrop-blur-md px-3 py-1 rounded-sm font-label-caps text-[12px] text-tertiary uppercase tracking-wider">{proj.category}</span>
                                  <span className="bg-surface/80 backdrop-blur-md px-3 py-1 rounded-sm font-label-caps text-[12px] text-on-surface uppercase tracking-wider">{proj.year}</span>
                              </div>
                          </div>
                      </div>
                      <h2 className="font-headline-lg text-[32px] font-bold text-primary group-hover:text-tertiary transition-colors">{proj.title}</h2>
                      <p className="font-body-md text-[16px] text-on-surface-variant mt-2">{proj.desc}</p>
                  </motion.article>
              ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="pt-16 pb-16 max-w-7xl mx-auto px-8 relative">
            <header className="mb-24">
                <h1 className="font-display-xl text-[48px] md:text-[60px] font-bold text-on-surface mb-2 uppercase">Experience & Education.</h1>
                <p className="font-body-lg text-[18px] text-on-surface-variant max-w-2xl">A history of building high-quality results in research, data analytics, and technological innovation.</p>
            </header>
            
            {/* Education Block */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6 }}
                className="mb-40 glass-card dynamic-neon-frame rounded-2xl p-8 md:p-12 relative overflow-hidden group"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-tertiary"></div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                        <h2 className="font-display-xl text-[32px] md:text-[40px] font-bold text-on-surface mb-4 tracking-tight">EDUCATION</h2>
                        <h3 className="font-headline-md text-[20px] md:text-[24px] text-primary leading-snug">{portfolioData.education.institution} <br className="md:hidden" /><span className="text-on-surface-variant font-body-md text-[16px] md:text-[18px]">— {portfolioData.education.location} | {portfolioData.education.type}</span></h3>
                    </div>
                    <div className="bg-surface-container px-6 py-2 rounded-full font-label-caps text-tertiary tracking-widest text-[14px] shrink-0 border border-tertiary/20">
                        {portfolioData.education.year}
                    </div>
                </div>
                
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                    <div className="xl:col-span-7 space-y-4">
                        <p className="font-body-lg text-[18px] text-on-surface">
                            <strong className="text-secondary">{portfolioData.education.degree}</strong>; Cumulative GPA: <span className="text-on-surface-variant">{portfolioData.education.gpa}</span>
                        </p>
                        <p className="font-body-lg text-[18px] text-on-surface">
                            Proficiency Test of English to Speakers of Other Languages, (PTESOL) Score: <span className="text-tertiary font-bold">{portfolioData.education.ptesol}</span>
                        </p>
                        <div className="pt-6 mt-6 border-t border-white/10">
                            <ul className="space-y-3">
                                {portfolioData.education.awards.map((award, i) => (
                                    <li key={i} className="flex items-start text-on-surface-variant font-body-md text-[16px]">
                                        <span className="text-tertiary mr-3 mt-1">✦</span>
                                        <span>{award}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="xl:col-span-5 flex flex-col sm:flex-row gap-6">
                        <div className="w-full aspect-video sm:aspect-square md:aspect-video xl:aspect-auto xl:h-full rounded-xl overflow-hidden glass-panel bg-surface-container flex items-center justify-center dynamic-neon-frame group/img">
                            <img src="/track_record_image.jpg" alt="Track Record" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                        </div>
                        <div className="w-full aspect-video sm:aspect-square md:aspect-video xl:aspect-auto xl:h-full rounded-xl overflow-hidden glass-panel bg-surface-container flex items-center justify-center dynamic-neon-frame group/img">
                            <img src="/college_image.jpg" alt="College Graduation" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
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
                className="mb-40 grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {/* Certificate 1 */}
                <div className="w-full rounded-2xl overflow-hidden glass-card p-4 md:p-6 dynamic-neon-frame relative group/img bg-surface-container-low flex flex-col gap-4">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-tertiary"></div>
                    <div className="w-full aspect-[1.414/1] rounded-xl overflow-hidden bg-black/20">
                        <img src="/certificate1.png" alt="Malaysia Invention and Innovation Expo 2022" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                    </div>
                    <div className="flex flex-col gap-1 px-2 pb-2">
                        <h4 className="font-headline-md text-[18px] font-bold text-on-surface group-hover/img:text-primary transition-colors">Juara 3 - Malaysia Invention and Innovation Expo 2022</h4>
                        <p className="font-body-sm text-[14px] text-tertiary uppercase tracking-wider font-semibold">Piagam Penghargaan • FPMIPA UPI</p>
                    </div>
                </div>

                {/* Certificate 2 */}
                <div className="w-full rounded-2xl overflow-hidden glass-card p-4 md:p-6 dynamic-neon-frame relative group/img bg-surface-container-low flex flex-col gap-4">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-tertiary"></div>
                    <div className="w-full aspect-[1.414/1] rounded-xl overflow-hidden bg-black/20">
                        <img src="/certificate2.png" alt="International Invention & Innovative Competition 2021" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                    </div>
                    <div className="flex flex-col gap-1 px-2 pb-2">
                        <h4 className="font-headline-md text-[18px] font-bold text-on-surface group-hover/img:text-primary transition-colors">Juara 3 - International Invention &amp; Innovative Competition 2021</h4>
                        <p className="font-body-sm text-[14px] text-tertiary uppercase tracking-wider font-semibold">Piagam Penghargaan • MNNF Network</p>
                    </div>
                </div>

                {/* Certificate 3 */}
                <div className="w-full rounded-2xl overflow-hidden glass-card p-4 md:p-6 dynamic-neon-frame relative group/img bg-surface-container-low flex flex-col gap-4">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-tertiary"></div>
                    <div className="w-full aspect-[1.414/1] rounded-xl overflow-hidden bg-black/20">
                        <img src="/certificate3.png" alt="Seminar Nasional Fisika" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                    </div>
                    <div className="flex flex-col gap-1 px-2 pb-2">
                        <h4 className="font-headline-md text-[18px] font-bold text-on-surface group-hover/img:text-primary transition-colors">Presenter Seminar - Physics for a Better World: Harmonization in Research and Education</h4>
                        <p className="font-body-sm text-[14px] text-tertiary uppercase tracking-wider font-semibold">Sertifikat • Seminar Nasional Fisika (SinaFi XI)</p>
                    </div>
                </div>

                {/* Certificate 4 */}
                <div className="w-full rounded-2xl overflow-hidden glass-card p-4 md:p-6 dynamic-neon-frame relative group/img bg-surface-container-low flex flex-col gap-4">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-tertiary"></div>
                    <div className="w-full aspect-[1.414/1] rounded-xl overflow-hidden bg-black/20">
                        <img src="/certificate4.png" alt="BRI Internship" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />
                    </div>
                    <div className="flex flex-col gap-1 px-2 pb-2">
                        <h4 className="font-headline-md text-[18px] font-bold text-on-surface group-hover/img:text-primary transition-colors">Internship Assistant - Data Analytic</h4>
                        <p className="font-body-sm text-[14px] text-tertiary uppercase tracking-wider font-semibold">Sertifikat Magang • PT Bank Rakyat Indonesia (Persero) Tbk</p>
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
                                        {(exp.company.includes('(BRI)') || exp.company.includes('Kampus') || exp.company.includes('BRIN') || exp.company.includes('Keramik')) && (
                                            <div className="w-2/5 aspect-[3/4] shrink-0 rounded-xl overflow-hidden glass-panel bg-surface-container flex items-center justify-center dynamic-neon-frame group/img shadow-2xl relative bg-white/5">
                                                {exp.company.includes('(BRI)') && <img src="/bri-id-card.jpg" alt="ID Card" className="w-full h-full object-cover rounded-xl" />}
                                                {exp.company.includes('BRIN') && <img src="/brin-id-card.png" alt="BRIN ID Card" className="w-full h-full object-cover rounded-xl" />}
                                                {exp.company.includes('Kampus') && <img src="/kampus_mengajar_plaque.jpg" alt="Kampus Mengajar Plaque" className="w-full h-full object-cover rounded-xl" />}
                                                {exp.company.includes('Keramik') && <img src="/thervek-sack.png" alt="Thervek Sack" className={`w-full h-full object-cover ${isEven ? 'rounded-xl' : 'transition-transform duration-700 group-hover/img:scale-105'}`} />}
                                            </div>
                                        )}
                                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden glass-panel bg-surface-container-low flex items-center justify-center dynamic-neon-frame relative group/img shadow-2xl p-0">
                                            {exp.company.includes('(BRI)') ? (
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
                                            {exp.company.includes('(BRI)') ? (
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
                                        {(exp.company.includes('(BRI)') || exp.company.includes('Kampus') || exp.company.includes('BRIN') || exp.company.includes('Keramik')) && (
                                            <div className="w-2/5 aspect-[3/4] shrink-0 rounded-xl overflow-hidden glass-panel bg-surface-container flex items-center justify-center dynamic-neon-frame group/img shadow-2xl relative bg-white/5">
                                                <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none"></div>
                                                {exp.company.includes('(BRI)') && <img src="/bri-id-card.jpg" alt="ID Card" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />}
                                                {exp.company.includes('BRIN') && <img src="/brin-id-card.png" alt="BRIN ID Card" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />}
                                                {exp.company.includes('Kampus') && <img src="/kampus_mengajar_plaque.jpg" alt="Kampus Mengajar Plaque" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />}
                                                {exp.company.includes('Keramik') && <img src="/thervek-sack.png" alt="Thervek Sack" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />}
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
        <section id="achievements" className="pt-16 pb-16 px-8 max-w-7xl mx-auto relative z-10">
            <header className="mb-32">
                <h1 className="font-display-xl text-[48px] md:text-[60px] font-bold text-on-surface mb-8 max-w-4xl uppercase">
                    Self Development &amp; <span className="text-tertiary italic">Achievements</span>
                </h1>
                <p className="font-body-lg text-[18px] text-on-surface-variant max-w-2xl">
                    A comprehensive track record of my professional growth, academic excellence, and technical certifications.
                </p>
            </header>

            {/* Desktop Layout (Symmetrical Grid) */}
            <div className="hidden lg:grid grid-cols-2 gap-x-12 gap-y-8 mb-16 items-center">
                {/* Headers */}
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-tertiary font-bold text-3xl">🏆</span>
                    <h2 className="font-headline-lg text-[32px] text-on-surface uppercase tracking-wider">Achievements</h2>
                </div>
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-secondary font-bold text-3xl">🚀</span>
                    <h2 className="font-headline-lg text-[32px] text-on-surface uppercase tracking-wider">Self Development</h2>
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
                                    className="glass-card dynamic-neon-frame hover-lift cursor-pointer rounded-xl p-8 flex flex-col gap-4 group"
                                >
                                    <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">
                                        <h3 className="font-headline-md text-[20px] font-bold text-primary group-hover:text-tertiary transition-colors">{achievement.title}</h3>
                                        <span className="font-label-caps text-[12px] bg-surface-container px-3 py-1 rounded text-tertiary shrink-0 mt-1">{achievement.date}</span>
                                    </div>
                                    <div className="font-label-caps text-[14px] text-on-surface uppercase">{achievement.role}</div>
                                    {achievement.desc && <p className="font-body-md text-[16px] text-on-surface-variant leading-relaxed mt-auto">{achievement.desc}</p>}
                                </motion.div>
                            ) : <div></div>}

                            {/* Right: Development */}
                            {dev ? (
                                <motion.div 
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className="glass-card dynamic-neon-frame hover-lift cursor-pointer rounded-xl p-8 flex flex-col gap-4 group"
                                >
                                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                                        <h3 className="font-headline-md text-[20px] font-bold text-primary group-hover:text-secondary transition-colors">{dev.title}</h3>
                                        <span className="font-label-caps text-[12px] bg-surface-container px-3 py-1 rounded text-secondary shrink-0">{dev.date}</span>
                                    </div>
                                </motion.div>
                            ) : <div></div>}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Mobile Layout (Stacked Columns) */}
            <div className="grid lg:hidden grid-cols-1 gap-16 mb-16">
                {/* Left Column: Achievements */}
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-tertiary font-bold text-3xl">🏆</span>
                        <h2 className="font-headline-lg text-[32px] text-on-surface uppercase tracking-wider">Achievements</h2>
                    </div>
                    {portfolioData.achievements.map((item, idx) => (
                        <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="glass-card dynamic-neon-frame hover-lift cursor-pointer rounded-xl p-8 flex flex-col gap-4 group"
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <h3 className="font-headline-md text-[20px] font-bold text-primary group-hover:text-tertiary transition-colors">{item.title}</h3>
                                <span className="font-label-caps text-[12px] bg-surface-container px-3 py-1 rounded text-tertiary shrink-0 mt-1">{item.date}</span>
                            </div>
                            <div className="font-label-caps text-[14px] text-on-surface uppercase">{item.role}</div>
                            {item.desc && <p className="font-body-md text-[16px] text-on-surface-variant leading-relaxed">{item.desc}</p>}
                        </motion.div>
                    ))}
                </div>

                {/* Right Column: Self Development */}
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-secondary font-bold text-3xl">🚀</span>
                        <h2 className="font-headline-lg text-[32px] text-on-surface uppercase tracking-wider">Self Development</h2>
                    </div>
                    {portfolioData.development.map((item, idx) => (
                        <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="glass-card dynamic-neon-frame hover-lift cursor-pointer rounded-xl p-8 flex flex-col gap-4 group"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h3 className="font-headline-md text-[20px] font-bold text-primary group-hover:text-secondary transition-colors">{item.title}</h3>
                                <span className="font-label-caps text-[12px] bg-surface-container px-3 py-1 rounded text-secondary shrink-0">{item.date}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="pt-32 pb-40 px-8 relative z-10 w-full max-w-7xl mx-auto">
            {/* Deep Background Blur for Contact */}
            <div className="fixed inset-0 pointer-events-none z-0 hidden lg:block">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#07006c] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#005047] rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                {/* Left Column: Headline & Info */}
                <div className="lg:col-span-5 flex flex-col gap-4">
                    <span className="font-label-caps text-[14px] text-tertiary bg-surface-container-high px-4 py-2 rounded-full inline-block w-max mb-4 uppercase">Contact</span>
                    <h1 className="font-display-xl text-[60px] font-bold text-on-surface mb-8 leading-tight">Let's Work<br/>Together</h1>
                    <p className="font-body-lg text-[18px] text-on-surface-variant mb-12 max-w-md">
                        Looking to start a new project or just want to say hi? Send me a message and I'll get back to you as soon as possible.
                    </p>
                    
                    {/* Location / Map Glass Card */}
                    <a href="https://maps.app.goo.gl/JboCVxf6oDzdKERb6" target="_blank" rel="noopener noreferrer" className="glass-card dynamic-neon-frame group cursor-pointer rounded-xl p-6 relative overflow-hidden h-[200px] flex flex-col justify-end block">
                        <div className="absolute inset-0 bg-surface-container flex items-center justify-center overflow-hidden">
                           <img src="/south_jakarta_map.png" alt="South Jakarta Map" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                                <span className="bg-primary text-on-primary px-4 py-2 rounded-full font-label-large flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                                    Open in Maps
                                </span>
                           </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80 z-10 pointer-events-none"></div>
                        <div className="relative z-20 flex items-center gap-3 pointer-events-none">
                            <span className="text-tertiary text-xl">📍</span>
                            <span className="font-body-md text-[16px] text-on-surface font-semibold">{portfolioData.profile.location}</span>
                        </div>
                    </a>
                </div>
                
                {/* Right Column: Form */}
                <div className="lg:col-span-6 lg:col-start-7 lg:mt-12">
                    <div className="glass-card dynamic-neon-frame rounded-[24px] p-8 md:p-12">
                        <form className="flex flex-col gap-8" onSubmit={(e) => { 
                            e.preventDefault(); 
                            const name = e.target.name.value;
                            const email = e.target.email.value;
                            const message = e.target.message.value;
                            const targetEmail = "roisnabhan.01@gmail.com"; 
                            const subject = `Portfolio Contact from ${name}`;
                            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
                            window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

      <footer className="w-full py-20 px-8 bg-zinc-950 border-t border-white/5 relative z-10 transition-all ease-in-out duration-300">
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
        </div>
      )}
    </>
  );
}
