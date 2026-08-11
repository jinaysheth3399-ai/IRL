// Posts a website enquiry to the CRM's lead-intake API.
//
// This site is a static export, so the call is made from the browser. Both env
// vars are NEXT_PUBLIC and therefore compiled into the bundle: the secret is an
// identifier the CRM uses to recognise us, not a credential. The CRM does the
// real gatekeeping with an origin check and rate limiting.

export type EnquiryValues = {
  name?: string;
  whatsapp: string;
  destination?: string; // empty means undecided
  datesNotFixed: boolean; // true when the visitor picked "Dates not fixed"
  date?: string; // YYYY-MM-DD, only meaningful when datesNotFixed is false
  nights?: number;
  travellers?: number;
};

export type EnquiryResult =
  | { ok: true; deduped: boolean; code?: string }
  | { ok: false; fieldErrors?: Record<string, string>; message?: string };

const ENDPOINT = process.env.NEXT_PUBLIC_CRM_INTAKE_URL;
const SECRET = process.env.NEXT_PUBLIC_INTAKE_SECRET;

export async function submitEnquiry(
  v: EnquiryValues,
  form: 'plan-my-trip' | 'contact',
): Promise<EnquiryResult> {
  // Not configured (local dev without env vars): report success so the form's
  // WhatsApp handoff is never blocked by our own missing configuration.
  if (!ENDPOINT || !SECRET) return { ok: true, deduped: false };

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-intake-secret': SECRET,
      },
      body: JSON.stringify({
        form,
        name: v.name?.trim() ?? '',
        phone: (v.whatsapp || '').replace(/\D/g, ''),
        destination: v.destination?.trim() || 'Not sure, suggest me',
        flexibleDates: v.datesNotFixed === true,
        travelDate: v.datesNotFixed ? null : (v.date ?? null),
        nights: v.nights ?? null,
        pax: v.travellers ?? null,
        pageUrl: typeof window !== 'undefined' ? window.location.href : null,
        submittedAt: new Date().toISOString(),
      }),
    });
  } catch {
    // Offline, DNS, CORS. The WhatsApp message still carries the enquiry.
    return { ok: false, message: 'We could not save your details automatically.' };
  }

  let data: { deduped?: boolean; code?: string; errors?: Record<string, string>; error?: string } | null = null;
  try {
    data = await res.json();
  } catch {
    // Empty or non-JSON body; fall through to the status checks.
  }

  if (res.ok) return { ok: true, deduped: !!data?.deduped, code: data?.code };
  if (res.status === 400) return { ok: false, fieldErrors: data?.errors ?? {} };
  if (res.status === 429) return { ok: false, message: 'Too many requests. Please try again in a little while.' };
  // 401 means our secret is wrong: a configuration fault, never the visitor's.
  return { ok: false, message: 'We could not save your details automatically.' };
}
