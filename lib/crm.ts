// Website enquiries are pushed to the CRM in the background.
//
// The rule this file exists to enforce: WhatsApp is the conversion event, so the
// form must never wait on the CRM and must never fail because of it. Every call
// here is fire-and-forget, and a missing or broken endpoint is a silent no-op.

export type EnquiryPayload = {
  form: 'plan-my-trip' | 'contact';
  name: string;
  phone: string;
  destination?: string | null;
  travelDate?: string | null; // YYYY-MM-DD, null when the visitor is flexible
  flexibleDates?: boolean;
  nights?: number | null;
  pax?: number | null;
  message?: string | null;
  pageUrl?: string | null;
  submittedAt: string; // ISO
};

// Static export inlines these at build time, so both values ship to the browser
// and are readable by anyone. Keep that in mind on the CRM side: the endpoint has
// to defend itself with origin checks and rate limiting, not with this token.
const endpoint = process.env.NEXT_PUBLIC_CRM_INTAKE_URL;
const token = process.env.NEXT_PUBLIC_CRM_INTAKE_TOKEN;

export function sendEnquiryToCrm(payload: EnquiryPayload): void {
  if (!endpoint) return; // not wired up yet

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['x-intake-secret'] = token;

  try {
    // keepalive so the request still completes while the tab hands off to WhatsApp.
    void fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // A CRM outage must never cost us the enquiry. The WhatsApp chat still opens.
    });
  } catch {
    // Same reasoning: swallow everything.
  }
}
