export const brand = {
  name: 'Chyrah Place',
  short: 'Chyrah',
  tagline: 'Relax, we go run am.',
  whatsapp: '2348050877193',
  whatsappDisplay: '0805 087 7193',
  instagram: '@chyrahplace_',
  instagramUrl: 'https://instagram.com/chyrahplace_',
  email: 'Chyrahplace0@gmail.com',
  address: 'House 5 Dakar Street, Biltmore Estate, Galadimawa, Abuja',
  addressShort: 'Galadimawa, Abuja',
};

export const images = {
  heroWide: 'https://images.pexels.com/photos/4440568/pexels-photo-4440568.jpeg?auto=compress&cs=tinysrgb&w=1400',
  suppliesBucket: 'https://images.pexels.com/photos/4440541/pexels-photo-4440541.jpeg?auto=compress&cs=tinysrgb&w=1200',
  livingRoom: 'https://images.pexels.com/photos/10168692/pexels-photo-10168692.jpeg?auto=compress&cs=tinysrgb&w=1200',
  officeClean: 'https://images.pexels.com/photos/33827312/pexels-photo-33827312.jpeg?auto=compress&cs=tinysrgb&w=1200',
  homeCarePlant: 'https://images.pexels.com/photos/11419079/pexels-photo-11419079.jpeg?auto=compress&cs=tinysrgb&w=1200',
  pedicure: 'https://images.pexels.com/photos/17056221/pexels-photo-17056221.jpeg?auto=compress&cs=tinysrgb&w=1200',
  manicure: 'https://images.pexels.com/photos/5874876/pexels-photo-5874876.jpeg?auto=compress&cs=tinysrgb&w=1200',
  spaHands: 'https://images.pexels.com/photos/18706407/pexels-photo-18706407.jpeg?auto=compress&cs=tinysrgb&w=1200',
  towelFold: 'https://images.pexels.com/photos/6466228/pexels-photo-6466228.jpeg?auto=compress&cs=tinysrgb&w=1200',
  kitchenClean: 'https://images.pexels.com/photos/8031909/pexels-photo-8031909.jpeg?auto=compress&cs=tinysrgb&w=1200',
  bathroomClean: 'https://images.pexels.com/photos/4239115/pexels-photo-4239115.jpeg?auto=compress&cs=tinysrgb&w=1200',
  glovesYellow: 'https://images.pexels.com/photos/28576636/pexels-photo-28576636.jpeg?auto=compress&cs=tinysrgb&w=1200',
  finalCta: 'https://images.pexels.com/photos/10608904/pexels-photo-10608904.jpeg?auto=compress&cs=tinysrgb&w=1600',
  aboutTeam: 'https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?auto=compress&cs=tinysrgb&w=1200',
  mapPreview: 'https://images.pexels.com/photos/16237804/pexels-photo-16237804.jpeg?auto=compress&cs=tinysrgb&w=1200',

  amakaAvatar: 'https://images.pexels.com/photos/1181631/pexels-photo-1181631.jpeg?auto=compress&cs=tinysrgb&w=400',
  zainabAvatar: 'https://images.pexels.com/photos/8070478/pexels-photo-8070478.jpeg?auto=compress&cs=tinysrgb&w=400',
  tundeAvatar: 'https://images.pexels.com/photos/19518397/pexels-photo-19518397.jpeg?auto=compress&cs=tinysrgb&w=400',

  faqSupport: 'https://images.pexels.com/photos/7682340/pexels-photo-7682340.jpeg?auto=compress&cs=tinysrgb&w=1200',

  messyDesk: 'https://images.pexels.com/photos/8386521/pexels-photo-8386521.jpeg?auto=compress&cs=tinysrgb&w=1200',
  manicureStation: 'https://images.pexels.com/photos/13068361/pexels-photo-13068361.jpeg?auto=compress&cs=tinysrgb&w=1200',

  messyBedroom: 'https://images.pexels.com/photos/7303688/pexels-photo-7303688.jpeg?auto=compress&cs=tinysrgb&w=1200',
  tidyBedroom: 'https://images.pexels.com/photos/8583859/pexels-photo-8583859.jpeg?auto=compress&cs=tinysrgb&w=1200',
  clutteredKitchen: 'https://images.pexels.com/photos/4816319/pexels-photo-4816319.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

export const services = [
  {
    slug: 'domestic-cleaning',
    hub: 'home-services',
    name: 'Domestic Cleaning',
    short: 'Meticulous, room-by-room home cleaning that resets your space to its best self.',
    icon: 'home',
    image: images.livingRoom,
    before: images.messyBedroom,
    startingAt: 30000,
    benefits: [
      'A home that feels reset, not just tidied',
      'Trained staff who follow a consistent room-by-room standard',
      'Eco-conscious products safe for children and pets',
      'Flexible one-time or recurring plans',
    ],
    included: [
      'Living areas, bedrooms, and kitchen deep-wiped and dusted',
      'Bathrooms sanitised, tiles and fittings degreased',
      'Floors swept, mopped, and vacuumed',
      'Surfaces, switches, and high-touch points disinfected',
      'Trash disposal and general tidy-up',
    ],
    faqs: [
      { q: 'How long does a domestic cleaning session take?', a: 'Most homes take between 2 and 5 hours depending on size and the plan you choose. Our team confirms an estimated window when you book.' },
      { q: 'Do I need to provide cleaning supplies?', a: 'No. Our staff arrive fully equipped with professional-grade, eco-conscious products and tools.' },
    ],
  },
  {
    slug: 'office-cleaning',
    hub: 'home-services',
    name: 'Office Cleaning',
    short: 'A spotless workspace that reflects the standard your business holds itself to.',
    icon: 'office',
    image: images.officeClean,
    before: images.messyDesk,
    startingAt: 45000,
    benefits: [
      'Cleaner air and surfaces for a healthier workplace',
      'Scheduled around your business hours, not the other way around',
      'Consistent standards across every visit',
      'Discreet, professional staff conduct',
    ],
    included: [
      'Workstations, desks, and shared surfaces wiped and sanitised',
      'Meeting rooms and reception areas detailed',
      'Restrooms fully sanitised and restocked on request',
      'Floors vacuumed and mopped',
      'Waste collection and bin liner replacement',
    ],
    faqs: [
      { q: 'Can you clean outside business hours?', a: 'Yes, early morning, evening, and weekend slots are available so cleaning never disrupts your team.' },
      { q: 'Do you offer recurring office contracts?', a: 'Yes, weekly and multi-weekly office plans are available. Contact us for a tailored quote.' },
    ],
  },
  {
    slug: 'custom-home-care',
    hub: 'home-services',
    name: 'Custom Home Care',
    short: 'A bespoke care appointment built entirely around what your home needs right now.',
    icon: 'target',
    image: images.homeCarePlant,
    before: images.clutteredKitchen,
    startingAt: 35000,
    benefits: [
      'A plan designed around your specific request',
      'Ideal for move-ins, post-event resets, or one-off deep needs',
      'Same trusted, vetted staff standard as every Chyrah visit',
      'Transparent pricing agreed before we arrive',
    ],
    included: [
      'A pre-visit call to scope exactly what you need',
      'Tailored task list — from laundry care to organising to specialised deep cleans',
      'Dedicated staff assigned to your appointment',
      'Follow-up check to confirm satisfaction',
    ],
    faqs: [
      { q: 'What counts as a "custom" request?', a: 'Anything outside a standard clean — post-renovation cleanup, move-in resets, wardrobe organising, and similar bespoke tasks.' },
      { q: 'How is custom home care priced?', a: 'We scope your request first, then confirm a fixed price before any booking is charged.' },
    ],
  },
  {
    slug: 'pedicure',
    hub: 'beauty',
    name: 'Pedicure',
    short: 'A premium foot treatment, delivered with the same care as a luxury spa visit.',
    icon: 'nail',
    image: images.pedicure,
    before: images.towelFold,
    startingAt: 20000,
    benefits: [
      'Salon-grade results in the comfort of your home',
      'Hygienic, single-use or fully sterilised tools',
      'Relaxing soak, exfoliation, and finish of your choice',
      'No travel, no waiting room',
    ],
    included: [
      'Warm soak and nail shaping',
      'Callus and cuticle care',
      'Foot massage and moisturising treatment',
      'Polish application in your chosen finish',
    ],
    faqs: [
      { q: 'Are your tools sterilised between clients?', a: 'Yes. Every tool is either single-use or fully sterilised before your session, and our technicians are trained on strict hygiene protocol.' },
      { q: 'How long does a pedicure session take?', a: 'A full pedicure typically takes 45 to 60 minutes.' },
    ],
  },
  {
    slug: 'manicure',
    hub: 'beauty',
    name: 'Manicure',
    short: 'Sophisticated nail care for the modern professional, using the finest equipment.',
    icon: 'sparkles',
    image: images.manicure,
    before: images.manicureStation,
    startingAt: 15000,
    benefits: [
      'Precise, elegant finish for the professional look you need',
      'Premium polish and tool selection',
      'Gentle hand treatment included',
      'Fits neatly alongside a cleaning appointment on the same visit',
    ],
    included: [
      'Nail shaping and cuticle care',
      'Hand exfoliation and massage',
      'Base coat, polish, and top coat application',
      'Finishing hand moisturiser',
    ],
    faqs: [
      { q: 'Can I book manicure and pedicure together?', a: 'Yes, most clients book both in a single home visit for convenience.' },
      { q: 'Do you offer gel or long-lasting polish?', a: 'Yes, gel and standard polish options are available and can be selected during booking.' },
    ],
  },
];

export const hubs = {
  'home-services': {
    slug: 'home-services',
    name: 'Home Services',
    accent: 'home',
    tagline: 'A home that runs itself.',
    description: 'Domestic, office, and bespoke home care delivered by trained, insured professionals who treat your space like their own.',
    icon: 'home',
    image: images.suppliesBucket,
  },
  beauty: {
    slug: 'beauty',
    name: 'Beauty',
    accent: 'beauty',
    tagline: 'Pampering, at your door.',
    description: 'Pedicure and manicure sessions with salon-grade care, brought to the comfort of your own home.',
    icon: 'sparkleHeart',
    image: images.spaHands,
  },
};

export const packageCategories = [
  {
    key: 'classic',
    name: 'Chyrah Classic',
    tagline: 'Reliable. Affordable. Spotless.',
    cycle: 'One-time deep clean',
    tiers: [
      { size: 'Self-Contain / 1 Bedroom', price: 30000, cycle: 'One-time' },
      { size: '2 Bedroom', price: 45000, cycle: 'One-time' },
      { size: '3 Bedroom', price: 55000, cycle: 'One-time' },
    ],
    includes: ['One-time full deep clean', 'All rooms, kitchen, and bathrooms', 'Professional-grade products included', 'No long-term commitment'],
  },
  {
    key: 'ballers',
    name: 'Chyrah Ballers',
    tagline: 'Premium cleaning for premium living.',
    cycle: 'Monthly — once per week',
    popular: true,
    tiers: [
      { size: '1 Bedroom', price: 96000, cycle: 'Monthly' },
      { size: '2 Bedroom', price: 144000, cycle: 'Monthly' },
      { size: '3 Bedroom', price: 176000, cycle: 'Monthly' },
      { size: '4+ Bedroom', price: 208000, cycle: 'Monthly' },
    ],
    includes: ['One visit every week, all month', 'Consistent assigned cleaning team', 'Priority scheduling', 'Restock of basic supplies on request'],
  },
  {
    key: 'elite',
    name: 'Chyrah Elite',
    tagline: 'Three visits a week. Never a speck out of place.',
    cycle: 'Monthly — three times per week',
    tiers: [
      { size: '1 Bedroom', price: 111000, cycle: 'Monthly' },
      { size: '2 Bedroom', price: 159000, cycle: 'Monthly' },
      { size: '3 Bedroom', price: 191000, cycle: 'Monthly' },
      { size: '4 Bedroom', price: 223000, cycle: 'Monthly' },
    ],
    includes: ['Three visits every week', 'Dedicated senior cleaning team', 'Same-week rescheduling flexibility', 'Complimentary quarterly deep clean'],
  },
];

export const testimonials = [
  {
    name: 'Amaka Obi',
    role: 'Corporate Executive',
    service: 'Home Cleaning',
    date: 'June 2026',
    rating: 5,
    quote: 'Chyrah Place has completely changed my weekends. I can finally relax while they handle both my home cleaning and my pedicure. Professionalism at its peak!',
    verified: true,
    image: images.amakaAvatar,
  },
  {
    name: 'Zainab Ahmed',
    role: 'Business Owner',
    service: 'Manicure & Pedicure',
    date: 'May 2026',
    rating: 5,
    quote: 'The hygiene standards are impressive. I love that I can get luxury beauty services in the comfort of my own home in Maitama. Relax, they really run am!',
    verified: true,
    image: images.zainabAvatar,
  },
  {
    name: 'Tunde Balogun',
    role: 'Tech Consultant',
    service: 'Office Cleaning',
    date: 'April 2026',
    rating: 5,
    quote: 'Fast, efficient, and very professional. The office cleaning they did was thorough. Highly recommend for any busy professional in Abuja.',
    verified: true,
    image: images.tundeAvatar,
  },
];

export const beforeAfter = [
  {
    room: 'Bedroom Reset',
    label: 'Domestic Cleaning',
    before: images.messyBedroom,
    after: images.tidyBedroom,
  },
  {
    room: 'Kitchen Deep Clean',
    label: 'Domestic Cleaning',
    before: images.clutteredKitchen,
    after: images.kitchenClean,
  },
];

export const faqImage = images.faqSupport;

export const faqs = [
  {
    q: 'How do I book a home service?',
    a: 'Booking is simple. Click the "Book Appointment" button anywhere on our site, select your desired service (cleaning, pedicure, or manicure), and choose a time that works for you. Relax, we go run am.',
  },
  {
    q: 'Which areas do you cover?',
    a: 'Chyrah Place serves clients nationwide across Nigeria. Our home hub is Abuja, where we cover Maitama, Asokoro, Wuse, Gwarinpa, Central Area, and surrounding districts in the most detail, and we coordinate teams for other major cities including Lagos, Port Harcourt, and Ibadan. Enter your address at booking and we will confirm coverage instantly.',
  },
  {
    q: 'What are your payment options?',
    a: 'We accept secure online payments via card, bank transfers, and other integrated payment platforms. All bookings must be confirmed with a payment to secure your slot.',
  },
  {
    q: 'What is your home service etiquette?',
    a: 'Our professionals are trained to provide premium, respectful, and hygienic service. We simply ask for a safe and accessible space to perform the cleaning or beauty treatment for the best results.',
  },
  {
    q: 'Can I book both cleaning and beauty services together?',
    a: 'Absolutely. Chyrah Place is your one-stop luxury solution. You can schedule a home cleaning and a professional manicure or pedicure session on the same day for ultimate convenience.',
  },
];

export const whyChooseUs = [
  { name: 'Comfort', icon: 'sparkleHeart' },
  { name: 'Hygiene', icon: 'shieldCheck' },
  { name: 'Beauty', icon: 'nail' },
  { name: 'Convenience', icon: 'clock' },
  { name: 'Professionalism', icon: 'award' },
];

export const trustPoints = [
  { title: 'Background-checked', desc: 'Every staff member is screened before joining a team.', icon: 'idCard' },
  { title: 'Insured', desc: 'Every visit is covered, so you can relax completely.', icon: 'shieldCheck' },
  { title: 'Trained & Certified', desc: 'Consistent standards, taught and re-checked regularly.', icon: 'award' },
  { title: 'ID-verified on arrival', desc: 'Know exactly who is walking through your door.', icon: 'lock' },
];

export const howItWorks = [
  { title: 'Choose your service', desc: 'Cleaning, pedicure, manicure, or all three.', icon: 'sparkles' },
  { title: 'Pick date & time', desc: 'Select a slot that fits your schedule.', icon: 'calendar' },
  { title: 'Share your location', desc: 'Confirm your address on our service map.', icon: 'mapPin' },
  { title: 'Relax, we go run am', desc: 'Your vetted team arrives, ready to work.', icon: 'checkCircle' },
];

export const serviceAreas = [
  { name: 'Maitama', lat: 9.0938, lng: 7.4951 },
  { name: 'Asokoro', lat: 9.0413, lng: 7.5248 },
  { name: 'Wuse', lat: 9.0644, lng: 7.4756 },
  { name: 'Wuse 2', lat: 9.0790, lng: 7.4693 },
  { name: 'Gwarinpa', lat: 9.1107, lng: 7.4165 },
  { name: 'Central Area', lat: 9.0579, lng: 7.4951 },
  { name: 'Galadimawa', lat: 8.9959, lng: 7.4237 },
  { name: 'Jahi', lat: 9.0980, lng: 7.4051 },
  { name: 'Utako', lat: 9.0722, lng: 7.4498 },
  { name: 'Guzape', lat: 9.0198, lng: 7.5115 },
  { name: 'Life Camp', lat: 9.1049, lng: 7.4297 },
  { name: 'Katampe', lat: 9.1177, lng: 7.4636 },
];

export const officeCenter = { lat: 8.9959, lng: 7.4237 };
export const serviceRadiusKm = 28;