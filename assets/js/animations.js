(function () {
  if (typeof window === "undefined") return;

  var prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onReady() {
    if (prefersReduced) {
      document.documentElement.classList.add("reduced-motion");
      document.body.classList.add("page-loaded");
      // Immediately activate reveals
      document.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("active");
      });
      return;
    }

    requestAnimationFrame(function () {
      document.body.classList.add("page-loaded");
    });

    var hero = document.querySelector(".hero__content");
    if (hero) {
      var items = hero.querySelectorAll(
        "h1, h5, .hero__btn, .hero__img, .hero__eclipse-img1, .hero__eclipse-img2, .hero__eclipse-img3"
      );
      items.forEach(function (it, i) {
        it.style.transitionDelay = i * 60 + "ms";
        it.classList.add("reveal", "active");
        setTimeout(function () {
          it.style.transitionDelay = "";
        }, 800);
      });
    }

    var observerOptions = {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.08,
    };
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal").forEach(function (el) {
      // ensure initial state
      el.classList.remove("active");
      observer.observe(el);
    });
  }

  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    onReady();
  } else {
    document.addEventListener("DOMContentLoaded", onReady);
  }
})();
