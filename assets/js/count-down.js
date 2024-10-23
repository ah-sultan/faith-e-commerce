window.addEventListener("DOMContentLoaded", () => {
  

const countDown = document.querySelectorAll(".count-down");

const startCountDown = async (item) => {
  // data-target-count="Dec 5, 2024 15:37:25"
  const targetDate = item.getAttribute("data-target-count");
  const countDownDate = new Date(targetDate).getTime();

  // Get Count EL
  const getDays = item.querySelector(".count-down-day");
  const getHrs = item.querySelector(".count-down-hrs");
  const getMins = item.querySelector(".count-down-mins");
  const getSecs = item.querySelector(".count-down-secs");

  // EMPTY DOM EL
  getDays.innerHTML = "";
  getHrs.innerHTML = "";
  getMins.innerHTML = "";
  getSecs.innerHTML = "";

  // GET DOM EL HEIGHT
  const getDaysHeight = getDays.clientHeight;
  const getHrsHeight = getDays.clientHeight;
  const getMinsHeight = getDays.clientHeight;
  const getSecsHeight = getDays.clientHeight;

  // SET DOM EL ATTRIBUTE
  const handelEl = ({getEl, createdEl, }) => {
      getEl.setAttribute("style", "display:block !important; overflow: hidden");
      createdEl.setAttribute("style", "transition:transform .5s ease; display:grid; gridTemplatesColumn:100%;gridTemplatesColumn:repeat(60, 100%)");

      for (let i = 0; i < 60; i++) {
        const countEl = document.createElement("div")
        createdEl.appendChild(countEl)
        countEl.style.display = "flex"
        countEl.style.alignItems = "center"
        countEl.style.justifyContent = "center"
        countEl.style.fontSize = "inherit"
        countEl.style.color = "currentColor"
        countEl.style.height = getEl.clientHeight + "px"
        countEl.style.width = getEl.clientWidth + "px"
        countEl.innerHTML = i > 9 ? i : "0" + i
      }

  }

  // Create Element
  const daysEl = document.createElement("div");
  const hrsEl = document.createElement("div");
  const minsEl = document.createElement("div");
  const secsEl = document.createElement("div");

  // Append Child
  getDays.appendChild(daysEl);
  getHrs.appendChild(hrsEl);
  getMins.appendChild(minsEl);
  getSecs.appendChild(secsEl);

  // Call handelEl Function
  handelEl({getEl : getDays, createdEl : daysEl})
  handelEl({getEl : getHrs, createdEl : hrsEl})
  handelEl({getEl : getMins, createdEl : minsEl})
  handelEl({getEl : getSecs, createdEl : secsEl})



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
      daysEl.style.transform = "translateY(0%) !important"
      hrsEl.style.transform = "translateY(0%) !important"
      minsEl.style.transform = "translateY(0%) !important"
      secsEl.style.transform = "translateY(0%) !important"

      break; // Exit the loop when the countdown is over
    } else {


      // Translate Created Elements Base Times
      daysEl.style.transform = `translateY(-${days * getDaysHeight}px)`;
      hrsEl.style.transform = `translateY(-${hrs * getHrsHeight }px)`;
      minsEl.style.transform = `translateY(-${mins * getMinsHeight }px)`;
      secsEl.style.transform = `translateY(-${secs * getSecsHeight }px)`;

      // Set Time Attribute
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


})