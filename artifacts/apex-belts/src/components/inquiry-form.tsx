import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { catalogCategories, catalogProductOption } from '../data/catalog';

type InquiryFormProps = {
  quote?: boolean;
  initialProduct?: string;
};

export default function InquiryForm({ quote = false, initialProduct = '' }: InquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'missing-contact' | 'not-connected'>('idle');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '').trim();
    const phone = String(formData.get('phone') ?? '').trim();
    if (!email && !phone) {
      setStatus('missing-contact');
      return;
    }
    setStatus('not-connected');
  };

  if (status === 'not-connected') {
    return (
      <div role="status" aria-live="polite" className="border border-[var(--orange)]/40 bg-[var(--ink)] p-7 md:p-10">
        <span className="mono text-[9px] uppercase tracking-[.15em] text-[var(--orange-bright)]">Not sent</span>
        <h3 className="display mt-4 text-3xl tracking-[-.04em] text-[var(--frost)]">The online form is not connected yet.</h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--sage)]">
          Your details were not sent or stored. Contact Apex Liftex directly using the email or phone links below.
        </p>
        <div className="mt-6 flex flex-wrap gap-5">
          <a href="mailto:info@apexliftex.com" className="inline-flex items-center gap-2 text-sm text-[var(--frost)] transition-colors hover:text-[var(--orange-bright)]">
            <Mail size={15} className="text-[var(--orange-bright)]" /> info@apexliftex.com
          </a>
          <a href="tel:+916353328702" className="inline-flex items-center gap-2 text-sm text-[var(--frost)] transition-colors hover:text-[var(--orange-bright)]">
            <Phone size={15} className="text-[var(--orange-bright)]" /> +91 63533 28702
          </a>
        </div>
        <button type="button" onClick={() => setStatus('idle')} className="mt-8 text-[10px] font-bold uppercase tracking-[.13em] text-[var(--orange-bright)]">
          Return to form
        </button>
      </div>
    );
  }

  const fields = [
    { label: 'Name', name: 'name', type: 'text', required: true },
    { label: 'Company name', name: 'company', type: 'text', required: true },
  ];

  return (
    <form onSubmit={submit} className="grid gap-x-8 gap-y-5 md:grid-cols-2">
      {fields.map((field) => (
        <label key={field.name} className="block">
          <span className="mono mb-2 block text-[9px] uppercase tracking-[.15em] text-[var(--sage)]">{field.label}</span>
          <input
            name={field.name}
            type={field.type}
            required={field.required}
            autoComplete={field.name === 'name' ? 'name' : 'organization'}
            className="w-full border-b border-[var(--sage)]/40 bg-transparent px-0 py-3 text-sm text-[var(--frost)] outline-none focus:border-[var(--orange-bright)]"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            data-testid={`input-inquiry-${field.name}`}
          />
        </label>
      ))}

      <div className="block">
        <label htmlFor="inquiry-email" className="mono mb-2 block text-[9px] uppercase tracking-[.15em] text-[var(--sage)]">Email</label>
        <input id="inquiry-email" name="email" type="email" autoComplete="email" className="w-full border-b border-[var(--sage)]/40 bg-transparent px-0 py-3 text-sm text-[var(--frost)] outline-none focus:border-[var(--orange-bright)]" placeholder="Enter email address" data-testid="input-inquiry-email" />
      </div>
      <div className="block">
        <label htmlFor="inquiry-phone" className="mono mb-2 block text-[9px] uppercase tracking-[.15em] text-[var(--sage)]">Phone</label>
        <input id="inquiry-phone" name="phone" type="tel" autoComplete="tel" className="w-full border-b border-[var(--sage)]/40 bg-transparent px-0 py-3 text-sm text-[var(--frost)] outline-none focus:border-[var(--orange-bright)]" placeholder="Enter phone number" data-testid="input-inquiry-phone" />
      </div>

      <label className="block md:col-span-2">
        <span className="mono mb-2 block text-[9px] uppercase tracking-[.15em] text-[var(--sage)]">Product of interest</span>
        <select
          name="product"
          defaultValue={initialProduct}
          required={quote}
          className="w-full border-b border-[var(--sage)]/40 bg-[var(--slate)] px-0 py-3 text-sm text-[var(--frost)] outline-none focus:border-[var(--orange-bright)]"
          data-testid="select-inquiry-product"
        >
          <option value="" className="bg-[var(--slate)]">Select a product variant</option>
          {catalogCategories.map((category) => (
            <optgroup key={category.slug} label={category.name}>
              {category.variants.map((variant) => {
                const option = catalogProductOption(variant);
                return <option key={variant.slug} value={option} className="bg-[var(--slate)]">{variant.name}</option>;
              })}
            </optgroup>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mono mb-2 block text-[9px] uppercase tracking-[.15em] text-[var(--sage)]">Quantity required</span>
        <input
          name="quantity"
          type="text"
          required={quote}
          className="w-full border-b border-[var(--sage)]/40 bg-transparent px-0 py-3 text-sm text-[var(--frost)] outline-none focus:border-[var(--orange-bright)]"
          placeholder="Enter quantity"
          data-testid="input-inquiry-quantity"
        />
      </label>

      <label className="block md:col-span-2">
        <span className="mono mb-2 block text-[9px] uppercase tracking-[.15em] text-[var(--sage)]">Message</span>
        <textarea
          name="message"
          required={quote}
          rows={4}
          className="w-full resize-y border-b border-[var(--sage)]/40 bg-transparent px-0 py-3 text-sm text-[var(--frost)] outline-none focus:border-[var(--orange-bright)]"
          placeholder="Share the application and any requirements you want Apex Liftex to review."
          data-testid="textarea-inquiry-message"
        />
      </label>

      {status === 'missing-contact' && (
        <p role="alert" className="md:col-span-2 text-sm text-[var(--orange-bright)]">
          Enter an email address or a phone number so Apex Liftex can respond.
        </p>
      )}
      <p className="md:col-span-2 text-xs leading-5 text-[var(--sage)]">
        The form is a frontend preview only. Submitting it will not send or store your details until an enquiry service is connected.
      </p>
      <button type="submit" className="mt-1 inline-flex w-fit items-center gap-4 bg-[var(--orange)] px-5 py-4 text-[11px] font-bold uppercase tracking-[.13em] text-[var(--ink)] transition-colors hover:bg-[var(--frost)]" data-testid="button-submit-inquiry">
        {quote ? 'Request a quote' : 'Submit inquiry'} <ArrowUpRight size={16} />
      </button>
    </form>
  );
}
