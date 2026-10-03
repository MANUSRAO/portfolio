(function () {
  var form = document.querySelector("[data-mailto-form]");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var data = new FormData(form);
    var subject = String(data.get("subject") || "").trim();
    var message = String(data.get("message") || "").trim();

    var url =
      "mailto:" +
      (form.dataset.mailto || "") +
      "?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(message);

    window.location.href = url;
  });
})();
