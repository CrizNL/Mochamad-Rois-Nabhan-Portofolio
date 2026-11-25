import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';

const ModalGallery = ({ images, title, activeIndex, onIndexChange }) => {
  const [localIndex, setLocalIndex] = useState(activeIndex || 0);
  const currentIndex = activeIndex !== undefined ? activeIndex : localIndex;

  const setIndex = useCallback(
    (newIdx) => {
      if (onIndexChange) onIndexChange(newIdx);
      setLocalIndex(newIdx);
    },
    [onIndexChange]
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') {
        setIndex((currentIndex + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        setIndex((currentIndex - 1 + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, images.length, setIndex]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full relative aspect-[16/10] max-h-[58vh] min-h-[240px] sm:min-h-[340px] md:min-h-[440px] rounded-lg overflow-hidden bg-[#090A0C] border border-white/[0.08] flex items-center justify-center">
        <img
          key={currentIndex}
          src={currentImage}
          alt={`${title} — Slide ${currentIndex + 1}`}
          className="max-h-full max-w-full object-contain p-2 rounded"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((currentIndex - 1 + images.length) % images.length);
              }}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-md bg-[#111317]/90 hover:bg-[#171A20] border border-white/[0.14] text-[#F2F1ED] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex((currentIndex + 1) % images.length);
              }}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-md bg-[#111317]/90 hover:bg-[#171A20] border border-white/[0.14] text-[#F2F1ED] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#090A0C]/90 border border-white/[0.1] font-mono-tech text-[11px] text-[#F2F1ED]">
              <span className="text-[#2DD4BF]">{currentIndex + 1}</span> / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="w-full flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex(idx);
              }}
              className={`shrink-0 w-16 aspect-[16/10] rounded overflow-hidden border transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'border-[#2DD4BF] opacity-100'
                  : 'border-white/[0.1] opacity-45 hover:opacity-85'
              }`}
            >
              <img src={img} alt={`Slide thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function MediaLightbox({
  modalMedia,
  activeSlide,
  onSlideChange,
  onClose,
}) {
  return (
    <AnimatePresence>
      {modalMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111317] border border-white/[0.12] rounded-xl overflow-hidden max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/[0.08] bg-[#0D0F12]">
              <div className="flex flex-col gap-1 pr-4 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono-tech text-[11px] uppercase tracking-wider text-[#2DD4BF]">
                    {modalMedia.category}
                    {modalMedia.year ? ` · ${modalMedia.year}` : ''}
                  </span>
                  {modalMedia.badge && (
                    <span className="px-2 py-0.5 rounded bg-[#171A20] border border-white/[0.1] font-mono-tech text-[10px] text-[#F2F1ED] uppercase">
                      {modalMedia.badge}
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-[#F2F1ED] truncate">
                  {modalMedia.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close preview"
                className="w-9 h-9 rounded-md bg-[#171A20] hover:bg-[#1E222A] border border-white/[0.1] flex items-center justify-center text-[#A1A6AD] hover:text-white transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-5">
              {modalMedia.sliderImages && modalMedia.sliderImages.length > 0 ? (
                <ModalGallery
                  images={modalMedia.sliderImages}
                  title={modalMedia.title}
                  activeIndex={activeSlide}
                  onIndexChange={onSlideChange}
                />
              ) : modalMedia.image ? (
                <div className="w-full relative aspect-[16/10] max-h-[58vh] min-h-[240px] sm:min-h-[340px] md:min-h-[440px] rounded-lg overflow-hidden bg-[#090A0C] border border-white/[0.08] flex items-center justify-center">
                  <img
                    src={modalMedia.image}
                    alt={modalMedia.title}
                    className="max-h-full max-w-full object-contain p-2 rounded"
                  />
                </div>
              ) : null}

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-3 border-t border-white/[0.08]">
                <div className="flex flex-col gap-2.5 max-w-2xl">
                  {modalMedia.desc && (
                    <p className="text-[13px] sm:text-sm text-[#A1A6AD] leading-relaxed whitespace-pre-line">
                      {modalMedia.desc}
                    </p>
                  )}
                  {modalMedia.tags && modalMedia.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {modalMedia.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono-tech text-[11px] px-2 py-0.5 rounded bg-[#171A20] border border-white/[0.06] text-[#A1A6AD]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="shrink-0">
                  {modalMedia.pdf ? (
                    <a
                      href={modalMedia.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#F2F1ED] text-[#090A0C] text-xs sm:text-sm font-semibold hover:bg-white transition-colors"
                    >
                      Open PDF Document
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : modalMedia.sliderImages && modalMedia.sliderImages.length > 0 ? (
                    <a
                      href={modalMedia.sliderImages[activeSlide] || modalMedia.sliderImages[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#171A20] hover:bg-[#1E222A] border border-white/[0.12] text-[#F2F1ED] text-xs sm:text-sm font-medium transition-colors"
                    >
                      Open Full Resolution
                      <ExternalLink className="w-3.5 h-3.5 text-[#2DD4BF]" />
                    </a>
                  ) : modalMedia.image ? (
                    <a
                      href={modalMedia.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#171A20] hover:bg-[#1E222A] border border-white/[0.12] text-[#F2F1ED] text-xs sm:text-sm font-medium transition-colors"
                    >
                      Open Full Resolution
                      <ExternalLink className="w-3.5 h-3.5 text-[#2DD4BF]" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
