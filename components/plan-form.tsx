import { EnquiryForm } from '@/components/enquiry-form';

// The Plan My Trip page's framing around the shared enquiry form.
export function PlanForm() {
  return (
    <div className="note" style={{ maxWidth: '40rem', marginInline: 'auto', padding: '2rem 1.75rem 1.75rem' }}>
      <i className="tape" aria-hidden="true" />
      <EnquiryForm source="plan-my-trip" />
    </div>
  );
}
