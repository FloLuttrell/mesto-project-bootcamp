import "../pages/index.css"; // добавьте импорт главного файла стилей
import "./components/modal";
import './components/validate'
import {addItem, createItem} from './components/card'
import {closeCardAddPopup, closeProfileEditPopup, openCardAddPopup, openProfileEditPopup} from "./components/modal";
import {enableValidation} from "./components/validate";


const nameEl = document.querySelector(".profile__name");
const aboutEl = document.querySelector(".profile__about");
const nameInput = document.querySelector(".form__input_type_user-name");
const aboutInput = document.querySelector(".form__input_type_about");
const cardNameInput = document.querySelector(".form__input_type_image-name");
const cardImageUrlInput = document.querySelector(".form__input_type_image-link");


const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", function () {
  nameInput.value = nameEl.textContent;
  aboutInput.value = aboutEl.textContent;
  openProfileEditPopup();
});

const profileForm = document.querySelector(".popup_type_editUser .form");
profileForm.addEventListener("submit", function (event) {
  event.preventDefault();
  nameEl.textContent = nameInput.value;
  aboutEl.textContent = aboutInput.value;
  closeProfileEditPopup()
});


const cardAddButton = document.querySelector(".profile__add-button");
cardAddButton.addEventListener("click", function () {
  cardNameInput.value = "";
  cardImageUrlInput.value = "";
  openCardAddPopup();
});

const cardAddForm = document.querySelector(".popup_type_addElement .form");
cardAddForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const userCard = {
    name: cardNameInput.value,
    link: cardImageUrlInput.value,
  };
  const newUserCard = createItem(userCard);

  addItem(newUserCard);
  closeCardAddPopup()

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
for (const card of initialCards) {
    const newCard = createItem(card);
    addItem(newCard);
}

enableValidation({
  formSelector: ".popup .form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  // inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: "form__input-red",
  // errorClass: 'popup__error_visible'
});
