import { useState } from 'react';
import axios from 'axios';
import { ArrowRight, ArrowUpRight, Check, Copy, Mail } from 'lucide-react';

export default function ContactSection({ profile }) {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setStatus({ type: 'idle', message: '' });

    try {
      await axios.post('/api/contact', { name, email, message });
      setStatus({
        type: 'success',
        message: 'Thank you. Your message has been received and I will reply shortly.',
      });
      form.reset();
    } catch {
      setStatus({
        type: 'error',
        message: `Could not reach the messaging service right now. You can email me directly at ${profile.email}.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left: Direct Channels & Map Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.14em] text-[#2DD4BF] block mb-2">
              04 · Contact
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.025em] text-[#F2F1ED] leading-tight">
              Let&apos;s Work Together
            </h2>
            <p className="text-[15px] sm:text-base text-[#9BA1A6] mt-3 leading-relaxed">
              Open to data analytics consulting, credit risk modeling collaborations, and full stack web engineering projects.
            </p>
          </div>

          {/* Direct Contact Ledger */}
          <div className="editorial-card rounded-xl divide-y divide-white/[0.06] overflow-hidden">
            <div className="p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <Mail className="w-4 h-4 text-[#2DD4BF] shrink-0" />
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-[#F2F1ED] hover:text-[#2DD4BF] transition-colors truncate"
                >
                  {profile.email}
                </a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-2.5 py-1 rounded bg-[#171A20] border border-white/[0.08] font-mono-tech text-[11px] text-[#A1A6AD] hover:text-[#F2F1ED] inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-[#2DD4BF]" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 flex items-center justify-between text-sm text-[#A1A6AD] hover:text-[#F2F1ED] hover:bg-white/[0.02] transition-colors"
            >
              <span>LinkedIn · /in/mchronn</span>
              <ArrowUpRight className="w-4 h-4 text-[#6C727A]" />
            </a>

            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 flex items-center justify-between text-sm text-[#A1A6AD] hover:text-[#F2F1ED] hover:bg-white/[0.02] transition-colors"
            >
              <span>WhatsApp · {profile.phone}</span>
              <ArrowUpRight className="w-4 h-4 text-[#6C727A]" />
            </a>
          </div>

          {/* Location Card */}
          <a
            href={profile.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-card group rounded-xl overflow-hidden relative h-44 flex flex-col justify-end p-4"
          >
            <img
              src="/south_jakarta_map.png"
              alt="South Jakarta Map"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/40 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2DD4BF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2DD4BF]" />
                </span>
                <span className="text-sm font-medium text-[#F2F1ED]">{profile.location}</span>
              </div>
              <span className="font-mono-tech text-[11px] text-[#A1A6AD] group-hover:text-[#F2F1ED] inline-flex items-center gap-1">
                Open Maps
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        </div>

        {/* Right: Clean Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="editorial-card rounded-xl p-6 sm:p-8 lg:p-10">
            <h3 className="font-display text-xl font-semibold text-[#F2F1ED] mb-1.5">
              Send a Direct Message
            </h3>
            <p className="text-sm text-[#9BA1A6] mb-7">
              Share project scope, collaboration ideas, or role inquiries below.
            </p>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="font-mono-tech text-[11px] uppercase tracking-wider text-[#9BA1A6]"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Budi Santoso"
                    className="w-full rounded-md bg-[#090A0C] border border-white/[0.1] px-3.5 py-2.5 text-sm text-[#F2F1ED] placeholder:text-[#6C727A] focus:outline-none focus:border-[#2DD4BF] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="font-mono-tech text-[11px] uppercase tracking-wider text-[#9BA1A6]"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="name@company.com"
                    className="w-full rounded-md bg-[#090A0C] border border-white/[0.1] px-3.5 py-2.5 text-sm text-[#F2F1ED] placeholder:text-[#6C727A] focus:outline-none focus:border-[#2DD4BF] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-mono-tech text-[11px] uppercase tracking-wider text-[#9BA1A6]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project or inquiry..."
                  className="w-full rounded-md bg-[#090A0C] border border-white/[0.1] px-3.5 py-2.5 text-sm text-[#F2F1ED] placeholder:text-[#6C727A] focus:outline-none focus:border-[#2DD4BF] transition-colors resize-none"
                />
              </div>

              {status.type !== 'idle' && (
                <div
                  role="status"
                  className={`p-3.5 rounded-md border text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    status.type === 'success'
                      ? 'bg-[#2DD4BF]/10 border-[#2DD4BF]/30 text-[#F2F1ED]'
                      : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                  }`}
                >
                  <span>{status.message}</span>
                  {status.type === 'error' && (
                    <a
                      href={`mailto:${profile.email}`}
                      className="font-mono-tech text-xs underline shrink-0 text-white"
                    >
                      Open Email App
                    </a>
                  )}
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#F2F1ED] text-[#090A0C] text-sm font-semibold hover:bg-white disabled:opacity-60 transition-colors cursor-pointer"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
