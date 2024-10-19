
  // ========================
  // COUNT DOWN SECTION START

  const countDown = document.querySelectorAll(".count-down");

  const startCountDown = async (item) => {
    // data-target-count="Dec 5, 2024 15:37:25"
    const targetDate = item.getAttribute("data-target-count");

    const countDownDate = new Date(targetDate).getTime();

    // COUNT DOWN EL
    const daysEl = item.querySelector(".count-down-day");
    const hrsEl = item.querySelector(".count-down-hrs");
    const minsEl = item.querySelector(".count-down-mins");
    const secsEl = item.querySelector(".count-down-secs");

    while (true) {
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
        break; // Exit the loop when the countdown is over
      } else {
        daysEl.innerText = days.toString().padStart(2, "0");
        hrsEl.innerText = hrs.toString().padStart(2, "0");
        minsEl.innerText = mins.toString().padStart(2, "0");
        secsEl.innerText = secs.toString().padStart(2, "0");
      }

      // Wait for 1 second before the next update
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

  countDown.forEach((item) => {
    startCountDown(item);
  });