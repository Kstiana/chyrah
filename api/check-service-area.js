export default async function handler(req, res) {
  const query = req.query?.q;
  if (!query) {
    res.status(400).json({ error: 'Missing query parameter q' });
    return;
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=ng&q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ChyrahPlace/1.0 (Chyrahplace0@gmail.com)',
        Accept: 'application/json',
      },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Lookup failed' });
  }
}
