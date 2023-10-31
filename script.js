"use strict";

let editBtn = document.querySelector(".profile__edit-button");
editBtn.addEventListener("click", function () {
  let popup = document.querySelector(".popup");
  popup.classList.add("popup_opened");
  let nameEl = document.querySelector(".profile__name");
  let nameInput = document.querySelector(".form__input_type_user-name");
  nameInput.value = nameEl.textContent;
  let aboutEl = document.querySelector(".profile__about");
  let aboutInput = document.querySelector(".form__input_type_about");
  aboutInput.value = aboutEl.textContent;
});

const closePopup = function () {
  let popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
};

let exitBtn = document.querySelector(".popup__close");
exitBtn.addEventListener("click", closePopup);

let submitProfile = document.querySelector(".form");
submitProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  let nameEl = document.querySelector(".profile__name");
  let nameInput = document.querySelector(".form__input_type_user-name");
  nameEl.textContent = nameInput.value;
  let aboutEl = document.querySelector(".profile__about");
  let aboutInput = document.querySelector(".form__input_type_about");
  aboutEl.textContent = aboutInput.value;
  closePopup();
});
