// Posts a Digital Franchise partner enquiry to the CRM.
//
// Deliberately a separate endpoint from the trip-lead intake: a Lead requires a
// destination, a travel date and a nights count, none of which a partner has, so
// filing one as a Lead would drop a malformed trip into the sales pipeline. The
// CRM stores these as PartnerEnquiry records instead.
//
// Same transport as lib/submit-enquiry.ts: called from the browser because this
// site is a static export, and authenticated with the same NEXT_PUBLIC intake
// secret, which is an identifier rather than a credential (the CRM gatekeeps with
// an origin check and rate limiting).

export type PartnerValues = {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  occupation?: string;
  helpsPlanHolidays?: string;
  heardAboutUs?: string;
  message?: string;
};

export type PartnerResult =
  | { ok: true; deduped: boolean; code?: string }
  | { ok: false; fieldErrors?: Record<string, string>; message?: string };

const ENDPOINT = process.env.NEXT_PUBLIC_CRM_PARTNER_URL;
const SECRET = process.env.NEXT_PUBLIC_INTAKE_SECRET;

export async function submitPartner(v: PartnerValues): Promise<PartnerResult> {
  // Not configured yet. Reported as a failure rather than a success, unlike the
  // trip form: there is no CRM record either way, and the visitor's confirmation
  // wording depends on knowing whether we actually captured anything.
  if (!ENDPOINT || !SECRET) {
    return { ok: false, message: 'We could not save your details automatically.' };
  }

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-intake-secret': SECRET,
      },
      keepalive: true,
      body: JSON.stringify({
        form: 'digital-franchise',
        name: v.name.trim(),
        phone: (v.phone || '').replace(/\D/g, ''),
        email: v.email?.trim() || null,
        city: v.city?.trim() || null,
        occupation: v.occupation?.trim() || null,
        helpsPlanHolidays: v.helpsPlanHolidays ?? null,
        heardAboutUs: v.heardAboutUs ?? null,
        message: v.message?.trim() || null,
        pageUrl: typeof window !== 'undefined' ? window.location.href : null,
        submittedAt: new Date().toISOString(),
      }),
    });
  } catch {
    // Offline, DNS, CORS.
    return { ok: false, message: 'We could not save your details automatically.' };
  }

  let data: { deduped?: boolean; code?: string; errors?: Record<string, string>; error?: string } | null = null;
  try {
    data = await res.json();
  } catch {
    // Empty or non-JSON body; the status checks below still decide.
  }

  if (res.ok) return { ok: true, deduped: !!data?.deduped, code: data?.code };
  if (res.status === 400) return { ok: false, fieldErrors: data?.errors ?? {} };
  if (res.status === 429) return { ok: false, message: 'Too many requests. Please try again in a little while.' };
  // 401 means our secret is wrong: a configuration fault, never the visitor's.
  return { ok: false, message: 'We could not save your details automatically.' };
}
