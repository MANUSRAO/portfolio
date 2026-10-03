(function () {
  var el = document.querySelector("[data-clock]");
  if (!el) return;

  var format = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
    hour12: true,
  });

  function tick() {
    el.textContent = format.format(new Date()) + " IST";
  }

  tick();
  window.setInterval(tick, 20000);
})();
