export const SUPABASE_URL = 'https://rqhmuyznpgvdfrhvioso.supabase.co';
export const SUPABASE_REST_URL = `${SUPABASE_URL}/rest/v1`;
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_-a71N1MUXYOyu9WsshrMqQ_cW1chIh7';

async function restRequest(path, options = {}) {
  const response = await fetch(`${SUPABASE_REST_URL}${path}`, {
    ...options,
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.status}`);
  }
  return response.json();
}

export async function fetchServiceAreas() {
  return restRequest('/service_areas?select=name,lat,lng');
}

export async function fetchApprovedTestimonials() {
  return restRequest('/testimonials?select=*&is_approved=eq.true&order=created_at.desc');
}

export const bookingsWriteEndpoint = '/api/create-booking';
export const paymentVerifyEndpoint = '/api/verify-payment';
export const serviceAreaCheckEndpoint = '/api/check-service-area';
