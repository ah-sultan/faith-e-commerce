// =====================
// MARQUE SLIDER SECTION START

const marqueSlider = document.querySelectorAll(".marquee-slider");

marqueSlider.forEach((slide) => {
  const slideDuration = slide.getAttribute("marquee-duration");
  slide.style.setProperty("--slide-speed", `${slideDuration}`);

  const slideItem = slide.firstElementChild.cloneNode(true);
  slide.appendChild(slideItem);
});

// =====================
// HERO SECTION START

const heroSwiper = new Swiper(".hero-swipper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
