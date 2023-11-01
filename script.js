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

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplate = document
  .querySelector(".card-template")
  .content.querySelector(".elements__card");
const itemsBlock = document.querySelector(".elements__list");

const itemForm = document.querySelector(".form");

function createItem(item) {
  // creating
  const newItem = cardTemplate.cloneNode(true);
  const elementName = newItem.querySelector(".elements__title");
  elementName.textContent = item.name;
  const elementImage = newItem.querySelector(".elements__image");
  elementImage.src = item.link;
  elementImage.alt = item.name;
  // deleting
  const deleteCard = newItem.querySelector(".elements__trash-button");
  deleteCard.addEventListener("click", () => {
    newItem.remove();
  });

  return newItem;
}

function addItem(item) {
  itemsBlock.append(item);
}

initialCards.forEach((item) => {
  const newCard = createItem(item);
  addItem(newCard);
});

let newlike = document.querySelector(".elements__list");
newlike.addEventListener("click", function (ev) {
  if (ev.target.classList.contains("elements__like-button")) {
    ev.target.classList.toggle("elements__like-button_active");
  }
});
