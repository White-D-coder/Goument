import { Plus } from 'lucide-react';

type FAQItem = { question: string; answer: string };

export default function HomeFAQ({ items }: { items: FAQItem[] }) {
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
    src="/images/brand/icon2.png"
    alt=""
    aria-hidden="true"
  />
</div>

        <p className="tgg-faq-description">
          Everything you need to know before sending something thoughtful.
        </p>
      </div>

      <div className="tgg-faq-items">
        {items.map(({ question, answer }, index) => (
          <details
            className="tgg-faq-item"
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
        ))}
      </div>
    </section>
  );
}

