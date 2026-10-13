import { type CSSProperties, type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, Check, Download, FileText, Menu, Minus, Plus, X, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link, Route, Switch } from 'wouter';
import apexLiftexLogo from '@assets/apex_logo_with_white_(1)_1791906752557.png';
import dispatchImage from '@assets/generated_images/apex-liftex-order-coordination.jpg';
import { products, productBySlug, type Product, type ProductImage } from './data/products';

function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} — APEX LIFTEX`;
    const meta = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', description);
    document.head.appendChild(meta);
    const og = document.querySelector('meta[property="og:title"]') ?? document.createElement('meta');
    og.setAttribute('property', 'og:title');
    og.setAttribute('content', `${title} — APEX LIFTEX`);
    document.head.appendChild(og);
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]') ?? document.createElement('link');
    favicon.setAttribute('rel', 'icon');
    favicon.setAttribute('type', 'image/png');
    favicon.setAttribute('href', apexLiftexLogo);
    document.head.appendChild(favicon);
  }, [title, description]);
  return null;
}

const nav = [
  { href: '/products', label: 'Products' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/applications', label: 'Applications' },
  { href: '/about', label: 'About' },
  { href: '/quality', label: 'Quality' },
  { href: '/contact', label: 'Contact' },
];

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" data-testid="link-logo">
      <img src={apexLiftexLogo} alt="" className="h-14 w-14 shrink-0 object-contain" />
      <span>
        <span className="display block text-[16px] font-bold tracking-[.12em] text-[var(--frost)]">APEX LIFTEX</span>
        <span className="mono block text-[8px] tracking-[.15em] text-[var(--sage)]">ENGINEERED LOAD SECUREMENT</span>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <header className={`fixed inset-x-0 top-0 z-20 transition-all duration-300 ${scrolled ? 'bg-[rgba(17,19,21,.92)] backdrop-blur-md' : 'bg-transparent'}`}><div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10"><Logo /><nav className="hidden items-center gap-7 lg:flex">{nav.map((item) => <Link key={item.href} href={item.href} className="text-[11px] font-semibold uppercase tracking-[.13em] text-[var(--mist)] transition-colors hover:text-[var(--lime)]" data-testid={`link-nav-${item.label.toLowerCase()}`}>{item.label}</Link>)}<Link href="/quote" className="group ml-3 flex items-center gap-3 bg-[var(--lime)] px-4 py-3 text-[11px] font-bold uppercase tracking-[.12em] text-[var(--ink)]" data-testid="link-request-quote">Request a quote <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link></nav><button className="text-[var(--frost)] lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" data-testid="button-mobile-menu">{open ? <X /> : <Menu />}</button></div>{open && <div className="border-t border-[var(--sage)]/20 bg-[var(--ink)] px-5 pb-7 lg:hidden">{nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="block border-b border-[var(--sage)]/20 py-4 text-sm font-semibold uppercase tracking-[.1em] text-[var(--mist)]" data-testid={`link-mobile-${item.label.toLowerCase()}`}>{item.label}</Link>)}<Link href="/quote" onClick={() => setOpen(false)} className="mt-5 flex items-center justify-between bg-[var(--lime)] px-4 py-4 text-xs font-bold uppercase tracking-[.12em] text-[var(--ink)]" data-testid="link-mobile-quote">Request a quote <ArrowRight size={16} /></Link></div>}</header>;
}

function Footer() {
  return <footer className="bg-[var(--ink)] px-5 pb-7 pt-20 text-[var(--frost)] lg:px-10"><div className="mx-auto max-w-[1440px]"><div className="grid gap-12 border-b border-[var(--sage)]/20 pb-16 md:grid-cols-[1.2fr_.8fr_.8fr]"><div><Logo /><p className="mt-8 max-w-sm text-sm leading-7 text-[var(--sage)]">Precision-engineered belts and load-securing solutions for the routes, yards and operations that keep industry moving.</p></div><div><p className="mono mb-5 text-[10px] uppercase tracking-[.16em] text-[var(--teal)]">Explore</p>{nav.slice(0, 4).map((item) => <Link key={item.href} href={item.href} className="mb-3 block text-sm text-[var(--mist)] hover:text-[var(--lime)]" data-testid={`link-footer-${item.label.toLowerCase()}`}>{item.label}</Link>)}</div><div><p className="mono mb-5 text-[10px] uppercase tracking-[.16em] text-[var(--teal)]">Start a conversation</p><p className="text-sm leading-6 text-[var(--sage)]">Contact details<br />editable placeholder</p><Link href="/quote" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--lime)]" data-testid="link-footer-quote">Request a quote <ArrowRight size={16} /></Link></div></div><div className="flex flex-col justify-between gap-3 pt-5 text-[10px] uppercase tracking-[.13em] text-[var(--sage)] md:flex-row"><span>© {new Date().getFullYear()} Apex Liftex / Apex Engineering</span><span>Built for the load. Designed for the journey.</span></div></div></footer>;
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="noise min-h-[100dvh] overflow-hidden"><Header />{children}<Footer /></div>;
}

function NotFound() {
  return <Shell><Seo title="Page not found" description="The requested Apex Liftex page could not be found." /><main className="bg-[var(--ink)] px-5 pb-32 pt-48 text-[var(--frost)] lg:px-10"><div className="mx-auto max-w-[1440px]"><SectionLabel num="404" light>Not in the route plan</SectionLabel><h1 className="display mt-10 max-w-3xl text-[clamp(4.5rem,12vw,11rem)] leading-[.82] tracking-[-.08em]">WRONG<br /><span className="text-[var(--lime)]">TURN.</span></h1><p className="mt-8 max-w-md text-sm leading-7 text-[var(--sage)]">This page is not part of the current journey. Return to the starting point and choose a new route.</p><ButtonLink href="/">Back to home</ButtonLink></div></main></Shell>;
}

function ProductVisual({ product, large = false, image }: { product: Product; large?: boolean; image?: ProductImage }) {
  const photo = image ?? product.primaryImage;
  return <div className={`product-visual product-photo-frame group relative overflow-hidden bg-[#242c2f] ${large ? 'h-[420px] md:h-[620px]' : 'h-[250px] md:h-[330px]'}`} style={{ '--accent-color': product.color } as CSSProperties}><img src={photo.src} alt={photo.alt} className="product-photo absolute inset-0 h-full w-full object-cover" style={{ objectPosition: photo.position ?? 'center' }} /><div className="absolute inset-0 site-grid-dark opacity-30" /><div className="absolute left-5 top-5 z-[1] border-l-2 border-[var(--accent-color)] pl-3"><span className="mono block text-[9px] uppercase tracking-[.14em] text-[var(--frost)]">APX / {product.code}</span><span className="mono mt-1 block text-[8px] uppercase tracking-[.12em] text-[var(--sage)]">{photo.label}</span></div><div className="absolute bottom-5 right-5 z-[1] mono text-[9px] tracking-[.1em] text-[var(--frost)]/70">FIELD IMAGE / {product.eyebrow}</div></div>;
}

function ProductGallery({ product, selected, onSelect }: { product: Product; selected: number; onSelect: (index: number) => void }) {
  return <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-4">{product.gallery.map((image, index) => <button key={image.src} type="button" onClick={() => onSelect(index)} className={`gallery-thumb relative aspect-[1.25] overflow-hidden border ${selected === index ? 'border-[var(--lime)]' : 'border-[var(--sage)]/25 opacity-70 hover:opacity-100'}`} aria-label={`Show ${image.label}`} data-testid={`button-gallery-${product.slug}-${index}`}><img src={image.src} alt={image.alt} className="h-full w-full object-cover" style={{ objectPosition: image.position ?? 'center' }} /><span className="absolute inset-x-0 bottom-0 bg-[rgba(17,19,21,.78)] px-2 py-1 text-left mono text-[8px] uppercase tracking-[.08em] text-[var(--frost)]">{image.label}</span></button>)}</div>;
}

function ButtonLink({ href, children, inverse = false, preserveCase = false }: { href: string; children: ReactNode; inverse?: boolean; preserveCase?: boolean }) {
  return <Link href={href} className={`group inline-flex items-center gap-4 px-5 py-4 text-[11px] font-bold ${preserveCase ? 'normal-case' : 'uppercase'} tracking-[.13em] transition-all ${inverse ? 'border border-[var(--sage)]/40 text-[var(--frost)] hover:border-[var(--lime)] hover:text-[var(--lime)]' : 'bg-[var(--lime)] text-[var(--ink)] hover:bg-[var(--frost)]'}`} data-testid={`link-cta-${href.replaceAll('/', '-') || 'home'}`}>{children}<ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>;
}

function SectionLabel({ num, children, light = false }: { num: string; children: ReactNode; light?: boolean }) {
  return <div className={`mono flex items-center gap-3 text-[10px] uppercase tracking-[.18em] ${light ? 'text-[var(--teal)]' : 'text-[var(--slate)]/60'}`}><span>{num}</span><span className="h-px w-7 bg-current" />{children}</div>;
}

function Home() {
  return (
    <Shell>
      <Seo
        title="High-Strength Ratchet Lashing Belts Built for Reliable Load Security."
        description="Discover dependable ratchet lashing belts, industrial webbing belts, ratchet locks, and hooks designed for demanding cargo securing applications."
      />
      <main>
        <section className="relative min-h-[760px] bg-[var(--ink)] px-5 pb-16 pt-32 text-[var(--frost)] lg:px-10 lg:pt-40">
          <div className="absolute inset-0 site-grid-dark opacity-60" />
          <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-[.95fr_1.05fr]">
            <div className="reveal max-w-2xl">
              <SectionLabel num="01 / 06" light>LOAD SECUREMENT SOLUTIONS</SectionLabel>
              <h1 className="display mt-8 max-w-[680px] text-[clamp(2.8rem,5.5vw,5.9rem)] font-medium leading-[.94] tracking-[-.065em]">
                High-Strength Ratchet Lashing Belts Built for Reliable Load Security.
              </h1>
              <p className="reveal reveal-delay mt-8 max-w-lg text-base leading-7 text-[var(--sage)]">
                Discover dependable ratchet lashing belts, industrial webbing belts, ratchet locks, and hooks designed for demanding cargo securing applications.
              </p>
              <div className="reveal reveal-delay-2 mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/products" preserveCase>Explore Products</ButtonLink>
                <ButtonLink href="/quote" inverse preserveCase>Request a Quote</ButtonLink>
              </div>
            </div>
            <div className="reveal reveal-delay relative lg:pt-10">
              <ProductVisual product={products[1]} large />
              <div className="absolute -bottom-7 -left-3 border border-[var(--sage)]/40 bg-[var(--ink)] px-4 py-3 md:left-[-24px]">
                <span className="mono block text-[9px] uppercase tracking-[.16em] text-[var(--teal)]">Apex Liftex / Product study</span>
                <span className="mt-1 block text-xs text-[var(--mist)]">Webbing / ratchet / hook</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-5 flex items-center gap-3 lg:left-10">
            <span className="h-9 w-px bg-[var(--lime)]" />
            <span className="mono text-[9px] uppercase tracking-[.16em] text-[var(--sage)]">Scroll to inspect</span>
          </div>
        </section>
        <AboutApexLiftex />
        <WhyChooseApexLiftex />
        <OurProductApproach />
        <ProductCategories />
        <Performance />
        <ApplicationsTease />
        <CtaBand />
      </main>
    </Shell>
  );
}

function AboutApexLiftex() {
  const visuals = [
    { product: products[1], image: products[1].primaryImage, label: 'Ratchet Lashing Belts', index: '01' },
    { product: products[0], image: products[0].primaryImage, label: 'Roll Belts', index: '02' },
    { product: products[1], image: products[1].gallery[1], label: 'Ratchet Locks & Hooks', index: '03' },
  ];

  return (
    <section id="about-apex-liftex" className="scroll-mt-20 bg-[var(--mist)] px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel num="ABOUT APEX LIFTEX">{null}</SectionLabel>
        <div className="mt-8 grid gap-9 lg:grid-cols-[.88fr_1.12fr] lg:gap-16">
          <h2 className="display max-w-2xl text-[clamp(2.8rem,5.4vw,5.8rem)] leading-[.93] tracking-[-.07em] text-[var(--ink)]">
            Reliable Load Securing. Built Around Your Needs.
          </h2>
          <div className="space-y-5 pt-1 text-sm leading-7 text-[var(--slate)]/75 md:text-base">
            <p>
              Apex Liftex provides dependable load-securing products for industrial, transportation, and cargo-handling applications. Our range includes ratchet lashing belts, roll belts, ratchet locks, and hooks designed to support secure and efficient load restraint.
            </p>
            <p>
              We focus on helping businesses find the right products for their operational requirements, with an emphasis on product reliability, practical functionality, and consistent service. Whether you need individual components or solutions for ongoing industrial requirements, Apex Liftex is committed to supporting your business with the right products.
            </p>
          </div>
        </div>

        <div className="mt-14 grid items-start gap-5 md:grid-cols-12 lg:mt-20">
          {visuals.map((visual, index) => (
            <figure
              key={visual.label}
              className={`group relative overflow-hidden bg-[var(--slate)] ${
                index === 0
                  ? 'md:col-span-5'
                  : index === 1
                    ? 'md:col-span-4 md:mt-16'
                    : 'md:col-span-3 md:mt-7'
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#85898b] md:aspect-[.82/1]">
                <img
                  src={visual.image.src}
                  alt={visual.image.alt}
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  style={{ objectPosition: visual.image.position ?? 'center' }}
                />
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[rgba(17,19,21,.88)] via-transparent to-[rgba(17,19,21,.08)]" />
                <figcaption className="absolute inset-x-0 bottom-0 z-[2] flex items-end justify-between gap-3 p-4 text-[var(--frost)] md:p-5">
                  <div>
                    <span className="mono mb-2 block text-[9px] uppercase tracking-[.15em] text-[var(--orange-bright)]">
                      {visual.index} / APEX LIFTEX
                    </span>
                    <span className="display text-xl leading-tight tracking-[-.04em] md:text-2xl">
                      {visual.label}
                    </span>
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>

        <div className="mt-16 grid gap-0 border-t border-[var(--slate)]/25 md:mt-20 md:grid-cols-3">
          {[
            {
              title: 'Product-Focused Solutions',
              description: 'A practical range of belts, locks, and hooks for load-securing applications.',
            },
            {
              title: 'Reliable Product Selection',
              description: 'Options suited to different operational and cargo-handling requirements.',
            },
            {
              title: 'B2B Supply Support',
              description: 'Responsive assistance for business buyers, distributors, and industrial customers.',
            },
          ].map((feature, index) => (
            <article
              key={feature.title}
              className="border-b border-[var(--slate)]/25 py-6 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0"
            >
              <span className="mono text-[10px] tracking-[.12em] text-[var(--orange-deep)]">
                0{index + 1}
              </span>
              <h3 className="display mt-5 text-2xl leading-tight tracking-[-.04em] text-[var(--ink)]">
                {feature.title}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--slate)]/70">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseApexLiftex() {
  const reducedMotion = useReducedMotion();
  const features = [
    {
      number: '01',
      category: 'Product Reliability',
      title: 'Products Selected for Industrial Demands',
      description: 'Explore load-securing products suited to industrial, transportation, and cargo-handling requirements, with options for different applications.',
      icon: <Check size={22} strokeWidth={1.5} />,
    },
    {
      number: '02',
      category: 'Quality-Focused Selection',
      title: 'Quality That Starts with the Right Choice',
      description: 'We focus on product suitability, consistent selection, and helping businesses identify the right belts and components for their operational needs.',
      icon: <FileText size={22} strokeWidth={1.5} />,
    },
    {
      number: '03',
      category: 'Responsive Business Support',
      title: 'Support That Keeps Business Moving',
      description: 'From product enquiries to order requirements, our team works to provide responsive assistance to distributors, dealers, and industrial buyers.',
      icon: <ArrowRight size={22} strokeWidth={1.5} />,
    },
    {
      number: '04',
      category: 'Solutions for Diverse Applications',
      title: 'One Range. Multiple Applications.',
      description: 'From ratchet lashing belts and roll belts to ratchet locks and hooks, our product range supports a variety of load-securing and cargo-handling applications.',
      icon: <Plus size={22} strokeWidth={1.5} />,
    },
  ];

  return (
    <section className="bg-[var(--ink)] px-5 py-20 text-[var(--frost)] lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel num="WHY CHOOSE APEX LIFTEX" light>{null}</SectionLabel>
        <h2 className="display mt-8 max-w-4xl text-[clamp(2.8rem,5.4vw,5.8rem)] leading-[.93] tracking-[-.07em]">
          The Right Products. Reliable Business Support.
        </h2>
        <div className="mt-14 grid gap-x-12 border-t border-[var(--sage)]/25 md:grid-cols-2 lg:mt-20">
          {features.map((feature, index) => (
            <motion.article
              key={feature.number}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.07 }}
              className="group border-b border-[var(--sage)]/25 py-8 transition-colors duration-300 hover:bg-white/[.025] md:min-h-[270px] md:py-10"
            >
              <div className="flex gap-5 md:gap-7">
                <span className="mono pt-1 text-[10px] tracking-[.12em] text-[var(--orange-bright)]">
                  {feature.number}
                </span>
                <div className="min-w-0">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <span className="text-[var(--orange-bright)] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                      {feature.icon}
                    </span>
                    <span className="mono text-right text-[9px] uppercase tracking-[.15em] text-[var(--sage)]/70">
                      {feature.category}
                    </span>
                  </div>
                  <h3 className="display max-w-lg text-2xl leading-tight tracking-[-.04em] transition-colors duration-300 group-hover:text-[var(--orange-bright)] md:text-3xl">
                    {feature.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--sage)]">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurProductApproach() {
  const reducedMotion = useReducedMotion();
  const stages = [
    {
      number: '01',
      name: 'Understanding Requirements',
      title: 'Understanding Your Needs',
      description: 'Application-focused product selection.',
      image: products[1].primaryImage,
      alt: 'Orange ratchet lashing belt with ratchet mechanism and hook laid out for product review.',
      aspect: 'aspect-[1/1]',
      imageGrid: 'lg:col-span-7 lg:col-start-1',
      contentGrid: 'lg:col-span-4 lg:col-start-9',
      annotation: 'PRODUCT REVIEW',
    },
    {
      number: '02',
      name: 'Product Selection',
      title: 'Selecting the Right Products',
      description: 'Belts and components suited to your requirements.',
      image: products[0].primaryImage,
      alt: 'Neatly arranged orange webbing roll belts photographed against a neutral gray surface.',
      aspect: 'aspect-[3/2]',
      imageGrid: 'lg:col-span-6 lg:col-start-7 lg:row-start-1',
      contentGrid: 'lg:col-span-5 lg:col-start-1 lg:row-start-1',
      annotation: 'PRODUCT RANGE',
    },
    {
      number: '03',
      name: 'Product Suitability',
      title: 'Focus on Product Compatibility',
      description: 'Helping buyers identify suitable load-securing products and components.',
      image: products[1].gallery[1],
      alt: 'Close view of orange webbing, metal ratchet lock and hook hardware on a gray surface.',
      aspect: 'aspect-[4/3]',
      imageGrid: 'lg:col-span-6 lg:col-start-1',
      contentGrid: 'lg:col-span-5 lg:col-start-8',
      annotation: 'COMPONENT DETAIL',
    },
    {
      number: '04',
      name: 'Order Coordination',
      title: 'Support from Enquiry to Delivery',
      description: 'Responsive communication throughout the order process.',
      image: { src: dispatchImage, alt: 'Unbranded orange webbing rolls and load-securing hardware arranged in plain cartons.', label: 'Product coordination' },
      alt: 'Unbranded orange webbing rolls and load-securing hardware arranged in plain cartons.',
      aspect: 'aspect-[16/10]',
      imageGrid: 'lg:col-span-7 lg:col-start-6 lg:row-start-1',
      contentGrid: 'lg:col-span-4 lg:col-start-1 lg:row-start-1',
      annotation: 'ORDER COORDINATION',
    },
  ];

  return (
    <section className="bg-[var(--ink)] px-5 py-20 text-[var(--frost)] lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-7 border-b border-[var(--sage)]/25 pb-9 lg:grid-cols-[.7fr_1.3fr] lg:items-end lg:pb-12">
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2">
            <p className="mono text-[10px] uppercase tracking-[.18em] text-[var(--orange-bright)]">OUR PRODUCT APPROACH</p>
            <span className="mono text-[8px] uppercase tracking-[.13em] text-[var(--sage)]/60">Industrial Product Journey</span>
          </div>
          <h2 className="display max-w-5xl text-[clamp(2.8rem,5.4vw,5.8rem)] leading-[.94] tracking-[-.07em]">
            From Product Selection to <em className="font-normal text-[var(--orange-bright)]">Business Delivery</em>
          </h2>
        </div>

        <div className="mt-5 lg:mt-8">
          {stages.map((stage, index) => (
            <motion.article
              key={stage.number}
              initial={reducedMotion ? false : { opacity: 0, y: 30 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: index * 0.08 }}
              className="grid items-center gap-7 border-b border-[var(--sage)]/25 py-9 lg:grid-cols-12 lg:gap-10 lg:py-12"
            >
              <motion.div
                initial={reducedMotion ? false : { opacity: 0.75, scale: 0.985, clipPath: 'inset(0 0 5% 0)' }}
                whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)' }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.75, ease: 'easeOut', delay: index * 0.08 + 0.08 }}
                className={`group relative ${stage.imageGrid}`}
              >
                <div className={`relative overflow-hidden bg-[#85898b] ${stage.aspect}`}>
                  <img
                    src={stage.image.src}
                    alt={stage.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                    style={{ objectPosition: stage.image.position ?? 'center' }}
                  />
                  <span
                    aria-hidden="true"
                    className="display absolute -left-1 -top-5 z-10 text-[clamp(4rem,10vw,8.5rem)] leading-none tracking-[-.1em] text-[var(--orange-bright)]"
                    style={{ textShadow: '0 2px 28px rgba(17,19,21,.48)' }}
                  >
                    {stage.number}
                  </span>
                  <span className="mono absolute bottom-4 right-4 z-10 border border-white/35 bg-[rgba(17,19,21,.68)] px-3 py-2 text-[8px] uppercase tracking-[.13em] text-white/85">
                    {stage.annotation}
                  </span>
                </div>
              </motion.div>

              <div className={`relative ${stage.contentGrid}`}>
                <p className="mono text-[10px] uppercase tracking-[.13em] text-[var(--orange-bright)]">
                  {stage.number} — {stage.name}
                </p>
                <h3 className="display mt-5 max-w-md text-3xl leading-[1.02] tracking-[-.055em] md:text-4xl">
                  {stage.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--sage)]">
                  {stage.description}
                </p>
                <div className="mt-7 h-px w-14 bg-[var(--orange)]" aria-hidden="true" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCategories() {
  return <section className="bg-[var(--mist)] px-5 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><SectionLabel num="02 / 06">Product architecture</SectionLabel><h2 className="display mt-5 max-w-2xl text-5xl font-medium tracking-[-.06em] text-[var(--ink)] md:text-7xl">The right<br /><span className="text-[var(--slate)]/45">point of control.</span></h2></div><p className="max-w-xs text-sm leading-6 text-[var(--slate)]/70">Four product families. One clear objective: controlled movement from origin to destination.</p></div><div className="mt-16 grid gap-5 md:grid-cols-2">{products.map((product, index) => <Link key={product.slug} href={`/products/${product.slug}`} className={`group block ${index === 0 ? 'md:translate-y-12' : ''}`} data-testid={`card-product-${product.slug}`}><ProductVisual product={product} /><div className="flex items-start justify-between border-b border-[var(--slate)]/20 py-5"><div><div className="mono mb-2 text-[9px] tracking-[.15em] text-[var(--slate)]/50">{product.code} / {product.eyebrow}</div><h3 className="display text-3xl tracking-[-.04em] text-[var(--ink)]">{product.name}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-[var(--slate)]/70">{product.intro}</p></div><ArrowDownRight size={24} className="mt-1 shrink-0 text-[var(--slate)] transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></div></Link>)}</div></div></section>;
}

function Performance() {
  return <section className="site-grid-dark relative bg-[var(--slate)] px-5 py-24 text-[var(--frost)] lg:px-10 lg:py-32"><div className="mx-auto max-w-[1440px]"><SectionLabel num="03 / 06" light>Engineering principles</SectionLabel><div className="mt-12 grid gap-14 lg:grid-cols-[.9fr_1.1fr]"><div><h2 className="display text-6xl font-medium leading-[.9] tracking-[-.07em] md:text-8xl">BUILT<br /><span className="text-[var(--lime)]">FOR THE</span><br />LOAD.</h2><p className="mt-8 max-w-md text-sm leading-7 text-[var(--sage)]">Good restraint begins before the load moves. We look at the system as a whole: webbing, hardware, handling and the people who depend on the result.</p><ButtonLink href="/quality" inverse>Inspect our approach</ButtonLink></div><div className="relative border-l border-[var(--sage)]/35 pl-6 md:pl-12">{['High-strength webbing', 'Secure fastening', 'Reliable tensioning', 'Durable hardware', 'Industrial-grade construction', 'Consistent performance'].map((item, i) => <div key={item} className="group flex items-center justify-between border-b border-[var(--sage)]/25 py-5"><div className="flex items-center gap-5"><span className="mono text-[10px] text-[var(--teal)]">0{i + 1}</span><span className="display text-xl md:text-2xl">{item}</span></div><Plus size={18} className="text-[var(--lime)] transition-transform group-hover:rotate-90" /></div>)}</div></div></div></section>;
}

function ApplicationsTease() {
  return <section className="bg-[var(--frost)] px-5 py-24 lg:px-10 lg:py-32"><div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><SectionLabel num="04 / 06">Where it moves</SectionLabel><h2 className="display mt-5 text-5xl tracking-[-.06em] text-[var(--ink)] md:text-7xl">Secure the<br /><i className="font-normal text-[var(--slate)]/45">everyday</i><br />extraordinary.</h2><p className="mt-8 max-w-sm text-sm leading-7 text-[var(--slate)]/70">From a warehouse aisle to a cross-border route, every application carries a different question. We start there.</p><ButtonLink href="/applications" inverse>Explore applications</ButtonLink></div><div className="grid gap-0 border-t border-[var(--slate)]/20">{['Logistics', 'Transportation', 'Cargo handling', 'Industrial equipment', 'Manufacturing'].map((item, i) => <Link href="/applications" key={item} className="group flex items-center justify-between border-b border-[var(--slate)]/20 py-6" data-testid={`link-application-${i}`}><div className="flex items-center gap-7"><span className="mono text-[10px] text-[var(--teal)]">0{i + 1}</span><span className="display text-3xl tracking-[-.04em] text-[var(--ink)] md:text-5xl">{item}</span></div><ArrowRight size={22} className="transition-transform group-hover:translate-x-2" /></Link>)}</div></div></section>;
}

function CtaBand() {
  return <section className="bg-[var(--lime)] px-5 py-16 lg:px-10 lg:py-24"><div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 md:flex-row md:items-end"><div><p className="mono text-[10px] uppercase tracking-[.18em] text-[var(--slate)]/60">05 / Start with the load</p><h2 className="display mt-4 max-w-3xl text-5xl leading-[.95] tracking-[-.06em] text-[var(--ink)] md:text-7xl">Need the right<br />securing solution?</h2></div><ButtonLink href="/quote" inverse>Tell us what you’re moving</ButtonLink></div></section>;
}

function PageIntro({ kicker, title, text }: { kicker: string; title: ReactNode; text: string }) {
  return <section className="bg-[var(--ink)] px-5 pb-20 pt-36 text-[var(--frost)] lg:px-10 lg:pb-28 lg:pt-48"><div className="mx-auto max-w-[1440px]"><SectionLabel num={kicker} light>Apex Liftex</SectionLabel><h1 className="display mt-10 max-w-4xl text-[clamp(4.2rem,10vw,9rem)] leading-[.86] tracking-[-.08em]">{title}</h1><p className="mt-10 max-w-lg text-base leading-7 text-[var(--sage)]">{text}</p></div></section>;
}

function ProductsPage() {
  return <Shell><Seo title="Products" description="Explore Apex Liftex load-securing product families: roll belts, ratchet lashing belts, ratchet locks and hooks." /><PageIntro kicker="PRODUCT SYSTEMS / 01" title={<>Control is a<br /><em>system.</em></>} text="A focused range of industrial load-securing products. Designed to work together, specified around your application." /><section className="bg-[var(--mist)] px-5 pb-28 lg:px-10"><div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-2">{products.map((product) => <Link href={`/products/${product.slug}`} key={product.slug} className="group border-t border-[var(--slate)]/25 pt-5" data-testid={`link-products-${product.slug}`}><div className="mb-5 flex justify-between"><span className="mono text-[10px] text-[var(--teal)]">{product.code}</span><span className="mono text-[10px] text-[var(--slate)]/50">EXPLORE <ArrowUpRight size={13} className="inline" /></span></div><ProductVisual product={product} /><h2 className="display mt-6 text-4xl tracking-[-.05em] text-[var(--ink)]">{product.name}</h2><p className="mt-3 max-w-md text-sm leading-6 text-[var(--slate)]/70">{product.detail}</p></Link>)}</div></section></Shell>;
}

function ProductPage({ slug }: { slug?: string }) {
  const product = productBySlug(slug) ?? products[0];
  const [tab, setTab] = useState('Overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const tabs = ['Overview', 'Applications', 'Features', 'Technical'];
  return <Shell><Seo title={product.name} description={product.intro} /><main><section className="bg-[var(--ink)] px-5 pb-20 pt-32 text-[var(--frost)] lg:px-10 lg:pb-28 lg:pt-40"><div className="mx-auto max-w-[1440px]"><Link href="/products" className="mono text-[10px] uppercase tracking-[.16em] text-[var(--teal)]" data-testid="link-back-products">← Product systems</Link><div className="mt-10 grid items-end gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><span className="mono text-[10px] tracking-[.18em] text-[var(--lime)]">{product.code} / {product.eyebrow}</span><h1 className="display mt-5 text-6xl leading-[.88] tracking-[-.07em] md:text-8xl">{product.name}</h1><p className="mt-8 max-w-lg text-base leading-7 text-[var(--sage)]">{product.intro}</p><ButtonLink href="/quote">Discuss this product</ButtonLink></div><div><ProductVisual product={product} large image={product.gallery[selectedImage]} /><ProductGallery product={product} selected={selectedImage} onSelect={setSelectedImage} /></div></div></div></section><section className="bg-[var(--mist)] px-5 py-20 lg:px-10 lg:py-28"><div className="mx-auto max-w-[1440px]"><div className="flex flex-wrap gap-1 border-b border-[var(--slate)]/20">{tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`px-5 py-4 text-[11px] font-bold uppercase tracking-[.13em] ${tab === item ? 'bg-[var(--ink)] text-[var(--lime)]' : 'text-[var(--slate)]/60 hover:text-[var(--ink)]'}`} data-testid={`button-product-tab-${item.toLowerCase()}`}>{item}</button>)}</div><div className="grid gap-12 pt-14 lg:grid-cols-[.8fr_1.2fr]"><div><SectionLabel num="Product note">{tab}</SectionLabel><h2 className="display mt-5 text-5xl tracking-[-.06em] text-[var(--ink)]">{tab === 'Overview' ? 'Designed around the operator.' : tab === 'Technical' ? 'Specified with discipline.' : `${tab}, without compromise.`}</h2></div><div><p className="max-w-2xl text-base leading-8 text-[var(--slate)]/80">{product.detail}</p>{tab === 'Features' ? <div className="mt-8 grid gap-0 border-t border-[var(--slate)]/20">{product.features.map((feature) => <div key={feature} className="flex items-center gap-4 border-b border-[var(--slate)]/20 py-4"><Check size={16} className="text-[var(--teal)]" />{feature}</div>)}</div> : tab === 'Applications' ? <div className="mt-8 flex flex-wrap gap-2">{product.applications.map((application) => <span key={application} className="border border-[var(--slate)]/25 px-3 py-2 text-xs">{application}</span>)}</div> : <div className="mt-8 grid max-w-lg gap-0 border-t border-[var(--slate)]/20">{product.specs.map((spec) => <div key={spec.label} className="flex justify-between gap-5 border-b border-[var(--slate)]/20 py-4 text-sm"><span className="mono text-[10px] uppercase text-[var(--slate)]/55">{spec.label}</span><span className="text-right">{spec.value}</span></div>)}</div>}</div></div></div></section><section className="bg-[var(--frost)] px-5 py-20 lg:px-10"><div className="mx-auto max-w-[1440px] border-t border-[var(--slate)]/20 pt-8"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><SectionLabel num="Product files">Editable placeholders</SectionLabel><h2 className="display mt-4 text-4xl tracking-[-.05em] text-[var(--ink)]">Downloads & technical information.</h2></div><button className="inline-flex items-center gap-3 border border-[var(--slate)]/30 px-4 py-3 text-[11px] font-bold uppercase tracking-[.12em] text-[var(--ink)] hover:border-[var(--teal)]" onClick={() => alert('Technical document placeholder — replace with final PDF.')} data-testid="button-download-product"><Download size={15} /> Download placeholder</button></div></div></section></main></Shell>;
}

function Applications() {
  const items = [{ title: 'Logistics', challenge: 'Routes get longer. Loads get less predictable.', solution: 'A repeatable restraint system that is clear at the point of use.', product: 'Ratchet lashing belts' }, { title: 'Industrial equipment', challenge: 'Irregular geometries resist one-size-fits-all thinking.', solution: 'Application-led hardware and belt configurations, developed around the load.', product: 'Hooks + roll belts' }, { title: 'Manufacturing', challenge: 'The line cannot wait for a securing system to catch up.', solution: 'Reliable components that fit into the rhythm of production and handling.', product: 'Ratchet locks' }];
  return <Shell><Seo title="Applications" description="Consultative load-securing applications for logistics, transportation, manufacturing and industrial equipment." /><PageIntro kicker="APPLICATIONS / 02" title={<>Every load<br />has a <em>logic.</em></>} text="We do not begin with a catalogue. We begin with the challenge: what is moving, where it is going, and what needs to stay true along the way." /><section className="bg-[var(--mist)] px-5 py-20 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1440px]">{items.map((item, index) => <article key={item.title} className="grid gap-8 border-t border-[var(--slate)]/25 py-12 lg:grid-cols-[.25fr_.75fr] lg:gap-16"><span className="mono text-[10px] text-[var(--teal)]">0{index + 1} / APPLICATION</span><div className="grid gap-8 md:grid-cols-[.75fr_1.25fr]"><div><h2 className="display text-5xl tracking-[-.06em] text-[var(--ink)]">{item.title}</h2><p className="mt-6 text-sm leading-7 text-[var(--slate)]/70">{item.product}</p></div><div className="grid gap-6 md:grid-cols-2"><div><span className="mono text-[10px] uppercase tracking-[.13em] text-[var(--slate)]/50">Challenge</span><p className="mt-3 text-xl leading-7 text-[var(--ink)]">{item.challenge}</p></div><div><span className="mono text-[10px] uppercase tracking-[.13em] text-[var(--teal)]">Solution</span><p className="mt-3 text-xl leading-7 text-[var(--ink)]">{item.solution}</p></div></div></div></article>)}</div></section><CtaBand /></Shell>;
}

function About() {
  return <Shell><Seo title="About Apex Liftex" description="Apex Liftex is the product brand for engineered industrial load securement, associated with Apex Engineering." /><PageIntro kicker="ABOUT / 03" title={<>The work<br />behind the <em>hold.</em></>} text="APEX LIFTEX is the product brand for a sharper way to think about load security — as an engineered journey, not an afterthought." /><section className="bg-[var(--frost)] px-5 py-20 lg:px-10 lg:py-32"><div className="mx-auto max-w-[1440px]"><div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr]"><SectionLabel num="Apex Engineering">Brand relationship</SectionLabel><div><h2 className="display max-w-3xl text-5xl leading-[.95] tracking-[-.06em] text-[var(--ink)] md:text-7xl">Product thinking for a world that cannot afford loose ends.</h2><div className="mt-12 grid gap-8 md:grid-cols-2"><p className="text-sm leading-7 text-[var(--slate)]/75">Apex Liftex brings together industrial product thinking, practical handling knowledge and an insistence on clarity. The result is a focused product language for teams who move demanding loads.</p><p className="text-sm leading-7 text-[var(--slate)]/75">The brand is associated with Apex Engineering. Final company history, manufacturing and sourcing details are editable placeholders pending client confirmation.</p></div></div></div><div className="mt-24 grid border-t border-[var(--slate)]/20 md:grid-cols-3">{['Look closer', 'Make it useful', 'Stay accountable'].map((title, i) => <div key={title} className="border-b border-[var(--slate)]/20 py-8 md:border-r md:px-8 md:first:pl-0"><span className="mono text-[10px] text-[var(--teal)]">0{i + 1}</span><h3 className="display mt-8 text-3xl tracking-[-.04em]">{title}</h3><p className="mt-4 text-sm leading-6 text-[var(--slate)]/70">{['Understand the material, the motion and the operator.', 'Solve the actual restraint challenge, not a generic version of it.', 'Be precise about what is known, what is tested and what still needs to be confirmed.'][i]}</p></div>)}</div></div></section></Shell>;
}

function Quality() {
  return <Shell><Seo title="Quality" description="Apex Liftex quality philosophy: material selection, production quality, inspection and consistency." /><PageIntro kicker="QUALITY / 04" title={<>Trust is<br /><em>measured.</em></>} text="Quality is not a badge added at the end. It is the discipline of making every decision legible — from material selection to final inspection." /><section className="bg-[var(--slate)] px-5 py-20 text-[var(--frost)] lg:px-10 lg:py-32"><div className="mx-auto max-w-[1440px]"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><SectionLabel num="Quality philosophy" light>Process</SectionLabel><h2 className="display mt-6 text-5xl tracking-[-.06em] md:text-7xl">No vague<br /><span className="text-[var(--lime)]">assurance.</span></h2></div><div className="grid gap-0 border-t border-[var(--sage)]/25">{['Material selection', 'Production quality', 'Inspection process', 'Product consistency', 'Safety-focused approach'].map((item, i) => <div key={item} className="flex items-center justify-between border-b border-[var(--sage)]/25 py-6"><div className="flex gap-6"><span className="mono text-[10px] text-[var(--teal)]">0{i + 1}</span><span className="display text-2xl">{item}</span></div><ArrowRight size={17} className="text-[var(--lime)]" /></div>)}</div></div><div className="mt-24 border border-[var(--sage)]/25 p-6 md:p-10"><span className="mono text-[10px] uppercase tracking-[.16em] text-[var(--teal)]">Verification note</span><p className="mt-5 max-w-3xl text-xl leading-8 text-[var(--mist)]">Certification, testing values and formal quality-system claims are intentionally not published here until verified information is supplied by the client.</p></div></div></section></Shell>;
}

function Resources() {
  const [query, setQuery] = useState('');
  const docs = [{ type: 'Catalog', title: 'Apex Liftex product overview', status: 'Download placeholder' }, { type: 'Technical', title: 'Ratchet lashing belts / technical information', status: 'Download placeholder' }, { type: 'Guide', title: 'Load-securing application guide', status: 'Coming soon' }, { type: 'FAQ', title: 'Frequently asked questions', status: 'Coming soon' }];
  const filtered = docs.filter((doc) => doc.title.toLowerCase().includes(query.toLowerCase()));
  return <Shell><Seo title="Resources" description="Apex Liftex product catalogs, technical documents, guides and industry resources." /><PageIntro kicker="RESOURCES / 05" title={<>Useful<br /><em>by design.</em></>} text="The right information should be as easy to handle as the right product. Find the current working library below." /><section className="bg-[var(--mist)] px-5 py-20 lg:px-10 lg:py-28"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-5 border-b border-[var(--slate)]/25 pb-5 md:flex-row md:items-end"><SectionLabel num="Library">Editable resources</SectionLabel><label className="flex items-center gap-3 border-b border-[var(--slate)]/40 py-2"><span className="mono text-[10px] text-[var(--slate)]/50">FILTER</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search resources" className="bg-transparent text-sm outline-none placeholder:text-[var(--slate)]/45" data-testid="input-resource-search" /></label></div><div className="mt-8">{filtered.length ? filtered.map((doc, i) => <div key={doc.title} className="group flex flex-col justify-between gap-5 border-b border-[var(--slate)]/20 py-7 md:flex-row md:items-center"><div className="flex items-center gap-6"><span className="mono text-[10px] text-[var(--teal)]">0{i + 1}</span><FileText size={20} className="text-[var(--slate)]/55" /><div><span className="mono text-[9px] uppercase tracking-[.14em] text-[var(--slate)]/50">{doc.type}</span><h2 className="display mt-1 text-2xl text-[var(--ink)]">{doc.title}</h2></div></div><button onClick={() => alert(`${doc.status} — replace with final resource URL.`)} className="inline-flex items-center gap-2 self-start text-[11px] font-bold uppercase tracking-[.12em] text-[var(--ink)] hover:text-[var(--teal)] md:self-auto" data-testid={`button-download-resource-${i}`}><Download size={15} />{doc.status}</button></div>) : <div className="py-20 text-center"><Minus className="mx-auto text-[var(--teal)]" /><p className="mt-4 text-sm text-[var(--slate)]/65">No resources match that search.</p></div>}</div></div></section></Shell>;
}

function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All images');
  const images = [
    { ...products[1].primaryImage, category: 'Ratchet Lashing Belts' },
    { ...products[1].gallery[1], category: 'Ratchet Lashing Belts' },
    { ...products[1].gallery[2], category: 'Ratchet Locks' },
    { ...products[0].primaryImage, category: 'Roll Belts' },
    { ...products[0].gallery[1], category: 'Roll Belts' },
    { ...products[3].primaryImage, category: 'Hooks' },
    { ...products[3].gallery[1], category: 'Hooks' },
  ];
  const categories = ['All images', 'Ratchet Lashing Belts', 'Roll Belts', 'Ratchet Locks', 'Hooks'];
  const visibleImages = selectedCategory === 'All images'
    ? images
    : images.filter((image) => image.category === selectedCategory);

  return (
    <Shell>
      <Seo title="Gallery" description="A closer look at Apex Liftex ratchet lashing belts, roll belts, ratchet locks and hooks." />
      <PageIntro
        kicker="GALLERY / 05"
        title={<>A closer<br /><em>look.</em></>}
        text="A closer look at the load-securing products in the Apex Liftex range."
      />
      <section className="bg-[var(--mist)] px-5 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-[var(--slate)]/25 pb-5">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className={`mono border-b pb-2 text-[10px] uppercase tracking-[.12em] transition-colors ${
                  selectedCategory === category
                    ? 'border-[var(--orange)] text-[var(--ink)]'
                    : 'border-transparent text-[var(--slate)]/55 hover:text-[var(--ink)]'
                }`}
                data-testid={`button-gallery-filter-${category.toLowerCase().replaceAll(' ', '-')}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {visibleImages.map((image, index) => (
              <figure key={image.src} className="group relative mb-4 break-inside-avoid overflow-hidden bg-[var(--slate)]">
                <div className={`relative overflow-hidden bg-[#85898b] ${index % 3 === 1 ? 'aspect-[4/3]' : 'aspect-square'}`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    style={{ objectPosition: image.position ?? 'center' }}
                  />
                  <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[rgba(17,19,21,.8)] via-transparent to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 z-[2] p-4 md:p-5">
                    <span className="mono block text-[9px] uppercase tracking-[.14em] text-[var(--orange-bright)]">
                      {image.category}
                    </span>
                    <span className="display mt-2 block text-xl tracking-[-.03em] text-[var(--frost)]">
                      {image.label}
                    </span>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}

function InquiryForm({ quote = false }: { quote?: boolean }) {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  if (sent) return <div className="border border-[var(--teal)]/50 bg-[var(--slate)] p-8 text-[var(--frost)] md:p-12"><Check size={25} className="text-[var(--lime)]" /><h2 className="display mt-6 text-4xl tracking-[-.05em]">Inquiry received.</h2><p className="mt-4 max-w-md text-sm leading-7 text-[var(--sage)]">This frontend flow is ready to connect to your inquiry endpoint. We will be in touch using the details provided.</p><button onClick={() => setSent(false)} className="mt-8 text-[11px] font-bold uppercase tracking-[.13em] text-[var(--lime)]" data-testid="button-send-another">Send another inquiry →</button></div>;
  const fields = quote ? ['Company name', 'Contact name', 'Email', 'Phone', 'Product', 'Application', 'Quantity'] : ['Name', 'Company', 'Email', 'Phone', 'Product interest', 'Quantity / requirement'];
  return <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">{fields.map((field) => <label key={field} className="block"><span className="mono mb-2 block text-[9px] uppercase tracking-[.15em] text-[var(--sage)]">{field}</span>{field === 'Product' || field === 'Product interest' || field === 'Application' ? <select required={field === 'Product'} className="w-full border-b border-[var(--sage)]/40 bg-transparent px-0 py-3 text-sm text-[var(--frost)] outline-none focus:border-[var(--lime)]" data-testid={`select-${field.toLowerCase().replaceAll(' ', '-')}`}><option value="" className="bg-[var(--slate)]">Select an option</option>{(field === 'Application' ? ['Logistics', 'Transportation', 'Manufacturing', 'Industrial equipment'] : products.map((p) => p.name)).map((option) => <option key={option} className="bg-[var(--slate)]">{option}</option>)}</select> : <input required={['Name', 'Contact name', 'Email', 'Company', 'Company name'].includes(field)} type={field === 'Email' ? 'email' : 'text'} className="w-full border-b border-[var(--sage)]/40 bg-transparent px-0 py-3 text-sm text-[var(--frost)] outline-none placeholder:text-[var(--sage)]/55 focus:border-[var(--lime)]" placeholder={`Enter ${field.toLowerCase()}`} data-testid={`input-${field.toLowerCase().replaceAll(' ', '-')}`} />}</label>)}<label className="md:col-span-2"><span className="mono mb-2 block text-[9px] uppercase tracking-[.15em] text-[var(--sage)]">{quote ? 'Requirement' : 'Message'}</span><textarea required rows={4} className="w-full resize-none border-b border-[var(--sage)]/40 bg-transparent px-0 py-3 text-sm text-[var(--frost)] outline-none placeholder:text-[var(--sage)]/55 focus:border-[var(--lime)]" placeholder="Tell us what you’re moving, and what you need the system to do." data-testid="textarea-requirement" /></label><label className="md:col-span-2"><span className="mono mb-2 block text-[9px] uppercase tracking-[.15em] text-[var(--sage)]">Upload requirement / file</span><input type="file" className="w-full text-xs text-[var(--sage)] file:mr-4 file:border-0 file:bg-[var(--lime)] file:px-3 file:py-2 file:text-[10px] file:font-bold file:uppercase" data-testid="input-attachment" /></label><button type="submit" className="mt-4 inline-flex w-fit items-center gap-4 bg-[var(--lime)] px-5 py-4 text-[11px] font-bold uppercase tracking-[.13em] text-[var(--ink)] hover:bg-[var(--frost)]" data-testid="button-submit-inquiry">{quote ? 'Request a quote' : 'Submit inquiry'} <ArrowUpRight size={16} /></button></form>;
}

function Contact({ quote = false }: { quote?: boolean }) {
  return <Shell><Seo title={quote ? 'Request a quote' : 'Contact'} description={quote ? 'Tell Apex Liftex what you are moving and request a load-securing solution.' : 'Contact Apex Liftex about industrial load-securing products and applications.'} /><PageIntro kicker={quote ? 'QUOTE / 06' : 'CONTACT / 06'} title={quote ? <>Tell us what<br />you’re <em>moving.</em></> : <>Start a<br /><em>conversation.</em></>} text={quote ? "Need the right securing solution? Give us the operating context. We’ll help you define the next step." : 'A practical conversation is usually the fastest route to the right product. Bring us the load, the route or the question.'} /><section className="bg-[var(--ink)] px-5 py-20 lg:px-10 lg:py-32"><div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[.65fr_1.35fr]"><div className="text-[var(--frost)]"><SectionLabel num="Apex Liftex" light>Inquiry desk</SectionLabel><h2 className="display mt-7 text-4xl leading-[.95] tracking-[-.06em] md:text-6xl">{quote ? 'The load is the brief.' : 'Make the first move.'}</h2><p className="mt-7 max-w-sm text-sm leading-7 text-[var(--sage)]">Company contact details: editable placeholder pending confirmation.</p><div className="mt-12 border-t border-[var(--sage)]/25 pt-5"><span className="mono text-[9px] uppercase tracking-[.15em] text-[var(--teal)]">Response note</span><p className="mt-3 text-sm leading-6 text-[var(--mist)]">Share only what is useful. A product family, a rough requirement, a photo of the load — we can start there.</p></div></div><InquiryForm quote={quote} /></div></section></Shell>;
}

function AppRoutes() {
  return <Switch><Route path="/" component={Home} /><Route path="/products" component={ProductsPage} /><Route path="/products/:slug">{(params) => <ProductPage slug={params.slug} />}</Route><Route path="/gallery" component={GalleryPage} /><Route path="/applications" component={Applications} /><Route path="/about" component={About} /><Route path="/quality" component={Quality} /><Route path="/resources" component={Resources} /><Route path="/contact">{() => <Contact />}</Route><Route path="/quote">{() => <Contact quote />}</Route><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <AppRoutes />;
}