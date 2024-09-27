(function () {
  const header = document.getElementById("header");
  const hamburger = document.getElementById("hamburger");

  hamburger?.addEventListener("click", () => {
    if (!header) return;

    header.dataset.open = header.dataset.open === "true" ? "false" : "true";
  });
})();

(function () {
  document.querySelectorAll("[data-modal]").forEach(function (button) {
    button.addEventListener("click", function () {
      const id = button.getAttribute("data-modal");
      if (!id) return;

      document.querySelectorAll("dialog[open]").forEach(function (dialog) {
        dialog.close();
      });

      const modal = document.getElementById(id);
      if (!modal) return;

      modal.showModal();

      modal.addEventListener("click", function (event) {
        if (event.target === modal) {
          modal.close();
        }
      });
    });
  });
})();

(function () {
  const faq = document.getElementById("faq");

  if (!faq) return;

  const sections = faq?.querySelectorAll(".section");

  (function () {
    sections?.forEach((section, section_idx) => {
      section.addEventListener("click", () => {
        openFaqSection(section_idx);
      });

      const items = section.nextElementSibling?.querySelectorAll("ul > li");

      items?.forEach((item, item_idx) => {
        item.querySelector("button")?.addEventListener("click", () => {
          const section_text = section.nextElementSibling;
          if (!section_text) return;
          toggleFaqSectionItem(section_text, item_idx);
        });
      });
    });
  })();

  function openFaqSection(idx) {
    sections?.forEach((section, section_idx) => {
      if (section_idx === idx) {
        section.dataset.active = "true";
      } else {
        delete section.dataset.active;
      }
    });
  }

  function toggleFaqSectionItem(wrapper, idx) {
    const items = wrapper.querySelectorAll("ul > li");

    items?.forEach((item, item_idx) => {
      const wrapper = item.querySelector("div");
      const text = wrapper?.querySelector("div");
      if (!wrapper || !text) return;

      if (item_idx === idx && !item.dataset.active) {
        item.dataset.active = "true";
        wrapper.style.height = text.clientHeight + "px";
        wrapper.style.opacity = "1";
      } else {
        delete item.dataset.active;

        if (wrapper.style.height === "") {
          wrapper.style.height = text.clientHeight + "px";
        }

        setTimeout(() => {
          wrapper.style.height = "0";
          wrapper.style.opacity = "0";
        }, 0);
      }
    });
  }
})();

(function () {
  const MOBILE_WIDTH = 768;

  const menu = document.getElementById("side-menu");

  if (!menu) return;

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (window.innerWidth >= MOBILE_WIDTH) return;

      event.stopPropagation();

      if (menu.dataset.active != "true") {
        event.preventDefault();
        menu.dataset.active = "true";
      }
    });
  });

  document.addEventListener("click", () => {
    menu.dataset.active = "false";
  });
})();

(function () {
  const filter = document.getElementById("filter");

  if (!filter) return;

  const input = filter.querySelector("input[type='text']");

  input.addEventListener("input", function (event) {
    toggleElements(event.currentTarget.value);
  });

  function toggleElements(input) {
    filter.querySelectorAll("[data-value]").forEach(function (element) {
      const value = element.getAttribute("data-value");
      const display =
        !input || value.toLowerCase().includes(input.toLowerCase());

      element.style.display = display ? "block" : "none";
    });
  }
})();

(function () {
  document.querySelectorAll(".toggle-password").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const input = button.previousElementSibling;
      if (!input || input.tagName !== "INPUT") return;

      input.type = input.type === "password" ? "text" : "password";
    });
  });
})();

(function () {
  document.querySelectorAll(".close-notification").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const wrapper = e.target.closest("li");
      if (!wrapper) return;

      wrapper.style.maxHeight = wrapper.offsetHeight + "px";

      setTimeout(() => {
        wrapper.style.maxHeight = "0";
      }, 100);

      const formData = new FormData(form);
      const method = form.method || "GET";
      const action = form.action || window.location.href;

      const xhr = new XMLHttpRequest();
      xhr.open(method, action, true);

      xhr.setRequestHeader("Accept", "application/json");
      if (method.toUpperCase() !== "GET") {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      if (method.toUpperCase() === "GET") {
        const urlParams = new URLSearchParams(formData).toString();
        xhr.send(null);
        xhr.open(method, `${action}?${urlParams}`, true);
      } else {
        xhr.send(JSON.stringify(Object.fromEntries(formData.entries())));
      }
    });
  });
})();

(function () {
  const CONTENT_WIDTH = 1152;
  const PADDING = 16;
  const GAP = 24;

  const carousel = document.querySelector(".carousel");

  if (!carousel) return;

  const glide = new Glide(".carousel", {
    perView: 3,
    gap: GAP,
    bound: true,
    peek: getPeek(),
    breakpoints: {
      800: {
        perView: 1,
      },
      1110: {
        perView: 2,
      },
    },
    classes: {
      slider: "carousel-slider",
      swipeable: "carousel-swipeable",
      dragging: "carousel-dragging",
      cloneSlide: "carousel-slide--clone",
      activeNav: "carousel-bullet--active",
      activeSlide: "carousel-slide--active",
      disabledArrow: "carousel-arrow--disabled",
    },
  }).mount();

  glide.on("resize", function () {
    glide.update({
      peek: getPeek(),
    });
  });

  function getPeek() {
    return {
      before:
        window.innerWidth > CONTENT_WIDTH + PADDING * 2
          ? (window.innerWidth - CONTENT_WIDTH) / 2
          : PADDING,
      after:
        window.innerWidth > CONTENT_WIDTH + PADDING * 2 + GAP
          ? (window.innerWidth - CONTENT_WIDTH) / 2
          : PADDING + GAP,
    };
  }
})();
