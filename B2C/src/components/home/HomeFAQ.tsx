import { Plus } from 'lucide-react';

type FAQItem = { question: string; answer: string };

export default function HomeFAQ({ items }: { items: FAQItem[] }) {
  return <section className="tgg-faq" id="faq" aria-labelledby="faq-heading">
    <div className="tgg-faq-intro">
      <p className="tgg-kicker">A little more to know</p>
      <h2 id="faq-heading">Frequently asked questions.</h2>
    </div>
    <div className="tgg-faq-items">
      {items.map(({ question, answer }) => <details key={question} name="home-faq">
        <summary><span>{question}</span><Plus size={18} strokeWidth={1.5} aria-hidden="true" /></summary>
        <p>{answer}</p>
      </details>)}
    </div>
  </section>;
}
