export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { reference } = req.body || {};
  if (!reference) {
    res.status(400).json({ error: 'Missing payment reference' });
    return;
  }

  const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
  if (!paystackSecret) {
    res.status(200).json({ ok: false, verified: false, message: 'Paystack secret key not configured yet' });
    return;
  }

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${paystackSecret}` },
    });
    const data = await response.json();
    const verified = Boolean(data?.data?.status === 'success');

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

    if (verified && supabaseUrl && supabaseSecretKey) {
      await fetch(`${supabaseUrl}/rest/v1/bookings?reference=eq.${encodeURIComponent(reference)}`, {
        method: 'PATCH',
        headers: {
          apikey: supabaseSecretKey,
          Authorization: `Bearer ${supabaseSecretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_status: 'paid' }),
      });
    }

    res.status(200).json({ ok: true, verified, reference });
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Verification failed' });
  }
}
