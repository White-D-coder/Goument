'use client';

import React from 'react';
import './ImageTypography.css';

export default function ImageTypography() {
  return (
    <section className="image-type-hero">
      {/* Background full-bleed fixed media layer */}
      <div className="image-type-media" aria-hidden="true">
        <div className="image-type-dark-overlay" />
      </div>

      {/* Center 50% Ivory Partition Panel */}
      <div className="image-type-panel" />

      {/* Left 50% Container: Right-aligned stencil cut-out typography */}
      <div className="image-type-left-container">
        <div className="image-type-title" aria-label="THE ART OF GIFTING">
          <span>THE</span>
          <span>ART</span>
          <span>OF</span>
          <span>GIFTING</span>
        </div>
      </div>

      {/* Right 50% Section: Crisp Pure White Editorial Copy */}
      <div className="image-type-copy">
        <span className="copy-line" />
        <span className="copy-label">The Gourmet Gifts</span>
        <p>
          Premium gifting solutions for clients,
          <br />
          teams and special occasions.
          <br />
          Curated hampers, branded merchandise and bespoke presentation.
        </p>
      </div>

      {/* Bottom-right scroll indicator */}
      <div className="image-type-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
