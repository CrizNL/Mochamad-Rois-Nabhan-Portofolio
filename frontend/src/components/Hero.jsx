import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';

export default function Hero({ profile, keyFacts }) {
  return (
    <section
      id="home"
      className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left: Editorial Intro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 flex flex-col"
        >
          <div className="inline-flex items-center gap-2.5 mb-6 w-fit">
            <span className="w-2 h-2 rounded-full bg-[#2DD4BF]" />
            <span className="font-mono-tech text-[11px] sm:text-xs uppercase tracking-[0.14em] text-[#9BA1A6]">
              {profile.eyebrow}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-[62px] font-bold tracking-[-0.035em] text-[#F2F1ED] leading-[1.05] mb-5">
            {profile.name}
          </h1>

          <p className="font-serif-editorial italic text-2xl sm:text-3xl lg:text-[34px] text-[#D4D6D9] leading-[1.2] mb-7 max-w-2xl">
            {profile.headlineAccent}
          </p>

          <p className="text-[15px] sm:text-[17px] text-[#9BA1A6] leading-relaxed max-w-2xl mb-9">
            {profile.description}
          </p>

          <div className="flex flex-wrap items-center gap-3.5 mb-12">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#F2F1ED] text-[#090A0C] text-sm font-semibold hover:bg-white transition-colors"
            >
              Explore Selected Work
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/bnsp-sertifikat-web-developer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-white/[0.12] bg-[#111317] text-[#F2F1ED] text-sm font-medium hover:border-white/25 hover:bg-[#171A20] transition-colors"
            >
              <FileText className="w-4 h-4 text-[#2DD4BF]" />
              BNSP Credential (PDF)
            </a>
          </div>

          {/* Grounded Key Fact Ledger */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08] rounded-lg overflow-hidden">
            {keyFacts.map((fact) => (
              <div key={fact.label} className="bg-[#0D0F12] p-4 flex flex-col gap-1">
                <span className="font-mono-tech text-[10px] uppercase tracking-[0.12em] text-[#6C727A]">
                  {fact.label}
                </span>
                <span className="font-display text-sm sm:text-[15px] font-semibold text-[#F2F1ED]">
                  {fact.value}
                </span>
                <span className="text-[11px] sm:text-xs text-[#9BA1A6] leading-snug">
                  {fact.sub}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Clean Architectural Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5"
        >
          <div className="editorial-card rounded-xl overflow-hidden p-2.5 sm:p-3">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-[#171A20]">
              <img
                src="/nabhan-batik.png"
                alt="Mochamad Rois Nabhan Portrait"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/85 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-[#F2F1ED]">
                    Data Analyst · BRI &amp; Danantara
                  </p>
                  <p className="font-mono-tech text-[11px] text-[#9BA1A6] mt-0.5">
                    {profile.location}
                  </p>
                </div>
                <span className="font-mono-tech text-[11px] text-[#2DD4BF] px-2.5 py-1 rounded bg-[#090A0C]/80 border border-white/[0.1]">
                  S.Si, Physics
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
