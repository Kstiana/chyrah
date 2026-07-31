export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const {
    reference, hub, package_key: packageKey, bedroom_size: bedroomSize,
    date, time, address, lat, lng,
    customer_name: customerName, customer_email: customerEmail, customer_phone: customerPhone,
    amount,
  } = req.body || {};

  if (!reference || !customerEmail || !amount) {
    res.status(400).json({ error: 'Missing required booking fields' });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  try {
    if (supabaseUrl && supabaseSecretKey) {
      await fetch(`${supabaseUrl}/rest/v1/bookings`, {
        method: 'POST',
        headers: {
          apikey: supabaseSecretKey,
          Authorization: `Bearer ${supabaseSecretKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify([{
          reference,
          hub,
          package_key: packageKey,
          bedroom_size: bedroomSize,
          scheduled_date: date,
          scheduled_time: time,
          address,
          lat,
          lng,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          amount,
          payment_status: 'pending',
        }]),
      });
    }
  } catch (err) {
    res.status(200).json({ ok: true, reference, warning: 'Booking accepted but could not be persisted' });
    return;
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL || 'Chyrah Place <bookings@chyrahplace.com>',
          to: [customerEmail],
          subject: 'Your Chyrah Place booking is confirmed',
          html: `<p>Hi ${customerName || 'there'},</p><p>Your booking (ref: <strong>${reference}</strong>) for ${date || ''} ${time || ''} has been received. We'll see you soon.</p><p>Relax, we go run am.</p>`,
        }),
      });

      const notifyEmail = process.env.RESEND_NOTIFY_EMAIL;
      if (notifyEmail) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'Chyrah Place <bookings@chyrahplace.com>',
            to: [notifyEmail],
            subject: `New booking — ${reference}`,
            html: `<p>New booking received.</p><ul><li>Reference: ${reference}</li><li>Hub: ${hub}</li><li>Package: ${packageKey}</li><li>Date: ${date} ${time}</li><li>Address: ${address}</li><li>Customer: ${customerName} — ${customerEmail} — ${customerPhone}</li><li>Amount: NGN ${amount}</li></ul>`,
          }),
        });
      }
    } catch (err) {
      /* email failure should not block booking confirmation */
    }
  }

  res.status(200).json({ ok: true, reference });
}
