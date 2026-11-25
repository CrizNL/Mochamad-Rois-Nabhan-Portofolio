import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Layers } from 'lucide-react';

const ProjectImageSlider = ({ images, interval = 3200, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return undefined;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          alt={alt}
        />
      </AnimatePresence>
    </div>
  );
};

const getBentoLayout = (idx, total) => {
  if (total === 1) return { span: 'col-span-12', aspect: 'aspect-[16/9] md:aspect-[21/9]' };
  if (total === 2) return { span: 'col-span-12 md:col-span-6', aspect: 'aspect-[16/10]' };
  if (total === 3) {
    return idx === 0
      ? { span: 'col-span-12 lg:col-span-8', aspect: 'aspect-[16/10]' }
      : { span: 'col-span-12 sm:col-span-6 lg:col-span-4', aspect: 'aspect-[16/10]' };
  }
  if (total === 4) return { span: 'col-span-12 sm:col-span-6', aspect: 'aspect-[16/10]' };

  // Default 8-item architectural Bento: 2 flagship 6-col cards + 6 modular 4-col cards
  if (idx < 2) {
    return { span: 'col-span-12 lg:col-span-6', aspect: 'aspect-[16/10]' };
  }
  return { span: 'col-span-12 sm:col-span-6 lg:col-span-4', aspect: 'aspect-[16/10]' };
};

export default function ProjectsSection({ projects, onOpenModal }) {
  const [activeFilter, setActiveFilter] = useState('All Projects');

  const categories = ['All Projects', ...new Set(projects.map((p) => p.category))];
  const filteredProjects = projects.filter(
    (proj) => activeFilter === 'All Projects' || proj.category === activeFilter
  );

  return (
    <section
      id="portfolio"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
        <div>
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#2DD4BF] block mb-2">
            01 · Selected Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.025em] text-[#F2F1ED]">
            Projects &amp; Research Systems
          </h2>
          <p className="text-[15px] sm:text-base text-[#9BA1A6] max-w-2xl mt-3 leading-relaxed">
            Production financial applications, enterprise credit risk scorecards, and material characterization studies.
          </p>
        </div>

        <span className="font-mono-tech text-xs text-[#6C727A] shrink-0">
          Showing {filteredProjects.length} of {projects.length} works
        </span>
      </div>

      {/* Category Filter Strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-8 sm:mb-10">
        {categories.map((category) => {
          const active = activeFilter === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`shrink-0 px-3.5 py-1.5 rounded-md text-xs sm:text-[13px] font-medium transition-colors cursor-pointer border ${
                active
                  ? 'bg-[#F2F1ED] text-[#090A0C] border-[#F2F1ED]'
                  : 'bg-[#111317] text-[#9BA1A6] border-white/[0.08] hover:text-[#F2F1ED] hover:border-white/20'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-5 sm:gap-6 items-stretch">
        {filteredProjects.map((proj, idx) => {
          const bento = getBentoLayout(idx, filteredProjects.length);
          const hasGallery = proj.sliderImages && proj.sliderImages.length > 1;
          return (
            <motion.article
              key={proj.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.25) }}
              onClick={() => onOpenModal({ ...proj, type: 'project' })}
              className={`${bento.span} editorial-card rounded-xl p-4 sm:p-5 group cursor-pointer flex flex-col justify-between`}
            >
              <div>
                {/* Media Frame */}
                <div
                  className={`relative rounded-lg overflow-hidden ${bento.aspect} mb-4 bg-[#090A0C] border border-white/[0.06]`}
                >
                  {proj.sliderImages && proj.sliderImages.length > 0 ? (
                    <ProjectImageSlider
                      images={proj.sliderImages}
                      interval={3200}
                      alt={proj.title}
                    />
                  ) : proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                    />
                  ) : null}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Top Right Action Pill */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {hasGallery && (
                      <span className="px-2 py-1 rounded bg-[#090A0C]/80 backdrop-blur-sm border border-white/[0.1] font-mono-tech text-[10px] text-[#F2F1ED] inline-flex items-center gap-1">
                        <Layers className="w-3 h-3 text-[#2DD4BF]" />
                        {proj.sliderImages.length}
                      </span>
                    )}
                    <span className="w-7 h-7 rounded bg-[#090A0C]/80 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-[#9BA1A6] group-hover:text-[#F2F1ED] group-hover:border-white/25 transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Bottom Meta Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#090A0C]/85 backdrop-blur-sm border border-white/[0.1] font-mono-tech text-[10px] sm:text-[11px] text-[#2DD4BF] uppercase tracking-wider">
                      {proj.category} · {proj.year}
                    </span>
                    {proj.badge && (
                      <span className="px-2.5 py-0.5 rounded bg-[#090A0C]/85 backdrop-blur-sm border border-white/[0.1] font-mono-tech text-[10px] text-[#F2F1ED] uppercase tracking-wider">
                        {proj.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Summary */}
                <h3 className="font-display text-lg sm:text-xl font-semibold text-[#F2F1ED] group-hover:text-[#2DD4BF] transition-colors leading-snug">
                  {proj.title}
                </h3>
                <p className="text-[13px] sm:text-sm text-[#9BA1A6] mt-2 line-clamp-3 leading-relaxed">
                  {proj.desc}
                </p>
              </div>

              {/* Clean Flat Tags */}
              {proj.tags && proj.tags.length > 0 && (
                <div className="pt-3.5 mt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono-tech px-2 py-0.5 rounded bg-[#171A20] border border-white/[0.06] text-[#A1A6AD]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
