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

  /* ── Article search / filter (articles page) ── */
  var searchInput  = document.querySelector(".search-input");
  var typeFilter   = document.querySelector("#filter-type");
  var yearFilter   = document.querySelector("#filter-year");
  var articleCards = document.querySelectorAll(".article-card");

  function filterArticles() {
    var q    = searchInput  ? searchInput.value.toLowerCase()  : "";
    var type = typeFilter   ? typeFilter.value                 : "all";
    var year = yearFilter   ? yearFilter.value                 : "all";

    articleCards.forEach(function (card) {
      var text  = card.textContent.toLowerCase();
      var ctype = card.getAttribute("data-type") || "all";
      var cyear = card.getAttribute("data-year") || "all";

      var matchQ    = !q    || text.indexOf(q) !== -1;
      var matchType = type === "all" || ctype === type;
      var matchYear = year === "all" || cyear === year;

      card.style.display = (matchQ && matchType && matchYear) ? "" : "none";
    });
  }

  if (searchInput)  searchInput.addEventListener("input",  filterArticles);
  if (typeFilter)   typeFilter.addEventListener("change",  filterArticles);
  if (yearFilter)   yearFilter.addEventListener("change",  filterArticles);

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
      var btn = contactForm.querySelector('[type="submit"]');
      btn.textContent = "已发送 ✓";
      btn.disabled = true;
      setTimeout(function () { contactForm.reset(); btn.textContent = "提交"; btn.disabled = false; }, 3000);
    });
  }

  var submitForm = document.querySelector(".manuscript-form");
  if (submitForm) {
    submitForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = submitForm.querySelector('[type="submit"]');
      btn.textContent = "投稿已提交 ✓";
      btn.disabled = true;
    });
  }
})();

/* ── Hero canvas particle animation & Scroll-reveal ── */
(function () {
  "use strict";

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
    for (var i = 0; i < 60; i++) {
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
