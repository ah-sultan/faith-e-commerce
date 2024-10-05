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
    document.body.style.overflow = "unset";
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
      console.log("clicked");
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
    if (false) {
      // ADD "ACTIVE" CLASS TO THE POPUP AFTER 800 MILLISECONDS
      setTimeout(() => {
        countDownPopup.classList.add("active");
        handleOverlay(true);
      }, 2000);
    }
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
  const cartDrawer = document.getElementById("cartDrawer")
  const cartDrawerCloseButton = document.getElementById("cartDrawerCloseButton")
  const cartDrawerOpenButton = document.getElementById("cartDrawerOpenButton")

  cartDrawerOpenButton.addEventListener("click", () => {
    cartDrawer.classList.add("active")
    handleOverlay(true)
  const tl  = gsap.timeline()

    tl.from(cartDrawer.querySelector(".cart-drawer-header"), {
      y : 100,
      opacity : 0,
      duration : .4,
      ease: "power1.inOut",
    })
    tl.from(cartDrawer.querySelector(".cart-drawer-wrapper"), {
      y : 100,
      opacity : 0,
      duration : .4,
      ease: "power1.inOut",
    })
    tl.from(cartDrawer.querySelector(".cart-drawer-footer"), {
      y : 100,
      opacity : 0,
      duration : .4,
      ease: "power1.inOut",
    })

  })

  cartDrawerCloseButton.addEventListener("click", () => {
    cartDrawer.classList.remove("active")
    handleOverlay(false)
  })


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
    slidesPerView :1,
    pagination: {
      el : ".cart-drawer-suggest-products-pagination",
      clickable : true,
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

console.log(announcementBarDrawer.clientHeight);

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
if (document.body.clientWidth < 992) {
  const footerMenuWrapper = document.querySelectorAll(".footer-menu-wrapper");

  footerMenuWrapper.forEach((item) => {
    // Initially hide the menu list
    gsap.set(item.querySelector(".footer-menu-acc"), {
      overflow: "hidden",
      height: 0,
    });

    const header = item.querySelector(".footer-menu-heading");

    header.addEventListener("click", () => {
      const menuList = item.querySelector(".footer-menu-acc");

      if (header.classList.contains("active")) {
        // Collapse the menu
        gsap.to(menuList, {
          height: 0,
          duration: 0.3,
          ease: "power1.inOut", // Using GSAP easing
        });

        header.classList.remove("active");
      } else {
        // Expand the menu
        gsap.to(menuList, {
          height: "auto", // You might need to calculate the height dynamically if using auto
          duration: 0.3,
          ease: "power1.inOut", // Using GSAP easing
        });

        header.classList.add("active");
      }
    });
  });
}

// =================================================================================
// =================================================================================
// =================================================================================
// =================================================================================
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
