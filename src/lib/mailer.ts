import nodemailer from "nodemailer";
import path from "node:path";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const LOGO_CID = "chamru-logo";
const LOGO_ATTACHMENT = {
  filename: "chamru-logo.png",
  path: path.join(process.cwd(), "public/images/brand/chamru-logo-128.png"),
  cid: LOGO_CID,
};

const WHATSAPP_URL = "https://wa.me/94707733647";

const COLOR = {
  forestDark: "#0b1f16",
  forest: "#0f2e1f",
  emerald: "#23955f",
  emeraldLight: "#34ab72",
  sand: "#fbf8f1",
  sandMid: "#f5efe0",
  gold: "#bd8a35",
  ink: "#16221b",
  inkLight: "#4a5850",
  border: "#e4dcc8",
};

// Wraps body content in a branded, table-based shell (inline styles only —
// email clients don't reliably support external/head-level CSS).
function renderEmail(params: { preheader: string; bodyHtml: string }) {
  const { preheader, bodyHtml } = params;

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Travel with Chamru</title>
  </head>
  <body style="margin:0; padding:0; background-color:${COLOR.sand}; font-family:'Segoe UI', Helvetica, Arial, sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${preheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLOR.sand}; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%; max-width:600px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 1px 3px rgba(11,31,22,0.08);">
            <tr>
              <td style="background-color:${COLOR.forestDark}; padding:28px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right:12px;">
                      <img src="cid:${LOGO_CID}" width="40" height="40" alt="Travel with Chamru" style="display:block; border-radius:10px;" />
                    </td>
                    <td>
                      <div style="font-size:17px; font-weight:700; color:${COLOR.sand}; line-height:1.2;">Travel with Chamru</div>
                      <div style="font-size:12px; color:${COLOR.gold}; letter-spacing:0.04em; text-transform:uppercase; margin-top:2px;">Your trusted travel partner</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background-color:${COLOR.sandMid}; padding:24px 32px; border-top:1px solid ${COLOR.border};">
                <p style="margin:0 0 6px; font-size:13px; color:${COLOR.inkLight};">
                  <a href="${WHATSAPP_URL}" style="color:${COLOR.emerald}; text-decoration:none; font-weight:600;">WhatsApp</a>
                  &nbsp;&middot;&nbsp;
                  <a href="tel:+94707733647" style="color:${COLOR.emerald}; text-decoration:none; font-weight:600;">+94 70 77 33 647</a>
                  &nbsp;&middot;&nbsp;
                  <a href="mailto:travelwithchamru@gmail.com" style="color:${COLOR.emerald}; text-decoration:none; font-weight:600;">travelwithchamru@gmail.com</a>
                </p>
                <p style="margin:0; font-size:12px; color:${COLOR.inkLight};">Colombo, Sri Lanka</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function button(label: string, href: string) {
  return `<a href="${href}" style="display:inline-block; background-color:${COLOR.emerald}; color:#ffffff; font-size:14px; font-weight:600; text-decoration:none; padding:12px 24px; border-radius:999px;">${label}</a>`;
}

function referenceChip(inquiryId: string) {
  return `<div style="display:inline-block; background-color:${COLOR.sandMid}; border:1px solid ${COLOR.border}; border-radius:8px; padding:8px 14px; font-family:monospace; font-size:13px; color:${COLOR.ink};">${inquiryId}</div>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type ItineraryEmailDay = {
  day: number;
  location: string;
  activities?: string[];
  overnightStay?: string;
};

type ItineraryEmailPayload = {
  title?: string;
  estimatedCostLkr?: number;
  days?: ItineraryEmailDay[];
};

// AI-generated itinerary text is untrusted input rendered into HTML email —
// escape every field before interpolating it.
function renderItineraryBlock(itinerary: ItineraryEmailPayload) {
  const dayRows = (itinerary.days ?? [])
    .map((d) => {
      const activities = d.activities?.length
        ? ` — ${d.activities.map(escapeHtml).join(", ")}`
        : "";
      const overnight = d.overnightStay
        ? `<br/><span style="color:${COLOR.inkLight};">Overnight: ${escapeHtml(d.overnightStay)}</span>`
        : "";
      return `
    <tr>
      <td style="padding:8px 0; border-bottom:1px solid ${COLOR.border}; font-size:13px; color:${COLOR.inkLight}; width:64px; vertical-align:top; font-weight:600;">Day ${d.day}</td>
      <td style="padding:8px 0; border-bottom:1px solid ${COLOR.border}; font-size:13px; color:${COLOR.ink};">
        <strong>${escapeHtml(d.location)}</strong>${activities}${overnight}
      </td>
    </tr>`;
    })
    .join("");

  return `
    <div style="margin-top:28px; padding-top:24px; border-top:1px solid ${COLOR.border};">
      <p style="margin:0 0 12px; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.04em; color:${COLOR.inkLight};">Your itinerary</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
        <tr>
          <td style="font-size:16px; font-weight:700; color:${COLOR.forest};">${escapeHtml(itinerary.title ?? "Your itinerary")}</td>
          ${
            itinerary.estimatedCostLkr
              ? `<td align="right" style="font-size:15px; font-weight:700; color:${COLOR.emerald};">LKR ${itinerary.estimatedCostLkr.toLocaleString()}</td>`
              : ""
          }
        </tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${dayRows}
      </table>
    </div>
  `;
}

export async function sendInquiryConfirmation(params: {
  toEmail: string;
  name: string;
  inquiryId: string;
  itinerary?: ItineraryEmailPayload;
}) {
  const { toEmail, name, inquiryId, itinerary } = params;

  const bodyHtml = `
    <h1 style="margin:0 0 16px; font-size:22px; color:${COLOR.forest};">Thanks, ${name}!</h1>
    <p style="margin:0 0 20px; font-size:15px; line-height:1.6; color:${COLOR.ink};">
      Your inquiry has been received. Chamru will review your trip details and get back to you
      within <strong>48 hours</strong> with a personalized quote.
    </p>
    <p style="margin:0 0 8px; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.04em; color:${COLOR.inkLight};">Reference</p>
    ${referenceChip(inquiryId)}
    ${itinerary ? renderItineraryBlock(itinerary) : ""}
    <p style="margin:28px 0 0; font-size:15px; line-height:1.6; color:${COLOR.ink};">
      Have a question in the meantime? Reach out any time on WhatsApp.
    </p>
    <div style="margin-top:16px;">${button("Message on WhatsApp", WHATSAPP_URL)}</div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: toEmail,
    subject: "We've received your inquiry — Travel with Chamru",
    html: renderEmail({
      preheader: `Thanks ${name} — your inquiry (${inquiryId}) is in. Chamru will follow up within 48 hours.`,
      bodyHtml,
    }),
    attachments: [LOGO_ATTACHMENT],
  });
}

export async function sendAdminNewInquiryAlert(params: {
  inquiryId: string;
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
}) {
  const { inquiryId, name, email, phone, message } = params;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!adminEmail) return;

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0; border-bottom:1px solid ${COLOR.border}; font-size:13px; color:${COLOR.inkLight}; width:110px; vertical-align:top;">${label}</td>
      <td style="padding:10px 0; border-bottom:1px solid ${COLOR.border}; font-size:14px; color:${COLOR.ink};">${value}</td>
    </tr>`;

  const bodyHtml = `
    <h1 style="margin:0 0 6px; font-size:20px; color:${COLOR.forest};">New trip inquiry</h1>
    <p style="margin:0 0 24px; font-size:13px; color:${COLOR.inkLight};">from ${name}</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${row("Reference", inquiryId)}
      ${row("Name", name)}
      ${row("Email", `<a href="mailto:${email}" style="color:${COLOR.emerald}; text-decoration:none;">${email}</a>`)}
      ${row("Phone", phone ? `<a href="tel:${phone}" style="color:${COLOR.emerald}; text-decoration:none;">${phone}</a>` : "—")}
      ${row("Message", message ?? "—")}
    </table>
    <div>${button("Reply to Guest", `mailto:${email}`)}</div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: adminEmail,
    subject: `New inquiry from ${name}`,
    html: renderEmail({
      preheader: `${name} (${email}) just sent a trip inquiry — reference ${inquiryId}.`,
      bodyHtml,
    }),
    attachments: [LOGO_ATTACHMENT],
  });
}

export async function sendQuoteEmail(params: {
  toEmail: string;
  name: string;
  priceLkr: number;
  inquiryId: string;
}) {
  const { toEmail, name, priceLkr, inquiryId } = params;

  const bodyHtml = `
    <h1 style="margin:0 0 16px; font-size:22px; color:${COLOR.forest};">Your quote is ready, ${name}!</h1>
    <p style="margin:0 0 8px; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.04em; color:${COLOR.inkLight};">Reference</p>
    <div style="margin-bottom:24px;">${referenceChip(inquiryId)}</div>
    <div style="background-color:${COLOR.sandMid}; border:1px solid ${COLOR.border}; border-radius:12px; padding:20px 24px; margin-bottom:24px;">
      <p style="margin:0 0 4px; font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:0.04em; color:${COLOR.inkLight};">Estimated price</p>
      <p style="margin:0; font-size:28px; font-weight:700; color:${COLOR.forest};">LKR ${priceLkr.toLocaleString()}</p>
    </div>
    <p style="margin:0 0 20px; font-size:15px; line-height:1.6; color:${COLOR.ink};">
      Reply to this email or reach out on WhatsApp to confirm your booking.
    </p>
    <div>${button("Message on WhatsApp", WHATSAPP_URL)}</div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: toEmail,
    subject: "Your Sri Lanka trip quote — Travel with Chamru",
    html: renderEmail({
      preheader: `Your quote is ready: LKR ${priceLkr.toLocaleString()}. Reply or message on WhatsApp to confirm.`,
      bodyHtml,
    }),
    attachments: [LOGO_ATTACHMENT],
  });
}
