import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Images } from 'lucide-react';

const ActivityThumbSlider = ({ images, alt }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return undefined;
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.img
          key={idx}
          src={images[idx]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          loading="lazy"
          decoding="async"
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

export default function ExperienceSection({ experience, education, onOpenModal }) {
  return (
    <section
      id="experience"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]"
    >
      {/* Section Header */}
      <div className="mb-12 sm:mb-16">
        <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#2DD4BF] block mb-2">
          02 · Experience &amp; Academic Background
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.025em] text-[#F2F1ED]">
          Career &amp; Research Ledger
        </h2>
        <p className="text-[15px] sm:text-base text-[#9BA1A6] max-w-2xl mt-3 leading-relaxed">
          From national research laboratories and ASTM materials testing to credit risk analytics and enterprise financial platforms.
        </p>
      </div>

      {/* Career Ledger Rows */}
      <div className="divide-y divide-white/[0.08] border-y border-white/[0.08] mb-14 sm:mb-16">
        {experience.map((exp, idx) => (
          <motion.div
            key={`${exp.company}-${exp.role}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.2) }}
            className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
          >
            {/* Left Rail: Dates, Company, Clickable ID & Activity Previews */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div>
                <span className="font-mono-tech text-xs text-[#2DD4BF] uppercase tracking-wider">
                  {exp.duration}
                </span>
                <h3 className="font-display text-lg font-semibold text-[#F2F1ED] mt-1.5 leading-snug">
                  {exp.company}
                </h3>
                {exp.location && (
                  <p className="font-mono-tech text-xs text-[#6C727A] mt-1">{exp.location}</p>
                )}
              </div>

              {/* Compact Clickable Credential & Activity Media */}
              <div className="flex items-stretch gap-3 max-w-xs">
                {exp.idCard && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenModal({
                        title: `${exp.role} — ${exp.company}`,
                        category: 'Credential / ID Card',
                        year: exp.duration,
                        image: exp.idCard,
                        desc: `Official credential and identification from ${exp.company}.`,
                      })
                    }
                    className="w-20 aspect-[3/4] shrink-0 rounded-lg overflow-hidden border border-white/[0.1] bg-[#111317] relative group cursor-pointer"
                    title="View credential"
                  >
                    <img
                      src={exp.idCard}
                      alt={`${exp.company} credential`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </span>
                  </button>
                )}

                {exp.sliderImages && exp.sliderImages.length > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenModal({
                        title: `${exp.role} — Activity Documentation`,
                        category: exp.company,
                        year: exp.duration,
                        sliderImages: exp.sliderImages,
                        desc: `Fieldwork, laboratory testing, and team documentation during tenure at ${exp.company}.`,
                      })
                    }
                    className="flex-1 aspect-[4/3] rounded-lg overflow-hidden border border-white/[0.1] bg-[#111317] relative group cursor-pointer"
                    title="Open activity gallery"
                  >
                    <ActivityThumbSlider images={exp.sliderImages} alt={exp.company} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between font-mono-tech text-[10px] text-[#F2F1ED]">
                      <span className="inline-flex items-center gap-1">
                        <Images className="w-3 h-3 text-[#2DD4BF]" />
                        {exp.sliderImages.length} photos
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-[#9BA1A6] group-hover:text-white transition-colors" />
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Rail: Role & Impact Bullets */}
            <div className="lg:col-span-8">
              <h4 className="font-display text-xl sm:text-2xl font-semibold text-[#F2F1ED] mb-4">
                {exp.role}
              </h4>
              <ul className="space-y-3">
                {exp.highlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[14px] sm:text-[15px] text-[#A1A6AD] leading-relaxed"
                  >
                    <span className="w-3 h-[1.5px] bg-[#2DD4BF]/70 mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Education Panel */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45 }}
        className="editorial-card rounded-xl p-6 sm:p-8 lg:p-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#2DD4BF]">
                  Academic Education · {education.year}
                </span>
                <span className="font-mono-tech text-xs text-[#9BA1A6]">
                  {education.location}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F2F1ED]">
                {education.institution}
              </h3>
              <p className="text-base sm:text-lg text-[#D4D6D9] font-medium mt-1">
                {education.degree}
              </p>

              <div className="flex flex-wrap gap-3 mt-5">
                <div className="px-3.5 py-2 rounded-md bg-[#090A0C] border border-white/[0.08] flex items-center gap-2.5">
                  <span className="font-mono-tech text-[11px] uppercase text-[#6C727A]">
                    Cumulative GPA
                  </span>
                  <span className="font-mono-tech text-sm font-semibold text-[#2DD4BF]">
                    {education.gpa}
                  </span>
                </div>
                <div className="px-3.5 py-2 rounded-md bg-[#090A0C] border border-white/[0.08] flex items-center gap-2.5">
                  <span className="font-mono-tech text-[11px] uppercase text-[#6C727A]">
                    PTESOL Score
                  </span>
                  <span className="font-mono-tech text-sm font-semibold text-[#F2F1ED]">
                    {education.ptesol}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-white/[0.08]">
              <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#6C727A] block mb-3">
                Faculty Honors &amp; Recognition
              </span>
              <ul className="space-y-2">
                {education.awards.map((award) => (
                  <li
                    key={award}
                    className="flex items-start gap-2.5 text-sm text-[#A1A6AD] leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Bento: Side-by-side Graduation Photos (Responsive Grid on All Devices) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            {education.photos.map((photo) => (
              <button
                key={photo.title}
                type="button"
                onClick={() => onOpenModal({ ...photo, type: 'education' })}
                className="relative aspect-[3/4] rounded-lg overflow-hidden border border-white/[0.08] bg-[#090A0C] group cursor-pointer text-left"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#F2F1ED]">
                    Enlarge
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2DD4BF]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
