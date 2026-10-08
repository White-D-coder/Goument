'use client';

import { useId, useState } from 'react';
import { giftingEnquiry } from '@/lib/product-editorial';

export default function GiftNoteRequest({ name }: { name: string }) {
  const [note, setNote] = useState('');
  const id = useId();
  return <div className="pdp-note">
    <span className="pdp-eyebrow">The personal touch</span>
    <h2>A note, from you.</h2>
    <p>A few words can make it their own. Ask us to include your message.</p>
    <details>
      <summary className="pdp-link">Personalise <span aria-hidden="true">→</span></summary>
      <div className="pdp-note-form">
        <label htmlFor={id}>Your gift message</label>
        <textarea id={id} rows={3} maxLength={300} value={note} onChange={event => setNote(event.target.value)} placeholder="A little something, just for you…" aria-describedby={`${id}-help`}/>
        <p id={`${id}-help`}>Send this as an enquiry. Our team will confirm availability and any charge; this message is not saved to your cart.</p>
        <a className="pdp-link" href={giftingEnquiry(name, `I'd like to request a gift note. Please confirm the options and any charge.\n\nGift message: ${note.trim() || '(To be confirmed)'}`)}>Email this request <span aria-hidden="true">↗</span></a>
      </div>
    </details>
  </div>;
}
