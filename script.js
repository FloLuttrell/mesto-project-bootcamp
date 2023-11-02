"use strict";

const closePopup = function (popup) {
  popup.classList.remove("popup_opened");
};

const openPopup = function (popup) {
  popup.classList.add("popup_opened");
};

const popups = document.querySelectorAll(".popup");
popups.forEach(function (popup) {
  const exitBtn = popup.querySelector(".popup__close");
  exitBtn.addEventListener("click", function () {
    closePopup(popup);
  });
});

const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", function () {
  const popup = document.querySelector(".popup_type_editUser");
  openPopup(popup);
  const nameEl = document.querySelector(".profile__name");
  const nameInput = document.querySelector(".form__input_type_user-name");
  nameInput.value = nameEl.textContent;
  const aboutEl = document.querySelector(".profile__about");
  const aboutInput = document.querySelector(".form__input_type_about");
  aboutInput.value = aboutEl.textContent;
});

const profleForm = document.querySelector(".popup_type_editUser .form");
profleForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const nameEl = document.querySelector(".profile__name");
  const nameInput = document.querySelector(".form__input_type_user-name");
  nameEl.textContent = nameInput.value;
  const aboutEl = document.querySelector(".profile__about");
  const aboutInput = document.querySelector(".form__input_type_about");
  aboutEl.textContent = aboutInput.value;
  const popup = document.querySelector(".popup_type_editUser");
  closePopup(popup);
});

const imageForm = document.querySelector(".popup_type_addElement .form");
imageForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const imageName = document.querySelector(".form__input_type_image-name");
  const imageUrl = document.querySelector(".form__input_type_image-link");
  const userCard = {
    name: imageName.value,
    link: imageUrl.value,
  };
  const newUserCard = createItem(userCard);

  addItem(newUserCard);
  const popup = document.querySelector(".popup_type_addElement");
  closePopup(popup);
  imageName.value = "";
  imageUrl.value = "";
});

const cardTemplate = document
  .querySelector(".card-template")
  .content.querySelector(".elements__card");
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
  //like
  const likeCard = newItem.querySelector(".elements__like-button");
  likeCard.addEventListener("click", () => {
    likeCard.classList.toggle("elements__like-button_active");
  });
  //image
  const imgBtn = newItem.querySelector(".elements__image");
  imgBtn.addEventListener("click", () => {
    const popupImg = document.querySelector(".popup_type_image");
    const bigImg = popupImg.querySelector(".popup__image");
    bigImg.src = item.link;
    const popupName = popupImg.querySelector(".popup__image-title");
    popupName.textContent = item.name;
    openPopup(popupImg);
  });

  return newItem;
}

const itemsBlock = document.querySelector(".elements__list");
function addItem(item) {
  itemsBlock.append(item);
}

const cardAddButton = document.querySelector(".profile__add-button");
cardAddButton.addEventListener("click", function () {
  const popup = document.querySelector(".popup_type_addElement");
  openPopup(popup);
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

initialCards.forEach((item) => {
  const newCard = createItem(item);
  addItem(newCard);
});
