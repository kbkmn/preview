const CONTENT_WIDTH = 1152;
const PADDING = 16;
const GAP = 24;
const PEEK = 16;

(function () {
  document.querySelectorAll("[data-modal]").forEach(function (button) {
    button.addEventListener("click", function () {
      const id = button.getAttribute("data-modal");
      if (!id) return;

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
