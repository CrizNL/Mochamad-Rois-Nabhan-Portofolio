import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileDown, Check } from 'lucide-react';

export default function CredentialsSection({
  bnspCertification,
  certificates,
  achievements,
  development,
  onOpenModal,
}) {
  const [bnspTab, setBnspTab] = useState('front');

  const activeBnspImage =
    bnspTab === 'back'
      ? bnspCertification.pages.back
      : bnspTab === 'all'
      ? bnspCertification.pages.all
      : bnspCertification.pages.front;

  return (
    <section
      id="achievements"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/[0.08]"
    >
      {/* Header */}
      <div className="mb-12 sm:mb-14">
        <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#2DD4BF] block mb-2">
          03 · Credentials &amp; Recognition
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.025em] text-[#F2F1ED]">
          Certifications, Awards &amp; Development
        </h2>
        <p className="text-[15px] sm:text-base text-[#9BA1A6] max-w-2xl mt-3 leading-relaxed">
          National software engineering accreditation, international competition honors, and formal technical training.
        </p>
      </div>

      {/* Featured BNSP National Certification */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45 }}
        className="editorial-card rounded-xl p-5 sm:p-8 mb-8 sm:mb-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Certificate Preview */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <button
              type="button"
              onClick={() =>
                onOpenModal({
                  title: bnspCertification.title,
                  image: activeBnspImage,
                  category: bnspCertification.issuer,
                  desc: `Official BNSP National Competency Certificate (Reg. ${bnspCertification.regNumber}) in ${bnspCertification.field}, valid ${bnspCertification.validity}.`,
                  tags: ['BNSP', 'SKKNI', 'Web Developer', 'Software Development'],
                  pdf: bnspCertification.pdf,
                  type: 'certificate',
                })
              }
              className={`w-full ${
                bnspTab === 'all' ? 'aspect-[1.414/1]' : 'aspect-[1/1.35]'
              } rounded-lg overflow-hidden bg-[#090A0C] border border-white/[0.08] p-2.5 flex items-center justify-center relative group cursor-zoom-in transition-all`}
            >
              <img
                src={activeBnspImage}
                alt={`${bnspCertification.title} — Mochamad Rois Nabhan`}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain rounded group-hover:scale-[1.02] transition-transform duration-300"
              />
              <span className="absolute top-3 right-3 w-7 h-7 rounded bg-[#090A0C]/85 border border-white/[0.1] flex items-center justify-center text-[#9BA1A6] opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#2DD4BF]" />
              </span>
            </button>

            {/* Page Switcher */}
            <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-[#090A0C] border border-white/[0.08] text-xs font-medium">
              {[
                { key: 'front', label: 'Certificate' },
                { key: 'back', label: 'SKKNI Units' },
                { key: 'all', label: 'Full View' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setBnspTab(tab.key)}
                  className={`py-1.5 px-2 rounded-md transition-colors cursor-pointer ${
                    bnspTab === tab.key
                      ? 'bg-[#F2F1ED] text-[#090A0C] font-semibold'
                      : 'text-[#9BA1A6] hover:text-[#F2F1ED]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Credential Metadata & Competency Units */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#2DD4BF]/10 border border-[#2DD4BF]/25 font-mono-tech text-[11px] uppercase tracking-wider text-[#2DD4BF]">
                National Accreditation · BNSP
              </span>
              <span className="px-2.5 py-1 rounded bg-[#171A20] border border-white/[0.08] font-mono-tech text-[11px] text-[#A1A6AD]">
                Valid {bnspCertification.validity}
              </span>
            </div>

            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F2F1ED] leading-snug">
                {bnspCertification.title}
              </h3>
              <p className="text-sm text-[#9BA1A6] mt-1">{bnspCertification.issuer}</p>
              <p className="font-mono-tech text-xs text-[#6C727A] mt-2 break-all">
                Reg. No: <span className="text-[#F2F1ED]">{bnspCertification.regNumber}</span> ·{' '}
                {bnspCertification.field}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
              <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#6C727A] block mb-3">
                6 Verified SKKNI Competency Units
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {bnspCertification.units.map((unit) => (
                  <div
                    key={unit}
                    className="px-3 py-2 rounded-md bg-[#090A0C] border border-white/[0.06] text-xs sm:text-[13px] text-[#D4D6D9] flex items-center gap-2"
                  >
                    <Check className="w-3.5 h-3.5 text-[#2DD4BF] shrink-0" />
                    <span>{unit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={bnspCertification.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#F2F1ED] text-[#090A0C] text-xs sm:text-sm font-semibold hover:bg-white transition-colors"
              >
                <FileDown className="w-4 h-4" />
                Open Official PDF
              </a>
              <span className="font-mono-tech text-[11px] text-[#6C727A]">
                Accredited under Indonesian National Work Competency Standards
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4 Verified Certificates Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14 sm:mb-16">
        {certificates.map((cert) => (
          <button
            key={cert.title}
            type="button"
            onClick={() => onOpenModal({ ...cert, type: 'certificate' })}
            className="editorial-card rounded-xl p-3.5 flex flex-col gap-3 text-left group cursor-pointer"
          >
            <div className="relative aspect-[1.414/1] rounded-lg overflow-hidden bg-[#090A0C] border border-white/[0.06]">
              <img
                src={cert.image}
                alt={cert.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2.5 right-2.5 w-7 h-7 rounded bg-[#090A0C]/85 border border-white/[0.1] flex items-center justify-center text-[#9BA1A6] opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#2DD4BF]" />
              </span>
            </div>
            <div>
              <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[#2DD4BF] block">
                {cert.category}
              </span>
              <h4 className="font-display text-sm font-semibold text-[#F2F1ED] group-hover:text-[#2DD4BF] transition-colors mt-1 line-clamp-2 leading-snug">
                {cert.title}
              </h4>
            </div>
          </button>
        ))}
      </div>

      {/* Editorial Honors & Continuous Learning Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-4">
        {/* Honors Column */}
        <div className="lg:col-span-6">
          <h3 className="font-display text-xl font-semibold text-[#F2F1ED] mb-5 pb-3 border-b border-white/[0.08]">
            Honors &amp; Appointments
          </h3>
          <div className="divide-y divide-white/[0.06]">
            {achievements.map((item) => (
              <div key={item.title} className="py-4 first:pt-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="text-[15px] font-medium text-[#F2F1ED]">{item.title}</h4>
                  <span className="font-mono-tech text-xs text-[#6C727A] shrink-0">
                    {item.date}
                  </span>
                </div>
                <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#D4AF37] block mt-1">
                  {item.role}
                </span>
                {item.desc && (
                  <p className="text-xs sm:text-[13px] text-[#9BA1A6] mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Continuous Development Column */}
        <div className="lg:col-span-6">
          <h3 className="font-display text-xl font-semibold text-[#F2F1ED] mb-5 pb-3 border-b border-white/[0.08]">
            Training &amp; Programs
          </h3>
          <div className="divide-y divide-white/[0.06]">
            {development.map((item) => (
              <div
                key={item.title}
                className="py-4 first:pt-0 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4"
              >
                <span className="text-[15px] font-medium text-[#F2F1ED]">{item.title}</span>
                <span className="font-mono-tech text-xs text-[#2DD4BF] shrink-0">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
