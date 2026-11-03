document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  const opening = document.getElementById("letterOpening");
  const openButton = document.getElementById("openLetterButton");

  const replaceAllVisibleTextWithQuestion = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.tagName === "SCRIPT" || parent.tagName === "STYLE") {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes = [];
    let currentNode = walker.nextNode();
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = walker.nextNode();
    }

    nodes.forEach((node) => {
      const trimmed = node.textContent.trim();
      if (trimmed && trimmed !== "?") {
        node.textContent = "?";
      }
    });
  };

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (openButton && opening) {
    openButton.addEventListener("click", () => {
      opening.classList.add("opened");
      document.body.classList.add("page-opened");
    });
  }

  const tabButtons = document.querySelectorAll(".tab-button");
  const panels = document.querySelectorAll(".tab-panel");
  const loveHeartButton = document.querySelector(".love-heart-button");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.tab;

      tabButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-selected", String(isActive));
      });

      panels.forEach((panel) => {
        const isActive = panel.id === targetId;
        panel.classList.toggle("active", isActive);
        panel.hidden = !isActive;
      });
    });
  });

  if (loveHeartButton) {
    loveHeartButton.addEventListener("click", (event) => {
      event.preventDefault();
      loveHeartButton.classList.add("is-popped");
      setTimeout(() => loveHeartButton.classList.remove("is-popped"), 360);

      for (let i = 0; i < 12; i += 1) {
        const heart = document.createElement("span");
        heart.className = "floating-heart";
        heart.textContent = "?";

        const rect = loveHeartButton.getBoundingClientRect();
        heart.style.left = `${rect.left + rect.width / 2}px`;
        heart.style.top = `${rect.top + rect.height / 2}px`;
        heart.style.setProperty("--dx", `${(Math.random() - 0.5) * 170}px`);
        heart.style.setProperty("--dy", `${-40 - Math.random() * 120}px`);
        heart.style.setProperty("--rot", `${(Math.random() - 0.5) * 45}deg`);
        heart.style.fontSize = `${0.9 + Math.random() * 1.3}rem`;

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1200);
      }

      setTimeout(() => {
        window.location.href = loveHeartButton.getAttribute("href");
      }, 220);
    });
  }

  replaceAllVisibleTextWithQuestion();

  setTimeout(() => {
    if (opening) {
      opening.classList.add("opened");
    }
    document.body.classList.add("page-opened");
  }, 1800);
});
