export type Product = {
  slug: string;
  name: string;
  code: string;
  eyebrow: string;
  intro: string;
  detail: string;
  color: string;
  features: string[];
  applications: string[];
  specs: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    slug: 'roll-belts',
    name: 'Roll Belts',
    code: 'RB / 01',
    eyebrow: 'WEBBING SYSTEMS',
    intro: 'Continuous restraint webbing for teams who need dependable control at every stage of the journey.',
    detail: 'A configurable roll format for integration into industrial load-securing workflows. Final material, width and performance data: editable placeholder.',
    color: '#c8f04a',
    features: ['High-strength webbing', 'Controlled roll handling', 'Configurable lengths'],
    applications: ['Warehousing', 'Manufacturing', 'Cargo handling'],
    specs: [{ label: 'Material', value: 'Editable placeholder' }, { label: 'Width', value: 'To be confirmed' }, { label: 'Finish', value: 'To be confirmed' }],
  },
  {
    slug: 'ratchet-lashing-belts',
    name: 'Ratchet Lashing Belts',
    code: 'RL / 02',
    eyebrow: 'COMPLETE RESTRAINTS',
    intro: 'A considered belt-and-hardware system for securing demanding loads with repeatable tensioning.',
    detail: 'Built around a tactile ratchet action and robust webbing. Product configuration and verified technical specifications: editable placeholder.',
    color: '#39d6c5',
    features: ['Reliable tensioning', 'Secure fastening', 'Durable hardware'],
    applications: ['Logistics', 'Transportation', 'Commercial vehicles'],
    specs: [{ label: 'Assembly', value: 'Editable placeholder' }, { label: 'Length', value: 'To be confirmed' }, { label: 'Capacity', value: 'Do not publish until verified' }],
  },
  {
    slug: 'ratchet-locks',
    name: 'Ratchet Locks',
    code: 'RLK / 03',
    eyebrow: 'MECHANICAL HARDWARE',
    intro: 'The mechanical interface between force and control, designed for intuitive handling in demanding conditions.',
    detail: 'Hardware platform for Apex Belts assemblies and customer-specific integration. Geometry, coating and load data: editable placeholder.',
    color: '#87958f',
    features: ['Positive engagement', 'Tactile operation', 'Assembly-ready platform'],
    applications: ['Industrial equipment', 'Fleet operations', 'Load restraint'],
    specs: [{ label: 'Material', value: 'Editable placeholder' }, { label: 'Coating', value: 'To be confirmed' }, { label: 'Interface', value: 'To be confirmed' }],
  },
  {
    slug: 'hooks',
    name: 'Hooks',
    code: 'HK / 04',
    eyebrow: 'CONNECTION POINTS',
    intro: 'Purposeful connection hardware that keeps the restraint system aligned with the load and the operator.',
    detail: 'A family of connection points for different application geometries. Hook profiles, finishes and verification data: editable placeholder.',
    color: '#c8f04a',
    features: ['Application-led geometry', 'Robust connection point', 'Multiple options'],
    applications: ['Cargo handling', 'Transport', 'Heavy-duty securing'],
    specs: [{ label: 'Profile', value: 'Editable placeholder' }, { label: 'Finish', value: 'To be confirmed' }, { label: 'Options', value: 'Available on inquiry' }],
  },
];

export const productBySlug = (slug?: string) => products.find((product) => product.slug === slug);