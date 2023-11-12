function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup !== null) {
      closePopup(openedPopup);
    }
  }
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

export function enablePopups(options) {
  const allPopups = document.querySelectorAll(options.popupSelector);

  for (const popup of allPopups) {
    popup.addEventListener("pointerdown", function (event) {
      if (event.target === popup) {
        closePopup(popup);
      }
    });

    const exitBtn = popup.querySelector(options.exitBtnSelector);
    exitBtn.addEventListener("click", function () {
      closePopup(popup);
    });
  }
}
