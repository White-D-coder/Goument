'use client';

import React from 'react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { ProductShowcase } from '@/components/editorial/ProductShowcase';
import { EditorialCTA } from '@/components/editorial/EditorialCTA';

const COLLECTIONS = [
  {
    id: 'keepsake-vessels',
    number: '01',
    label: 'Series 01 • Metalcraft',
    title: 'Heirloom Keepsake Vessels',
    editorial: 'Forged from custom-cast architectural tinplate and finished in deep forest emerald with 24k-inspired gilded botanical filigree. Designed to serve as a permanent heirloom vessel long after celebration.',
    heroImage: '/images/Category_image/Royale_tin_tin/tinnew1.png',
    details: {
      origin: 'Delhi NCR Atelier',
      materials: 'Heavyweight Tinplate, Gold Foil Stamping, Airtight Friction Lid',
      pieces: '4 Curated Variants',
    },
    products: [
      {
        image: '/images/Category_image/Royale_tin_tin/tin1.jpeg',
        secondaryImage: '/images/Category_image/Royale_tin_tin/tin2.jpeg',
        title: 'Emerald Octagonal Vessel',
        description: 'Botanical crest with gold filigree and airtight seal.',
      },
      {
        image: '/images/Category_image/Royale_tin_tin/tin7.jpeg',
        secondaryImage: '/images/Category_image/Royale_tin_tin/tin6.jpeg',
        title: 'Heritage Cylindrical Keepsake',
        description: 'Classic proportions with embossed gilded detailing.',
      },
      {
        image: '/images/Category_image/Royale_tin_tin/tin3.jpeg',
        title: 'Grand Rectangular Chest',
        description: 'Generous format engineered for multi-tier epicurean curation.',
      },
    ],
  },
  {
    id: 'velvet-suites',
    number: '02',
    label: 'Series 02 • Tactile',
    title: 'Bespoke Velvet Suites',
    editorial: 'Enclosed in rich high-pile royal velvet with hand-stitched inner linings and satin pull-tabs. Each chest represents hours of meticulous upholstery by heritage master craftsmen.',
    heroImage: '/images/small_anipics/velvet_tray_hero.jpg',
    details: {
      origin: 'Jaipur & Mumbai Studios',
      materials: 'High-pile Velvet, Solid Wood Sub-frame, Gold-plated Brass',
      pieces: '6 Curated Variants',
    },
    products: [
      {
        image: '/images/Category_image/premium_velvet/vel1.jpeg',
        secondaryImage: '/images/Category_image/premium_velvet/vel2.jpeg',
        title: 'Royal Burgundy Velvet Chest',
        description: 'Deep crimson velvet with brushed gold-plated latches.',
      },
      {
        image: '/images/Category_image/premium_velvet/vel3.jpeg',
        title: 'Midnight Sapphire Suite',
        description: 'Magnetic closure with bespoke velvet compartment dividers.',
      },
      {
        image: '/images/Category_image/premium_velvet/thumb.jpeg',
        title: 'Forest Emerald Velvet Tray',
        description: 'Ultra-soft tactile upholstery with gold hardware.',
      },
    ],
  },
  {
    id: 'heritage-hampers',
    number: '03',
    label: 'Series 03 • Heritage',
    title: 'Heritage Botanical Hampers',
    editorial: 'Understated luxury celebrating clean architectural proportions, textured Italian linen wraps, and curated gourmet delicacies that evoke effortless elegance.',
    heroImage: '/images/Category_image/Classics/classics_hero.png',
    details: {
      origin: 'Pan-India Artisanal Guild',
      materials: 'FSC Certified Board, Textured Linen Wrap, Gold Hot-foil Typography',
      pieces: '8 Curated Variants',
    },
    products: [
      {
        image: '/images/Category_image/Classics/classic_1.png',
        secondaryImage: '/images/Category_image/Classics/classic.jpeg',
        title: 'Signature Ivory Linen Box',
        description: 'Clean architectural proportions and botanical pairing.',
      },
      {
        image: '/images/Category_image/Classics/classic_2.png',
        title: 'Botanica Heritage Hamper',
        description: 'Textured linen wrap with hot-stamped botanical crest.',
      },
      {
        image: '/images/Category_image/Classics/classic_3.png',
        title: 'Imperial Gilded Hamper',
        description: 'Hot-foil typography with heavyweight double-satin ribbon.',
      },
    ],
  },
  {
    id: 'atelier-accents',
    number: '04',
    label: 'Series 04 • Atelier',
    title: 'In-House Atelier Accents',
    editorial: 'Created in intimate batches by our in-house artisans. From slow-burning botanical soy candles to gold-flecked resin coasters and hand-turned woodwork.',
    heroImage: '/images/small_anipics/framee.png',
    details: {
      origin: 'House Atelier Workshops',
      materials: 'Pure Soy Wax, Epoxy Resin with Gold Leaf, Solid Teak',
      pieces: '5 Handcrafted Pieces',
    },
    products: [
      {
        image: '/images/Product_images/CRAFTED IN-HOUSE/candle_120.png',
        title: 'Amber Botanical Soy Candle',
        description: 'Pure organic soy wax and essential oil blend.',
      },
      {
        image: '/images/Product_images/CRAFTED IN-HOUSE/Resin_Coaster_Setof2(Brand Colours).jpg',
        title: 'Gold-Flecked Resin Coasters',
        description: 'Hand-cast paired set with 24k gold leaf inclusions.',
      },
      {
        image: '/images/Product_images/CRAFTED IN-HOUSE/frame.jpg',
        title: 'Carved Teak Keepsake Frame',
        description: 'Hand-carved reclaimed wood with velvet backing.',
      },
    ],
  },
];

export default function CollectionsPage() {
  return (
    <div className="w-full bg-[#F6F4EF] text-[#1A1A18]">
      {/* Page Header */}
      <section className="pt-[140px] pb-[80px] md:pt-[160px] md:pb-[100px] px-6 lg:px-12 max-w-[1280px] mx-auto">
        <ScrollReveal animation="fadeUp">
          <div className="max-w-2xl text-left">
            <span className="type-meta text-[#8A8680] block mb-4">The Complete Lookbook</span>
            <h1 className="type-display text-[#1A1A18]" style={{ fontSize: 'clamp(40px, 7vw, 80px)' }}>
              Curated Collections
            </h1>
            <p className="type-body text-[#8A8680] mt-4 max-w-lg text-sm md:text-base leading-relaxed">
              Four distinct series of materiality, craftsmanship, and keepsake presentations designed for enduring reverence.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Collection Chapters */}
      {COLLECTIONS.map((collection, idx) => (
        <section
          key={collection.id}
          id={collection.id}
          className={`pb-[100px] md:pb-[140px] ${idx > 0 ? 'pt-[40px] md:pt-[60px]' : ''}`}
        >
          {/* Subtle Divider */}
          {idx > 0 && (
            <div className="max-w-[1280px] mx-auto px-6 lg:px-12 mb-[60px] md:mb-[80px]">
              <div className="h-px bg-[#E0DDD6]" />
            </div>
          )}

          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            {/* Hero Image + Story Grid */}
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16 md:mb-20 ${
              idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
            }`}>
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:col-start-6' : ''}`}>
                <ParallaxImage
                  src={collection.heroImage}
                  alt={collection.title}
                  aspect="aspect-[4/3] md:aspect-[16/11]"
                  speed={0.08}
                  priority={idx === 0}
                />
              </div>

              <div className={`lg:col-span-5 text-left ${idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <ScrollReveal animation="fadeUp" delay={0.15}>
                  <div className="space-y-5 max-w-md">
                    <span className="type-meta text-[#8A8680] block">{collection.label}</span>
                    <h2 className="type-heading text-[#1A1A18]">{collection.title}</h2>
                    <p className="type-body text-[#8A8680] text-sm leading-relaxed">{collection.editorial}</p>

                    {/* Metadata Spec List */}
                    <div className="pt-4 space-y-3 border-t border-[#E0DDD6]">
                      <div className="flex justify-between text-xs">
                        <span className="type-meta text-[#8A8680]">Origin</span>
                        <span className="type-body text-[#1A1A18] text-right font-medium">{collection.details.origin}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="type-meta text-[#8A8680]">Materials</span>
                        <span className="type-body text-[#1A1A18] text-right max-w-[200px] font-medium">{collection.details.materials}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="type-meta text-[#8A8680]">Variants</span>
                        <span className="type-body text-[#1A1A18] text-right font-medium">{collection.details.pieces}</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {collection.products.map((product, pIdx) => (
                <ProductShowcase
                  key={pIdx}
                  image={product.image}
                  secondaryImage={product.secondaryImage}
                  collection={collection.title}
                  title={product.title}
                  description={product.description}
                  href={`/collections#${collection.id}`}
                  aspect="aspect-[3/4]"
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom Bespoke Callout */}
      <section className="py-[100px] md:py-[140px] px-6 lg:px-12 border-t border-[#E0DDD6] bg-white">
        <div className="max-w-[720px] mx-auto text-center">
          <ScrollReveal animation="fadeUp">
            <div className="space-y-5">
              <span className="type-meta text-[#8A8680] block">Bespoke Gifting</span>
              <h2 className="type-heading text-[#1A1A18]">Curate a Custom Presentation</h2>
              <p className="type-body text-[#8A8680] text-sm max-w-md mx-auto leading-relaxed">
                Connect with our concierge team to design custom monograms, bespoke colorways, and tailored epicurean pairings.
              </p>
              <div className="flex items-center justify-center gap-6 pt-3">
                <EditorialCTA label="Corporate Enquiries" href="/corporate" />
                <EditorialCTA label="Contact Studio" href="/contact" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
