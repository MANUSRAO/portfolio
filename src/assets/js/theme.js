(function () {
  var root = document.documentElement;
  var toggles = document.querySelectorAll("[data-theme-toggle]");

  function isDark() {
    return root.classList.contains("dark");
  }

  function apply(dark) {
    root.classList.toggle("dark", dark);
    toggles.forEach(function (button) {
      button.setAttribute("aria-pressed", String(dark));
      button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    });
  }

  toggles.forEach(function (button) {
    button.addEventListener("click", function () {
      var dark = !isDark();
      try {
        localStorage.setItem("theme", dark ? "dark" : "light");
      } catch (error) {}
      apply(dark);
    });
  });

  apply(isDark());
})();
