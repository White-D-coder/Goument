/* eslint-disable @next/next/no-img-element -- Pre-sized local WebP decoration, loaded lazily. */
import { ChevronDown, Plus } from 'lucide-react';

type FAQItem = { question: string; answer: string };

export default function HomeFAQ({ items }: { items: FAQItem[] }) {
  const renderQuestion = ({ question, answer }: FAQItem, index: number) => (
    <details
      className={`tgg-faq-item${index < 5 ? ' tgg-faq-item--divided' : ''}`}
      key={question}
      name="home-faq"
    >
      <summary>
        <span className="tgg-faq-number">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="tgg-faq-question">{question}</span>

        <span className="tgg-faq-toggle" aria-hidden="true">
          <Plus size={19} strokeWidth={1.5} />
        </span>
      </summary>

      <div className="tgg-faq-answer">
        <p>{answer}</p>
      </div>
    </details>
  );

  return (
    <section
      className="tgg-faq-section tgg-faq"
      id="faq"
      aria-labelledby="faq-heading"
    >
      <div className="tgg-faq-intro">
        <p className="tgg-kicker">A little more to know</p>
        
<div className="tgg-faq-title-row">
  <h2 id="faq-heading">
    Frequently asked questions.
  </h2>

  <img
    className="tgg-faq-title-icon"
    src="/images/brand/faq-gift.webp"
    alt=""
    width={600}
    height={400}
    loading="lazy"
    decoding="async"
    aria-hidden="true"
  />
</div>

        <p className="tgg-faq-description">
          Everything you need to know before sending something thoughtful.
        </p>
      </div>

      <div className="tgg-faq-items">
        {items.slice(0, 4).map(renderQuestion)}
        {items.length > 4 && (
          <details className="tgg-faq-more">
            <summary className="tgg-faq-more-summary">
              <span className="tgg-faq-more-label">More questions</span>
              <span className="tgg-faq-less-label">Fewer questions</span>
              <ChevronDown size={18} aria-hidden="true" />
            </summary>
            {items.slice(4).map((item, index) => renderQuestion(item, index + 4))}
          </details>
        )}
      </div>
    </section>
  );
}

