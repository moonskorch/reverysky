(function () {
  const toggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".site-nav");

  if (!toggle || !navigation) return;

  const closeNavigation = () => {
    navigation.dataset.open = "false";
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = navigation.dataset.open === "true";
    navigation.dataset.open = String(!isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeNavigation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavigation();
      toggle.focus();
    }
  });

  window.matchMedia("(min-width: 801px)").addEventListener("change", closeNavigation);
})();

(function () {
  const copyButtons = document.querySelectorAll(".crypto-copy");

  if (!copyButtons.length) return;

  const fallbackCopy = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  };

  copyButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const address = button.dataset.copy;
      const originalLabel = button.textContent;

      if (!address) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(address);
        } else if (!fallbackCopy(address)) {
          throw new Error("Copy failed");
        }

        button.textContent = "Copied";
        window.setTimeout(() => {
          button.textContent = originalLabel;
        }, 1600);
      } catch {
        button.textContent = "Select address above";
        window.setTimeout(() => {
          button.textContent = originalLabel;
        }, 2200);
      }
    });
  });
})();
