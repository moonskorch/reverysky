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
