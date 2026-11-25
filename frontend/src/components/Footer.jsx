export default function Footer({ profile }) {
  return (
    <footer className="border-t border-white/[0.08] bg-[#090A0C] py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-display text-sm font-semibold tracking-wider uppercase text-[#F2F1ED]">
          RN PORTFOLIO
        </span>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-tech text-xs uppercase tracking-wider text-[#6C727A] hover:text-[#F2F1ED] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-tech text-xs uppercase tracking-wider text-[#6C727A] hover:text-[#F2F1ED] transition-colors"
          >
            Instagram
          </a>
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-tech text-xs uppercase tracking-wider text-[#6C727A] hover:text-[#F2F1ED] transition-colors"
          >
            WhatsApp
          </a>
        </div>

        <span className="font-mono-tech text-xs tracking-wider uppercase text-[#6C727A]">
          © 2026 MOCHAMAD ROIS NABHAN
        </span>
      </div>
    </footer>
  );
}
