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

// =====================
// HERO SECTION START
