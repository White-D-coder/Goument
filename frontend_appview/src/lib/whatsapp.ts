export interface InquiryPayload {
  pageName: string;
  name: string;
  email: string;
  phone: string;
  budget?: string;
  quantity?: string;
  occasion?: string;
}

export const formatWhatsAppInquiry = (payload: InquiryPayload): string => {
  const lines: string[] = [
    '✨ *NEW CURATION ENQUIRY* ✨',
    `📍 *Source / Page:* ${payload.pageName || 'The Gourmet Gifts Website'}`,
  ];

  if (payload.occasion) {
    lines.push(`🎯 *Occasion:* ${payload.occasion}`);
  }

  lines.push('');
  lines.push('👤 *PERSONAL DETAILS*');
  lines.push(`• *Name:* ${payload.name}`);
  lines.push(`• *Email:* ${payload.email}`);
  lines.push(`• *Phone / WhatsApp:* ${payload.phone}`);

  lines.push('');
  lines.push('📦 *REQUIREMENTS*');
  if (payload.quantity) {
    lines.push(`• *Estimated Quantity:* ${payload.quantity}`);
  }
  if (payload.budget) {
    lines.push(`• *Target Budget:* ${payload.budget}`);
  }

  lines.push('');
  lines.push('─────────────');
  lines.push('_Sent via The Gourmet Gifts Concierge_');

  return lines.join('\n');
};

export const openWhatsAppInquiry = (payload: InquiryPayload, phoneNumber: string = '917021463609'): string => {
  const text = formatWhatsAppInquiry(payload);
  const encoded = encodeURIComponent(text);
  const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
  if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  return url;
};
