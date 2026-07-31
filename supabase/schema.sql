create extension if not exists "uuid-ossp";

create table if not exists bookings (
  id uuid primary key default uuid_generate_v4(),
  reference text unique not null,
  hub text not null,
  package_key text,
  bedroom_size text,
  scheduled_date date,
  scheduled_time text,
  address text,
  lat double precision,
  lng double precision,
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  amount numeric not null,
  payment_status text not null default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists bookings_reference_idx on bookings (reference);
create index if not exists bookings_email_idx on bookings (customer_email);

alter table bookings enable row level security;

create policy "No public access to bookings"
  on bookings for select
  using (false);

create table if not exists service_areas (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  lat double precision not null,
  lng double precision not null,
  created_at timestamptz not null default now()
);

alter table service_areas enable row level security;

create policy "Public can read service areas"
  on service_areas for select
  using (true);

insert into service_areas (name, lat, lng) values
  ('Maitama', 9.0938, 7.4951),
  ('Asokoro', 9.0413, 7.5248),
  ('Wuse', 9.0644, 7.4756),
  ('Wuse 2', 9.0790, 7.4693),
  ('Gwarinpa', 9.1107, 7.4165),
  ('Central Area', 9.0579, 7.4951),
  ('Galadimawa', 8.9959, 7.4237),
  ('Jahi', 9.0980, 7.4051),
  ('Utako', 9.0722, 7.4498),
  ('Guzape', 9.0198, 7.5115),
  ('Life Camp', 9.1049, 7.4297),
  ('Katampe', 9.1177, 7.4636)
on conflict do nothing;

create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  role text,
  service text,
  rating int not null default 5,
  quote text not null,
  is_verified boolean not null default true,
  is_approved boolean not null default false,
  image_url text,
  created_at timestamptz not null default now()
);

alter table testimonials enable row level security;

create policy "Public can read approved testimonials"
  on testimonials for select
  using (is_approved = true);

insert into testimonials (name, role, service, rating, quote, is_verified, is_approved) values
  ('Amaka Obi', 'Corporate Executive', 'Home Cleaning', 5, 'Chyrah Place has completely changed my weekends. I can finally relax while they handle both my home cleaning and my pedicure. Professionalism at its peak!', true, true),
  ('Zainab Ahmed', 'Business Owner', 'Manicure & Pedicure', 5, 'The hygiene standards are impressive. I love that I can get luxury beauty services in the comfort of my own home in Maitama. Relax, they really run am!', true, true),
  ('Tunde Balogun', 'Tech Consultant', 'Office Cleaning', 5, 'Fast, efficient, and very professional. The office cleaning they did was thorough. Highly recommend for any busy professional in Abuja.', true, true)
on conflict do nothing;
