document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  const opening = document.getElementById("letterOpening");
  const openButton = document.getElementById("openLetterButton");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (openButton && opening) {
    openButton.addEventListener("click", () => {
      opening.classList.add("opened");
      document.body.classList.add("page-opened");
    });
  }

  setTimeout(() => {
    if (opening) {
      opening.classList.add("opened");
    }
    document.body.classList.add("page-opened");
  }, 1800);
});
