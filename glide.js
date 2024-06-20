;(function () {
  document.querySelectorAll(".glide").forEach((slider) => {
    const gap = parseInt(slider.dataset.gap) || 0

    new Glide(slider, {
      rewind: false,
      perView: 2.5,
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
