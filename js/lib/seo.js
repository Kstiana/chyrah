const SITE_URL = 'https://chyrahplace.com';
const SITE_NAME = 'Chyrah Place';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

function setMeta(name, content, attr = 'name') {
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(path) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = `${SITE_URL}${path}`;
}

function setJsonLd(data) {
  let script = document.getElementById('jsonld-route');
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'jsonld-route';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function applySeo({ path, title, description, image = DEFAULT_IMAGE, jsonLd = null }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Premium Home & Beauty Services Across Nigeria`;
  document.title = fullTitle;

  setMeta('description', description);
  setMeta('og:title', fullTitle, 'property');
  setMeta('og:description', description, 'property');
  setMeta('og:image', image, 'property');
  setMeta('og:url', `${SITE_URL}${path}`, 'property');
  setMeta('og:type', 'website', 'property');
  setMeta('og:site_name', SITE_NAME, 'property');
  setMeta('twitter:card', 'summary_large_image');
  setMeta('twitter:title', fullTitle);
  setMeta('twitter:description', description);
  setMeta('twitter:image', image);

  setCanonical(path);

  if (jsonLd) {
    setJsonLd(jsonLd);
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    image: DEFAULT_IMAGE,
    url: SITE_URL,
    telephone: '+2348050877193',
    email: 'Chyrahplace0@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'House 5 Dakar Street, Biltmore Estate',
      addressLocality: 'Galadimawa, Abuja',
      addressCountry: 'NG',
    },
    priceRange: '₦₦₦',
    areaServed: 'Nigeria',
  };
}

export { SITE_URL, SITE_NAME };
