'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Compass, ShieldCheck, Feather, Eye, BookOpen, Layers } from 'lucide-react';
import { PrivateCatalogueModal } from '@/features/gourmet/PrivateCatalogueModal';
import { EditionDetailModal, EditionData } from '@/features/gourmet/EditionDetailModal';

const GOURMET_COLLECTIONS: EditionData[] = [
  {
    id: 'royale-tin',
    editionNumber: 'EDITION 01',
    title: 'The Royale Tin Keepsake',
    subtitle: 'Imperial Octagonal Metallic Edition',
    quote: 'Heirloom metalcraft inspired by royal botanical pavilions.',
    image: '/images/Category_image/Royale_tin_tin/tinnew1.png',
    gallery: [
      '/images/Category_image/Royale_tin_tin/tinnew1.png',
      '/images/Category_image/Royale_tin_tin/tin1.jpeg',
    ],
    materials: [
      { name: 'Substrate', detail: 'Heavyweight architectural tinplate' },
      { name: 'Finishing', detail: 'Forest emerald matte with 24k gold filigree' },
      { name: 'Closure', detail: 'Precision airtight friction lid' },
    ],
    origin: 'Delhi NCR Atelier',
    craftsmanship:
      'Engineered with an octagonal structural profile and hand-stamped botanical crest. Designed to transcend the gifting moment and remain a permanent keepsake vessel for generations.',
    dimensions: '280mm × 280mm × 140mm',
    curation: [
      'Single-origin botanical tea cylinders',
      'Artisan saffron & almond clusters',
      'Hand-cast brass keepsake spoon',
      'Embossed authenticity parchment',
    ],
  },
  {
    id: 'velvet-chest',
    editionNumber: 'EDITION 02',
    title: 'The Velvet Chest Collection',
    subtitle: 'Lush Tactile Splendor',
    quote: 'Hand-wrapped plush velvet chests with solid brass accents.',
    image: '/images/small_anipics/velvet_tray_hero.jpg',
    gallery: [
      '/images/small_anipics/velvet_tray_hero.jpg',
      '/images/Category_image/premium_velvet/thumb.jpeg',
    ],
    materials: [
      { name: 'Upholstery', detail: 'High-pile royal velvet fabric' },
      { name: 'Core Frame', detail: 'Solid kiln-dried wood chassis' },
      { name: 'Fixtures', detail: 'Gold-plated brushed brass latches' },
    ],
    origin: 'Jaipur & Mumbai Studios',
    craftsmanship:
      'Upholstered by hand with precision corner tucks and seamless inner velvet compartments. Offers an unmatched sensory tactile experience.',
    dimensions: '320mm × 240mm × 120mm',
    curation: [
      'Belgian artisanal chocolate bonbons',
      'Hand-poured amber soy candle 220g',
      'Gold-leaf resin coaster set of 2',
      'Velvet-bound keepsake journal',
    ],
  },
  {
    id: 'the-classics',
    editionNumber: 'EDITION 03',
    title: 'The Classics Heritage',
    subtitle: 'Monochrome Linen & Botanical Treatises',
    quote: 'The foundational signature luxury hampers of The Gourmet.',
    image: '/images/Category_image/Classics/classics_hero.png',
    gallery: [
      '/images/Category_image/Classics/classics_hero.png',
      '/images/Category_image/Classics/classic.jpeg',
    ],
    materials: [
      { name: 'Paper Stock', detail: 'FSC-Certified 400gsm textured linen' },
      { name: 'Typography', detail: 'Micro-embossed gold hot foil' },
      { name: 'Ribbon', detail: 'Double-faced heavyweight satin' },
    ],
    origin: 'Pan-India Artisanal Guild',
    craftsmanship:
      'Understated luxury celebrating clean architectural proportions, tactile Italian linen wraps, and curated gourmet delicacies that evoke effortless elegance.',
    dimensions: '300mm × 220mm × 110mm',
    curation: [
      'Rare single-estate Darjeeling first flush',
      'Slow-roasted rosemary & truffle nuts',
      'Handcrafted sea-salt dark chocolate',
      'Custom gold-leaf bookmark',
    ],
  },
  {
    id: 'atelier-accents',
    editionNumber: 'EDITION 04',
    title: 'The Atelier Accents',
    subtitle: 'Small-Batch Handcrafted Masterworks',
    quote: 'Hand-poured soy botanicals, gold-flecked resin, and carved teak frames.',
    image: '/images/small_anipics/framee.png',
    gallery: [
      '/images/small_anipics/framee.png',
      '/images/Category_image/premium_velvet/thumb.jpeg',
    ],
    materials: [
      { name: 'Candle Wax', detail: '100% Pure organic soy wax' },
      { name: 'Art Accents', detail: 'Hand-cast epoxy with 24k gold flecks' },
      { name: 'Woodcraft', detail: 'Solid reclaimed teak & velvet backing' },
    ],
    origin: 'House Atelier Workshops',
    craftsmanship:
      'Crafted in strictly limited quantities. Each soy candle is hand-poured with pure essential oils in heavyweight amber glass, accompanied by artisanal resin coasters.',
    dimensions: 'Modular Artisanal Suite',
    curation: [
      'Amber glass aromatherapy soy candle',
      'Gold-flake resin coaster pair',
      'Hand-carved wooden keepsake frame',
      'Botanical aroma wax tablet',
    ],
  },
];

export default function GourmetShowcasePage() {
  const [isCatalogueModalOpen, setIsCatalogueModalOpen] = useState(false);
  const [selectedEditionForCatalogue, setSelectedEditionForCatalogue] = useState('');
  const [selectedEditionForModal, setSelectedEditionForModal] = useState<EditionData | null>(null);

  const openCatalogue = (editionTitle?: string) => {
    setSelectedEditionForCatalogue(editionTitle || 'All Editions (The Full Catalogue)');
    setIsCatalogueModalOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-[#0E110C] text-[#FAF7F2] font-sans selection:bg-[#a6bd93]/30">
      
      {/* Editorial Header */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-6 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-[9px] sm:text-[11px] uppercase tracking-[0.35em] text-[#a6bd93] font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Atelier Catalogue</span>
        </div>

        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-none">
          THE EDITIONS
        </h1>

        <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
          An editorial exploration of master craft, rare materiality, and keepsake presentations designed for enduring reverence.
        </p>
      </section>

      {/* Catalogue Grid */}
      <section className="pb-32 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14">
          {GOURMET_COLLECTIONS.map((edition) => (
            <div
              key={edition.id}
              className="group relative bg-[#151912] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#a6bd93]/60 transition-all duration-500 text-left"
            >
              <div
                className="relative aspect-[16/11] sm:aspect-[4/3] w-full overflow-hidden bg-black cursor-pointer"
                onClick={() => setSelectedEditionForModal(edition)}
              >
                <img
                  src={edition.image}
                  alt={edition.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.95] group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151912] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.25em] text-[#a6bd93] font-mono">
                  {edition.editionNumber}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#a6bd93] font-bold block">
                    {edition.subtitle}
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {edition.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {edition.quote}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedEditionForModal(edition)}
                      className="text-xs uppercase tracking-[0.2em] font-bold text-white hover:text-[#a6bd93] inline-flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Explore Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => openCatalogue(edition.title)}
                      className="text-xs uppercase tracking-[0.2em] font-bold text-[#a6bd93] hover:underline cursor-pointer"
                    >
                      Private Inquiry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODALS */}
      <PrivateCatalogueModal
        isOpen={isCatalogueModalOpen}
        onClose={() => setIsCatalogueModalOpen(false)}
        initialEdition={selectedEditionForCatalogue}
      />

      <EditionDetailModal
        edition={selectedEditionForModal}
        onClose={() => setSelectedEditionForModal(null)}
        onOpenCatalogue={(title) => {
          setSelectedEditionForModal(null);
          openCatalogue(title);
        }}
      />
    </div>
  );
}
