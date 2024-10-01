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
// ANNOUNCE BAR

const announcementBar = document.getElementById("announcement-bar");
const announcementBarToggler = document.getElementById(
  "announcement-bar-toggler"
);
const announcementBarDrawer = document.getElementById(
  "announcement-bar-drawer"
);

// Default Style announcement Bar Drawer
announcementBarDrawer.style.display = "none";
announcementBarDrawer.style.transform = "translateY(-100%)";

console.log(announcementBarDrawer.clientHeight);

announcementBarToggler.addEventListener("click", () => {
  if (announcementBarToggler.classList.contains("show")) {
    announcementBarToggler.classList.remove("show");
    announcementBarDrawer.style.transform = "translateY(-100%)";
    setTimeout(() => {
      announcementBarDrawer.style.display = "none";
    }, 700);
  } else {
    announcementBarDrawer.style.display = "block";
    announcementBarToggler.classList.add("show");
    setTimeout(() => {
      announcementBarDrawer.style.transform = "translateY(0%)";
    }, 100);
  }
});

const announceBarSwiper = new Swiper(".announce-bar-swipper", {
  loop: true,

  speed: 700,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    992: {
      direction: "vertical",
    },
  },
});

// =====================
// HEADER SECTION START

(function () {
  const header = document.getElementById("header");
  let lastScrollY = 0;
  window.addEventListener("scroll", () => {
    let currentScrollY = window.pageYOffset;

    if (window.pageYOffset > 40) {
      if (currentScrollY < lastScrollY) {
        header.classList.add("sticky-header");
      } else {
        header.classList.remove("sticky-header");
      }
    } else {
      header.classList.remove("sticky-header");
    }

    lastScrollY = currentScrollY;
  });
})();

// =====================
// SLIDE SHOW SECTION SECTION START

const slideshowSwiper = new Swiper(".slideshow-swipper", {
  loop: true,

  speed: 700,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// =====================
// TABS SECTION START

document.querySelectorAll(".tabs-wrapper").forEach((wrapper) => {
  const buttons = wrapper.querySelectorAll(".tabs-button");
  const items = wrapper.querySelectorAll(".tabs-item");

  // CHECK FOR BUTTON HAS ACTIVE CLASS BY DEFAULT
  const activeButton = Array.from(buttons).find((button) =>
    button.classList.contains("active")
  );

  if (activeButton) {
    const tabId = activeButton.getAttribute("data-tab-item");
    wrapper.querySelector(`.${tabId}`).classList.add("active");
  } else {
    // IF ANY BUTTON NOT ACTIVE FIRST BUTTON WILL ACTIVE
    if (buttons.length > 0) {
      buttons[0].classList.add("active");
      items[0].classList.add("active");
    }
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // REMOVE ACTIVE CLASS FROM ALL BUTTON
      buttons.forEach((btn) => btn.classList.remove("active"));
      items.forEach((item) => item.classList.remove("active"));

      // ADD ACTIVE CLASS TO CLICKED BUTTON
      button.classList.add("active");
      const tabId = button.getAttribute("data-tab-item");
      wrapper.querySelector(`.${tabId}`).classList.add("active");
    });
  });
});

// =====================
// TRENDING SECTION START

const trendingSwiper = new Swiper(".trending-swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 24,
  speed: 700,
  navigation: {
    nextEl: ".trending-sl-next",
    prevEl: ".trending-sl-prev",
  },

  breakpoints: {
    575: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 24,
    },

    1200: {
      slidesPerView: 3.2,
      spaceBetween: 24,
    },

    1400: {
      slidesPerView: 3.8,
      spaceBetween: 24,
    },

    1600: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

// =====================
// COLLAGE SECTION START

const collageVideo = document.querySelectorAll(".collage-gallery-video");

collageVideo.forEach((item) => {
  const button = item.querySelector(".collage-gallery-video-control");
  const videoPlayer = item.querySelector(".collage-gallery-video-player");

  button.addEventListener("click", function () {
    if (videoPlayer.paused) {
      videoPlayer.play();
      button.classList.remove("play");
      button.classList.add("pause");
    } else {
      videoPlayer.pause();
      button.classList.remove("pause");
      button.classList.add("play");
    }
  });
});

// =====================
// COUNTDOWN SECTION START

const countdownSection = new Swiper(".countdown-swiper", {
  loop: true,
  direction: "vertical",

  speed: 700,
  crossFade: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// =====================
// COUNTDOWN PRODUCT SECTION START

const countdownProductSection = new Swiper(".countdown-product-swiper", {
  slidesPerView: "auto",
  spaceBetween: 24,
  speed: 1200,
  mousewheel: true,
  eventsTarget : ".countdown-product-section",
  invert : true,
});
