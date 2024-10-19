window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // =====================
  /// GSAP ANIMATION

  // FADE UP ANIMATION
  const fadeUp = document.querySelectorAll("section, footer");

  fadeUp.forEach((item) => {
    const fadeUpElements = item.querySelectorAll(".fade-up");

    // Ensure fade-up elements exist and are a NodeList
    if (fadeUpElements.length > 0) {
      fadeUpElements.forEach((fadeUpElement, index) => {
        gsap.fromTo(
          fadeUpElement,
          {
            opacity: 0,
            y: 100,
            scale: 0.8, // Add a slight scaling effect
          },
          {
            // Ending values
            opacity: 1,
            y: 0,
            scale: 1, // Return to normal scale
            duration: 1.5, // Shorter duration for quicker animations
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top center",
              toggleActions: "play none none none", // Ensures the animation runs on scroll
            },
          }
        );

        // Optional: Staggering effect for each element
        gsap.to(fadeUpElement, {
          delay: index * 0.1, // Delay each element's animation
        });
      });
    }
  });

  // IMAGE ANIMATIONS
  const imageAnimation = document.querySelectorAll(".image-animation");
  imageAnimation.forEach((item) => {
    // ITEM STYLING
    item.style.position = "relative";
    item.style.overflow = "hidden";

    // OVERLAY CREATION AND STYLING
    const overlay = document.createElement("div");
    overlay.classList.add("image-animation-overlay");
    item.appendChild(overlay);
    gsap.set(overlay, {
      position: "absolute",
      inset: 0,
      background: "transparent",
      borderWidth: "400px",
      borderColor: "var(--color-background)",
      borderStyle: "solid",
      zIndex: 999,
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
    tl.set(overlay, {
      visibility: "hidden",
      onComplete: () => {
        overlay.style.display = "none";
      },
    });
  });

  // =====================
  // POPUP SECTION START

  // Function to handle the overlay visibility
  const handleOverlay = ({ show = false, action = () => {} }) => {
    const overlay = document.querySelector(".overlay");

    // HANDLE CLOSE OVERLAY
    const handleClose = () => {
      overlay.classList.remove("active");
      overlay.style.zIndex = "var(--overlay-z-index)";
      document.body.style.overflowY = "visible";
      document.body.style.overflowX = "hidden";
      action();
    };

    // HANDLE OPEN
    const handleOpen = () => {
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    // CONDITION
    if (show) {
      handleOpen();
    } else {
      handleClose();
    }

    overlay.addEventListener("click", () => {
      if (show) {
        handleClose();
      }
    });
  };

  // =====================
  // POPUP CLOSE SECTION

  (function () {
    const popups = document.querySelectorAll(".popup");

    popups.forEach((popup) => {
      // Get the close button and create an additional overlay close element
      const closeButton = popup.querySelector(".close-button");
      const popupClose = document.createElement("div");
      popupClose.classList.add("overlay-closer");

      // Append the overlay closer to the popup's first child element
      popup.firstElementChild.appendChild(popupClose);

      // Function to handle closing of the popup and overlay
      const handleClose = () => {
        popup.classList.remove("active");
        handleOverlay({ show: false });
      };

      // Attach event listeners for closing the popup
      popupClose.addEventListener("click", handleClose);
      closeButton.addEventListener("click", handleClose);
    });
  })();

  // =====================
  // COUNTDOWN POPUP SECTION

  (function () {
    const countDownPopup = document.getElementById("countDownPopup");
    const overlay = document.querySelector(".overlay");
    if (true) {
      setTimeout(() => {
        overlay.style.zIndex = "999999";
        countDownPopup.classList.add("active");
        handleOverlay({ show: true });
      }, 2000);
    }
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

      item.childNodes.forEach((child) => {
        span.appendChild(child.cloneNode(true));
      });

      div.appendChild(span);
      item.appendChild(div);
    });
  })();

  // =====================
  // MOBILE MENU SECTION START
  (function () {
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuCloseButton = document.getElementById("mobileMenuCloseBtn");
    const mobileMenuOpenButton = document.getElementById(
      "mobileMenuOpenButton"
    );
    const mobileMenuItems = mobileMenu.querySelectorAll(".mobile-menu-items");
    const mobileSubMenu = document.getElementById("mobileSubmenu");

    // Set initial state of the mobile menu off-screen
    gsap.set(mobileMenu, { xPercent: -110 });

    // Open Menu Function
    function openMobileMenu() {
      handleOverlay({ show: true });

      // GSAP Open Timeline
      const tl = gsap.timeline();
      tl.to(mobileMenu, {
        display: "block",
        delay: 0.2,
      })
        .to(mobileMenu, {
          xPercent: 0,
          duration: 0.3,
          ease: "power4.out",
        })
        .from(mobileMenu.querySelector(".header-mobile-menu"), {
          y: -100,
          duration: 0.5,
          opacity: 0,
          ease: "back.out(1.7)",
        })
        .fromTo(
          mobileMenu.querySelectorAll(".mobile-menu-list > li"),
          { xPercent: -100, opacity: 0 },
          {
            duration: 0.6,
            opacity: 1,
            xPercent: 0,
            stagger: 0.1,
            ease: "power4.out",
          }
        )
        .from(mobileMenu.querySelector(".mobile-menu-footer"), {
          y: 100,
          duration: 0.3,
          ease: "back.out(1.7)",
          opacity: 0,
        });
    }

    // Close Menu Function
    function closeMobileMenu() {
      // GSAP Close Timeline
      const tlClose = gsap.timeline({
        onComplete: () => handleOverlay({ show: false }), // Optional: Handle overlay close
      });

      // Slide the menu off-screen
      tlClose
        .to(mobileMenu, {
          xPercent: -110,
          duration: 0.7,
          ease: "power4.in",
        })
        .set(mobileMenu, {
          display: "none",
        });
    }

    // Handle Menu Item Clicks
    function handleMenuItemClick(item) {
      item.addEventListener("click", () => {
        const tl = gsap.timeline();
        tl.to(mobileSubMenu, {
          display: "block",
        }).fromTo(
          mobileSubMenu,
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
    }

    // Handle Back Button Click on Submenu
    function handleSubMenuBackButton() {
      mobileSubMenu
        .querySelector(".mobile-submenu-back-button")
        .addEventListener("click", () => {
          const tl = gsap.timeline();
          tl.to(mobileSubMenu, {
            xPercent: -110,
            duration: 0.7,
          });
        });
    }

    // Event Listeners
    mobileMenuOpenButton.addEventListener("click", openMobileMenu);
    mobileMenuCloseButton.addEventListener("click", closeMobileMenu);
    mobileMenuItems.forEach(handleMenuItemClick);
    handleSubMenuBackButton();
  })();

  // =====================
  // SEARCH DRAWER
  (function () {
    const searchDrawer = document.getElementById("searchDrawer");
    const searchDrawerCloseBtn = document.getElementById(
      "searchDrawerCloseBtn"
    );
    const searchDrawerOpenButtons = document.querySelectorAll(
      ".search-drawer-open-button"
    );

    // Open Search Drawer Function
    function openSearchDrawer() {
      document.body.style.overflowY = "hidden";
      searchDrawer.classList.add("active");
      handleOverlay({ show: false });

      const tl = gsap.timeline();
      tl.from(".search-drawer-panel", {
        yPercent: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })
        .from(".searched-products", {
          yPercent: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        })
        .from(".suggested-products", {
          yPercent: -50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
    }

    // Close Search Drawer Function
    function closeSearchDrawer() {
      document.body.style.overflowY = "visible";
      searchDrawer.classList.remove("active");
      handleOverlay({ show: false });
    }

    // Event Listeners for Opening Search Drawer
    searchDrawerOpenButtons.forEach((button) => {
      button.addEventListener("click", openSearchDrawer);
    });

    // Event Listener for Closing Search Drawer
    searchDrawerCloseBtn.addEventListener("click", closeSearchDrawer);
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

    // Function to open the quick view
    function openQuickView() {
      handleOverlay({ show: false });
      productQuickView.classList.add("active");
    }

    // Function to close the quick view
    function closeQuickView() {
      handleOverlay({ show: false });
      productQuickView.classList.remove("active");
    }

    // Attach event listeners to open quick view buttons
    productQuickOpenButtons.forEach((button) => {
      button.addEventListener("click", openQuickView);
    });

    // Attach event listener to close quick view button
    productQuickCloseButton.addEventListener("click", closeQuickView);
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
    const cartDrawer = document.getElementById("cartDrawer");
    const cartDrawerCloseButton = document.getElementById(
      "cartDrawerCloseButton"
    );
    const cartDrawerOpenButton = document.getElementById(
      "cartDrawerOpenButton"
    );
    const inputRange = document.getElementById("cart-drawer-deals-input-range");
    const rangeSlide = document.getElementById("cart-drawer-deals-range");
    const cardDrawerDeals = document.getElementById("cardDrawerDeals");

    // Function to open the cart drawer
    function openCartDrawer() {
      cartDrawer.classList.add("active");
      handleOverlay({ show: true, action: closeCartDrawer });

      const tl = gsap.timeline();
      tl.from(cartDrawer.querySelector(".cart-drawer-header"), {
        y: 100,
        opacity: 0,
        duration: 0.4,
        ease: "power1.inOut",
      })
        .from(cartDrawer.querySelector(".cart-drawer-wrapper"), {
          y: 100,
          opacity: 0,
          duration: 0.4,
          ease: "power1.inOut",
        })
        .from(cartDrawer.querySelector(".cart-drawer-footer"), {
          y: 100,
          opacity: 0,
          duration: 0.4,
          ease: "power1.inOut",
        });
    }

    // Function to close the cart drawer
    function closeCartDrawer() {
      cartDrawer.classList.remove("active");
      handleOverlay({ show: false });
    }

    // Function to update range slide width
    function updateRangeSlide() {
      rangeSlide.style.width = `${inputRange.value}%`;
    }

    // Function to toggle card drawer deals
    function toggleCardDrawerDeals() {
      const dealsWrapper = cardDrawerDeals.querySelector(
        ".cart-drawer-deals-rang-wrapper"
      );

      if (cardDrawerDeals.classList.contains("active")) {
        gsap.to(dealsWrapper, {
          height: 0,
          duration: 0.4,
          opacity: 1,
          ease: "power1.inOut",
          overflow: "hidden",
        });
        cardDrawerDeals.classList.remove("active");
      } else {
        cardDrawerDeals.classList.add("active");
        gsap.to(dealsWrapper, {
          height: "auto",
          duration: 0.4,
          opacity: 1,
          ease: "power1.inOut",
        });
      }
    }

    // Initialize the cart drawer deals range
    gsap.set(cardDrawerDeals.querySelector(".cart-drawer-deals-rang-wrapper"), {
      height: 0,
      opacity: 0,
    });

    if (cardDrawerDeals.classList.contains("active")) {
      gsap.set(
        cardDrawerDeals.querySelector(".cart-drawer-deals-rang-wrapper"),
        {
          height: "auto",
          opacity: 1,
        }
      );
    }

    // Event Listeners
    cartDrawerOpenButton.addEventListener("click", openCartDrawer);
    cartDrawerCloseButton.addEventListener("click", closeCartDrawer);
    inputRange.addEventListener("input", updateRangeSlide);
    cardDrawerDeals.addEventListener("click", toggleCardDrawerDeals);

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
  // =====================

  (function () {
    const ancBarDrawer = document.getElementById("announcement-bar-drawer");
    const ancBarDrawerToggle = document.getElementById(
      "announcement-bar-toggler"
    );

    // DEFAULT STYLE ON DRAWER
    ancBarDrawer.style.display = "none";
    ancBarDrawer.style.transform = "translateY(-110%)";

    // HANDLE CLOSE DRAWER
    const handleCloseDrawer = () => {
      ancBarDrawer.classList.remove("active");
      ancBarDrawer.style.transform = "translateY(-110%)";
      ancBarDrawerToggle.classList.remove("show");

      setTimeout(() => {
        handleOverlay({ show: false });
        ancBarDrawer.style.display = "none";
      }, 100);
    };

    // HANDLE OPEN  DRAWER
    const handleOpenDrawer = () => {
      ancBarDrawer.style.display = "block";
      setTimeout(() => {
        handleOverlay({ show: true, action: handleCloseDrawer });
        ancBarDrawer.style.transform = "translateY(0)";
        ancBarDrawer.classList.add("active");
        ancBarDrawerToggle.classList.add("show");
      }, 100);
    };

    // HANDLE ACTIONS
    ancBarDrawerToggle.addEventListener("click", () => {
      if (ancBarDrawerToggle.classList.contains("show")) {
        handleCloseDrawer();
      } else {
        handleOpenDrawer();
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
  })();

  // =====================
  // HEADER SECTION START
  (function () {
    const header = document.getElementById("header");
    let lastScrollY = 0;

    // Function to handle header sticky behavior on scroll
    function handleScroll() {
      const currentScrollY = window.pageYOffset;

      if (currentScrollY > 40) {
        // Toggle sticky header based on scroll direction
        if (currentScrollY < lastScrollY) {
          header.classList.add("sticky-header");
        } else {
          header.classList.remove("sticky-header");
        }
      } else {
        header.classList.remove("sticky-header");
      }

      lastScrollY = currentScrollY; // Update last scroll position
    }

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);
  })();

  // =====================
  // SLIDE SHOW SECTION START
  (function () {
    const slideshowSwiper = new Swiper(".slideshow-swipper", {
      loop: true, // Enable loop mode
      effect: "fade", // Enable fade effect
      fadeEffect: {
        crossFade: true, // Enables cross fade between slides
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        delay: 7000, // Adjust the delay between transitions
        disableOnInteraction: false, // Prevents autoplay from stopping on interaction
      },
    });
  })();

  // =====================
  // PROMO SECTION
  (function () {
    const button = document.getElementById("promoVideoPopupButton");
    const videoPopup = document.getElementById("videoPopup");

    // Function to show the video popup
    function showVideoPopup() {
      videoPopup.classList.add("active");
      handleOverlay({ show: true });
    }

    // Attach event listener to the button for showing the video popup
    button.addEventListener("click", showVideoPopup);

    // GSAP ANIMATION for promo section
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
    const buttonWrapper = wrapper.querySelector(".tabs-button-list");
    const buttons = wrapper.querySelectorAll(".tabs-button");
    const items = wrapper.querySelectorAll(".tabs-item");

    // Create the active element indicator for tabs
    const tabActiveEl = document.createElement("div");
    tabActiveEl.classList.add("tabs-button-active-shape");
    buttonWrapper.appendChild(tabActiveEl);

    // Function to handle the positioning and size of the active indicator
    const handleActiveEl = ({ left = 0, width = 0 }) => {
      tabActiveEl.style.left = `${left}px`;
      tabActiveEl.style.width = `${width}px`;
    };

    // Function to set the default active tab
    const handleDefaultActive = () => {
      const activeButton = Array.from(buttons).find((button) =>
        button.classList.contains("active")
      );

      if (activeButton) {
        const tabId = activeButton.getAttribute("data-tab-item");
        wrapper.querySelector(`.${tabId}`).classList.add("active");
        handleActiveEl({
          left: activeButton.offsetLeft,
          width: activeButton.clientWidth,
        });
      } else if (buttons.length > 0) {
        // If no button is active, activate the first button
        buttons[0].classList.add("active");
        items[0].classList.add("active");
        handleActiveEl({
          left: buttons[0].offsetLeft,
          width: buttons[0].clientWidth,
        });
      }
    };

    // Initialize default active tab
    handleDefaultActive();

    // Add click event listeners for tab buttons
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons and items
        buttons.forEach((btn) => btn.classList.remove("active"));
        items.forEach((item) => item.classList.remove("active"));

        // Add active class to clicked button
        button.classList.add("active");
        const tabId = button.getAttribute("data-tab-item");
        wrapper.querySelector(`.${tabId}`).classList.add("active");

        // Update the active element's position and size
        handleActiveEl({
          left: button.offsetLeft,
          width: button.clientWidth,
        });
      });
    });
  });

  // =====================
  // CATEGORY SECTION START
  (function () {
    gsap.set(".category-section .category-list-top", {
      width: `${document.body.clientWidth * 1.5}px`,
    });
    gsap.set(".category-section .category-list-bottom", {
      width: `${document.body.clientWidth * 1.5}px`,
    });

    // Function to animate the top category list
    function animateCategoryListTop() {
      gsap.fromTo(
        ".category-section .category-list-bottom",
        { xPercent: 0 },
        {
          scrollTrigger: {
            trigger: ".category-section",
            start: "top 80%",
            end: "bottom 0%",
            scrub: 1,
          },
          xPercent: -20,
          duration: 2.5,
          ease: "power2.inOut",
        }
      );
    }

    // Function to animate the bottom category list
    function animateCategoryListBottom() {
      gsap.fromTo(
        ".category-section .category-list-top",
        { xPercent: -25 },
        {
          scrollTrigger: {
            trigger: ".category-section",
            start: "top 80%",
            end: "bottom 0%",
            scrub: 1,
          },
          xPercent: 0,
          duration: 2.5,
          ease: "power2.inOut",
        }
      );
    }

    // Execute animations
    animateCategoryListTop();
    animateCategoryListBottom();
  })();

  /* -------------------
  NEW ARRIVAL SECTIONS
  --------------------*/

  (function () {
    const newArrivalSwiper = new Swiper(".new-arrival-swiper", {
      spaceBetween: 24,
      slidesPerView: 1,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 3000,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1200: {
          initialSlide: 1,

          slidesPerView: 3,
          centeredSlides: true,
        },
      },
    });
  })();

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
  // COUNTDOWN BANNER SECTION START

  const countdownSection = new Swiper(".countdown-swiper", {
    direction: "vertical",
    speed: 700,
    crossFade: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // BUNDLE PRODUCT SECTION START
  // =====================

  (function () {
    const bundleProductAcc = document.querySelectorAll(".bundle-product-acc");

    bundleProductAcc.forEach((item, index) => {
      // CREATE ACC BUTTON
      const button = document.createElement("button");
      const bundleProductButtonWrapper = document.getElementById(
        "bundleProductButtonWrapper"
      );
      bundleProductButtonWrapper.appendChild(button);
      button.classList.add("bundle-product-toggler-button");
      button.innerHTML = `
        <svg class="plus-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
          <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path>
        </svg>
        <svg class="minus-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
          <path d="M228,128a12,12,0,0,1-12,12H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128Z"></path>
        </svg>
      `;

      // Find Acc Header & body
      const accHeader = item.querySelector(".bundle-product-header-wrapper");
      const accBody = item.querySelector(".bundle-product-body-wrapper");

      // Get Height Acc Body & Header
      const accHeaderHeight = accHeader.firstElementChild.clientHeight;
      const accBodyHeight = accBody.firstElementChild.clientHeight;

      // This Style For Large Device
      if (document.body.clientWidth > 1199) {
        // Acc Body Default Styling
        accBody.style.transition = "height ease .5s";
        accBody.style.height = "0";
        accBody.style.overflow = "hidden";

        // Acc Header Default Styling
        accHeader.style.transition = "height ease .5s";
        accHeader.style.overflow = "hidden";

        // Active Default Acc
        if (item.classList.contains("active")) {
          accBody.style.height = `${accBodyHeight + 4}px`;
          accHeader.style.height = `0`;
          button.classList.add("active");
        }

        // Handle Deactivate  Activated Acc
        const handleDeactivate = () => {
          // ACC Deactivations
          const getAllAcc = document.querySelectorAll(".bundle-product-acc");
          const getAllBtn = document.querySelectorAll(
            ".bundle-product-toggler-button"
          );

          // Acc Header & Body
          getAllAcc.forEach((item) => {
            item.classList.remove("active");

            // Find Acc Header & body
            const accHeader = item.querySelector(
              ".bundle-product-header-wrapper"
            );
            const accBody = item.querySelector(".bundle-product-body-wrapper");

            // Get Height Acc Body & Header
            const accHeaderHeight = accHeader.firstElementChild.clientHeight;

            // Acc Body & Header
            accBody.style.height = "0";
            accHeader.style.height = `${accHeaderHeight + 2}px`;
          });

          // Acc Header & Body
          getAllBtn.forEach((btn) => {
            btn.classList.remove("active");
          });
        };

        // Handle Activations
        button.addEventListener("click", () => {
          if (item.classList.contains("active")) {
            // If Activated Item It Will Deactivate
            item.classList.remove("active");
            button.classList.remove("active");

            accBody.style.height = 0;
            accHeader.style.height = `${accHeaderHeight + 4}px`;
          } else {
            // If Deactivate Item It Will Activated
            handleDeactivate();
            item.classList.add("active");
            button.classList.add("active");

            accBody.style.height = `${accBodyHeight + 4}px`;
            accHeader.style.height = `0`;
          }
        });
      } else {
        const bundleProductWrapper = document.getElementById(
          "bundleProductWrapper"
        );
        // Default Styling
        bundleProductWrapper.style.visibility = "hidden";
        bundleProductWrapper.style.transform = "translate(-50%, 100%)";
        bundleProductWrapper.style.opacity = "0";
        bundleProductWrapper.style.transition = ".5s ease all";

        const closeButton = bundleProductWrapper.querySelector(".close-button");

        // Handle Close
        const handleClose = () => {
          bundleProductWrapper.style.visibility = "hidden";
          bundleProductWrapper.style.transform = "translate(-50%, 100%)";
          bundleProductWrapper.style.opacity = "0";

          setTimeout(() => {
            accBody.style.display = "none";
          }, 200);
        };

        closeButton.addEventListener("click", () => {
          handleClose();
          handleOverlay({ show: false });
        });

        // Show Product Wrapper
        button.addEventListener("click", () => {
          bundleProductWrapper.style.visibility = "visible";
          bundleProductWrapper.style.transform = "translate(-50%, 0)";
          bundleProductWrapper.style.opacity = "1";
          accBody.style.display = "block";
          handleOverlay({ show: true, action: handleClose });
        });
      }
    });
  })();

  // =====================
  // COMPARISON R SECTION
  (function () {
    const ImgWrapper = document.getElementById("comparison-image-wrapper");
    const sliderBtn = document.getElementById("comparison-slider-button");
    const range = document.getElementById("comparison-range-slider");

    range.value = 0;
    ImgWrapper.style.width = 0;
    sliderBtn.style.left = `-${sliderBtn.clientWidth / 2}px`;

    // SLIDE CHANGE USING LISTENER
    range.addEventListener("input", () => {
      const imgWidth = range.value;
      sliderBtn.style.left = `calc(${imgWidth}% - ${
        sliderBtn.clientWidth / 2
      }px)`;
      ImgWrapper.style.width = `${imgWidth}%`;
    });

    const handleAutoSlide = () => {
      range.value = 50;
      ImgWrapper.style.width = `50%`;
      sliderBtn.style.left = `calc(50% - ${sliderBtn.clientWidth / 2}px)`;
    };

    gsap.to("#comparison-image-wrapper", {
      scrollTrigger: {
        trigger: ".comparison-section",
        start: "top 10%",
      },
      width: "50%",
    });

    gsap.to("#comparison-slider-button", {
      scrollTrigger: {
        trigger: ".comparison-section",
        start: "top 10%",
      },
      left: `calc(50% - ${sliderBtn.clientWidth / 2}px)`,
    });
  })();

  // =====================
  // PRODUCT DETAILS
  (function () {
    // Initialize thumbnail Swiper for product details
    const productDetailsThumb = new Swiper(".product-details-thumb-swiper", {
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: "auto",
      touchRatio: 0.2,
      slideToClickedSlide: true,
      loop: true,
      loopedSlides: 10,
      speed: 2000,
    });

    // Initialize main product detail Swiper
    const productDetail = new Swiper(" .product-details-swiper", {
      spaceBetween: 10,
      slidesPerView: 1.3,
      centeredSlides: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: true,
      loopedSlides: 10,
      speed: 1000,
    });

    productDetailsThumb.controller.control = productDetail;
    productDetail.controller.control = productDetailsThumb;
  })();

  // =====================
  // RECENT ADDED SECTION START

  (function () {
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
  })();

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
  // TESTIMONIAL SECTION START

  const testimonialCard = new Swiper(".testimonial-swiper", {
    spaceBetween: 20,
    slidesPerView: "auto",
    initialSlide: 1,
    centeredSlides: true,
    loop: true,
    speed: 900,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
    },
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
    const footerMenuWrappers = document.querySelectorAll(
      ".footer-menu-wrapper"
    );

    footerMenuWrappers.forEach((item) => {
      // GET THE HEIGHT OF THE HEADER AND THE MENU LIST
      const headerHeight = item.querySelector(
        ".footer-menu-heading"
      ).clientHeight;
      const menuListHeight =
        item.querySelector(".footer-menu-acc").clientHeight;

      // SET INITIAL STYLES FOR THE MENU
      item.style.overflow = "hidden";
      item.style.height = `${headerHeight + 4}px`;
      item.style.transition = "all ease-in-out .1s";

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

  (function () {
    const productControllers = document.querySelectorAll(
      ".product-quantity-controller"
    );

    productControllers.forEach((controller) => {
      let count = 1;
      const decreaseButton = controller.querySelector(".decrease-quantity");
      const increaseButton = controller.querySelector(".increase-quantity");
      const productQuantity = controller.querySelector(".product-quantity"); // Assuming this is an input element

      // Set the initial quantity
      productQuantity.value = count;

      // Handle increase
      increaseButton.addEventListener("click", () => {
        count++;
        productQuantity.value = count;
      });

      // Handle decrease
      decreaseButton.addEventListener("click", () => {
        if (count > 1) {
          count--;
          productQuantity.value = count;
        }
      });
    });
  })();

  // ========================
  // SCROLL TO TOP BY
  (function () {
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
      window.scrollTo({ top: 0, behavior: "smooth", duration: 3000 });
    });
  })();

  // =============================
  // MARQUEE SECTION START

  (function () {
    const marquees = document.querySelectorAll(".marquee-slider");

    if (marquees.length > 0) {
      marquees.forEach((item) => {
        const swiperWrap = item.querySelector(".swiper-wrapper");
        const swiperWrapClone = swiperWrap.cloneNode(true);

        // Append cloned children to the swiper wrapper
        Array.from(swiperWrapClone.children).forEach((child) => {
          swiperWrap.appendChild(child);
        });

        const speed = item.getAttribute("data-speed") || 5000;
        const direction = item.getAttribute("data-direction") || "forward";
        const isReverse = direction === "reverse";

        const swiper = new Swiper(item, {
          speed: parseInt(speed, 10),
          autoplay: {
            delay: 5,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: isReverse,
          },
          loop: true,
          slidesPerView: "auto",
          watchSlidesProgress: true,
          spaceBetween: 24,
          grabCursor: true,
        });
      });
    }
  })();
});
