import { productBySlug, type Product, type ProductImage } from './products';

export type CatalogSpecification = {
  label: string;
  value: string;
};

export type CatalogVariant = {
  slug: string;
  name: string;
  categorySlug: string;
  categoryName: string;
  description: string;
  specifications: CatalogSpecification[];
  image?: ProductImage;
  images: ProductImage[];
  imageNote: string;
};

export type CatalogCategory = {
  slug: string;
  name: string;
  description: string;
  family: Product;
  heroImage: ProductImage;
  images: ProductImage[];
  variants: CatalogVariant[];
};

type VariantDefinition = {
  slug: string;
  name: string;
  width: string;
  grade?: string;
  listedTonnage?: string;
  material?: string;
  profile?: string;
};

type CategoryDefinition = {
  slug: string;
  name: string;
  description: string;
  familySlug: string;
  variants: VariantDefinition[];
};

const categoryDefinitions: CategoryDefinition[] = [
  {
    slug: 'roll-belts',
    name: 'Roll Belts',
    description: 'Roll belts listed in the supplied widths and grades. Confirm material, roll length and application suitability directly with Apex Liftex.',
    familySlug: 'roll-belts',
    variants: [
      { slug: '25-mm-belt-18g', name: '25 mm Belt / 18G', width: '25 mm', grade: '18G' },
      { slug: '35-mm-belt-32g', name: '35 mm Belt / 32G', width: '35 mm', grade: '32G' },
      { slug: '50-mm-belt-35g', name: '50 mm Belt / 35G', width: '50 mm', grade: '35G' },
      { slug: '50-mm-belt-45g', name: '50 mm Belt / 45G', width: '50 mm', grade: '45G' },
      { slug: '50-mm-belt-55g', name: '50 mm Belt / 55G', width: '50 mm', grade: '55G' },
      { slug: '50-mm-belt-65g', name: '50 mm Belt / 65G', width: '50 mm', grade: '65G' },
      { slug: '50-mm-belt-85g', name: '50 mm Belt / 85G', width: '50 mm', grade: '85G' },
      { slug: '50-mm-belt-100g', name: '50 mm Belt / 100G', width: '50 mm', grade: '100G' },
    ],
  },
  {
    slug: 'ratchet-lashing-belts',
    name: 'Ratchet Lashing Belts',
    description: 'Ratchet lashing belt variants with the widths, grades and catalogue TON labels supplied for this range. Confirm the required configuration with Apex Liftex.',
    familySlug: 'ratchet-lashing-belts',
    variants: [
      { slug: '25-mm-belt-18g', name: '25 mm Belt / 18G', width: '25 mm', grade: '18G' },
      { slug: '35-mm-belt-32g', name: '35 mm Belt / 32G', width: '35 mm', grade: '32G' },
      { slug: '50-mm-belt-35g', name: '50 mm Belt / 35G', width: '50 mm', grade: '35G' },
      { slug: '50-mm-belt-45g', name: '50 mm Belt / 45G', width: '50 mm', grade: '45G' },
      { slug: '50-mm-belt-55g', name: '50 mm Belt / 55G', width: '50 mm', grade: '55G' },
      { slug: '50-mm-belt-65g', name: '50 mm Belt / 65G', width: '50 mm', grade: '65G' },
      { slug: '50-mm-belt-85g', name: '50 mm Belt / 85G', width: '50 mm', grade: '85G' },
      { slug: '50-mm-belt-100g-5-ton', name: '50 mm Belt / 100G / 5 TON', width: '50 mm', grade: '100G', listedTonnage: '5 TON' },
      { slug: '75-mm-belt-8-ton', name: '75 mm Belt / 8 TON', width: '75 mm', listedTonnage: '8 TON' },
      { slug: '75-mm-belt-10-ton', name: '75 mm Belt / 10 TON', width: '75 mm', listedTonnage: '10 TON' },
    ],
  },
  {
    slug: 'ratchet-locks',
    name: 'Ratchet Locks',
    description: 'Ratchet lock options listed by width, with alloy and plastic variants where specified. Confirm system compatibility with Apex Liftex.',
    familySlug: 'ratchet-locks',
    variants: [
      { slug: '25-mm-ratchet-lock', name: '25 mm Ratchet Lock', width: '25 mm' },
      { slug: '35-mm-ratchet-lock', name: '35 mm Ratchet Lock', width: '35 mm' },
      { slug: '50-mm-ratchet-lock-alloy', name: '50 mm Ratchet Lock (Alloy)', width: '50 mm', material: 'Alloy' },
      { slug: '50-mm-ratchet-lock-plastic', name: '50 mm Ratchet Lock (Plastic)', width: '50 mm', material: 'Plastic' },
      { slug: '75-mm-ratchet-lock', name: '75 mm Ratchet Lock', width: '75 mm' },
    ],
  },
  {
    slug: 'hooks',
    name: 'Hooks',
    description: 'J-hook options listed by nominal belt width. Exact variant photographs were not supplied; the range photograph is not an exact J-hook variant image.',
    familySlug: 'hooks',
    variants: [
      { slug: '25-mm-j-hook', name: '25 mm J Hook', width: '25 mm', profile: 'J Hook' },
      { slug: '35-mm-j-hook', name: '35 mm J Hook', width: '35 mm', profile: 'J Hook' },
      { slug: '50-mm-j-hook', name: '50 mm J Hook', width: '50 mm', profile: 'J Hook' },
      { slug: '75-mm-j-hook', name: '75 mm J Hook', width: '75 mm', profile: 'J Hook' },
    ],
  },
];

function uniqueImages(images: ProductImage[]) {
  return [...new Map(images.map((image) => [image.src, image])).values()];
}

function variantDescription(categorySlug: string, name: string) {
  if (categorySlug === 'roll-belts') {
    return `${name} from the Roll Belts range. Confirm any additional material, length and application requirements with Apex Liftex.`;
  }
  if (categorySlug === 'ratchet-lashing-belts') {
    return `A ratchet lashing belt listed as ${name}. Contact Apex Liftex to confirm the required configuration for your application.`;
  }
  if (categorySlug === 'ratchet-locks') {
    return `A ratchet lock variant listed as ${name}. Confirm system compatibility and application requirements with Apex Liftex.`;
  }
  return `A J hook variant listed as ${name}. Confirm attachment geometry and application requirements with Apex Liftex.`;
}

function toSpecifications(definition: VariantDefinition, categorySlug: string): CatalogSpecification[] {
  const widthLabel = categorySlug === 'roll-belts' || categorySlug === 'ratchet-lashing-belts'
    ? 'Belt width'
    : 'Listed width';
  const specifications: CatalogSpecification[] = [{ label: widthLabel, value: definition.width }];
  if (definition.grade) specifications.push({ label: 'Listed grade', value: definition.grade });
  if (definition.listedTonnage) {
    specifications.push({ label: 'Catalogue listing', value: definition.listedTonnage });
  }
  if (definition.material) specifications.push({ label: 'Material', value: definition.material });
  if (definition.profile) specifications.push({ label: 'Hook profile', value: definition.profile });
  return specifications;
}

export const catalogCategories: CatalogCategory[] = categoryDefinitions.map((definition) => {
  const family = productBySlug(definition.familySlug);
  if (!family) throw new Error(`Missing product family for catalogue category "${definition.slug}".`);

  const categoryImages = uniqueImages([family.primaryImage, ...family.gallery]);
  const variantImages = definition.slug === 'hooks'
    ? []
    : definition.slug === 'ratchet-locks'
      ? [family.primaryImage]
      : definition.slug === 'ratchet-lashing-belts'
        ? uniqueImages([family.primaryImage, family.gallery[1]].filter((image): image is ProductImage => Boolean(image)))
        : categoryImages;

  const variants = definition.variants.map((variant, index): CatalogVariant => {
    const images = variantImages.length ? variantImages : [];
    return {
      ...variant,
      categorySlug: definition.slug,
      categoryName: definition.name,
      description: variantDescription(definition.slug, variant.name),
      specifications: toSpecifications(variant, definition.slug),
      image: images[index % Math.max(images.length, 1)],
      images,
      imageNote: images.length
        ? 'Representative image from this category; confirm the exact variant configuration with Apex Liftex.'
        : 'No photograph for this exact J hook variant was supplied. The illustration shown is a placeholder, not a product image.',
    };
  });

  return {
    slug: definition.slug,
    name: definition.name,
    description: definition.description,
    family,
    heroImage: family.primaryImage,
    images: categoryImages,
    variants,
  };
});

export const catalogVariants = catalogCategories.flatMap((category) => category.variants);

export const getCatalogCategory = (slug?: string) =>
  catalogCategories.find((category) => category.slug === slug);

export const getCatalogVariant = (categorySlug?: string, variantSlug?: string) =>
  getCatalogCategory(categorySlug)?.variants.find((variant) => variant.slug === variantSlug);

export const catalogProductOption = (variant: CatalogVariant) =>
  `${variant.categoryName} — ${variant.name}`;
