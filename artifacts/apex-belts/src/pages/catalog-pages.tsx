import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { catalogCategories, catalogProductOption, type CatalogCategory, type CatalogVariant } from '../data/catalog';
import InquiryForm from '../components/inquiry-form';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[.12em] text-[var(--sage)]">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true" className="text-[var(--orange-bright)]">/</span>}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-[var(--orange-bright)]">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-[var(--frost)]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function CatalogImage({
  category,
  variant,
  image,
  hero = false,
}: {
  category: CatalogCategory;
  variant?: CatalogVariant;
  image?: CatalogVariant['image'];
  hero?: boolean;
}) {
  const photo = image ?? (variant ? variant.image : category.heroImage);
  const needsPlaceholder = Boolean(variant && !photo);

  return (
    <div className={`group relative isolate overflow-hidden border border-[var(--sage)]/25 bg-[#242b2e] ${hero ? 'aspect-[4/3]' : 'aspect-[1.25]'}`}>
      {photo ? (
        <img
          src={photo.src}
          alt={variant ? `Representative ${category.name} image. ${photo.alt}` : photo.alt}
          loading={hero ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
          style={{ objectPosition: photo.position ?? 'center' }}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center site-grid-dark">
          <svg viewBox="0 0 320 220" className="h-[72%] w-[72%] max-w-[320px]" role="img" aria-label="Illustrative J-hook outline; exact product photograph not supplied">
            <path d="M182 38v93c0 34-21 58-55 58-30 0-50-18-50-43 0-18 11-32 27-39" fill="none" stroke="rgba(255,156,50,.9)" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M182 38h45" fill="none" stroke="rgba(255,156,50,.9)" strokeWidth="13" strokeLinecap="round" />
            <path d="M182 38v18" fill="none" stroke="rgba(247,248,245,.72)" strokeWidth="2" strokeDasharray="3 6" />
            <circle cx="182" cy="38" r="21" fill="none" stroke="rgba(247,248,245,.24)" />
            <circle cx="182" cy="38" r="4" fill="rgba(255,156,50,.9)" />
          </svg>
          <span className="absolute bottom-5 left-5 mono text-[8px] uppercase tracking-[.15em] text-[var(--sage)]">
            Illustrative profile / photo pending
          </span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(17,19,21,.78)] via-transparent to-[rgba(17,19,21,.12)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-3 border border-white/15 md:inset-4" aria-hidden="true" />
      <span className="absolute left-5 top-5 z-10 border-l border-[var(--orange-bright)] pl-3 mono text-[8px] uppercase tracking-[.14em] text-white/80">
        {category.family.code} / {variant ? 'VARIANT VIEW' : 'RANGE VIEW'}
      </span>
      {variant?.image && (
        <span className="absolute bottom-5 right-5 z-10 bg-[rgba(17,19,21,.72)] px-2 py-1 mono text-[8px] uppercase tracking-[.12em] text-white/75">
          Representative image
        </span>
      )}
      {needsPlaceholder && (
        <span className="absolute right-5 top-5 z-10 border border-[var(--orange)]/35 bg-[rgba(17,19,21,.72)] px-2 py-1 mono text-[8px] uppercase tracking-[.1em] text-[var(--orange-bright)]">
          Placeholder
        </span>
      )}
    </div>
  );
}

function VariantCard({ category, variant }: { category: CatalogCategory; variant: CatalogVariant }) {
  const href = `/products/${category.slug}/${variant.slug}`;
  const specSummary = variant.specifications.map((specification) => specification.value).join(' · ');

  return (
    <Link
      href={href}
      className="group block border border-[var(--slate)]/15 bg-[var(--frost)] transition-colors hover:border-[var(--orange)]/60"
      data-testid={`card-catalog-variant-${category.slug}-${variant.slug}`}
    >
      <CatalogImage category={category} variant={variant} />
      <div className="p-5 md:p-6">
        <span className="mono text-[9px] uppercase tracking-[.14em] text-[var(--orange-deep)]">{specSummary}</span>
        <h3 className="display mt-3 text-2xl leading-tight tracking-[-.04em] text-[var(--ink)]">{variant.name}</h3>
        <p className="mt-3 text-sm leading-6 text-[var(--slate)]/70">{variant.description}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.12em] text-[var(--ink)] transition-colors group-hover:text-[var(--orange-deep)]">
          View details <ArrowRight size={15} />
        </span>
      </div>
    </Link>
  );
}

export function CategoryPageContent({ category }: { category: CatalogCategory }) {
  const otherCategories = catalogCategories;

  return (
    <main>
      <section className="bg-[var(--ink)] px-5 pb-20 pt-32 text-[var(--frost)] lg:px-10 lg:pb-28 lg:pt-40">
        <div className="mx-auto max-w-[1440px]">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: category.name },
          ]} />
          <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <div>
              <span className="mono text-[10px] uppercase tracking-[.18em] text-[var(--orange-bright)]">
                {category.family.code} / PRODUCT CATEGORY
              </span>
              <h1 className="display mt-5 text-[clamp(3.5rem,8vw,7.5rem)] leading-[.9] tracking-[-.075em]">
                {category.name}
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[var(--sage)]">{category.description}</p>
              <p className="mono mt-6 text-[9px] uppercase tracking-[.15em] text-[var(--sage)]">
                {String(category.variants.length).padStart(2, '0')} listed variants
              </p>
              <Link href="/quote" className="mt-8 inline-flex items-center gap-4 bg-[var(--orange)] px-5 py-4 text-[11px] font-bold uppercase tracking-[.12em] text-[var(--ink)] transition-colors hover:bg-[var(--frost)]" data-testid={`link-category-quote-${category.slug}`}>
                Request a quote <ArrowUpRight size={16} />
              </Link>
            </div>
            <figure>
              <CatalogImage category={category} hero />
              {category.slug === 'hooks' && (
                <figcaption className="mt-3 mono text-[8px] uppercase tracking-[.12em] text-[var(--sage)]">
                  Range photograph only; this is not a photograph of an exact J-hook variant.
                </figcaption>
              )}
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-[var(--mist)] px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-5 border-b border-[var(--slate)]/20 pb-6 md:flex-row md:items-end">
            <div>
              <span className="mono text-[9px] uppercase tracking-[.16em] text-[var(--orange-deep)]">Catalogue / {String(category.variants.length).padStart(2, '0')}</span>
              <h2 className="display mt-3 text-4xl tracking-[-.05em] text-[var(--ink)] md:text-6xl">All listed variants.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[var(--slate)]/70">Select a variant to review its listed details and send a product-specific enquiry.</p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {category.variants.map((variant) => (
              <VariantCard key={variant.slug} category={category} variant={variant} />
            ))}
          </div>

          <div className="mt-20 border-t border-[var(--slate)]/20 pt-8">
            <h2 className="display text-3xl tracking-[-.04em] text-[var(--ink)]">Explore other categories</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {otherCategories.filter((item) => item.slug !== category.slug).map((item) => (
                <Link key={item.slug} href={`/products/${item.slug}`} className="border border-[var(--slate)]/25 px-4 py-3 text-xs font-semibold text-[var(--ink)] transition-colors hover:border-[var(--orange)]">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function VariantPageContent({
  category,
  variant,
}: {
  category: CatalogCategory;
  variant: CatalogVariant;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const selected = variant.images[selectedImage] ?? variant.image;
  const quoteHref = `/quote?product=${encodeURIComponent(catalogProductOption(variant))}`;
  const related = category.variants.filter((item) => item.slug !== variant.slug).slice(0, 3);
  const hasCatalogueTonnage = variant.specifications.some((item) => item.label === 'Catalogue listing');
  const titleParts = variant.name.split(' / ');
  const titleLines = titleParts.length > 2
    ? [titleParts[0], titleParts.slice(1).join(' / ')]
    : titleParts;

  return (
    <main>
      <section className="bg-[var(--ink)] px-5 pb-20 pt-32 text-[var(--frost)] lg:px-10 lg:pb-28 lg:pt-40">
        <div className="mx-auto max-w-[1440px]">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: category.name, href: `/products/${category.slug}` },
            { label: variant.name },
          ]} />
          <div className="grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div>
              <span className="mono text-[10px] uppercase tracking-[.16em] text-[var(--orange-bright)]">{category.name}</span>
              <h1 className="display mt-5 text-[clamp(2.6rem,5vw,4.9rem)] leading-[.94] tracking-[-.065em]">
                {titleLines.map((line, index) => (
                  <span key={`${line}-${index}`} className="block">
                    {index > 0 && <span className="mr-3 text-[var(--orange-bright)]">/</span>}
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[var(--sage)]">{variant.description}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {variant.specifications.map((specification) => (
                  <span key={specification.label} className="border border-[var(--sage)]/25 px-3 py-2 mono text-[9px] uppercase tracking-[.1em] text-[var(--frost)]">
                    {specification.label}: {specification.value}
                  </span>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Link href={quoteHref} className="inline-flex items-center gap-4 bg-[var(--orange)] px-5 py-4 text-[11px] font-bold uppercase tracking-[.12em] text-[var(--ink)] transition-colors hover:bg-[var(--frost)]" data-testid={`link-variant-quote-${variant.slug}`}>
                  Request a quote <ArrowUpRight size={16} />
                </Link>
                <Link href="/contact" className="text-[11px] font-semibold uppercase tracking-[.12em] text-[var(--frost)] transition-colors hover:text-[var(--orange-bright)]">
                  Contact Apex Liftex <ArrowRight size={14} className="ml-1 inline" />
                </Link>
              </div>
            </div>
            <div>
              <CatalogImage category={category} variant={variant} image={selected} hero />
              {variant.images.length > 1 && (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {variant.images.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      aria-pressed={selectedImage === index}
                      aria-label={`Show ${image.label}`}
                      className={`overflow-hidden border text-left transition-colors ${selectedImage === index ? 'border-[var(--orange-bright)]' : 'border-[var(--sage)]/25 hover:border-[var(--orange)]/65'}`}
                      data-testid={`button-variant-image-${variant.slug}-${index}`}
                    >
                      <img src={image.src} alt="" loading="lazy" className="aspect-[1.5] w-full object-cover" style={{ objectPosition: image.position ?? 'center' }} />
                      <span className="block px-3 py-2 mono text-[8px] uppercase tracking-[.1em] text-[var(--sage)]">{image.label}</span>
                    </button>
                  ))}
                </div>
              )}
              <p className="mt-3 text-xs leading-5 text-[var(--sage)]">{variant.imageNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--mist)] px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <span className="mono text-[9px] uppercase tracking-[.16em] text-[var(--orange-deep)]">Product overview</span>
            <h2 className="display mt-4 text-4xl leading-tight tracking-[-.05em] text-[var(--ink)]">Listed clearly.<br />Confirmed for the application.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--slate)]/70">{variant.description}</p>
          </div>
          <div>
            <h2 className="mono border-b border-[var(--slate)]/25 pb-4 text-[10px] uppercase tracking-[.15em] text-[var(--slate)]/65">Specifications supplied</h2>
            <dl className="border-b border-[var(--slate)]/20">
              {variant.specifications.map((specification) => (
                <div key={specification.label} className="flex flex-wrap justify-between gap-3 border-b border-[var(--slate)]/15 py-5 text-sm">
                  <dt className="mono text-[9px] uppercase tracking-[.12em] text-[var(--slate)]/60">{specification.label}</dt>
                  <dd className="font-semibold text-[var(--ink)]">{specification.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs leading-6 text-[var(--slate)]/65">
              {hasCatalogueTonnage
                ? 'The TON text is reproduced from the supplied catalogue label and is not presented as a verified working-load limit. Confirm product suitability and any additional specifications with Apex Liftex.'
                : 'Only details supplied for this variant are shown. Confirm product suitability and any additional specifications with Apex Liftex.'}
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-[var(--frost)] px-5 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-end justify-between gap-5 border-b border-[var(--slate)]/20 pb-5">
              <div>
                <span className="mono text-[9px] uppercase tracking-[.16em] text-[var(--orange-deep)]">Same category</span>
                <h2 className="display mt-3 text-4xl tracking-[-.05em] text-[var(--ink)]">Related variants.</h2>
              </div>
              <Link href={`/products/${category.slug}`} className="hidden text-[11px] font-semibold uppercase tracking-[.1em] text-[var(--ink)] hover:text-[var(--orange-deep)] sm:inline-flex sm:items-center sm:gap-2">
                View all {category.name} <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <VariantCard key={item.slug} category={category} variant={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="product-enquiry" className="scroll-mt-24 bg-[var(--slate)] px-5 py-20 text-[var(--frost)] lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <span className="mono text-[9px] uppercase tracking-[.16em] text-[var(--orange-bright)]">Product enquiry</span>
            <h2 className="display mt-4 text-4xl leading-tight tracking-[-.05em] md:text-5xl">Discuss this variant.</h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--sage)]">Share the quantity and application. Apex Liftex can confirm the details needed for your enquiry.</p>
          </div>
          <InquiryForm quote initialProduct={catalogProductOption(variant)} />
        </div>
      </section>
    </main>
  );
}
