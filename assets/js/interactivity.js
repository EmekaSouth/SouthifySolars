(function () {
  var MQ = "(max-width: 630px)";

  function initTestimonialCarousel() {
    var root = document.querySelector("[data-testimonial-carousel]");
    if (!root) {
      return function () {};
    }

    var viewport = root.querySelector(".testimonial__carousel-viewport");
    var dotsEl = root.querySelector(".testimonial__carousel-dots");
    var slides = root.querySelectorAll(".testimonial__card");

    if (!viewport || !dotsEl || slides.length === 0) {
      return function () {};
    }

    dotsEl.innerHTML = "";
    for (var i = 0; i < slides.length; i++) {
      var dot = document.createElement("span");
      dot.className = "testimonial__carousel-dot";
      dot.setAttribute("data-index", String(i));
      dotsEl.appendChild(dot);
    }

    var dots = dotsEl.querySelectorAll(".testimonial__carousel-dot");

    function activeIndex() {
      var w = viewport.clientWidth || 1;
      var idx = Math.round(viewport.scrollLeft / w);
      if (idx < 0) {
        idx = 0;
      }
      if (idx > slides.length - 1) {
        idx = slides.length - 1;
      }
      return idx;
    }

    function syncDots() {
      var i = activeIndex();
      for (var j = 0; j < dots.length; j++) {
        if (j === i) {
          dots[j].classList.add("testimonial__carousel-dot--active");
        } else {
          dots[j].classList.remove("testimonial__carousel-dot--active");
        }
      }
    }

    function onScroll() {
      syncDots();
    }

    viewport.addEventListener("scroll", onScroll, { passive: true });

    var ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(function () {
        syncDots();
      });
      ro.observe(viewport);
    }

    window.addEventListener("orientationchange", syncDots);

    syncDots();

    return function teardown() {
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("orientationchange", syncDots);
      if (ro) {
        ro.disconnect();
      }
      viewport.scrollLeft = 0;
      dotsEl.innerHTML = "";
    };
  }

  function initBrandsMarquee() {
    var DEFAULT_CYCLE_SEC = 10;

    var reduceMotionMq = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
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
      container.getAttribute("data-marquee-cycle-sec") || "",
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
        track.style.transform =
          "translate3d(" + x.toFixed(2) + "px,0,0)";
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
