import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendInquiryConfirmation(params: {
  toEmail: string;
  name: string;
  inquiryId: string;
}) {
  const { toEmail, name, inquiryId } = params;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: toEmail,
    subject: "We've received your inquiry — Travel with Chamru",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #1a3a2a;">Thanks, ${name}!</h2>
        <p>Your inquiry (reference <strong>${inquiryId}</strong>) has been received.</p>
        <p>Chamru will review your trip details and get back to you within
        <strong>48 hours</strong> with a personalized quote.</p>
        <p>In the meantime, feel free to reach out on WhatsApp if you have questions.</p>
        <p style="margin-top: 32px; color: #666;">— Travel with Chamru</p>
      </div>
    `,
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

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: adminEmail,
    subject: `New inquiry from ${name}`,
    html: `
      <div style="font-family: sans-serif;">
        <h3>New trip inquiry</h3>
        <p><strong>Reference:</strong> ${inquiryId}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone ?? "—"}</p>
        <p><strong>Message:</strong> ${message ?? "—"}</p>
      </div>
    `,
  });
}

export async function sendQuoteEmail(params: {
  toEmail: string;
  name: string;
  priceLkr: number;
  inquiryId: string;
}) {
  const { toEmail, name, priceLkr, inquiryId } = params;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: toEmail,
    subject: "Your Sri Lanka trip quote — Travel with Chamru",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #1a3a2a;">Your quote is ready, ${name}!</h2>
        <p>Reference: <strong>${inquiryId}</strong></p>
        <p>Estimated price: <strong>LKR ${priceLkr.toLocaleString()}</strong></p>
        <p>Reply to this email or reach out on WhatsApp to confirm your booking.</p>
        <p style="margin-top: 32px; color: #666;">— Travel with Chamru</p>
      </div>
    `,
  });
}
