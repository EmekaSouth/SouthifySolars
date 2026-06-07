(function () {
  var STORAGE_KEY = "southify_lang";
  var DEFAULT_LANG = "en";

  var translations = {
    en: {
      nav_home: "Home",
      nav_commercial: "Commercial",
      nav_residential: "Residential",
      nav_blog: "Blog",
      nav_contact: "Contact Us",
      hero_title_h1: "Switch to Southify Solars Today",
      hero_title_h5:
        "Save money, Enjoy comfort and flexibility with your electricity and Help the environment with Solar, Today.",
      hero_btn: "Look At Our Blog",
      advantages_title: "Advantages",
      advantages_sub: "Benefits of Going Solar",
      contact_section_title: "Let's Get Started",
      contact_section_sub: "Contact Us",
      contact_submit: "Subscribe",
      footer_copy: "©2026 SouthifySolars. Developed By South.",
      choose_language: "Choose Your Language",
      choose_language_sub: "Select your preferred language to continue.",
      english: "English",
      french: "Français",
      arabic: "العربية",
    },
    fr: {
      nav_home: "Accueil",
      nav_commercial: "Commercial",
      nav_residential: "Résidentiel",
      nav_blog: "Blog",
      nav_contact: "Contactez-nous",
      hero_title_h1: "Passez à Southify Solars aujourd'hui",
      hero_title_h5:
        "Économisez de l'argent, profitez du confort et de la flexibilité avec votre électricité et aidez l'environnement avec l'énergie solaire, dès aujourd'hui.",
      hero_btn: "Voir notre blog",
      advantages_title: "Avantages",
      advantages_sub: "Avantages de passer au solaire",
      contact_section_title: "Commençons",
      contact_section_sub: "Contactez-nous",
      contact_submit: "S'abonner",
      footer_copy: "©2026 SouthifySolars. Développé par South.",
      choose_language: "Choisissez votre langue",
      choose_language_sub: "Sélectionnez votre langue préférée pour continuer.",
      english: "English",
      french: "Français",
      arabic: "العربية",
    },
    ar: {
      nav_home: "الرئيسية",
      nav_commercial: "تجاري",
      nav_residential: "سكني",
      nav_blog: "المدونة",
      nav_contact: "اتصل بنا",
      hero_title_h1: "انتقل إلى Southify Solars اليوم",
      hero_title_h5:
        "وفر المال واستمتع بالراحة والمرونة مع الكهرباء وساعد البيئة بالطاقة الشمسية اليوم.",
      hero_btn: "اطلع على مدونتنا",
      advantages_title: "المزايا",
      advantages_sub: "فوائد التحول إلى الطاقة الشمسية",
      contact_section_title: "لنبدأ",
      contact_section_sub: "اتصل بنا",
      contact_submit: "اشترك",
      footer_copy: "©2026 SouthifySolars. تم التطوير بواسطة South.",
      choose_language: "اختر لغتك",
      choose_language_sub: "حدد لغتك المفضلة للمتابعة.",
      english: "English",
      french: "Français",
      arabic: "العربية",
    },
  };

  var extras = {
    en: {},
    fr: {
      "Residential Solar": "Solaire résidentiel",
      "Commercial Solar": "Solaire commercial",
      "What is Solar Panel?": "Qu'est-ce qu'un panneau solaire ?",
      "How much price for Solar in USA?":
        "Quel est le prix d'un système solaire aux États-Unis ?",
      "Our Portfolio": "Notre portefeuille",
      "Our Successive Projects": "Nos projets successifs",
      "Let's Get Started": "Commençons",
      "Contact Us": "Contactez-nous",
      Links: "Liens",
      Services: "Services",
      Languages: "Langues",
      Advantages: "Avantages",
      "Benefits of Going Solar": "Avantages de passer au solaire",
      "Cost Savings": "Économies de coûts",
      "Environmental Impact": "Impact environnemental",
      "Energy Independence": "Indépendance énergétique",
      "Why Choose Us ?": "Pourquoi nous choisir ?",
      "Our Three Step Procedure": "Notre procédure en trois étapes",
      "1. Consultation": "1. Consultation",
      "2. Installation": "2. Installation",
      "3. Monitoring": "3. Surveillance",
      Features: "Fonctionnalités",
      "Pro support": "Assistance pro",
      "Unique design": "Design unique",
      "Future Proof": "À l'épreuve du temps",
      "Pixel Perfect": "Pixel parfait",
      "Our Testimonials": "Nos témoignages",
      "What Our Customers Says": "Ce que disent nos clients",
      "Products System": "Produits système",
      "System Integration & Fabrication":
        "Intégration et fabrication de systèmes",
      "One Stop Off-Grid Shop": "Boutique tout-en-un hors réseau",
      "We are a reliable and experienced solar company that offers\naffordable and sustainable energy solutions, customized to fit\nyour unique needs.":
        "Nous sommes une entreprise solaire fiable et expérimentée offrant des solutions énergétiques abordables et durables, personnalisées pour répondre à vos besoins.",
      "Save money, Enjoy comfort and flexibility with your electricity and Help the environment with Solar, Today.":
        "Économisez de l'argent, profitez du confort et de la flexibilité avec votre électricité et aidez l'environnement avec l'énergie solaire dès aujourd'hui.",
      "Straight from our desk, to your Inbox.":
        "Directement de notre bureau à votre boîte de réception.",
      "Subscribe to our latest coming newsletter of solar panel":
        "Abonnez-vous à notre prochaine newsletter sur les panneaux solaires",
      Subscribe: "S'abonner",
      "Contact Us": "Contactez-nous",
      "CONTACT US": "CONTACTEZ-NOUS",
      "Save money and help the environment with South SolarEnergy.":
        "Économisez de l'argent et aidez l'environnement avec South SolarEnergy.",
    },
    ar: {
      "Residential Solar": "الطاقة الشمسية السكنية",
      "Commercial Solar": "الطاقة الشمسية للمشروعات التجارية",
      "What is Solar Panel?": "ما هو اللوح الشمسي؟",
      "How much price for Solar in USA?":
        "كم تكلفة نظام الطاقة الشمسية في الولايات المتحدة؟",
      "Our Portfolio": "معرض أعمالنا",
      "Our Successive Projects": "مشاريعنا المتتالية",
      "Let's Get Started": "لنبدأ",
      "Contact Us": "اتصل بنا",
      Links: "روابط",
      Services: "خدمات",
      Languages: "اللغات",
      Advantages: "المزايا",
      "Benefits of Going Solar": "فوائد التحول إلى الطاقة الشمسية",
      "Cost Savings": "توفير التكاليف",
      "Environmental Impact": "الأثر البيئي",
      "Energy Independence": "الاستقلالية في الطاقة",
      "Why Choose Us ?": "لماذا تختارنا؟",
      "Our Three Step Procedure": "إجراءاتنا ثلاثية الخطوات",
      "1. Consultation": "1. استشارة",
      "2. Installation": "2. تركيب",
      "3. Monitoring": "3. مراقبة",
      Features: "الميزات",
      "Pro support": "دعم احترافي",
      "Unique design": "تصميم فريد",
      "Future Proof": "مستقبلية",
      "Pixel Perfect": "دقة البكسل",
      "Our Testimonials": "توصيات عملائنا",
      "What Our Customers Says": "آراء عملائنا",
      "Products System": "نظام المنتجات",
      "System Integration & Fabrication": "تكامل النظام والتصنيع",
      "One Stop Off-Grid Shop": "متجر خارج الشبكة شامل",
      "We are a reliable and experienced solar company that offers\naffordable and sustainable energy solutions, customized to fit\nyour unique needs.":
        "نحن شركة طاقة شمسية موثوقة وذات خبرة نقدم حلول طاقة مستدامة وميسورة التكلفة ومصممة خصيصًا لتلبية احتياجاتك.",
      "Save money, Enjoy comfort and flexibility with your electricity and Help the environment with Solar, Today.":
        "وفر المال واستمتع بالراحة والمرونة مع كهربائك وساعد البيئة بالطاقة الشمسية اليوم.",
      "Straight from our desk, to your Inbox.":
        "مباشرة من مكتبنا إلى صندوق بريدك.",
      "Subscribe to our latest coming newsletter of solar panel":
        "اشترك في أحدث نشرتنا الإخبارية حول الألواح الشمسية",
      Subscribe: "اشترك",
      "CONTACT US": "اتصل بنا",
      "Save money and help the environment with South SolarEnergy.":
        "وفر المال وساهم في حماية البيئة مع South SolarEnergy.",
    },
  };

  var mapping = [
    { sel: "a[href='home.html']", key: "nav_home" },
    { sel: "a[href='commercial.html']", key: "nav_commercial" },
    { sel: "a[href='residential.html']", key: "nav_residential" },
    { sel: "a[href='blog.html']", key: "nav_blog" },
    { sel: "a[href='contact.html']", key: "nav_contact" },
    { sel: ".hero__title h1", key: "hero_title_h1" },
    { sel: ".hero__title h5", key: "hero_title_h5" },
    { sel: ".hero__btn", key: "hero_btn" },
    { sel: ".section__header-title", key: "advantages_title" },
    { sel: ".section__header-subtitle", key: "advantages_sub" },
    { sel: ".contact .section__header-title", key: "contact_section_title" },
    { sel: ".contact .section__header-subtitle", key: "contact_section_sub" },
    { sel: ".contact__submit-btn", key: "contact_submit" },
    { sel: ".footer__bottom-text", key: "footer_copy" },
  ];

  function applyLanguage(lang) {
    var dict = translations[lang] || translations[DEFAULT_LANG];

    document.documentElement.lang = lang === "ar" ? "ar" : "en";
    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      document.body.classList.add("is-rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.body.classList.remove("is-rtl");
    }

    mapping.forEach(function (m) {
      var els = document.querySelectorAll(m.sel);
      if (!els || els.length === 0) return;
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var key = m.key;
        var txt = dict[key];
        if (!txt) continue;
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = txt;
        } else if (el.tagName === "IMG") {
          if (el.alt) el.alt = txt;
        } else {
          el.textContent = txt;
        }
      }
    });

    var footerLangs = document.querySelectorAll(".footer__content-lang li");
    if (footerLangs && footerLangs.length > 0) {
      for (var j = 0; j < footerLangs.length; j++) {
        var li = footerLangs[j];
        if (li.getAttribute("data-lang-button") !== "true") {
          var text = li.textContent.trim();
          var code =
            text.toLowerCase().indexOf("arab") >= 0
              ? "ar"
              : text.toLowerCase().indexOf("fr") >= 0 ||
                  text.toLowerCase().indexOf("français") >= 0
                ? "fr"
                : "en";
          var btn = document.createElement("button");
          btn.type = "button";
          btn.className = "footer__lang-btn";
          btn.setAttribute("data-lang", code);
          btn.textContent =
            dict[
              code === "fr" ? "french" : code === "ar" ? "arabic" : "english"
            ];
          btn.addEventListener("click", function (e) {
            var selected = e.currentTarget.getAttribute("data-lang");
            setLanguage(selected);
          });
          li.textContent = "";
          li.appendChild(btn);
          li.setAttribute("data-lang-button", "true");
        } else {
          var btn2 = li.querySelector("button.footer__lang-btn");
          if (btn2) {
            var code2 = btn2.getAttribute("data-lang");
            btn2.textContent =
              dict[
                code2 === "fr"
                  ? "french"
                  : code2 === "ar"
                    ? "arabic"
                    : "english"
              ];
          }
        }
      }
    }
    translateAll(lang);
  }

  function translateAll(lang) {
    var map = extras[lang] || {};
    if (!map || Object.keys(map).length === 0) return;

    var skipSelectors = ".lang-modal, .lang-modal * , .footer__lang-btn";

    var nodes = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,a,button");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.closest && el.closest(".lang-modal")) continue;
      if (el.classList && el.classList.contains("footer__lang-btn")) continue;
      var txt = el.textContent || "";
      var key = txt.trim();
      if (!key) continue;
      if (el.querySelector("img")) continue;
      if (map[key]) {
        el.textContent = map[key];
      }
    }

    var inputs = document.querySelectorAll(
      "input[placeholder], textarea[placeholder]",
    );
    for (var j = 0; j < inputs.length; j++) {
      var inp = inputs[j];
      if (inp.closest && inp.closest(".lang-modal")) continue;
      var ph = (inp.getAttribute("placeholder") || "").trim();
      if (ph && map[ph]) {
        inp.setAttribute("placeholder", map[ph]);
      }
    }
  }

  function setLanguage(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLanguage(lang);
    closeLanguageModal();
  }

  var modalEl = null;

  function createLanguageModal(dict) {
    if (modalEl) return modalEl;
    var overlay = document.createElement("div");
    overlay.className = "lang-modal-overlay";

    var modal = document.createElement("div");
    modal.className = "lang-modal";

    modal.innerHTML =
      '<h3 class="lang-modal__title">' +
      escapeHtml(dict.choose_language) +
      "</h3>" +
      '<p class="lang-modal__subtitle">' +
      escapeHtml(dict.choose_language_sub) +
      "</p>" +
      '<div class="lang-modal__choices">' +
      '<button class="lang-modal__choice" data-lang="en">' +
      escapeHtml(dict.english) +
      "</button>" +
      '<button class="lang-modal__choice" data-lang="fr">' +
      escapeHtml(dict.french) +
      "</button>" +
      '<button class="lang-modal__choice" data-lang="ar">' +
      escapeHtml(dict.arabic) +
      "</button>" +
      "</div>";

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) {
        closeLanguageModal();
      }
    });

    modal.querySelectorAll(".lang-modal__choice").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        var code = e.currentTarget.getAttribute("data-lang");
        setLanguage(code);
      });
    });

    modalEl = overlay;
    return modalEl;
  }

  function openLanguageModal() {
    var lang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
    var dict = translations[lang] || translations[DEFAULT_LANG];
    createLanguageModal(dict);
    requestAnimationFrame(function () {
      modalEl.classList.add("lang-modal-overlay--visible");
    });
  }

  function closeLanguageModal() {
    if (!modalEl) return;
    modalEl.classList.remove("lang-modal-overlay--visible");
    window.setTimeout(function () {
      if (modalEl && modalEl.parentNode)
        modalEl.parentNode.removeChild(modalEl);
      modalEl = null;
    }, 250);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function init() {
    var saved = localStorage.getItem(STORAGE_KEY);
    var lang = saved || DEFAULT_LANG;
    applyLanguage(lang);

    if (!saved) {
      openLanguageModal();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.SouthifyLang = {
    setLanguage: setLanguage,
    applyLanguage: applyLanguage,
    translations: translations,
  };
})();
