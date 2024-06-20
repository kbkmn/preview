;(function () {
  document.querySelectorAll(".glide").forEach((slider) => {
    const perView = parseFloat(slider.dataset.perView) || 2.5
    const gap = parseInt(slider.dataset.gap) || 0

    new Glide(slider, {
      rewind: false,
      perView,
      gap,
      breakpoints: {
        768: {
          perView: 1,
          gap: 0,
        },
      },
      classes: {
        arrow: {
          disabled: "!fill-gray",
        },
        nav: {
          active: "!bg-blue",
        },
      },
    }).mount()
  })
})()
