(function () {
  var header = document.querySelector("[data-header]");

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.setAttribute("data-scrolled", "");
    } else {
      header.removeAttribute("data-scrolled");
    }
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
