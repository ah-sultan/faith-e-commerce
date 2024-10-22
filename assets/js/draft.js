// ========================
// COUNT DOWN SECTION START

const countDown = document.querySelectorAll(".count-down");

const startCountDown = async (item) => {
  // data-target-count="Dec 5, 2024 15:37:25"
  const targetDate = item.getAttribute("data-target-count");
  const countDownDate = new Date(targetDate).getTime();

  // COUNT DOWN EL
  const getDays = item.querySelector(".count-down-day");
  const getHrs = item.querySelector(".count-down-hrs");
  const getMins = item.querySelector(".count-down-mins");
  const getSecs = item.querySelector(".count-down-secs");

  getDays.innerHTML = "";
  getHrs.innerHTML = "";
  getMins.innerHTML = "";
  getSecs.innerHTML = "";

  const getDaysHeight = getDays.clientHeight;
  const getHrsHeight = getDays.clientHeight;
  const getMinsHeight = getDays.clientHeight;
  const getSecsHeight = getDays.clientHeight;

  getDays.setAttribute("style", "display:block; overflow: hidden");
  getHrs.setAttribute("style", "display:block; overflow: hidden");
  getMins.setAttribute("style", "display:block; overflow: hidden");
  getSecs.setAttribute("style", "display:block; overflow: hidden");

  const daysEl = document.createElement("div");
  const hrsEl = document.createElement("div");
  const minsEl = document.createElement("div");
  const secsEl = document.createElement("div");

  daysEl.setAttribute("style", "transition:transform .5s ease; display:grid");
  hrsEl.setAttribute("style", "transition:transform .5s ease; display:grid");
  minsEl.setAttribute("style", "transition:transform .5s ease; display:grid");
  secsEl.setAttribute("style", "transition:transform .5s ease; display:grid");

  getDays.appendChild(daysEl);
  getHrs.appendChild(hrsEl);
  getMins.appendChild(minsEl);
  getSecs.appendChild(secsEl);

  handleChildAppend({
    days: daysEl,
    hrs: hrsEl,
    mins: minsEl,
    secs: secsEl,
    getDaysHeight,
    getHrsHeight,
    getMinsHeight,
    getSecsHeight,
  });

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
      // daysEl.innerText = "00";
      // hrsEl.innerText = "00";
      // minsEl.innerText = "00";
      // secsEl.innerText = "00";
      break; // Exit the loop when the countdown is over
    } else {
      // daysEl.innerText = days.toString().padStart(2, "0");
      // hrsEl.innerText = hrs.toString().padStart(2, "0");
      // minsEl.innerText = mins.toString().padStart(2, "0");
      // secsEl.innerText = secs.toString().padStart(2, "0");

      daysEl.style.transform = `translateY(${days}%)`;
      hrsEl.style.transform = `translateY(${hrs}%)`;
      minsEl.style.transform = `translateY(${mins}%)`;
      secsEl.style.transform = `translateY(${secs}%)`;

      daysEl.setAttribute("data-time-count:", days);
      hrsEl.setAttribute("data-time-count:", hrs);
      minsEl.setAttribute("data-time-count:", mins);
      secsEl.setAttribute("data-time-count:", secs);
    }

    // Wait for 1 second before the next update
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

countDown.forEach((item) => {
  startCountDown(item);
});



// function handleChildAppend({ days, hrs, mins, secs, getDaysHeight,
//   getHrsHeight,
//   getMinsHeight,
//   getSecsHeight, }) {
//   // Set the inner HTML of each element with the appropriate value
//   for (let i = 0; i < 60; i++) {
//     days.innerHTML += `<div style="line-height: 1.5; height: ${getDaysHeight}px">${
//       i > 9 ? i : "0" + i
//     }</div>`;
//     hrs.innerHTML += `<div style="line-height: 1.5;height: ${getHrsHeight}px">${
//       i > 9 ? i : "0" + i
//     }</div>`;
//     mins.innerHTML += `<div style="line-height: 1.5; height: ${getMinsHeight}px">${
//       i > 9 ? i : "0" + i
//     }</div>`;
//     secs.innerHTML += `<div style="line-height: 1.5; height: ${getSecsHeight}px">${
//       i > 9 ? i : "0" + i
//     }</div>`;
//   }
// }
