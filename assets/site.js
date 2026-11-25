/* Tectonic — shared header, footer and page behavior.
   Edit the menus and contact details here once; every page picks them up. */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  var CONTACT = {
    email: "waiyanmin.lane@gmail.com",
    phone: "+1 (669) 213-7967",
    phoneHref: "tel:+16692137967",
    city: "Los Angeles, California",
    linkedin: "https://www.linkedin.com/in/waiyanmin999",
    github: "https://github.com/waiyanmin99",
    formspree: "https://formspree.io/f/xojyezqb"
  };

  /* ---------- Icons ---------- */
  var I = {
    chevron: '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2.5 4.5l3.5 3.5 3.5-3.5"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>',
    portal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11"/><path d="M12.5 13h5M12.5 16.5h3"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z"/><path d="M8.8 12l2.2 2.2 4.4-4.4" stroke-linecap="round"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2.5l2.2 11h10.6L20.5 7H7"/><circle cx="9.5" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.2"/><path d="M10.5 18.5h3" stroke-linecap="round"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 15.5h6M9 9h2.5" stroke-linecap="round"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4V5z"/><path d="M8.5 10.5h7" stroke-linecap="round"/></svg>',
    call: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h3.5l1.5 4.5-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5C6.5 4 9.5 4 12 5.5 14.5 4 17.5 4 20 5.5V19c-2.5-1.5-5.5-1.5-8 0-2.5-1.5-5.5-1.5-8 0V5.5z"/><path d="M12 5.5V19"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/></svg>',
    card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h3" stroke-linecap="round"/></svg>',
    translate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5h9M7.5 3v2M5 5c.8 3 3 5.5 6 7M10 5c-.8 3.6-3 6.4-6 8"/><path d="M13 21l4-10 4 10M14.5 17.5h5"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1-4.5L15.5 5l3.5 3.5L8.5 19 4 20z"/><path d="M13.5 7l3.5 3.5"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 4a5 5 0 0 0-4.7 6.6L3.5 17v3.5H7l6.4-6.3A5 5 0 0 0 20 9.5l-3 3-3-.5-.5-3 3-3A5 5 0 0 0 14.5 4z"/></svg>',
    laptop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><rect x="4.5" y="5" width="15" height="10.5" rx="1.5"/><path d="M2.5 19h19" stroke-linecap="round"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
    rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M14 4.5c3-1.5 5.5-1.5 5.5-1.5s0 2.5-1.5 5.5L12 15l-3-3 6-7.5z"/><path d="M9 12l-4 .5L3 15l4 .5M12 15l-.5 4L9 21l-.5-4M15.5 8.5h.01" stroke-linecap="round"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="8.5" r="3.2"/><path d="M3 19.5c.8-3.2 3.2-5 6-5s5.2 1.8 6 5"/><circle cx="17" cy="9.5" r="2.5"/><path d="M16.5 14.5c2.2.2 3.8 1.7 4.5 4"/></svg>',
    calc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 15.5h.01M12 15.5h.01M15.5 15.5h.01" stroke-linecap="round"/></svg>',
    compare: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="7.5" height="16" rx="1.5"/><rect x="13.5" y="4" width="7.5" height="16" rx="1.5"/><path d="M6 9h2M6 12.5h2M16.5 9h2M16.5 12.5h2" stroke-linecap="round"/></svg>',
    question: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 1 1 3.4 2.4c-.6.3-1 .8-1 1.5v.6M12 16.8h.01"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>',
    gauge: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 17a8 8 0 1 1 16 0"/><path d="M12 17l4-5"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
  };
  window.TectonicIcons = I;

  var LOGO_MARK =
    '<svg class="logo-mark" viewBox="0 0 28 28" aria-hidden="true">' +
    '<path d="M2 10.5L14 5l12 5.5-12 5.5z" fill="currentColor"/>' +
    '<path d="M2 16.5l9.5 4.4V24L2 19.6z" fill="#e8440a"/>' +
    '<path d="M26 16.5l-12 5.5v-3.1l12-5.5z" fill="currentColor" opacity=".55"/>' +
    "</svg>";

  /* ---------- Navigation data ---------- */
  var SERVICES = [
    { href: "websites.html", name: "Websites", note: "From $1,200 · 1–2 weeks", art: "art-1", icon: "globe" },
    { href: "portals.html", name: "Portals & Apps", note: "From $4,000 · 2–4 weeks", art: "art-3", icon: "portal" },
    { href: "ai-solutions.html", name: "AI Solutions", note: "From $400 · built with Claude", art: "art-4", icon: "spark" },
    { href: "it-support.html", name: "IT Support", note: "From $150/mo per office", art: "art-5", icon: "shield" }
  ];

  var page = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "") || "index";
  var activeFor = {
    services: "services", websites: "services", portals: "services", "ai-solutions": "services", "it-support": "services",
    pricing: "pricing", build: "pricing", portfolio: "work", about: "about", contact: "contact", faq: "contact"
  };
  var current = activeFor[page] || "";

  function navLink(key, href, label) {
    return '<a class="nav-link' + (current === key ? " active" : "") + '" href="' + href + '">' + label + "</a>";
  }

  function headerHTML() {
    var tiles = SERVICES.map(function (s) {
      return (
        '<a class="mega-tile" href="' + s.href + '">' +
        '<div class="tile-art" style="position:relative"><div class="art ' + s.art + '">' + I[s.icon] + "</div></div>" +
        "<strong>" + s.name + "</strong><small>" + s.note + "</small>" +
        '<div class="tile-links"><span>Learn</span><span>Price it</span></div></a>'
      );
    }).join("");

    return (
      '<a class="skip-link" href="#main">Skip to content</a>' +
      '<header class="site-header" id="siteHeader">' +
      '<nav class="nav" aria-label="Main">' +
      '<a class="logo" href="index.html" aria-label="Tectonic home">' + LOGO_MARK + "TEC<span>.</span>TONIC</a>" +
      '<div class="nav-menu">' +
      '<button class="nav-link' + (current === "services" ? " active" : "") + '" id="megaBtn" aria-expanded="false" aria-controls="megaMenu">Services ' + I.chevron + "</button>" +
      navLink("pricing", "pricing.html", "Pricing") +
      navLink("work", "portfolio.html", "Work") +
      navLink("about", "about.html", "About") +
      navLink("contact", "contact.html", "Contact") +
      "</div>" +
      '<div class="nav-actions">' +
      '<a class="nav-phone" href="' + CONTACT.phoneHref + '">' + CONTACT.phone + "</a>" +
      '<a class="btn btn-primary" href="build.html">Build your quote</a>' +
      '<button class="menu-toggle" id="menuBtn" aria-expanded="false" aria-controls="drawer">Menu</button>' +
      "</div></nav>" +
      '<div class="mega" id="megaMenu" role="region" aria-label="Services menu"><div class="mega-inner">' +
      '<div class="mega-tiles">' + tiles + "</div>" +
      '<div class="mega-side"><span class="side-label">Explore</span>' +
      '<a href="services.html">All services</a><a href="pricing.html">Pricing &amp; packages</a>' +
      '<a href="pricing.html#care">Care plans</a><a href="build.html">Build your quote</a>' +
      '<a href="portfolio.html">Our work</a><a href="faq.html">FAQ</a></div>' +
      "</div></div></header>" +
      '<div class="drawer" id="drawer" aria-label="Menu">' +
      "<details><summary>Services " + I.arrow.replace("<svg", '<svg width="18" height="18"') + "</summary>" +
      '<a href="services.html">All services</a>' +
      SERVICES.map(function (s) { return '<a href="' + s.href + '">' + s.name + "</a>"; }).join("") +
      "</details>" +
      '<a href="pricing.html">Pricing</a><a href="build.html">Build your quote</a><a href="portfolio.html">Work</a>' +
      '<a href="about.html">About</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a>' +
      '<a href="' + CONTACT.phoneHref + '">Call ' + CONTACT.phone + "</a>" +
      '<a class="btn btn-primary btn-block" href="contact.html" style="justify-content:center;border:0">Start a project</a>' +
      "</div>"
    );
  }

  function footerHTML() {
    var year = new Date().getFullYear();
    return (
      '<footer class="site-footer"><div class="container">' +
      '<div class="footer-top">' +
      '<div class="footer-brand"><a class="logo" href="index.html">' + LOGO_MARK + "TEC<span>.</span>TONIC</a>" +
      "<p>Websites, portals, AI assistants and IT support for small businesses. Based in Los Angeles, working with clients anywhere.</p>" +
      '<a class="btn btn-dark" href="contact.html">Start a project</a></div>' +
      '<div class="footer-col"><h4>Build</h4><ul>' +
      '<li><a href="websites.html">Websites</a></li><li><a href="websites.html#store">Online stores</a></li>' +
      '<li><a href="portals.html">Client portals</a></li><li><a href="portals.html#mvp">Apps &amp; MVPs</a></li></ul></div>' +
      '<div class="footer-col"><h4>AI &amp; IT</h4><ul>' +
      '<li><a href="ai-solutions.html#receptionist">AI receptionist</a></li><li><a href="ai-solutions.html#documents">Document reading</a></li>' +
      '<li><a href="ai-solutions.html#automation">Automations</a></li><li><a href="it-support.html">IT support</a></li></ul></div>' +
      '<div class="footer-col"><h4>Plan</h4><ul>' +
      '<li><a href="pricing.html">Pricing</a></li><li><a href="build.html">Build your quote</a></li>' +
      '<li><a href="pricing.html#care">Care plans</a></li><li><a href="faq.html">FAQ</a></li></ul></div>' +
      '<div class="footer-col"><h4>Company</h4><ul>' +
      '<li><a href="about.html">About</a></li><li><a href="portfolio.html">Work</a></li><li><a href="contact.html">Contact</a></li>' +
      '<li><a href="' + CONTACT.linkedin + '" target="_blank" rel="noopener">LinkedIn</a></li>' +
      '<li><a href="' + CONTACT.github + '" target="_blank" rel="noopener">GitHub</a></li></ul></div>' +
      "</div>" +
      '<div class="footer-bottom"><span>© ' + year + " Tectonic · " + CONTACT.city + "</span>" +
      '<nav aria-label="Legal"><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a>' +
      '<a href="mailto:' + CONTACT.email + '">' + CONTACT.email + "</a></nav></div>" +
      "</div></footer>"
    );
  }

  /* ---------- Mount header/footer ---------- */
  var headerSlot = document.getElementById("site-header");
  if (headerSlot) headerSlot.outerHTML = headerHTML();
  var footerSlot = document.getElementById("site-footer");
  if (footerSlot) footerSlot.outerHTML = footerHTML();

  document.querySelectorAll("[data-icon]").forEach(function (el) {
    var svg = I[el.getAttribute("data-icon")];
    if (svg) el.innerHTML = svg;
  });
  document.querySelectorAll("[data-contact]").forEach(function (el) {
    var k = el.getAttribute("data-contact");
    if (k === "email") { el.textContent = CONTACT.email; if (el.tagName === "A") el.href = "mailto:" + CONTACT.email; }
    if (k === "phone") { el.textContent = CONTACT.phone; if (el.tagName === "A") el.href = CONTACT.phoneHref; }
  });

  /* ---------- Header behavior ---------- */
  var header = document.getElementById("siteHeader");
  var darkTop = document.body.getAttribute("data-header") === "dark";
  if (header && darkTop) header.classList.add("on-dark");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var megaBtn = document.getElementById("megaBtn");
  var mega = document.getElementById("megaMenu");
  var closeTimer;
  function setMega(open) {
    if (!mega) return;
    mega.classList.toggle("open", open);
    megaBtn.setAttribute("aria-expanded", String(open));
    header.classList.toggle("menu-open", open);
  }
  if (megaBtn && mega) {
    megaBtn.addEventListener("click", function () { setMega(!mega.classList.contains("open")); });
    [megaBtn, mega].forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        if (window.matchMedia("(hover: hover)").matches) { clearTimeout(closeTimer); setMega(true); }
      });
      el.addEventListener("mouseleave", function () {
        if (window.matchMedia("(hover: hover)").matches) { closeTimer = setTimeout(function () { setMega(false); }, 180); }
      });
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMega(false); });
    document.addEventListener("click", function (e) {
      if (!mega.contains(e.target) && !megaBtn.contains(e.target)) setMega(false);
    });
  }

  var menuBtn = document.getElementById("menuBtn");
  var drawer = document.getElementById("drawer");
  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", function () {
      var open = !drawer.classList.contains("open");
      drawer.classList.toggle("open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "Close" : "Menu";
      header.classList.toggle("menu-open", open);
      document.body.classList.toggle("no-scroll", open);
    });
  }

  /* ---------- Tabs ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (group) {
    var tabs = group.querySelectorAll('[role="tab"]');
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute("aria-selected", String(on));
          t.tabIndex = on ? 0 : -1;
          var panel = document.getElementById(t.getAttribute("aria-controls"));
          if (panel) panel.hidden = !on;
        });
      });
      tab.addEventListener("keydown", function (e) {
        var list = Array.prototype.slice.call(tabs);
        var i = list.indexOf(tab);
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          var next = list[(i + (e.key === "ArrowRight" ? 1 : -1) + list.length) % list.length];
          next.focus(); next.click();
        }
      });
    });
  });

  /* ---------- Sub-nav active section ---------- */
  var subLinks = document.querySelectorAll(".subnav-links a[href^='#']");
  if (subLinks.length && "IntersectionObserver" in window) {
    var map = {};
    subLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          subLinks.forEach(function (a) { a.classList.remove("active"); });
          map[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) so.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); } });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contactForm");
  if (form) {
    form.action = CONTACT.formspree;
    var params = new URLSearchParams(location.search);
    var svc = params.get("service");
    var select = form.querySelector('[name="service"]');
    if (svc && select) {
      Array.prototype.forEach.call(select.options, function (o) { if (o.value === svc) select.value = svc; });
    }
    var est = params.get("estimate");
    if (est && window.TectonicEstimate) {
      var text = window.TectonicEstimate.describe(est);
      if (text) {
        var hidden = form.querySelector('[name="estimate"]');
        if (hidden) hidden.value = text;
        var note = document.getElementById("prefillNote");
        if (note) { note.textContent = ""; note.appendChild(document.createTextNode("Your estimate is attached: " + text)); note.classList.add("show"); }
        if (select) select.value = "Not sure yet / a mix";
      }
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var ok = document.getElementById("formOk");
      var err = document.getElementById("formErr");
      ok.classList.remove("show"); err.classList.remove("show");
      btn.disabled = true; btn.textContent = "Sending…";
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error("send failed");
          ok.classList.add("show"); form.reset(); btn.textContent = "Sent";
        })
        .catch(function () {
          err.classList.add("show"); btn.disabled = false; btn.textContent = "Send message";
        });
    });
  }
})();
