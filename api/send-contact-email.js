export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.RESEND_NOTIFY_EMAIL;

  if (!resendKey || !notifyEmail) {
    res.status(200).json({ ok: true, warning: 'Email is not configured yet, message logged only' });
    return;
  }

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'Chyrah Place <no-reply@chyrahplace.com>',
        to: [notifyEmail],
        reply_to: email,
        subject: `New contact form message from ${name}`,
        html: `<p><strong>${name}</strong> (${email}) wrote:</p><p>${String(message).replace(/</g, '&lt;')}</p>`,
      }),
    });
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Could not send message' });
  }
}
