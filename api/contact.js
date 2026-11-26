/*
 * Tectonic contact form sender (Vercel serverless function).
 *
 * When someone sends the contact form, this sends two emails through Resend,
 * both from contact@buildtectonic.com:
 *   1. The inquiry to Tectonic (Reply goes straight to the client).
 *   2. A confirmation to the client (Reply comes back to Tectonic).
 *
 * The Resend API key lives ONLY in Vercel: Project → Settings →
 * Environment Variables → RESEND_API_KEY. Never put it in this file.
 */

const OWNER_EMAIL = "contact@buildtectonic.com";
const FROM_OWNER = "Tectonic Website <contact@buildtectonic.com>";
const FROM_CLIENT = "Tectonic <contact@buildtectonic.com>";
const SITE = "https://www.buildtectonic.com";
const PHONE = "+1 (323) 577-5706";
const PHONE_HREF = "tel:+13235775706";

const LIMITS = { name: 120, email: 200, phone: 40, company: 160, service: 80, budget: 60, message: 5000, estimate: 1200 };

/* Best-effort limit: a few messages per visitor per 10 minutes */
const recent = new Map();
function tooMany(ip) {
  const now = Date.now();
  const list = (recent.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  list.push(now);
  recent.set(ip, list);
  return list.length > 5;
}

function clean(value, max) {
  return String(value == null ? "" : value).replace(/\r/g, "").trim().slice(0, max);
}
function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function nl2br(value) {
  return esc(value).replace(/\n/g, "<br>");
}

async function sendEmail(apiKey, payload) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: "Bearer " + apiKey, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error("Resend " + res.status + ": " + text.slice(0, 300));
  }
  return res.json();
}

/* ---------- Shared email frame ---------- */
function frame(title, inner, footerNote) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Helvetica,Arial,sans-serif;color:#171a20;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e3e5;">
<tr><td style="background:#0e0f12;padding:20px 28px;">
  <table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td style="vertical-align:middle;padding-right:10px;"><img src="${SITE}/assets/email-logo.png" width="32" height="32" alt="" style="display:block;border-radius:6px;"></td>
    <td style="vertical-align:middle;font-size:17px;font-weight:700;letter-spacing:2px;color:#ffffff;">TEC<span style="color:#e8440a;">.</span>TONIC</td>
  </tr></table>
</td></tr>
<tr><td style="height:3px;background:#e8440a;line-height:3px;font-size:0;">&nbsp;</td></tr>
${inner}
<tr><td style="padding:20px 28px;border-top:1px solid #e2e3e5;background:#fafafa;font-size:12.5px;line-height:1.6;color:#5c5e62;">
  ${footerNote}
  <div style="margin-top:8px;">Tectonic · Los Angeles, CA · <a href="${SITE}" style="color:#5c5e62;">buildtectonic.com</a> · <a href="${PHONE_HREF}" style="color:#5c5e62;">${PHONE}</a></div>
</td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function detailRows(rows) {
  return rows
    .filter(([, v]) => v)
    .map(
      ([label, value, isLink]) => `<tr>
<td style="padding:10px 0;border-bottom:1px solid #eeeeef;width:38%;vertical-align:top;font-size:13px;color:#5c5e62;">${esc(label)}</td>
<td style="padding:10px 0;border-bottom:1px solid #eeeeef;vertical-align:top;font-size:14.5px;color:#171a20;font-weight:500;">${isLink ? `<a href="${isLink}" style="color:#c93a07;">${esc(value)}</a>` : nl2br(value)}</td>
</tr>`
    )
    .join("");
}

/* ---------- Email 1: the inquiry, to Tectonic ---------- */
function ownerEmail(d) {
  const rows = detailRows([
    ["Name", d.name],
    ["Email", d.email, "mailto:" + d.email],
    ["Phone", d.phone, d.phone ? "tel:" + d.phone.replace(/[^\d+]/g, "") : ""],
    ["Business", d.company],
    ["Service needed", d.service],
    ["Budget", d.budget],
  ]);
  const inner = `
<tr><td style="padding:28px 28px 8px;">
  <div style="display:inline-block;padding:4px 10px;border-radius:999px;background:#fde9e1;color:#c93a07;font-size:11.5px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">New inquiry</div>
  <h1 style="margin:14px 0 6px;font-size:22px;line-height:1.25;">${esc(d.name)}${d.service ? ` · ${esc(d.service)}` : ""}</h1>
  <p style="margin:0;font-size:14px;color:#5c5e62;">Sent from the contact form on buildtectonic.com. Hit Reply to answer ${esc(d.first)} directly.</p>
</td></tr>
<tr><td style="padding:8px 28px 4px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
<tr><td style="padding:18px 28px 8px;">
  <div style="font-size:13px;color:#5c5e62;margin-bottom:8px;">Project details</div>
  <div style="padding:16px;border-radius:12px;background:#f6f6f7;font-size:14.5px;line-height:1.6;">${nl2br(d.message)}</div>
</td></tr>
${d.estimate ? `<tr><td style="padding:12px 28px 8px;">
  <div style="font-size:13px;color:#5c5e62;margin-bottom:8px;">Estimate from the quote builder</div>
  <div style="padding:14px 16px;border-radius:12px;background:#fde9e1;color:#171a20;font-size:14px;line-height:1.55;">${nl2br(d.estimate)}</div>
</td></tr>` : ""}
<tr><td style="padding:20px 28px 28px;">
  <a href="mailto:${esc(d.email)}" style="display:inline-block;padding:12px 22px;border-radius:6px;background:#e8440a;color:#ffffff;font-weight:600;font-size:14.5px;text-decoration:none;">Reply to ${esc(d.first)}</a>
</td></tr>`;
  const text = [
    `New inquiry from ${d.name}`,
    "",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.phone ? `Phone: ${d.phone}` : null,
    d.company ? `Business: ${d.company}` : null,
    d.service ? `Service needed: ${d.service}` : null,
    d.budget ? `Budget: ${d.budget}` : null,
    "",
    "Project details:",
    d.message,
    d.estimate ? `\nEstimate: ${d.estimate}` : null,
  ].filter((line) => line !== null).join("\n");
  return {
    from: FROM_OWNER,
    to: [OWNER_EMAIL],
    reply_to: d.email,
    subject: `New inquiry${d.service ? ": " + d.service : ""} from ${d.name}`,
    html: frame("New inquiry", inner, "You're getting this because someone used the contact form on your website."),
    text,
  };
}

/* ---------- Email 2: confirmation, to the client ---------- */
function clientEmail(d) {
  const summary = detailRows([
    ["Service", d.service],
    ["Budget", d.budget],
    ["Business", d.company],
  ]);
  const step = (n, title, body) => `<tr>
<td style="width:34px;vertical-align:top;padding:8px 0;"><div style="width:24px;height:24px;line-height:24px;text-align:center;border-radius:50%;background:#ffffff;border:1px solid #e2e3e5;color:#c93a07;font-size:12px;font-weight:700;">${n}</div></td>
<td style="vertical-align:top;padding:8px 0;"><div style="font-size:14.5px;font-weight:600;">${title}</div><div style="font-size:13.5px;color:#5c5e62;margin-top:2px;">${body}</div></td>
</tr>`;
  const inner = `
<tr><td style="padding:32px 28px 8px;">
  <div style="width:48px;height:48px;line-height:48px;text-align:center;border-radius:50%;background:#e3f5ee;color:#1d9e75;font-size:24px;font-weight:700;">&#10003;</div>
  <h1 style="margin:18px 0 8px;font-size:24px;line-height:1.25;">Thanks, ${esc(d.first)}. We got your message.</h1>
  <p style="margin:0;font-size:15px;line-height:1.6;color:#393c41;">We'll reply within 24 hours on business days, usually much sooner. Here's what happens next.</p>
</td></tr>
<tr><td style="padding:16px 28px 4px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f7;border-radius:12px;padding:8px 16px;">
    ${step(1, "We reply by email", "With a few questions or a time to talk.")}
    ${step(2, "Free 30-minute call", "We learn about your business and goals.")}
    ${step(3, "You get a fixed quote", "A written plan and price. No surprises.")}
  </table>
</td></tr>
<tr><td style="padding:22px 28px 4px;">
  <div style="font-size:13px;color:#5c5e62;margin-bottom:6px;">What you sent us</div>
  ${summary ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${summary}</table>` : ""}
  <div style="margin-top:12px;padding:14px 16px;border-radius:12px;border:1px solid #e2e3e5;font-size:14px;line-height:1.6;color:#393c41;">${nl2br(d.message)}</div>
  ${d.estimate ? `<div style="margin-top:10px;padding:12px 16px;border-radius:12px;background:#fde9e1;font-size:13.5px;line-height:1.55;">${nl2br(d.estimate)}</div>` : ""}
</td></tr>
<tr><td style="padding:22px 28px 30px;">
  <p style="margin:0 0 16px;font-size:14px;color:#393c41;">Want to add something? Just reply to this email.</p>
  <a href="${SITE}/portfolio.html" style="display:inline-block;padding:12px 20px;border-radius:6px;background:#171a20;color:#ffffff;font-weight:600;font-size:14px;text-decoration:none;">See our work</a>
  <a href="${PHONE_HREF}" style="display:inline-block;margin-left:8px;padding:11px 18px;border-radius:6px;border:1px solid #171a20;color:#171a20;font-weight:600;font-size:14px;text-decoration:none;">Call ${PHONE}</a>
</td></tr>`;
  const text = [
    `Thanks, ${d.first}. We got your message.`,
    "",
    "We'll reply within 24 hours on business days, usually much sooner.",
    "",
    "What happens next:",
    "1. We reply by email with a few questions or a time to talk.",
    "2. Free 30-minute call about your business and goals.",
    "3. You get a fixed written quote.",
    "",
    "What you sent us:",
    d.message,
    "",
    `Questions? Reply to this email or call ${PHONE}.`,
    "Tectonic · buildtectonic.com",
  ].join("\n");
  return {
    from: FROM_CLIENT,
    to: [d.email],
    reply_to: OWNER_EMAIL,
    subject: "We got your message, " + d.first,
    html: frame("We got your message", inner, `You're getting this because you contacted Tectonic through buildtectonic.com.`),
    text,
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(503).json({ ok: false, error: "not_configured" });

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  /* Spam traps: a hidden field people never fill, and a minimum time on the page */
  if (body.website) return res.status(200).json({ ok: true });
  const startedAt = Number(body.startedAt || 0);
  if (startedAt && Date.now() - startedAt < 2500) return res.status(200).json({ ok: true });

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  if (tooMany(ip)) return res.status(429).json({ ok: false, error: "rate_limited" });

  const d = {};
  Object.keys(LIMITS).forEach((k) => { d[k] = clean(body[k], LIMITS[k]); });
  d.first = (d.name.split(/\s+/)[0] || "there").slice(0, 40);

  if (!d.name || !d.message || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/.test(d.email)) {
    return res.status(400).json({ ok: false, error: "invalid" });
  }

  try {
    await sendEmail(apiKey, ownerEmail(d));
  } catch (err) {
    console.error("Owner email failed:", err.message);
    return res.status(502).json({ ok: false, error: "send_failed" });
  }

  let confirmation = true;
  try {
    await sendEmail(apiKey, clientEmail(d));
  } catch (err) {
    confirmation = false;
    console.error("Confirmation email failed:", err.message);
  }

  return res.status(200).json({ ok: true, confirmation });
};
