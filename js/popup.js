/* Selecting all the elements with the class "popup-link", "body", and "lock-padding" and storing them
in the variables popupLinks, body, and lockPadding. */
const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let linkToOpen;
let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      /* Getting the id of the element that was clicked on and removing the "-popup" from the end of
      the id. */
      let popupInfoName = `${e.target.id}`.replace("-popup", "");
      /* Setting the linkToOpen variable to the value of the popupInfoName variable with the string
      "info/" in front of it. */
      linkToOpen = `info/${popupInfoName}.html`;
      document.querySelector(".popup__text").innerHTML = `<iframe src="popup_info/${popupInfoName}.html" frameborder="0"</iframe>`;
      /* Getting the value of the href attribute of the popupLink variable and replacing the "#" with
      an empty string. */
      const popupName = popupLink.getAttribute("href").replace("#", "");
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".popup"));
      e.preventDefault();
    });
  }
}

const popupOpenLinkIcon = document.querySelectorAll(".open-link");
if (popupOpenLinkIcon.length > 0) {
  for (let index = 0; index < popupOpenLinkIcon.length; index++) {
    const el = popupOpenLinkIcon[index];
    el.addEventListener("click", function (e) {
      /* Opening the linkToOpen variable in a new tab. */
      window.location = linkToOpen;
    });
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector(".popup.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodylock();
    }


    /* Adding the class "open" to the currentPopup. */
    currentPopup.classList.add("open");
    /* Adding an event listener to the currentPopup. When the user clicks on the currentPopup, it will
    check if the user clicked on the popup__content. If the user did not click on the popup__content, it
    will close the popup. */
    currentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".popup__content")) {
        popupClose(e.target.closest(".popup"));
      }
    });
  }
}

function bodylock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px"

  console.log("Window width: " + window.innerWidth);
  console.log("Offset width: " + document.querySelector(".wrapper").offsetWidth);
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function() {
    unlock = true;
  }, timeout);
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnlock();
    }
  }
}

function bodyUnlock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = "0px";
      }
    }
    body.style.paddingRight = "0px";
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

/* Checking if the user pressed the escape key. If the user did press the escape key, it will close the
popup. */
document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});