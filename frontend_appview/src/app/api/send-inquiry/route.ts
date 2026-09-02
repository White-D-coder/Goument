import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { API_KEYS_CONFIG } from '@/config/appRoutes.config';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      company,
      email,
      phone,
      city,
      occasion,
      quantity,
      targetDate,
      message,
      boxItem,
      productItems,
      source = 'Gourmet Gifts Website',
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    const smtpConfig = API_KEYS_CONFIG.SMTP;
    const recipientEmail = smtpConfig.RECIPIENT_EMAIL || process.env.INQUIRY_RECIPIENT_EMAIL || 'hello@thegourmetgifts.co';
    const smtpHost = smtpConfig.HOST || process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = smtpConfig.PORT || parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpSecure = smtpConfig.SECURE;
    const smtpUser = smtpConfig.USER || process.env.SMTP_USER;
    const smtpPass = smtpConfig.PASS || process.env.SMTP_PASS;

    // Build Luxury Formatted HTML Email
    const productsHtml = Array.isArray(productItems) && productItems.length > 0
      ? productItems
          .map(
            (item: { name: string; quantity: number }, idx: number) => `
            <tr style="border-bottom: 1px solid #ECE7DE;">
              <td style="padding: 10px 14px; color: #1A1A18; font-size: 14px;">${idx + 1}. <strong>${item.name}</strong></td>
              <td style="padding: 10px 14px; color: #6B655D; font-size: 14px; text-align: right;">${item.quantity} ${item.quantity === 1 ? 'unit' : 'units'}</td>
            </tr>
          `
          )
          .join('')
      : '<tr><td colspan="2" style="padding: 12px; color: #8A8680; font-style: italic;">No individual delicacies attached (General curation request).</td></tr>';

    const boxHtml = boxItem
      ? `
        <div style="background: #F4EFE6; border: 1px solid #DFC299; border-radius: 8px; padding: 14px 18px; margin-bottom: 20px;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #9E7B35; font-weight: bold; display: block;">Selected Signature Vessel</span>
          <p style="font-size: 16px; color: #1A1A18; font-weight: 600; margin: 4px 0 0 0;">${boxItem.name || boxItem}</p>
        </div>
      `
      : `
        <div style="background: #FAF8F5; border: 1px dashed #D5CFBF; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px;">
          <span style="font-size: 13px; color: #78746D; font-style: italic;">No specific box pre-selected (Concierge assistance requested).</span>
        </div>
      `;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Curation Inquiry - The Gourmet Gifts</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F6F4EF; margin: 0; padding: 30px 15px;">
        <div style="max-width: 640px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E5E0D8; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
          
          <!-- Header Banner -->
          <div style="background: #1A1A18; padding: 32px 28px; text-align: center; border-bottom: 3px solid #DFC299;">
            <h1 style="font-family: Georgia, serif; font-size: 26px; color: #FAF8F5; font-weight: 300; letter-spacing: 0.05em; margin: 0;">THE GOURMET GIFTS</h1>
            <p style="color: #DFC299; font-size: 11px; text-transform: uppercase; letter-spacing: 0.25em; margin: 8px 0 0 0; font-weight: 600;">New Bespoke Curation Enquiry</p>
          </div>

          <!-- Body Content -->
          <div style="padding: 30px 28px;">
            
            <!-- Intro -->
            <p style="font-size: 15px; line-height: 1.6; color: #2D2A26; margin-top: 0;">
              A new gifting inquiry has been submitted via <strong>${source}</strong>. Here are the client and curation details:
            </p>

            <!-- Client Details Table -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background: #FAF8F5; border-radius: 8px; overflow: hidden; border: 1px solid #ECE7DE;">
              <tbody>
                <tr style="border-bottom: 1px solid #ECE7DE;">
                  <td style="padding: 10px 14px; font-weight: 600; color: #5A564F; width: 35%; font-size: 13px;">Client Name</td>
                  <td style="padding: 10px 14px; color: #1A1A18; font-size: 14px; font-weight: 500;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ECE7DE;">
                  <td style="padding: 10px 14px; font-weight: 600; color: #5A564F; font-size: 13px;">Email Address</td>
                  <td style="padding: 10px 14px; color: #1A1A18; font-size: 14px;"><a href="mailto:${email}" style="color: #6B001A; text-decoration: none; font-weight: 500;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #ECE7DE;">
                  <td style="padding: 10px 14px; font-weight: 600; color: #5A564F; font-size: 13px;">Phone / WhatsApp</td>
                  <td style="padding: 10px 14px; color: #1A1A18; font-size: 14px;"><a href="tel:${phone}" style="color: #1A1A18; text-decoration: none; font-weight: 500;">${phone}</a></td>
                </tr>
                ${company ? `
                <tr style="border-bottom: 1px solid #ECE7DE;">
                  <td style="padding: 10px 14px; font-weight: 600; color: #5A564F; font-size: 13px;">Company / Organisation</td>
                  <td style="padding: 10px 14px; color: #1A1A18; font-size: 14px;">${company}</td>
                </tr>
                ` : ''}
                ${city ? `
                <tr style="border-bottom: 1px solid #ECE7DE;">
                  <td style="padding: 10px 14px; font-weight: 600; color: #5A564F; font-size: 13px;">City / Region</td>
                  <td style="padding: 10px 14px; color: #1A1A18; font-size: 14px;">${city}</td>
                </tr>
                ` : ''}
                <tr style="border-bottom: 1px solid #ECE7DE;">
                  <td style="padding: 10px 14px; font-weight: 600; color: #5A564F; font-size: 13px;">Occasion / Programme</td>
                  <td style="padding: 10px 14px; color: #1A1A18; font-size: 14px;">${occasion || 'Festive / Corporate Gifting'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ECE7DE;">
                  <td style="padding: 10px 14px; font-weight: 600; color: #5A564F; font-size: 13px;">Estimated Quantity</td>
                  <td style="padding: 10px 14px; color: #1A1A18; font-size: 14px; font-weight: bold;">${quantity || '1 set'}</td>
                </tr>
                ${targetDate ? `
                <tr>
                  <td style="padding: 10px 14px; font-weight: 600; color: #5A564F; font-size: 13px;">Target Delivery Date</td>
                  <td style="padding: 10px 14px; color: #1A1A18; font-size: 14px;">${targetDate}</td>
                </tr>
                ` : ''}
              </tbody>
            </table>

            <!-- Keepsake Box Selection -->
            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B001A; font-weight: 700; margin: 24px 0 10px 0;">
              1. Packaging &amp; Box Selection
            </h3>
            ${boxHtml}

            <!-- Attached Curated Products -->
            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B001A; font-weight: 700; margin: 24px 0 10px 0;">
              2. Attached Delicacies &amp; Keepsakes (${Array.isArray(productItems) ? productItems.length : 0} items)
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background: #FFFFFF; border: 1px solid #ECE7DE; border-radius: 8px; overflow: hidden;">
              <tbody>
                ${productsHtml}
              </tbody>
            </table>

            <!-- Client Message -->
            ${message ? `
            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B001A; font-weight: 700; margin: 24px 0 10px 0;">
              3. Specific Notes &amp; Requests
            </h3>
            <div style="background: #FAF8F5; border-left: 3px solid #6B001A; padding: 14px 16px; font-size: 14px; color: #2D2A26; line-height: 1.6; margin-bottom: 24px; font-style: italic;">
              "${message}"
            </div>
            ` : ''}

            <!-- Action Button -->
            <div style="text-align: center; padding-top: 10px;">
              <a href="mailto:${email}?subject=Re: Your Curation Inquiry - The Gourmet Gifts" style="display: inline-block; background: #1A1A18; color: #FAF8F5; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;">
                Reply Directly to Client
              </a>
            </div>

          </div>

          <!-- Footer -->
          <div style="background: #ffffffff; padding: 18px 24px; text-align: center; border-top: 1px solid #ECE7DE; font-size: 12px; color: #8A8680;">
            <p style="margin: 0;">The Gourmet Gifts &copy; ${new Date().getFullYear()} — Handcrafted Keepsakes &amp; Bespoke Corporate Curations</p>
          </div>

        </div>
      </body>
      </html>
    `;

    // If SMTP credentials are configured, send real email via Nodemailer
    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"The Gourmet Gifts Concierge" <${smtpUser}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `[New Inquiry] ${name} — ${company ? `${company} (` : ''}${quantity}${company ? ')' : ''}`,
        text: `New Inquiry from ${name} (${email}, ${phone}):\nOccasion: ${occasion}\nQuantity: ${quantity}\nMessage: ${message || 'N/A'}`,
        html: htmlContent,
      });

      return NextResponse.json({
        success: true,
        message: `Inquiry successfully delivered to ${recipientEmail}`,
      });
    } else {
      // If SMTP credentials are not yet set in .env.local, log and return graceful success
      console.log(`[INQUIRY RECEIVED for ${recipientEmail}]`, {
        name,
        email,
        phone,
        company,
        occasion,
        quantity,
        boxItem,
        productItemsCount: productItems?.length || 0,
      });

      return NextResponse.json({
        success: true,
        note: 'Inquiry received. Configure SMTP_USER & SMTP_PASS in .env.local for live SMTP delivery.',
        recipient: recipientEmail,
      });
    }
  } catch (error: any) {
    console.error('Error sending inquiry email:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to dispatch email inquiry.' },
      { status: 500 }
    );
  }
}
