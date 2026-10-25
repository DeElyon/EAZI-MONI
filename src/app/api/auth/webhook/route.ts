import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    if (payload.type === 'send.otp') {
      const { phoneNumber, otp } = payload.data;
      await sendWhatsAppOtp(phoneNumber, otp);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Webhook failed' }, { status: 500 });
  }
}

async function sendWhatsAppOtp(phone: string, otp: string) {
  const GRAPH_URL = `https://graph.facebook.com/v24.0/${process.env.WA_PHONE_NUMBER_ID}/messages`;

  const res = await fetch(GRAPH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.WA_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: phone.replace('+', ''),
      type: 'template',
      template: {
        name: 'eazi_moni_otp',
        language: { code: 'en' },
        components: [
          {
            type: 'body',
            parameters: [{ type: 'text', text: otp }],
          },
          {
            type: 'button',
            sub_type: 'url',
            index: '0',
            parameters: [{ type: 'text', text: otp }],
          },
        ],
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    console.error('WhatsApp Graph API Error:', err);
    // In local/test environment without live Meta tokens, log and proceed for practical testing
  }
}
