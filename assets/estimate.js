/* Tectonic — "Build your quote" estimator.
   Prices here are the starting prices shown on the site. Change them in one place. */
(function () {
  "use strict";

  var STEPS = [
    {
      id: "base", type: "radio", title: "1. What are we building?",
      intro: "Pick the main project. Choose the first option if you only need AI, IT or care.",
      options: [
        { id: "none", name: "No build project", note: "I only need AI, automation, IT or a care plan.", once: 0 },
        { id: "site-starter", name: "Starter website", note: "Up to 5 pages, mobile-ready, contact form, basic SEO.", once: 1200 },
        { id: "site-growth", name: "Growth website", note: "Up to 10 pages, editable content, booking, analytics.", once: 2500 },
        { id: "store", name: "Online store", note: "Products, cart, Stripe or Shopify checkout.", once: 2000 },
        { id: "portal", name: "Client portal", note: "Logins, 2–3 user roles, uploads, status tracking.", once: 4000 },
        { id: "portal-ops", name: "Operations portal", note: "Admin + staff + client dashboards, payments, reports.", once: 8000 },
        { id: "mvp", name: "Startup MVP or mobile app", note: "First working version of your product.", once: 5000 }
      ]
    },
    {
      id: "ai", type: "check", title: "2. Add AI and automation",
      intro: "Built with the Claude API. Monthly fees cover monitoring and updates; AI usage is billed to your own account.",
      options: [
        { id: "chatbot", name: "AI website assistant", note: "Answers questions from your FAQs and captures leads.", once: 800, monthly: 150 },
        { id: "receptionist", name: "AI receptionist", note: "Handles after-hours messages and books appointments.", once: 1200, monthly: 200 },
        { id: "docs", name: "Document reading", note: "Pulls details from PDFs, invoices and forms into your system.", once: 1500, monthly: 200 },
        { id: "staffbot", name: "Staff knowledge assistant", note: "Employees ask questions about your policies and price sheets.", once: 2000, monthly: 250 },
        { id: "replies", name: "Review & email replies", note: "Drafts replies for you to approve.", once: 600, monthly: 100 },
        { id: "content", name: "Content writing tool", note: "Social posts and product copy in your voice.", once: 800, monthly: 120 },
        { id: "translate", name: "Translation", note: "Your site or documents in another language (per language).", once: 500 },
        { id: "automation", name: "Workflow automation", note: "Forms to email, SMS, Sheets or your CRM.", once: 400 },
        { id: "reports", name: "Weekly AI summary report", note: "Sales, bookings or reviews summarized every Monday.", once: 300, monthly: 100 },
        { id: "payments", name: "Payments & invoicing", note: "Stripe checkout, deposits, recurring billing.", once: 300 }
      ]
    },
    {
      id: "it", type: "check", title: "3. Add IT and growth",
      intro: "Office technology and the extras that help customers find you.",
      options: [
        { id: "it-setup", name: "Office IT setup", note: "Business email, domain, devices, Wi-Fi, printers, backups.", once: 300 },
        { id: "it-support", name: "Monthly IT support", note: "Remote help desk, account resets, new-device setup.", monthly: 150 },
        { id: "security", name: "Security check-up", note: "Two-step sign-in, access review, password manager.", once: 300 },
        { id: "local-seo", name: "Google Business Profile & local SEO", note: "Show up on Maps and local searches.", once: 300 },
        { id: "speed", name: "Speed & accessibility fixes", note: "Faster pages that more people can use.", once: 400 },
        { id: "branding", name: "Domain, email & brand setup", note: "Name, logo files, professional email.", once: 300 }
      ]
    },
    {
      id: "care", type: "radio", title: "4. Choose a care plan",
      intro: "Keeps everything updated, monitored and backed up. Cancel anytime with 30 days' notice.",
      options: [
        { id: "care-none", name: "No care plan", note: "Pay hourly ($75/hr) when you need changes.", monthly: 0 },
        { id: "care-site", name: "Website care", note: "Updates, monitoring, backups, up to 2 hrs of edits.", monthly: 150 },
        { id: "care-ai", name: "Website + AI care", note: "Website care plus care for one AI assistant, up to 3 hrs.", monthly: 250 },
        { id: "care-portal", name: "Portal care", note: "Monitoring, backups, security updates, bug fixes, up to 4 hrs.", monthly: 400 }
      ]
    }
  ];

  /* Package savings: applied automatically when every listed item is picked. */
  var BUNDLES = [
    { name: "Automate package savings", needs: ["site-growth", "chatbot", "automation"], off: 700 },
    { name: "Scale package savings", needs: ["portal", "payments"], off: 300 },
    { name: "Assistant care included in Website + AI care", needs: ["care-ai", "chatbot"], offMonthly: 150 }
  ];
  function bundleLabel(b) {
    return b.off ? "-" + money(b.off) : "-" + money(b.offMonthly) + "/mo";
  }

  var BY_ID = {};
  STEPS.forEach(function (s) { s.options.forEach(function (o) { BY_ID[o.id] = o; }); });

  function bundlesFor(ids) {
    return BUNDLES.filter(function (b) { return b.needs.every(function (n) { return ids.indexOf(n) !== -1; }); });
  }

  function money(n) { return "$" + n.toLocaleString("en-US"); }
  function priceLabel(o) {
    var parts = [];
    if (o.once) parts.push(money(o.once));
    if (o.monthly) parts.push(money(o.monthly) + "/mo");
    return parts.length ? parts.join(" + ") : "$0";
  }
  function totals(ids) {
    var once = 0, monthly = 0;
    ids.forEach(function (id) { var o = BY_ID[id]; if (o) { once += o.once || 0; monthly += o.monthly || 0; } });
    bundlesFor(ids).forEach(function (b) { once -= b.off || 0; monthly -= b.offMonthly || 0; });
    return { once: once, monthly: monthly };
  }
  function describe(encoded) {
    var ids = String(encoded || "").split(",").filter(function (id) { return BY_ID[id] && id !== "none" && id !== "care-none"; });
    if (!ids.length) return "";
    var t = totals(ids);
    var parts = ids.map(function (id) { return BY_ID[id].name + " (" + priceLabel(BY_ID[id]) + ")"; })
      .concat(bundlesFor(ids).map(function (b) { return b.name + " (" + bundleLabel(b) + ")"; }));
    return parts.join("; ") +
      ". Estimated total: " + money(t.once) + " one-time" + (t.monthly ? " + " + money(t.monthly) + "/mo" : "") + ".";
  }
  window.TectonicEstimate = { describe: describe };

  /* ---------- Builder UI (build.html) ---------- */
  var root = document.getElementById("builderSteps");
  if (!root) return;

  root.innerHTML = STEPS.map(function (s) {
    return '<section class="builder-step" aria-labelledby="h-' + s.id + '">' +
      '<h2 id="h-' + s.id + '">' + s.title + "</h2><p>" + s.intro + "</p>" +
      '<div class="opts" role="' + (s.type === "radio" ? "radiogroup" : "group") + '" aria-labelledby="h-' + s.id + '">' +
      s.options.map(function (o, i) {
        var inputId = "opt-" + o.id;
        var checked = s.type === "radio" && i === 0 ? " checked" : "";
        return '<div class="opt"><input type="' + (s.type === "radio" ? "radio" : "checkbox") + '" name="' + s.id + '" id="' + inputId + '" value="' + o.id + '"' + checked + ">" +
          '<label for="' + inputId + '"><span class="opt-top"><strong>' + o.name + '</strong><span class="opt-price">' + priceLabel(o) + "</span></span>" +
          "<small>" + o.note + "</small></label></div>";
      }).join("") + "</div></section>";
  }).join("");

  var params = new URLSearchParams(location.search);
  var preset = (params.get("pick") || "").split(",");
  preset.forEach(function (id) { var el = document.getElementById("opt-" + id); if (el) el.checked = true; });

  var lines = document.getElementById("sumLines");
  var once = document.getElementById("sumOnce");
  var monthly = document.getElementById("sumMonthly");
  var deposit = document.getElementById("sumDeposit");
  var send = document.getElementById("sendEstimate");

  function selected() {
    return Array.prototype.map.call(root.querySelectorAll("input:checked"), function (i) { return i.value; })
      .filter(function (id) { return id !== "none" && id !== "care-none"; });
  }
  function update() {
    var ids = selected();
    var t = totals(ids);
    lines.innerHTML = ids.length
      ? ids.map(function (id) { return "<div><span>" + BY_ID[id].name + "</span><span>" + priceLabel(BY_ID[id]) + "</span></div>"; }).join("") +
        bundlesFor(ids).map(function (b) { return '<div style="color:#11745a"><span>' + b.name + "</span><span>" + bundleLabel(b) + "</span></div>"; }).join("")
      : '<div class="empty">Pick options to see your estimate.</div>';
    once.textContent = money(t.once);
    monthly.textContent = money(t.monthly) + "/mo";
    deposit.textContent = t.once ? money(Math.round(t.once / 2)) : "$0";
    send.href = "contact.html" + (ids.length ? "?estimate=" + encodeURIComponent(ids.join(",")) : "");
    send.classList.toggle("btn-primary", ids.length > 0);
    send.classList.toggle("btn-ghost", ids.length === 0);
  }
  root.addEventListener("change", update);
  update();
})();
