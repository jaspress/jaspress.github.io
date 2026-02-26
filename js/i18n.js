/* ============================================================
   JSAS i18n – Internationalization (ZH / EN)
   ============================================================ */
(function () {
  "use strict";

  var STORAGE_KEY = "jsas_lang";

  var translations = {
    zh: {
      "nav.home": "首页",
      "nav.articles": "文章",
      "nav.about": "关于期刊",
      "nav.submit": "投稿",
      "nav.contact": "联系",
      "banner.submit": "现已开放投稿",
      "banner.latest": "最新一期：第3卷第1期 (2026)",
      "hero.tag": "同行评审 · 开放获取",
      "hero.title": "SCP基金会异常科学学报",
      "hero.subtitle": "Journal of SCP Anomalous Sciences (JSAS)",
      "hero.desc": "由SCP异常科学研究院主办，发表异常现象、跨维度物理学、生物异常学、记忆信息学及相关领域的高水准原创研究，推动人类对未知边界的科学认知。",
      "hero.btn.articles": "浏览全部文章",
      "hero.btn.about": "了解期刊",
      "stat.articles": "已发表文章",
      "stat.editors": "编委会成员",
      "stat.institutes": "参与研究院",
      "stat.downloads": "月均下载量",
      "stat.volumes": "已出版卷次",
      "section.latest": "最新发表文章",
      "sidebar.current_issue": "当前期次",
      "sidebar.archive": "历史期次",
      "sidebar.announcements": "公告",
      "sidebar.article_types": "文章类型",
      "footer.navigation": "导航",
      "footer.research_areas": "研究方向",
      "footer.services": "服务",
      "page.articles.title": "文章",
      "page.articles.desc": "浏览 SCP异常科学学报 全部已发表文章",
      "page.about.title": "关于期刊",
      "page.about.desc": "SCP基金会异常科学学报 (JSAS) — 宗旨、范围与编委会",
      "page.submit.title": "投稿指南",
      "page.submit.desc": "在提交稿件前，请仔细阅读以下要求与流程说明",
      "page.contact.title": "联系我们",
      "page.contact.desc": "SCP异常科学研究院编辑部联系方式与常见问题",
      "indexed.label": "收录数据库 / Indexed in:"
    },
    en: {
      "nav.home": "Home",
      "nav.articles": "Articles",
      "nav.about": "About",
      "nav.submit": "Submit",
      "nav.contact": "Contact",
      "banner.submit": "Now Accepting Submissions",
      "banner.latest": "Latest Issue: Vol.3 No.1 (2026)",
      "hero.tag": "Peer-Reviewed · Open Access",
      "hero.title": "Journal of SCP Anomalous Sciences",
      "hero.subtitle": "SCP基金会异常科学学报 (JSAS)",
      "hero.desc": "Published by the SCP Institute of Anomalous Sciences, advancing high-quality original research in anomalous phenomena, trans-dimensional physics, biological anomalics, and cognito-informatic hazards.",
      "hero.btn.articles": "Browse All Articles",
      "hero.btn.about": "About the Journal",
      "stat.articles": "Published Articles",
      "stat.editors": "Editorial Board",
      "stat.institutes": "Partner Institutes",
      "stat.downloads": "Monthly Downloads",
      "stat.volumes": "Volumes Published",
      "section.latest": "Latest Articles",
      "sidebar.current_issue": "Current Issue",
      "sidebar.archive": "Archive",
      "sidebar.announcements": "Announcements",
      "sidebar.article_types": "Article Types",
      "footer.navigation": "Navigation",
      "footer.research_areas": "Research Areas",
      "footer.services": "Services",
      "page.articles.title": "Articles",
      "page.articles.desc": "Browse all published articles in the Journal of SCP Anomalous Sciences",
      "page.about.title": "About the Journal",
      "page.about.desc": "Journal of SCP Anomalous Sciences (JSAS) — Mission, Scope & Editorial Board",
      "page.submit.title": "Submission Guidelines",
      "page.submit.desc": "Please read all requirements and instructions carefully before submitting",
      "page.contact.title": "Contact Us",
      "page.contact.desc": "Editorial Office Contact Information & FAQ",
      "indexed.label": "Indexed in:"
    }
  };

  function applyLang(lang) {
    var t = translations[lang] || translations.zh;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (t[key] !== undefined) el.textContent = t[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (t[key] !== undefined) el.setAttribute("placeholder", t[key]);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (t[key] !== undefined) el.setAttribute("aria-label", t[key]);
    });
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    var btn = document.getElementById("lang-switch");
    if (btn) btn.textContent = lang === "en" ? "中" : "EN";
    localStorage.setItem(STORAGE_KEY, lang);
  }

  var savedLang = localStorage.getItem(STORAGE_KEY) || "zh";
  if (savedLang === "en") applyLang("en");

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("lang-switch");
    if (!btn) return;
    var currentLang = localStorage.getItem(STORAGE_KEY) || "zh";
    btn.textContent = currentLang === "en" ? "中" : "EN";
    btn.addEventListener("click", function () {
      var lang = localStorage.getItem(STORAGE_KEY) || "zh";
      applyLang(lang === "zh" ? "en" : "zh");
    });
  });
})();
