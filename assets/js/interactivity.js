(function () {
  var MQ = "(max-width: 630px)";

  function initTestimonialCarousel() {
    var root = document.querySelector("[data-testimonial-carousel]");
    if (!root) return function () {};

    var viewport = root.querySelector(".testimonial__carousel-viewport");
    var dotsEl = root.querySelector(".testimonial__carousel-dots");
    var slides = root.querySelectorAll(".testimonial__card");
    if (!viewport || !dotsEl || slides.length === 0) return function () {};

    // build dots
    dotsEl.innerHTML = "";
    for (var i = 0; i < slides.length; i++) {
      var dot = document.createElement("span");
      dot.className = "testimonial__carousel-dot";
      dot.setAttribute("data-index", String(i));
      dotsEl.appendChild(dot);
    }

    var dots = dotsEl.querySelectorAll('.testimonial__carousel-dot');

    function activeIndex() {
      var w = viewport.clientWidth || 1;
      var idx = Math.round((viewport.scrollLeft || 0) / w);
      if (idx < 0) idx = 0;
      if (idx > slides.length - 1) idx = slides.length - 1;
      return idx;
    }

    function syncDots() {
      var i = activeIndex();
      for (var j = 0; j < dots.length; j++) {
        if (j === i) {
          dots[j].classList.add('testimonial__carousel-dot--active');
        } else {
          dots[j].classList.remove('testimonial__carousel-dot--active');
        }
      }
    }

    function onScroll() { syncDots(); }
    viewport.addEventListener('scroll', onScroll, { passive: true });

    function onDotClick(e) {
      var t = e.target;
      if (!t || !t.matches('.testimonial__carousel-dot')) return;
      var idx = Number(t.getAttribute('data-index')) || 0;
      var left = idx * (viewport.clientWidth || 0);
      try {
        viewport.scrollTo({ left: left, behavior: 'smooth' });
      } catch (err) {
        viewport.scrollLeft = left;
      }
    }

    dotsEl.addEventListener('click', onDotClick);

    // initial sync
    syncDots();

    // iOS-specific fallback: some Safari versions handle touch/scroll differently.
    var isiOS = typeof navigator !== 'undefined' && (/iP(ad|hone|od)/.test(navigator.userAgent) || (navigator.platform && /iP/.test(navigator.platform)));
    var _iosDown = false;
    var _iosStartX = 0;
    var _iosStartScroll = 0;

    function _iosTouchStart(e) {
      if (!isiOS) return;
      if (!e.touches || e.touches.length === 0) return;
      _iosDown = true;
      _iosStartX = e.touches[0].clientX;
      _iosStartScroll = viewport.scrollLeft;
    }

    function _iosTouchMove(e) {
      if (!isiOS || !_iosDown) return;
      if (!e.touches || e.touches.length === 0) return;
      var clientX = e.touches[0].clientX;
      var dx = clientX - _iosStartX;
      if (Math.abs(dx) > 4) {
        // prevent vertical bounce while swiping horizontally
        if (e.cancelable) e.preventDefault();
        viewport.scrollLeft = _iosStartScroll - dx;
      }
    }

    function _iosTouchEnd(e) {
      if (!isiOS) return;
      _iosDown = false;
      syncDots();
    }

    if (isiOS) {
      viewport.addEventListener('touchstart', _iosTouchStart, { passive: true });
      viewport.addEventListener('touchmove', _iosTouchMove, { passive: false });
      viewport.addEventListener('touchend', _iosTouchEnd, { passive: true });
    }

    return function teardown() {
      viewport.removeEventListener('scroll', onScroll);
      dotsEl.removeEventListener('click', onDotClick);
      if (isiOS) {
        viewport.removeEventListener('touchstart', _iosTouchStart);
        viewport.removeEventListener('touchmove', _iosTouchMove);
        viewport.removeEventListener('touchend', _iosTouchEnd);
      }
      dotsEl.innerHTML = '';
    };
  }

  function initBrandsMarquee() {
    var DEFAULT_CYCLE_SEC = 10;

    var reduceMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotionMq.matches) {
      return function () {};
    }

    var container = document.querySelector(".brands__container");
    if (!container) {
      return function () {};
    }

    var track = container.querySelector(".brands__marquee-track");
    var set = container.querySelector(".brands__marquee-set");
    if (!track || !set) {
      return function () {};
    }

    if (track.querySelector(".brands__marquee-set--duplicate")) {
      return function () {};
    }

    var cycleSec = parseFloat(
      container.getAttribute("data-marquee-cycle-sec") || ""
    );
    if (!isFinite(cycleSec) || cycleSec <= 0) {
      cycleSec = DEFAULT_CYCLE_SEC;
    }

    var dup = set.cloneNode(true);
    dup.classList.add("brands__marquee-set--duplicate");
    dup.setAttribute("aria-hidden", "true");
    track.appendChild(dup);
    track.classList.add("brands__marquee-track--animating");

    var segW = 0;
    var x = 0;
    var lastT = performance.now();
    var rafId = null;

    function measureSeg() {
      var w = set.offsetWidth;
      if (w > 0) {
        segW = w;
      }
    }

    function wrapX() {
      if (segW <= 0) {
        return;
      }
      while (x <= -segW) {
        x += segW;
      }
      while (x > 0) {
        x -= segW;
      }
    }

    measureSeg();
    void track.offsetWidth;
    measureSeg();

    function tick(now) {
      if (segW <= 0) {
        measureSeg();
      }
      var dt = (now - lastT) / 1000;
      lastT = now;
      if (dt > 0.064) {
        dt = 0.064;
      }
      if (segW > 0) {
        x -= (segW / cycleSec) * dt;
        wrapX();
        track.style.transform = "translate3d(" + x.toFixed(2) + "px,0,0)";
      }
      rafId = requestAnimationFrame(tick);
    }

    function onVis() {
      if (document.hidden) {
        if (rafId != null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else {
        lastT = performance.now();
        if (rafId == null) {
          rafId = requestAnimationFrame(tick);
        }
      }
    }

    rafId = requestAnimationFrame(tick);

    document.addEventListener("visibilitychange", onVis);

    var ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(function () {
        measureSeg();
        wrapX();
      });
      ro.observe(track);
    }

    return function teardown() {
      document.removeEventListener("visibilitychange", onVis);
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (ro) {
        ro.disconnect();
      }
      track.style.transform = "";
      track.classList.remove("brands__marquee-track--animating");
      var clone = track.querySelector(".brands__marquee-set--duplicate");
      if (clone) {
        clone.remove();
      }
    };
  }

  var mq = window.matchMedia(MQ);
  var teardowns = [];

  function runTeardowns() {
    for (var i = 0; i < teardowns.length; i++) {
      if (typeof teardowns[i] === "function") {
        teardowns[i]();
      }
    }
    teardowns = [];
  }

  function apply() {
    if (!mq.matches) {
      runTeardowns();
      return;
    }
    if (teardowns.length > 0) {
      return;
    }
    teardowns.push(initTestimonialCarousel());
    teardowns.push(initBrandsMarquee());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", apply);
  } else {
    apply();
  }

  mq.addEventListener("change", apply);
})();

(function () {
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/chukwuemekaobama3@gmail.com";
  var TOAST_VISIBLE_MS = 4500;
  var TOAST_ANIM_MS = 350;

  function initContactForm() {
    var form = document.querySelector("[data-contact-form]");
    if (!form) {
      return;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector(".contactus__submit");
      if (submitBtn) {
        submitBtn.disabled = true;
      }

      var nameEl = form.querySelector(".contactus__form-name");
      var emailEl = form.querySelector(".contactus__form-email");
      var phoneEl = form.querySelector(".contactus__form-number");
      var messageEl = form.querySelector(".contactus__form__messages");

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: nameEl ? nameEl.value.trim() : "",
          email: emailEl ? emailEl.value.trim() : "",
          phone: phoneEl ? phoneEl.value.trim() : "",
          message: messageEl ? messageEl.value.trim() : "",
          _subject: "New Contact — Southify Solars",
          _template: "table",
        }),
      })
        .then(function (response) {
          return response.json().then(function (data) {
            return { ok: response.ok, data: data };
          });
        })
        .then(function (result) {
          if (isFormSubmitSuccess(result.data)) {
            form.reset();
            showFormToast("success");
            return;
          }
          showFormToast("error", getFormSubmitErrorMessage(result.data));
        })
        .catch(function () {
          showFormToast(
            "error",
            "Please check your internet connection and try again."
          );
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
          }
        });
    });
  }

  function isFormSubmitSuccess(data) {
    if (!data) {
      return false;
    }
    var success = data.success;
    return success === true || success === "true";
  }

  function getFormSubmitErrorMessage(data) {
    if (data && data.message) {
      var msg = String(data.message);
      if (/web server|html files/i.test(msg)) {
        return "This form must be opened through a web server (for example, Live Server), not as a local file.";
      }
      if (/activate|confirmation/i.test(msg)) {
        return "Email delivery is not active yet. Please confirm the activation link sent to the site owner’s inbox, then try again.";
      }
      return msg;
    }
    return "Something went wrong while sending your message. Please try again shortly.";
  }

  var TOAST_ICONS = {
    success:
      '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>',
    error:
      '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>',
  };

  var TOAST_COPY = {
    success: {
      title: "Message Sent Successfully!",
      text: "Your message has been delivered. We will get back to you soon.",
    },
    error: {
      title: "Unable to Send Message",
      text: "Something went wrong while sending your message. Please try again shortly.",
    },
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function showFormToast(type, textOverride) {
    var existing = document.querySelector(".form-toast");
    if (existing) {
      existing.remove();
    }

    var copy = TOAST_COPY[type] || TOAST_COPY.error;
    var iconPath = TOAST_ICONS[type] || TOAST_ICONS.error;
    var modifier = type === "success" ? "" : " form-toast--error";

    var toast = document.createElement("div");
    toast.className = "form-toast" + modifier;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML =
      '<svg class="form-toast__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      iconPath +
      "</svg>" +
      '<div class="form-toast__body">' +
      '<p class="form-toast__title">' +
      copy.title +
      "</p>" +
      '<p class="form-toast__text">' +
      escapeHtml(textOverride || copy.text) +
      "</p>" +
      "</div>";

    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add("form-toast--visible");
    });

    window.setTimeout(function () {
      toast.classList.remove("form-toast--visible");
      toast.classList.add("form-toast--leaving");
    }, TOAST_VISIBLE_MS);

    window.setTimeout(function () {
      toast.remove();
    }, TOAST_VISIBLE_MS + TOAST_ANIM_MS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactForm);
  } else {
    initContactForm();
  }
})();
