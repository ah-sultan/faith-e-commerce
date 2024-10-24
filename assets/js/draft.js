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