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
