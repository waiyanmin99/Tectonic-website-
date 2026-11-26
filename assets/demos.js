/* Tectonic — living product samples.
   Makes the website, portal, chat, document and network samples move like
   real products. Each one only runs while it's on screen, loops calmly, and
   stays still for visitors who prefer reduced motion. */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var cleanups = [];

  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  /* Run fn(loop) repeatedly while el is on screen; stop when it leaves or the page changes. */
  function whileVisible(el, play) {
    var state = { on: false, alive: true, running: false };
    function kick() {
      if (!state.on || state.running || !state.alive) return;
      state.running = true;
      Promise.resolve(play(state)).catch(function () {}).then(function () {
        state.running = false;
        if (state.on && state.alive) setTimeout(kick, 400);
      });
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { state.on = en.isIntersecting; if (state.on) kick(); });
    }, { threshold: 0.35 });
    io.observe(el);
    cleanups.push(function () { state.alive = false; io.disconnect(); });
    return state;
  }
  function live(s) { return s.on && s.alive; }

  /* ---------- Website sample: pointer clicks the main button, toast appears ---------- */
  var HEADLINES = [
    "Fresh food,<br>ready when you are.",
    "Book your next<br>cut in seconds.",
    "Repairs done right,<br>quoted today.",
    "Your business,<br>open 24/7 online."
  ];
  var TOASTS = ["New order received", "New booking confirmed", "New quote request", "New lead captured"];

  function initSite(mock) {
    var btn = mock.querySelector(".site-btns span");
    if (!btn) return;
    var url = (mock.querySelector(".mock-url") || {}).textContent || "";
    var generic = /yourbusiness|yourbrand/.test(url);
    var title = mock.querySelector(".site-title");
    var cursor = document.createElement("span");
    cursor.className = "demo-cursor";
    cursor.innerHTML = '<svg viewBox="0 0 20 20"><path d="M3 2l13 7.5-6 1.2L7 17z"/></svg>';
    var toast = document.createElement("span");
    toast.className = "demo-toast";
    mock.appendChild(cursor);
    mock.appendChild(toast);
    var i = 0;
    if (generic && title) {
      var start = HEADLINES.findIndex(function (h) { return h.replace("<br>", " ") === title.textContent.replace(/\s+/g, " ").trim(); });
      i = start >= 0 ? start : 0;
    }

    whileVisible(mock, async function (s) {
      var m = mock.getBoundingClientRect();
      var b = btn.getBoundingClientRect();
      var tx = b.left - m.left + b.width * 0.55;
      var ty = b.top - m.top + b.height * 0.6;
      cursor.style.transition = "none";
      cursor.style.transform = "translate(" + (m.width * 0.82) + "px," + (m.height * 0.86) + "px)";
      cursor.classList.add("show");
      await wait(500); if (!live(s)) return;
      cursor.style.transition = "transform 1.1s cubic-bezier(0.45, 0, 0.2, 1)";
      cursor.style.transform = "translate(" + tx + "px," + ty + "px)";
      await wait(1200); if (!live(s)) return;
      cursor.classList.add("click");
      btn.classList.add("pressed");
      await wait(220);
      btn.classList.remove("pressed");
      cursor.classList.remove("click");
      toast.innerHTML = '<b>✓</b>' + (generic ? TOASTS[i % TOASTS.length] : "New inquiry received");
      toast.classList.add("show");
      await wait(1800);
      toast.classList.remove("show");
      cursor.classList.remove("show");
      await wait(900); if (!live(s)) return;
      if (generic && title) {
        i = (i + 1) % HEADLINES.length;
        title.classList.add("swap");
        await wait(350);
        title.innerHTML = HEADLINES[i];
        title.classList.remove("swap");
      }
      await wait(1200);
    });
  }

  /* ---------- Portal sample: numbers count, bars move, a status flips ---------- */
  function countUp(el, target, prefix, suffix, decimals) {
    var t0 = performance.now(), dur = 1100;
    function step(t) {
      var p = Math.min(1, (t - t0) / dur);
      var v = target * (1 - Math.pow(1 - p, 3));
      el.textContent = prefix + v.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initDash(mock) {
    var nums = Array.prototype.map.call(mock.querySelectorAll(".tile b"), function (el) {
      var m = el.textContent.trim().match(/^(\$?)([\d.]+)(k?)$/);
      return m ? { el: el, prefix: m[1], value: parseFloat(m[2]), suffix: m[3], dec: (m[2].split(".")[1] || "").length } : null;
    }).filter(Boolean);
    var bars = Array.prototype.slice.call(mock.querySelectorAll(".chart i"));
    var pills = Array.prototype.slice.call(mock.querySelectorAll(".pill"));
    var side = Array.prototype.slice.call(mock.querySelectorAll(".dash-side .sk"));
    var first = true;

    whileVisible(mock, async function (s) {
      if (first) {
        nums.forEach(function (n) { countUp(n.el, n.value, n.prefix, n.suffix, n.dec); });
        first = false;
      } else {
        nums.forEach(function (n) {
          var bump = n.value * (0.02 + Math.random() * 0.04);
          n.value = n.dec ? +(n.value + bump).toFixed(n.dec) : Math.round(n.value + Math.max(1, bump));
          n.el.textContent = n.prefix + n.value.toFixed(n.dec) + n.suffix;
          n.el.classList.add("tick");
          setTimeout(function () { n.el.classList.remove("tick"); }, 600);
        });
      }
      if (bars.length) {
        var hi = Math.floor(Math.random() * bars.length);
        bars.forEach(function (b, k) {
          b.style.height = (30 + Math.round(Math.random() * 45) + (k === hi ? 20 : 0)) + "%";
          b.classList.toggle("hi", k === hi);
        });
      }
      await wait(1600); if (!live(s)) return;
      var wait1 = pills.filter(function (p) { return p.classList.contains("wait"); })[0];
      if (wait1) {
        wait1.dataset.was = wait1.dataset.was || wait1.textContent;
        wait1.classList.remove("wait");
        wait1.textContent = "Done";
        await wait(2200); if (!live(s)) return;
        wait1.classList.add("wait");
        wait1.textContent = wait1.dataset.was;
      }
      if (side.length > 1) {
        var cur = side.findIndex(function (x) { return x.classList.contains("on"); });
        side[cur].classList.remove("on");
        side[(cur + 1) % side.length].classList.add("on");
      }
      await wait(1400);
    });
  }

  /* ---------- Chat sample: the conversation plays out with typing dots ---------- */
  function initChat(mock) {
    var body = mock.querySelector(".chat-body");
    if (!body) return;
    var script = Array.prototype.map.call(body.querySelectorAll(".bubble"), function (b) {
      return { me: b.classList.contains("me"), html: b.innerHTML };
    });
    if (!script.length) return;
    var hasSlots = script.some(function (m) { return /class="slots"/.test(m.html); });
    /* Lock the chat at its starting height so the page never moves.
       New messages push older ones up, where they fade out. */
    body.style.height = body.offsetHeight + "px";
    body.classList.add("chat-live");
    function follow() {
      body.classList.toggle("overflowing", body.scrollHeight > body.clientHeight + 2);
      body.scrollTo({ top: body.scrollHeight, behavior: "smooth" });
    }

    whileVisible(mock, async function (s) {
      body.innerHTML = "";
      await wait(300);
      for (var k = 0; k < script.length; k++) {
        if (!live(s)) return;
        var m = script[k];
        if (!m.me) {
          var dots = document.createElement("div");
          dots.className = "bubble bot typing";
          dots.innerHTML = "<i></i><i></i><i></i>";
          body.appendChild(dots);
          follow();
          await wait(900);
          dots.remove();
        } else {
          await wait(500);
        }
        var el = document.createElement("div");
        el.className = "bubble " + (m.me ? "me" : "bot") + " pop";
        el.innerHTML = m.html;
        body.appendChild(el);
        follow();
        await wait(m.me ? 700 : 1000);
      }
      if (!live(s)) return;
      if (hasSlots) {
        var slot = body.querySelector(".slots span");
        if (slot) { slot.classList.add("picked"); follow(); await wait(900); }
        if (!live(s)) return;
        var done = document.createElement("div");
        done.className = "bubble bot pop";
        done.innerHTML = "You're booked for " + (slot ? slot.textContent : "that time") + " ✓ A confirmation text is on its way.";
        var dots2 = document.createElement("div");
        dots2.className = "bubble bot typing";
        dots2.innerHTML = "<i></i><i></i><i></i>";
        body.appendChild(dots2);
        follow();
        await wait(800);
        dots2.remove();
        body.appendChild(done);
        follow();
      }
      await wait(3200);
      body.classList.add("fade");
      await wait(400);
      body.scrollTop = 0;
      body.classList.remove("overflowing");
      body.classList.remove("fade");
    });
  }

  /* ---------- Document sample: fields fill in one by one ---------- */
  function initDoc(mock) {
    var fields = Array.prototype.slice.call(mock.querySelectorAll(".doc-data .field b"));
    if (!fields.length) return;
    var values = fields.map(function (f) { return f.textContent; });
    var scan = document.createElement("span");
    scan.className = "demo-scan";
    var page = mock.querySelector(".doc-page");
    if (page) { page.style.position = "relative"; page.appendChild(scan); }

    whileVisible(mock, async function (s) {
      fields.forEach(function (f) { f.textContent = ""; f.classList.add("empty"); });
      if (page) page.classList.add("scanning");
      await wait(900);
      for (var k = 0; k < fields.length; k++) {
        if (!live(s)) return;
        var f = fields[k], v = values[k];
        f.classList.remove("empty");
        for (var c = 1; c <= v.length; c++) {
          f.textContent = v.slice(0, c);
          await wait(28);
        }
        await wait(220);
      }
      if (page) page.classList.remove("scanning");
      await wait(3000);
    });
  }

  /* ---------- Network sample: data flows, devices light up ---------- */
  function initNet(net) {
    var svg = net.querySelector("svg");
    if (!svg) return;
    svg.classList.add("net-live");
    var boxes = Array.prototype.slice.call(svg.querySelectorAll("rect"));
    whileVisible(net, async function (s) {
      for (var k = 0; k < boxes.length; k++) {
        if (!live(s)) return;
        boxes[k].classList.add("lit");
        await wait(700);
        boxes[k].classList.remove("lit");
      }
      await wait(600);
    });
  }

  window.TectonicDemos = {
    init: function () {
      cleanups.forEach(function (fn) { fn(); });
      cleanups = [];
      if (reduce || !("IntersectionObserver" in window)) return;
      document.querySelectorAll("#main .mock-site").forEach(initSite);
      document.querySelectorAll("#main .mock-dash").forEach(initDash);
      document.querySelectorAll("#main .mock-chat").forEach(initChat);
      document.querySelectorAll("#main .mock-doc").forEach(initDoc);
      document.querySelectorAll("#main .mock-net").forEach(initNet);
    }
  };
})();
