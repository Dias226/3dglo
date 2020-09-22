window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  //Функция добавления 0 перед числами меньше 10
  const checkTime = value => {
    if (value < 10) {
      return "0" + value;
    } else {
      return value;
    }
  };

  //Timer
  const counterTimer = deadline => {
    const timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    const getTimerRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return {
        timeRemaining,
        hours,
        minutes,
        seconds,
      };
    };

    const updateClock = () => {
      const timer = getTimerRemaining();

      timerHours.textContent = checkTime(timer.hours);
      timerMinutes.textContent = checkTime(timer.minutes);
      timerSeconds.textContent = checkTime(timer.seconds);

      if (timer.timeRemaining < 0) {
        clearInterval(timerInterval);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    };
    const timerInterval = setInterval(updateClock, 1000);
    updateClock();
  };

  counterTimer("23 september 2020");

  //Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => menu.classList.toggle('active-menu');


    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
  };
  toggleMenu();

  //popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popUpClose = document.querySelector('.popup-close');
    let animateIdOpen, animateIdClose;
    let count = 0;

    const animateOpen = () => {
      animateIdOpen = requestAnimationFrame(animateOpen);
      count += 0.05;
      if (count < 1) {
        popup.style.opacity = count;
      } else {
        cancelAnimationFrame(animateIdOpen);
      }
    };

    const animateClose = () => {
      animateIdClose = requestAnimationFrame(animateClose);
      count -= 0.05;
      if (count >= 0) {
        popup.style.opacity = count;
      } else {
        cancelAnimationFrame(animateIdClose);
        popup.style.display = "none";
      }
    };

    popupBtn.forEach(item => {
      item.addEventListener("click", () => {
        popup.style.display = "block";
        popup.style.opacity = "1";
        if (window.innerWidth > 768) {
          popup.style.opacity = "0";
          animateIdOpen = requestAnimationFrame(animateOpen);
        }
      });
    });

    popUpClose.addEventListener("click", () => {
      if (window.innerWidth > 768) {
        animateIdClose = requestAnimationFrame(animateClose);
      } else {
        popup.style.display = "none";
      }
    });
  };
  togglePopUp();
});