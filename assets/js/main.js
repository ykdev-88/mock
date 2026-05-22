(() => {
  const body = document.body;
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const backdrop = document.querySelector(".mobile-nav-backdrop");

  if (!hamburger || !mobileNav) {
    return;
  }

  const focusableSelector = "a, button, input, select, textarea, [tabindex]:not([tabindex='-1'])";

  const setMenuState = (isOpen) => {
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
    mobileNav.classList.toggle("is-open", isOpen);
    backdrop?.classList.toggle("is-open", isOpen);
    body.classList.toggle("is-menu-open", isOpen);

    if (isOpen) {
      const firstFocusable = mobileNav.querySelector(focusableSelector);
      firstFocusable?.focus();
    }
  };

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  backdrop?.addEventListener("click", () => {
    setMenuState(false);
  });

  mobileNav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
      hamburger.focus();
    }
  });
})();

(() => {
  const tabs = document.querySelectorAll("[data-faq-tab]");
  const panels = document.querySelectorAll("[data-faq-panel]");

  if (!tabs.length || !panels.length) {
    return;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.faqTab;

      tabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });

      panels.forEach((panel) => {
        const isActive = panel.dataset.faqPanel === target;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    });
  });
})();

(() => {
  const form = document.querySelector("[data-contact-form]");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Contact form submitted", Object.fromEntries(new FormData(form)));
    alert("お問い合わせ内容を受け付けました。内容を確認のうえ、担当より折り返しご連絡いたします。");
    form.reset();
  });
})();
