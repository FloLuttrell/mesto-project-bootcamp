import "./pages/index.css"; // добавьте импорт главного файла стилей
import { addItem, createItem } from "./components/card";
import { closePopup, enablePopups, openPopup } from "./components/modal";
import { enableValidation } from "./components/validate";
import {
  fetchCards,
  getProfile,
  patchProfile,
  postCard,
  updateProfileAvatar,
} from "./components/api";

const nameEl = document.querySelector(".profile__name");
const aboutEl = document.querySelector(".profile__about");
const profileAvatarImg = document.querySelector(".profile__image");

const profileAvatarPopup = document.querySelector(
  ".popup_type_editProfileAvatar",
);
const profileAvatarForm = profileAvatarPopup.querySelector(".form");
const profileAvatarUrlInput = profileAvatarForm.querySelector(
  ".form__input_type_image-link",
);
const profileAvatarSubmitButton =
  profileAvatarForm.querySelector(".form__save-button");

const profileEditPopup = document.querySelector(".popup_type_editUser");
const profileEditForm = profileEditPopup.querySelector(
  ".popup_type_editUser .form",
);
const profileSubmitButton = profileEditForm.querySelector(".form__save-button");
const profileNameInput = profileEditForm.querySelector(
  ".form__input_type_user-name",
);
const profileAboutInput = profileEditForm.querySelector(
  ".form__input_type_about",
);

const cardAddPopup = document.querySelector(".popup_type_addElement");
const cardAddForm = cardAddPopup.querySelector(".popup_type_addElement .form");

const cardNameInput = cardAddForm.querySelector(".form__input_type_image-name");
const cardImageUrlInput = cardAddForm.querySelector(
  ".form__input_type_image-link",
);
const cardAddSubmitButton = cardAddForm.querySelector(".form__save-button");

let currentUserId = "";

const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", function () {
  profileNameInput.value = nameEl.textContent;
  profileAboutInput.value = aboutEl.textContent;
  profileSubmitButton.textContent = "Сохранить";
  openPopup(profileEditPopup);
});

profileEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileSubmitButton.textContent = "Сохранение...";
  patchProfile(profileNameInput.value, profileAboutInput.value)
    .then(function (data) {
      nameEl.textContent = data.name;
      aboutEl.textContent = data.about;
      profileSubmitButton.textContent = "Успех";
      closePopup(profileEditPopup);
    })
    .catch(function (err) {
      profileSubmitButton.textContent = "Ошибочка";
      console.error(err);
    });
});
const updateAvatarButton = document.querySelector(".profile__avatar");
updateAvatarButton.addEventListener("click", function () {
  profileAvatarSubmitButton.textContent = "Сохранить";
  openPopup(profileAvatarPopup);
});
profileAvatarForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileAvatarSubmitButton.textContent = "Сохранение...";
  updateProfileAvatar(profileAvatarUrlInput.value)
    .then(function (profile) {
      profileAvatarImg.src = profile.avatar;
      profileAvatarSubmitButton.textContent = "Успех";
      closePopup(profileAvatarPopup);
    })
    .catch(function (err) {
      profileAvatarSubmitButton.textContent = "Ошибочка";
      console.error(err);
    });
});

const cardAddButton = document.querySelector(".profile__add-button");
cardAddButton.addEventListener("click", function () {
  cardNameInput.value = "";
  cardImageUrlInput.value = "";
  cardAddSubmitButton.textContent = "Сохранить";
  openPopup(cardAddPopup);
});

cardAddForm.addEventListener("submit", function (event) {
  event.preventDefault();
  cardAddSubmitButton.textContent = "Сохранение...";
  postCard(cardNameInput.value, cardImageUrlInput.value)
    .then(function (data) {
      const cardEl = createItem(data, currentUserId);
      addItem(cardEl);
      cardAddSubmitButton.textContent = "Успех";
      closePopup(cardAddPopup);
    })
    .catch(function (err) {
      cardAddSubmitButton.textContent = "Ошибочка";
      console.error(err);
    });
});

enablePopups({
  popupSelector: ".popup",
  exitBtnSelector: ".popup__close",
});

enableValidation({
  formSelector: ".popup .form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  // inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: "form__input-red",
  // errorClass: 'popup__error_visible'
});

getProfile()
  .then(function (profileData) {
    nameEl.textContent = profileData.name;
    aboutEl.textContent = profileData.about;
    profileAvatarImg.src = profileData.avatar;
    currentUserId = profileData._id;
    return fetchCards();
  })
  .then(function (cards) {
    for (const card of cards) {
      const newCard = createItem(card, currentUserId);
      addItem(newCard);
    }
  })
  .catch(function (err) {
    console.error(err);
  });
