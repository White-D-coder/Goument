'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Compass, ShieldCheck, Feather, ArrowRight } from 'lucide-react';

export interface EditionData {
  id: string;
  editionNumber: string;
  title: string;
  subtitle: string;
  quote: string;
  image: string;
  gallery: string[];
  materials: { name: string; detail: string }[];
  origin: string;
  craftsmanship: string;
  dimensions: string;
  curation: string[];
}

interface EditionDetailModalProps {
  edition: EditionData | null;
  onClose: () => void;
  onOpenCatalogue: (editionTitle: string) => void;
}

export const EditionDetailModal: React.FC<EditionDetailModalProps> = ({
  edition,
  onClose,
  onOpenCatalogue,
}) => {
  if (!edition) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-lg"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-[#171A15] border border-[#a6bd93]/30 text-white rounded-3xl overflow-hidden shadow-2xl z-10 my-6 font-sans flex flex-col max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="overflow-y-auto no-scrollbar flex-1">
            {/* Full Bleed Image Header */}
            <div className="relative w-full h-[320px] sm:h-[420px] bg-black overflow-hidden">
              <img
                src={edition.image}
                alt={edition.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171A15] via-black/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[9px] uppercase tracking-[0.25em] text-[#a6bd93] font-bold">
                  <span>{edition.editionNumber}</span>
                  <span>•</span>
                  <span>{edition.origin}</span>
                </div>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {edition.title}
                </h2>
                <p className="text-xs sm:text-sm text-white/75 font-serif italic">
                  “{edition.quote}”
                </p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-10 space-y-8 text-left">
              {/* Craftsmanship Statement */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#a6bd93] font-bold">
                  Haute Craftsmanship &amp; Provenance
                </h4>
                <p className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed font-normal">
                  {edition.craftsmanship}
                </p>
              </div>

              {/* Anatomy of Materials (Horlogerie-inspired Specs) */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#a6bd93] font-bold">
                  Materiality &amp; Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {edition.materials.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1"
                    >
                      <span className="text-[10px] uppercase tracking-wider text-[#a6bd93] font-bold block">
                        {m.name}
                      </span>
                      <p className="text-xs text-white/70">{m.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curation Elements */}
              <div className="space-y-3">
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#a6bd93] font-bold">
                  Keepsake Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80">
                  {edition.curation.map((c, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#a6bd93]" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="text-[11px] text-white/50">
                  Dimensions: <strong className="text-white/80">{edition.dimensions}</strong>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCatalogue(edition.title);
                    }}
                    className="px-6 py-3 bg-[#a6bd93] hover:bg-[#8ba278] text-[#171A15] text-xs font-bold uppercase tracking-widest rounded-full transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Request Private Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
