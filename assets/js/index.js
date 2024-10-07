window.addEventListener("DOMContentLoaded", () => {
  
gsap.registerPlugin(ScrollTrigger);



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
// POPUP SECTION START

// OVERLAY
const handleOverlay = (show) => {
  const overlay = document.querySelector(".overlay");
  if (show) {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  } else {
    overlay.classList.remove("active");
    document.body.style.overflowY = "visible";
    document.body.style.overflowX = "hidden";
  }
};

// POPUP CLOSE
(function () {
  const popup = document.querySelectorAll(".popup");

  popup.forEach((item) => {
    const popUpButton = item.querySelector(".close-button");
    const popupClose = document.createElement("div");
    popupClose.classList.add("overlay-closer");
    item.firstElementChild.appendChild(popupClose);

    const handleClose = () => {
      item.classList.remove("active");
      handleOverlay(false);
    };

    popupClose.addEventListener("click", () => {
      handleClose();
    });

    popUpButton.addEventListener("click", () => {
      handleClose();
    });
  });
})();

// COUNT DOWN POPUP
(function () {
  // SELECT THE COUNTDOWN POPUP ELEMENT
  const countDownPopup = document.getElementById("countDownPopup");

  // WAIT UNTIL THE DOM CONTENT IS FULLY LOADED
  window.addEventListener("DOMContentLoaded", () => {
    // CHECK YOUR CONDITION HERE (CURRENTLY SET TO 'TRUE' AS A PLACEHOLDER)
    if (true) {
      // ADD "ACTIVE" CLASS TO THE POPUP AFTER 800 MILLISECONDS
      setTimeout(() => {
        countDownPopup.classList.add("active");
        handleOverlay(true);
      }, 2000);
    }
  });
})();

// =====================
// PRIMARY & SECONDARY BUTTON
(function () {
  const buttons = document.querySelectorAll(
    ".primary-button, .secondary-button"
  );

  buttons.forEach((item) => {
    const div = document.createElement("div");
    const span = document.createElement("span");

    // Clone all the child nodes of the button and append them to the new div
    item.childNodes.forEach((child) => {
      span.appendChild(child.cloneNode(true));
    });

    // Append the newly created div with the cloned children back into the button
    div.appendChild(span);
    item.appendChild(div);
  });
})();

// =====================
// SEARCH DRAWER

(function () {
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuCloseButton = document.getElementById("mobileMenuCloseBtn");
  const mobileMenuOpenButton = document.getElementById("mobileMenuOpenButton");

  // Set initial state of mobile menu off-screen
  gsap.set(mobileMenu, {
    xPercent: -110,
  });

  // Open Menu
  mobileMenuOpenButton.addEventListener("click", () => {
    handleOverlay(true);

    // GSAP Open Timeline
    const tl = gsap.timeline();

    tl.to(mobileMenu, {
      display: "block",
      delay: 0.2,
    });

    tl.to(mobileMenu, {
      xPercent: 0,
      duration: 0.3,
      ease: "power4.out",
    });

    tl.from(mobileMenu.querySelector(".header-mobile-menu"), {
      y: -100,
      duration: 0.5,
      opacity: 0,
      ease: "back.out(1.7)",
    });

    tl.fromTo(
      mobileMenu.querySelectorAll(".mobile-menu-list > li"),
      {
        xPercent: -100,
        opacity: 0,
      },
      {
        duration: 0.6,
        opacity: 1,
        xPercent: 0,
        stagger: 0.1,
        ease: "power4.out",
      }
    );

    tl.from(mobileMenu.querySelector(".mobile-menu-footer"), {
      y: 100,
      duration: 0.3,
      ease: "back.out(1.7)",
      opacity: 0,
    });
  });

  // Close Menu
  mobileMenuCloseButton.addEventListener("click", () => {
    // GSAP Close Timeline
    const tlClose = gsap.timeline({
      onComplete: () => {
        handleOverlay(false); // Optional: Handle overlay close
      },
    });

    // Slide the menu off-screen
    tlClose.to(mobileMenu, {
      xPercent: -110,
      duration: 0.7,
      ease: "power4.in",
    });

    // Hide the menu
    tlClose.set(mobileMenu, {
      display: "none",
    });
  });

  const mobileMenuItem = mobileMenu.querySelectorAll(".mobile-menu-items");
  const mobileSubMenu = document.getElementById("mobileSubmenu");

  mobileMenuItem.forEach((item) => {
    item.addEventListener("click", () => {
      const tl = gsap.timeline();

      tl.to("#mobileSubmenu", {
        display: "block",
      });

      tl.fromTo(
        "#mobileSubmenu",
        {
          xPercent: -110,
          opacity: 1,
        },
        {
          xPercent: 0,
          opacity: 1,
          duration: 0.7,
        }
      );
    });
  });

  mobileSubMenu
    .querySelector(".mobile-submenu-back-button")
    .addEventListener("click", () => {
      const tl = gsap.timeline();
      tl.to("#mobileSubmenu", {
        xPercent: -110,
        duration: 0.7,
      });
    });
})();

// =====================
// SEARCH DRAWER
(function () {
  const searchDrawer = document.getElementById("searchDrawer");
  const searchDrawerCloseBtn = document.getElementById("searchDrawerCloseBtn");

  // HANDLE SEARCH DRAWER OPEN
  const searchDrawerOpenButton = document.querySelectorAll(
    ".search-drawer-open-button"
  );

  searchDrawerOpenButton.forEach((item) => {
    item.addEventListener("click", () => {
      document.body.style.overflowY = "hidden";
      searchDrawer.classList.add("active");
      handleOverlay(true);
      const tl = gsap.timeline();

      tl.from(".search-drawer-panel", {
        yPercent: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      tl.from(".searched-products", {
        yPercent: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      tl.from(".suggested-products", {
        yPercent: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    });
  });

  // HANDLE SEARCH DRAWER CLOSE
  searchDrawerCloseBtn.addEventListener("click", () => {
    document.body.style.overflowY = "visible";
    searchDrawer.classList.remove("active");
    handleOverlay(false);
  });
})();

// =====================
// PRODUCT QUICK VIEW POPUP SECTION START
(function () {
  const productQuickOpenButtons = document.querySelectorAll(
    ".product-quickview-button"
  );
  const productQuickCloseButton = document.getElementById(
    "productQuickCloseButton"
  );
  const productQuickView = document.getElementById("productQuickView");

  // HANDLE OPEN QUICK VIEW
  productQuickOpenButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleOverlay(true);
      productQuickView.classList.add("active");
    });
  });

  // HANDLE CLOSE QUICK VIEW
  productQuickCloseButton.addEventListener("click", () => {
    handleOverlay(false);
    productQuickView.classList.remove("active");
  });
})();

// Initialize Swiper for product quick view thumbnails
const productQuickViewThumb = new Swiper(".product-quick-view-thumb-swiper", {
  spaceBetween: 12,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
  speed: 900,
});

// Initialize Swiper for product quick view details
const productQuickViewDetails = new Swiper(".product-quick-view-swiper", {
  spaceBetween: 10,
  slidesPerView: 1,
  centeredSlides: true,
  loop: true,
  speed: 900,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: productQuickViewThumb,
  },
});

// =====================
// CART DRAWER SECTION START
(function () {
  // HANDLE CART DRAWER VISIBILITY
  const cartDrawer = document.getElementById("cartDrawer");
  const cartDrawerCloseButton = document.getElementById(
    "cartDrawerCloseButton"
  );
  const cartDrawerOpenButton = document.getElementById("cartDrawerOpenButton");

  cartDrawerOpenButton.addEventListener("click", () => {
    cartDrawer.classList.add("active");
    handleOverlay(true);
    const tl = gsap.timeline();

    tl.from(cartDrawer.querySelector(".cart-drawer-header"), {
      y: 100,
      opacity: 0,
      duration: 0.4,
      ease: "power1.inOut",
    });
    tl.from(cartDrawer.querySelector(".cart-drawer-wrapper"), {
      y: 100,
      opacity: 0,
      duration: 0.4,
      ease: "power1.inOut",
    });
    tl.from(cartDrawer.querySelector(".cart-drawer-footer"), {
      y: 100,
      opacity: 0,
      duration: 0.4,
      ease: "power1.inOut",
    });
  });

  cartDrawerCloseButton.addEventListener("click", () => {
    cartDrawer.classList.remove("active");
    handleOverlay(false);
  });

  // RANG SLIDE
  const inputRange = document.getElementById("cart-drawer-deals-input-range");
  const rangeSlide = document.getElementById("cart-drawer-deals-range");
  rangeSlide.style.width = `${inputRange.value}%`;
  inputRange.addEventListener("input", () => {
    rangeSlide.style.width = `${inputRange.value}%`;
  });

  // CARD DRAWER DEALS
  const cardDrawerDeals = document.getElementById("cardDrawerDeals");

  gsap.set(cardDrawerDeals.querySelector(".cart-drawer-deals-rang-wrapper"), {
    height: 0,
    duration: 0.4,
    overflow: "hidden",
    opacity: 0,
  });

  if (cardDrawerDeals.classList.contains("active")) {
    gsap.set(cardDrawerDeals.querySelector(".cart-drawer-deals-rang-wrapper"), {
      height: "auto",
      duration: 0.4,
      opacity: 1,
    });
  }

  // CART DRAWER
  cardDrawerDeals.addEventListener("click", () => {
    if (cardDrawerDeals.classList.contains("active")) {
      gsap.to(
        cardDrawerDeals.querySelector(".cart-drawer-deals-rang-wrapper"),
        {
          height: 0,
          duration: 0.4,
          opacity: 1,
          ease: "power1.inOut",
        }
      );

      cardDrawerDeals.classList.remove("active");
    } else {
      cardDrawerDeals.classList.add("active");

      gsap.to(
        cardDrawerDeals.querySelector(".cart-drawer-deals-rang-wrapper"),
        {
          height: "auto",
          ease: "power1.inOut",
          duration: 0.4,
          opacity: 1,
        }
      );
    }
  });

  // CART DRAWER SUGGEST PRODUCTS SWIPER
  const swiperCart = new Swiper(".cart-drawer-suggest-products-wrapper", {
    loop: true,
    speed: 700,
    slidesPerView: 1,
    pagination: {
      el: ".cart-drawer-suggest-products-pagination",
      clickable: true,
    },
  });
})();

// =====================
// ANNOUNCEMENT BAR

const announcementBar = document.getElementById("announcement-bar");
const announcementBarToggler = document.getElementById(
  "announcement-bar-toggler"
);
const announcementBarDrawer = document.getElementById(
  "announcement-bar-drawer"
);

// Default Style for Announcement Bar Drawer
announcementBarDrawer.style.display = "none";
announcementBarDrawer.style.transform = "translateY(-100%)";


// Toggle Announcement Bar Drawer
announcementBarToggler.addEventListener("click", () => {
  if (announcementBarToggler.classList.contains("show")) {
    // Hide Announcement Bar Drawer
    announcementBarToggler.classList.remove("show");
    announcementBarDrawer.style.transform = "translateY(-100%)";
    setTimeout(() => {
      announcementBarDrawer.style.display = "none";
    }, 700);
  } else {
    // Show Announcement Bar Drawer
    announcementBarDrawer.style.display = "block";
    announcementBarToggler.classList.add("show");
    setTimeout(() => {
      announcementBarDrawer.style.transform = "translateY(0%)";
    }, 100);
  }
});

// Initialize Swiper for Announcement Bar
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
// PROMO SECTION
(function () {
  const button = document.getElementById("promoVideoPopupButton");
  const videoPopup = document.getElementById("videoPopup");

  button.addEventListener("click", () => {
    videoPopup.classList.add("active");
    handleOverlay(true);
  });

  // GSAP ANIMATION

  gsap.from(".promo-fade-up", {
    scrollTrigger: {
      trigger: ".promo-section",
      start: "top 90%",
    },
    opacity: 0,
    y: 50,
    duration: 2,
    ease: "power2.out",
    stagger: 0.2,
  });
})();

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
// CATEGORY SECTION START

gsap.fromTo(".category-section .category-list-top", 
  {
    xPercent: 50,
  }, 
  { 
    scrollTrigger: {
      trigger: ".category-section",
      start: "top 80%",
      end: "bottom 0%",
      scrub: 1, 
    },
    xPercent: -100,
    duration: 2.5, 
    ease: "power2.inOut"
  }
);

gsap.fromTo(".category-section .category-list-bottom", 
  { 
    xPercent: -100,
  }, 
  { 
    scrollTrigger: {
      trigger: ".category-section",
      start: "top 80%",
      end: "bottom 0%",
      scrub: 1, 
    },
    xPercent: 50,
    duration: 2.5, 
    ease: "power2.inOut"
  }
);

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

gsap.from(".trending-section .product-card", {
  scrollTrigger: {
    trigger: ".trending-section",
    start: "top 70%",
  },
  opacity: 0,
  y: 200,
  scale: 0.6,
  duration: 2,
  ease: "power2.out",
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
  speed: 2000,
  freeMode: true,
});

gsap.from(".countdown-product-swiper", {
  scrollTrigger: {
    trigger: ".countdown-product-section",
    start: "top 90%",
  },
  opacity: 0,
  xPercent: -100,
  scale: 0.6,
  duration: 2,
  ease: "power2.out",
});

// =====================
// HOT DEALS SECTION START
if(document.body.clientWidth > 1200){
  gsap.from(".hot-deals-section-wrapper", {
    scrollTrigger: {
      trigger: ".hot-deals-section",
      start: "top 90%",
    },
    opacity: 0,
    xPercent: 100,
    yPercent: 50,
    scale: 0.6,
    duration: 2,
    ease: "power2.out",
  });
}

// BUNDLE PRODUCT SECTION START
// =====================

const bundleProductAcc = document.querySelectorAll(".bundle-product-acc");

bundleProductAcc.forEach((item, index) => {
  // CREATE ACC BUTTON
  const button = document.createElement("button");
  const bundleProductButtonWrapper = document.getElementById(
    "bundleProductButtonWrapper"
  );
  bundleProductButtonWrapper.appendChild(button);
  button.classList.add("bundle-toggler-button");
  button.innerHTML = `<svg class="plus-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256"><path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path></svg><svg class="minus-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256"><path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z"></path></svg>`;

  const accHeader = item.querySelector(".bundle-product-header-wrapper");
  const accBody = item.querySelector(".bundle-product-body-wrapper");

  const accHeaderHeight = accHeader.firstElementChild.clientHeight;
  const accBodyHeight = accBody.firstElementChild.clientHeight;

  // STYLE ACC HEADER
  accHeader.style.transition = ".4s ease-in-out all";
  accHeader.style.overflow = "hidden";
  accHeader.style.height = `${accHeaderHeight + 2}px`;
  item.style.height = "fit-content";
  item.style.overflow = "hidden";

  // STYLE ACC BODY
  accBody.style.transition = ".4s ease-in-out all";
  accBody.style.overflow = "hidden";
  accBody.style.height = `0px`;

  // HANDLE ACTION
  button.addEventListener("click", () => {
    if (button.classList.contains("active")) {
      // IS  ACTIVE ACC ITEM
      accBody.style.height = `0`;
      button.classList.remove("active");
      item.classList.remove("active");
      setTimeout(() => {
        accHeader.style.height = `${accHeaderHeight + 4}px`;
      }, 300);
    } else {
      // IS NOT ACTIVE ACC ITEM
      accHeader.style.height = 0;
      button.classList.add("active");
      item.classList.add("active");
      handleAutoScroll();

      setTimeout(() => {
        accBody.style.height = `${accBodyHeight + 4}px`;
      }, 300);
    }
  });

  // DEFAULT ACTIVE
  if (item.classList.contains("active")) {
    accHeader.style.height = 0;

    button.classList.add("active");
    setTimeout(() => {
      accBody.style.height = `${accBodyHeight + 4}px`;
    }, 300);
  }

  /* 
  THIS FUNCTION WILL CONTROL IF WINDOW WIDTH < 1200PX THEN WINDOW 
  WILL SCROLL TO TARGETED PRODUCT
  */
  const handleAutoScroll = () => {
    if (document.body.clientWidth < 1200) {
      const targetPosition = item.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      const startTime = Date.now();

      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const progress = elapsedTime / duration;

        if (progress >= 1) {
          clearInterval(interval);
          window.scrollTo(0, targetPosition);
        } else {
          const easeInOut =
            progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          window.scrollTo(0, startPosition + easeInOut * distance);
        }
      }, 16);
    }
  };
});

// =====================
// FEATURES SECTION START
gsap.from(".features-section .features-card", {
  scrollTrigger: {
    trigger: ".features-section",
    start: "top 90%",
  },
  opacity: 0,
  xPercent: -50,

  duration: 1,
  ease: "power2.out",
});

// =====================
// BEFORE AFTER SECTION
(function () {
  const cmpImgWrapper = document.getElementById("comparison-image-wrapper");
  const cmpSliderBtn = document.getElementById("comparison-slider-button");
  const cmpRange = document.getElementById("comparison-range-slider");
  const imgWidth = cmpRange.value;
  cmpSliderBtn.style.left = `calc(${imgWidth}% - ${
    cmpSliderBtn.clientWidth / 2
  }px)`;
  cmpImgWrapper.style.width = `${imgWidth}%`;

  cmpRange.addEventListener("input", () => {
    const imgWidth = cmpRange.value;
    cmpSliderBtn.style.left = `calc(${imgWidth}% - ${
      cmpSliderBtn.clientWidth / 2
    }px)`;
    cmpImgWrapper.style.width = `${imgWidth}%`;
  });
})();

// =====================
// PRODUCT DETAILS

const productDetailsThumb = new Swiper(".product-details-thumb-swiper", {
  spaceBetween: 12,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
  speed: 900,
  slidesPerView: 4,
  breakpoints: {
    1200: {
      slidesPerView: 5,
    },
  },
});

const productDetail = new Swiper(".product-details-swiper", {
  spaceBetween: 10,
  slidesPerView: 1.3,
  centeredSlides: true,
  loop: true,
  speed: 900,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: productDetailsThumb,
  },

  breakpoints: {
    992: {
      slidesPerView: 1,
    },
    1400: {
      slidesPerView: 1.3,
    },
  },
});

// =====================
// RECENT ADDED SECTION START
const recentAddedSwiper = document.querySelectorAll(".recent-added-swiper");

recentAddedSwiper.forEach((item, index) => {
  const swiper = new Swiper(item, {
    direction: "horizontal",
    speed: 5000,
    autoplay: {
      delay: 5,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      reverseDirection: index === 0,
    },
    loop: true,
    slidesPerView: "auto",
    watchSlidesProgress: true,
    spaceBetween: 24,
    grabCursor: true,

    breakpoints: {
      1200: {
        direction: "vertical",
      },
    },
  });
});

//
gsap.from(".recent-added-card-wrapper ", {
  scrollTrigger: {
    trigger: ".recent-added-section",
    start: "top 70%",
  },
  opacity: 0,
  xPercent: 50,
  scale: 0.6,
  duration: 2,
  ease: "power2.out",
});

// =====================
// STYLISH SECTION START

const stylishProducts = new Swiper(".stylish-product-swiper", {
  spaceBetween: 10,
  slidesPerView: "auto",
  slidePerGroup: 1,
  centeredSlides: true,
  loop: true,
  speed: 900,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  initialSlide: 2,
  freeMode: true,
  autoHeight: true,
});

/* CLONE STYLISH PRODUCT WRAPPER AND 
APPEND IT ON STYLISH PRODUCT CARD ELEMENT */
const stylishProductCard = document.querySelectorAll(".stylish-product-card");

stylishProductCard.forEach((item) => {
  const productWrapper = item?.firstElementChild?.cloneNode(true);
  item.appendChild(productWrapper);
});

// =====================
// STYLISH SECTION START

const testimonialCard = new Swiper(".testimonial-swiper", {
  spaceBetween: 20,
  slidesPerView: "auto",
  initialSlide: 1,
  centeredSlides: true,
  loop: true,
  speed: 900,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    992: {
      spaceBetween: 48,
    },
  },
});

// =====================
// FOOTER SECTION  START

// CHECK IF THE VIEWPORT WIDTH IS LESS THAN 992 PIXELS
if (document.body.clientWidth < 992) {
  const footerMenuWrappers = document.querySelectorAll(".footer-menu-wrapper");

  footerMenuWrappers.forEach((item) => {
    // GET THE HEIGHT OF THE HEADER AND THE MENU LIST
    const headerHeight = item.querySelector(".footer-menu-heading").clientHeight;
    const menuListHeight = item.querySelector(".footer-menu-acc").clientHeight;

    // SET INITIAL STYLES FOR THE MENU
    item.style.overflow = "hidden";
    item.style.height = `${headerHeight + 4}px`; 
    item.style.transition = "all ease-in-out .4s"; 

  
    item.addEventListener("click", () => {
  
      if (item.classList.contains("active")) {
      
        item.style.height = `${headerHeight + 4}px`; 
        item.classList.remove("active");


      } else {
        // EXPAND THE MENU
        item.style.height = `${menuListHeight + headerHeight + 40}px`; // EXPANDED HEIGHT
        item.classList.add("active");
      }
    });
  });
}


// ========================
// PRODUCT SECTION START
const productController = document.querySelectorAll(
  ".product-quantity-controller"
);

productController.forEach((controller) => {
  let count = 1;
  const decreaseButton = controller.querySelector(".decrease-quantity");
  const increaseButton = controller.querySelector(".increase-quantity");
  const productQuantity = controller.querySelector(".product-quantity"); // Assuming this is an input element

  // Set the initial quantity
  productQuantity.value = count;

  // HANDLE INCREASE
  increaseButton.addEventListener("click", () => {
    count++;
    productQuantity.value = count;
  });

  // HANDLE DECREASE
  decreaseButton.addEventListener("click", () => {
    if (count > 1) {
      count--;
      productQuantity.value = count;
    }
  });
});

// ========================
// SCROLL TO TOP BY GSAP
const scrollToTopButton = document.getElementById("scrollToTop");

// Show button when scrolled down
window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollToTopButton.classList.add("active");
  } else {
    scrollToTopButton.classList.remove("active");
  }
});

// Scroll to top animation
scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========================
// SCROLL TO TOP BY GSAP

const countDown = document.querySelectorAll(".count-down");

countDown.forEach((item) => {
  const targetDate = item.getAttribute("data-target-count");
  const countDownDate = new Date(targetDate).getTime();

  // COUNT DOWN EL
  const daysEl = item.querySelector(".count-down-day");
  const hrsEl = item.querySelector(".count-down-hrs");
  const minsEl = item.querySelector(".count-down-mins");
  const secsEl = item.querySelector(".count-down-secs");
  const exMessage = item.querySelectorAll("expired");

  const countInterval = setInterval(() => {
    const currentDate = new Date().getTime();
    const distance = countDownDate - currentDate;

    // TIME CALCULATIONS
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hrs = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    // INSERT DATE ON DOM
    if (distance < 0) {
      daysEl.innerText = "00";
      hrsEl.innerText = "00";
      minsEl.innerText = "00";
      secsEl.innerText = "00";
    } else {
      daysEl.innerText = days;
      hrsEl.innerText = hrs;
      minsEl.innerText = mins;
      secsEl.innerText = secs;
    }

    if (distance < 0) {
      clearCount();
    }
  }, 1000);

  // CLEAR INTERVAL
  const clearCount = () => {
    clearInterval(countInterval);
  };
});



// =====================
/// GSAP ANIMATION


// FADE UP ANIMATION
const fadeUp = document.querySelectorAll(".fade-up");
fadeUp.forEach((item) => {
  gsap.fromTo(
    item,
    { // Starting values
      opacity: 0,
      y: 100,
    },
    { // Ending values
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
      },
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power2.out",
    }
  );
});


// FADE DOWN ANIMATION
const fadeDown = document.querySelectorAll(".fade-down"); 
fadeDown.forEach((item) => {
  gsap.fromTo(
    item,
    { 
      opacity: 0,
      y: -100,
    },
    { 
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
      },
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power2.out",
    }
  );
});

const scrabLeftElements = document.querySelectorAll(".scrabLeft");
const scrabRightElements = document.querySelectorAll(".scrabRight");

scrabLeftElements.forEach((item) => {
  gsap.from(item, {
    xPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: item,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});

scrabRightElements.forEach((item) => {
  gsap.from(item, {
    xPercent: 30,
    ease: "none",
    scrollTrigger: {
      trigger: item,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});

// IMAGE ANIMATIONS
const imageAnimation = document.querySelectorAll(".image-animation");
imageAnimation.forEach((item) => {
  // ITEM STYLING
  item.style.position = "relative";
  item.style.overflow = "hidden";

  // OVERLAY CREATION AND STYLING
  const overlay = document.createElement("div");
  item.appendChild(overlay);
  gsap.set(overlay, {
    position: "absolute",
    inset: 0,
    background: "transparent",
    borderWidth: "400px",
    borderColor: "var(--color-background)",
    borderStyle: "solid",
    zIndex: 9999,
  });

  // TIMELINE ANIMATION FOR BORDER SHRINKING
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top 70%",
    },
  });

  // ANIMATE BORDER WIDTH SHRINKING
  tl.to(overlay, {
    borderWidth: 0,
    duration: 1.5,
    ease: "power2.out",
  });

  // MAKE OVERLAY INVISIBLE AFTER BORDER ANIMATION
  tl.to(overlay, {
    visibility: "hidden",
  });
});
})