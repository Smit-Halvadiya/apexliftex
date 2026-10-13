import rollBeltsPrimary from '@assets/o_1jmqe93931lrp7i5gml18mh6k7d_1786596639408.webp';
import rollBeltsAlternate from '@assets/o_1jmqe939314v69nsshii6s1i4hc_1786596639408.webp';
import ratchetMechanism from '@assets/o_1jmqfqr9f1e7g1rcd5a66v056mc_1786596639406.webp';
import triangularHook from '@assets/o_1jmdr1gog69v1icd1jjboa29gub_1786596639407.webp';
import secondaryHook from '@assets/o_1jmdpuh8k166f1gbk1d019ne1em0b_1786596639407.webp';
import completeLashingBelt from '@assets/o_1jmqgmtclt5q1srjogf1sl6s80c_1786596639407.webp';
import ratchetRolledBelt from '@assets/o_1jmqgmtcl7otjlrr6q17ka695b_1786596639408.webp';

export type ProductImage = {
  src: string;
  alt: string;
  label: string;
  position?: string;
};

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
  primaryImage: ProductImage;
  gallery: ProductImage[];
};

export const products: Product[] = [
  {
    slug: 'roll-belts',
    name: 'Roll Belts',
    code: 'RB / 01',
    eyebrow: 'WEBBING SYSTEMS',
    intro: 'Continuous restraint webbing for teams who need dependable control at every stage of the journey.',
    detail: 'A configurable roll format for integration into industrial load-securing workflows. Final material, width and performance data: editable placeholder.',
    color: '#f47b20',
    features: ['High-strength webbing', 'Controlled roll handling', 'Configurable lengths'],
    applications: ['Warehousing', 'Manufacturing', 'Cargo handling'],
    specs: [{ label: 'Material', value: 'Editable placeholder' }, { label: 'Width', value: 'To be confirmed' }, { label: 'Finish', value: 'To be confirmed' }],
    primaryImage: { src: rollBeltsPrimary, alt: 'Stacked orange roll belts photographed from an alternate angle', label: 'Roll belts / stacked view' },
    gallery: [
      { src: rollBeltsPrimary, alt: 'Stacked orange roll belts photographed from an alternate angle', label: 'Stacked view' },
      { src: rollBeltsAlternate, alt: 'Stacked orange roll belts with visible woven edges', label: 'Detail view' },
    ],
  },
  {
    slug: 'ratchet-lashing-belts',
    name: 'Ratchet Lashing Belts',
    code: 'RL / 02',
    eyebrow: 'COMPLETE RESTRAINTS',
    intro: 'A considered belt-and-hardware system for securing demanding loads with repeatable tensioning.',
    detail: 'Built around a tactile ratchet action and robust webbing. Product configuration and verified technical specifications: editable placeholder.',
    color: '#ff9c32',
    features: ['Reliable tensioning', 'Secure fastening', 'Durable hardware'],
    applications: ['Logistics', 'Transportation', 'Commercial vehicles'],
    specs: [{ label: 'Assembly', value: 'Editable placeholder' }, { label: 'Length', value: 'To be confirmed' }, { label: 'Capacity', value: 'Do not publish until verified' }],
    primaryImage: { src: completeLashingBelt, alt: 'Complete orange lashing belt and ratchet assembly with hook', label: 'Complete assembly' },
    gallery: [
      { src: completeLashingBelt, alt: 'Complete orange lashing belt and ratchet assembly with hook', label: 'Complete assembly' },
      { src: ratchetRolledBelt, alt: 'Ratchet with orange rolled belt and hook on a grey surface', label: 'Rolled belt' },
      { src: ratchetMechanism, alt: 'Close-up of the metal ratchet lock mechanism', label: 'Mechanism detail' },
    ],
  },
  {
    slug: 'ratchet-locks',
    name: 'Ratchet Locks',
    code: 'RLK / 03',
    eyebrow: 'MECHANICAL HARDWARE',
    intro: 'The mechanical interface between force and control, designed for intuitive handling in demanding conditions.',
    detail: 'Hardware platform for Apex Liftex assemblies and customer-specific integration. Geometry, coating and load data: editable placeholder.',
    color: '#c7611f',
    features: ['Positive engagement', 'Tactile operation', 'Assembly-ready platform'],
    applications: ['Industrial equipment', 'Fleet operations', 'Load restraint'],
    specs: [{ label: 'Material', value: 'Editable placeholder' }, { label: 'Coating', value: 'To be confirmed' }, { label: 'Interface', value: 'To be confirmed' }],
    primaryImage: { src: ratchetMechanism, alt: 'Close-up front view of a metal ratchet lock mechanism', label: 'Lock mechanism' },
    gallery: [
      { src: ratchetMechanism, alt: 'Close-up front view of a metal ratchet lock mechanism', label: 'Lock mechanism' },
      { src: ratchetRolledBelt, alt: 'Ratchet with orange rolled belt and hook on a grey surface', label: 'Assembly context' },
    ],
  },
  {
    slug: 'hooks',
    name: 'Hooks',
    code: 'HK / 04',
    eyebrow: 'CONNECTION POINTS',
    intro: 'Purposeful connection hardware that keeps the restraint system aligned with the load and the operator.',
    detail: 'A family of connection points for different application geometries. Hook profiles, finishes and verification data: editable placeholder.',
    color: '#f47b20',
    features: ['Application-led geometry', 'Robust connection point', 'Multiple options'],
    applications: ['Cargo handling', 'Transport', 'Heavy-duty securing'],
    specs: [{ label: 'Profile', value: 'Editable placeholder' }, { label: 'Finish', value: 'To be confirmed' }, { label: 'Options', value: 'Available on inquiry' }],
    primaryImage: { src: triangularHook, alt: 'Triangular metal connection hook photographed on a grey surface', label: 'Connection hook' },
    gallery: [
      { src: triangularHook, alt: 'Triangular metal connection hook photographed on a grey surface', label: 'Triangular hook' },
      { src: secondaryHook, alt: 'Secondary metal hook detail photographed at an angle', label: 'Hook detail' },
      { src: completeLashingBelt, alt: 'Orange lashing belt assembly showing connected hook hardware', label: 'In-system view' },
    ],
  },
];

export const productBySlug = (slug?: string) => products.find((product) => product.slug === slug);