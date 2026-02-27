/* ============================================================
   SCP异常科学学报 – Main JS
   ============================================================ */
(function () {
  "use strict";

  /* ── Mobile nav toggle ── */
  var btn       = document.querySelector(".hamburger");
  var mobileNav = document.querySelector(".mobile-nav");
  if (btn && mobileNav) {
    btn.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("open");
      btn.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ── Mark active nav link ── */
  var path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a, .mobile-nav a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* ── Article search / filter / pagination (articles page) ── */
  var searchInput  = document.querySelector(".search-input");
  var typeFilter   = document.querySelector("#filter-type");
  var yearFilter   = document.querySelector("#filter-year");
  var articleCards = document.querySelectorAll(".article-card");
  var pageButtons  = document.querySelectorAll(".page-btn");
  var ARTICLES_PER_PAGE = 4;
  var currentPage = 1;

  function getMatchingCards() {
    var q    = searchInput  ? searchInput.value.toLowerCase()  : "";
    var type = typeFilter   ? typeFilter.value                 : "all";
    var year = yearFilter   ? yearFilter.value                 : "all";
    var matched = [];
    articleCards.forEach(function (card) {
      var text  = card.textContent.toLowerCase();
      var ctype = card.getAttribute("data-type") || "all";
      var cyear = card.getAttribute("data-year") || "all";
      var matchQ    = !q    || text.indexOf(q) !== -1;
      var matchType = type === "all" || ctype === type;
      var matchYear = year === "all" || cyear === year;
      if (matchQ && matchType && matchYear) matched.push(card);
    });
    return matched;
  }

  function renderPage(page) {
    var matched = getMatchingCards();
    var totalPages = Math.max(1, Math.ceil(matched.length / ARTICLES_PER_PAGE));
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentPage = page;
    var start = (page - 1) * ARTICLES_PER_PAGE;
    var end   = start + ARTICLES_PER_PAGE;

    /* Show/hide cards */
    articleCards.forEach(function (card) { card.style.display = "none"; });
    matched.forEach(function (card, idx) {
      card.style.display = (idx >= start && idx < end) ? "" : "none";
    });

    /* Show/hide volume headers based on visible cards */
    document.querySelectorAll(".volume-header").forEach(function (hdr) {
      var body = hdr.nextElementSibling;
      if (!body) return;
      var visible = false;
      body.querySelectorAll(".article-card").forEach(function (c) {
        if (c.style.display !== "none") visible = true;
      });
      hdr.style.display = visible ? "" : "none";
      body.style.display = visible ? "" : "none";
    });

    /* Update pagination buttons */
    updatePagination(totalPages, page);
  }

  function updatePagination(totalPages, activePage) {
    var pagination = document.querySelector(".pagination");
    if (!pagination) return;
    pagination.innerHTML = "";

    /* Prev button */
    var prev = document.createElement("button");
    prev.className = "page-btn";
    prev.textContent = "← 上一页";
    prev.disabled = (activePage <= 1);
    prev.addEventListener("click", function () { renderPage(currentPage - 1); });
    pagination.appendChild(prev);

    /* Numbered buttons */
    for (var i = 1; i <= totalPages; i++) {
      (function(p) {
        var btn = document.createElement("button");
        btn.className = "page-btn" + (p === activePage ? " active" : "");
        btn.textContent = p;
        btn.addEventListener("click", function () { renderPage(p); });
        pagination.appendChild(btn);
      })(i);
    }

    /* Next button */
    var next = document.createElement("button");
    next.className = "page-btn";
    next.setAttribute("data-i18n", "pagination.next");
    next.textContent = "下一页 →";
    next.disabled = (activePage >= totalPages);
    next.addEventListener("click", function () { renderPage(currentPage + 1); });
    pagination.appendChild(next);
  }

  function filterArticles() {
    currentPage = 1;
    renderPage(1);
  }

  if (searchInput)  searchInput.addEventListener("input",  filterArticles);
  if (typeFilter)   typeFilter.addEventListener("change",  filterArticles);
  if (yearFilter)   yearFilter.addEventListener("change",  filterArticles);

  /* Initialize pagination if on articles page */
  if (articleCards.length > 0 && document.querySelector(".pagination")) {
    renderPage(1);
  }

  /* ── Smooth counter animation for stats ── */
  var counters = document.querySelectorAll(".stat-num[data-target]");
  if (counters.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el     = entry.target;
        var target = parseInt(el.getAttribute("data-target"), 10);
        var start  = 0;
        var step   = Math.ceil(target / 40);
        var timer  = setInterval(function () {
          start = Math.min(start + step, target);
          el.textContent = start.toLocaleString();
          if (start >= target) clearInterval(timer);
        }, 30);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { io.observe(c); });
  }

  /* ── Contact / submit form placeholder handler ── */
  var contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var required = contactForm.querySelectorAll("[required]");
      var valid = true;
      required.forEach(function (field) {
        field.style.borderColor = "";
        if (!field.value.trim()) { field.style.borderColor = "#b5292a"; valid = false; }
      });
      if (!valid) return;
      var btn = contactForm.querySelector('[type="submit"]');
      btn.textContent = "已发送 ✓";
      btn.disabled = true;
      setTimeout(function () {
        contactForm.reset();
        btn.textContent = "提交";
        btn.disabled = false;
        required.forEach(function (f) { f.style.borderColor = ""; });
      }, 3000);
    });
  }

  var submitForm = document.querySelector(".manuscript-form");
  if (submitForm) {
    submitForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var required = submitForm.querySelectorAll("[required]");
      var valid = true;
      required.forEach(function (field) {
        field.style.borderColor = "";
        if (!field.value.trim()) { field.style.borderColor = "#b5292a"; valid = false; }
      });
      if (!valid) return;
      var btn = submitForm.querySelector('[type="submit"]');
      btn.textContent = "投稿已提交 ✓";
      btn.disabled = true;
    });
  }
})();

/* ── Hero canvas particle animation & Scroll-reveal ── */
(function () {
  "use strict";

  /* ── Header shrink on scroll ── */
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  /* Particle animation */
  var canvas = document.getElementById("hero-canvas");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    function resizeCanvas() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    for (var i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.2
      });
    }
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      /* Draw connection lines between nearby particles */
      for (var a = 0; a < particles.length; a++) {
        for (var b = a + 1; b < particles.length; b++) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = "rgba(255,255,255," + (0.12 * (1 - dist / 90)) + ")";
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      /* Draw particles */
      particles.forEach(function(p) {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255," + p.alpha + ")";
        ctx.fill();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* Scroll-reveal */
  var revealEls = document.querySelectorAll(".article-card, .sidebar-widget, .info-box, .board-card, .content-card, .contact-card, .stat-item");
  revealEls.forEach(function(el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); revealObs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function(el) { revealObs.observe(el); });
  }
})();

/* ── Hume Level real-time dynamic status bar ── */
(function () {
  "use strict";
  var fill      = document.getElementById("hume-fill");
  var valueEl   = document.getElementById("hume-value");
  var statusEl  = document.getElementById("hume-status");
  var tsEl      = document.getElementById("hume-ts");
  if (!fill || !valueEl) return;

  /* Baseline Hume Level: standard reality ~113.7 */
  var baseHume = 113.7;
  var current  = baseHume;

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function updateTimestamp() {
    var now = new Date();
    return now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate()) +
           " " + pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds()) +
           " (站点时间)";
  }

  function getStatus(val) {
    if (val >= 100) return { label: "STABLE · 稳定", cls: "stable" };
    if (val >= 60)  return { label: "CAUTION · 注意", cls: "caution" };
    return            { label: "CRITICAL · 危急", cls: "critical" };
  }

  function updateHume() {
    /* Random walk ±0.6 per tick, biased toward baseline */
    var drift = (baseHume - current) * 0.04;
    current += drift + (Math.random() - 0.5) * 1.2;
    /* Clamp to sensible range */
    current = Math.max(20, Math.min(150, current));

    var pct = Math.min(100, (current / 150) * 100);
    fill.style.width = pct.toFixed(1) + "%";

    /* Color of fill based on value */
    if (current >= 100) {
      fill.style.background = "linear-gradient(90deg, #1a7a1a, #7adb7a)";
    } else if (current >= 60) {
      fill.style.background = "linear-gradient(90deg, #7a6000, #f0c040)";
    } else {
      fill.style.background = "linear-gradient(90deg, #7a0000, #ff6060)";
    }

    valueEl.textContent = current.toFixed(1);
    var s = getStatus(current);
    statusEl.textContent = s.label;
    statusEl.className   = "hume-status " + s.cls;
    if (tsEl) tsEl.textContent = updateTimestamp();
  }

  updateHume();
  setInterval(updateHume, 3000);
})();
