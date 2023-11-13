import "./pages/index.css"; // добавьте импорт главного файла стилей
import { addItem, createItem } from "./components/card";
import { closePopup, enablePopups, openPopup } from "./components/modal";
import { enableValidation, validateForm } from "./components/validate";
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

//универсальная функция переименования кнопки
function buildSubmitHandler(
  actionFn,
  texts = {
    pending: "Сохранение...",
    done: "Успех",
    error: "Ошибочка",
  },
) {
  return function (event) {
    event.preventDefault();
    event.submitter.textContent = texts.pending;
    actionFn()
      .then(function () {
        event.submitter.textContent = texts.done;
        event.target.reset();
      })
      .catch(function (error) {
        console.error(error);
        event.submitter.textContent = texts.error;
      });
  };
}

const editProfileButton = document.querySelector(".profile__edit-button");

editProfileButton.addEventListener("click", () => {
  profileNameInput.value = nameEl.textContent;
  profileAboutInput.value = aboutEl.textContent;
  profileSubmitButton.textContent = "Сохранить";
  validateForm(profileEditForm, profileSubmitButton);
  openPopup(profileEditPopup);
});

profileEditForm.addEventListener(
  "submit",
  buildSubmitHandler(function () {
    return patchProfile(profileNameInput.value, profileAboutInput.value).then(
      (data) => {
        nameEl.textContent = data.name;
        aboutEl.textContent = data.about;
        closePopup(profileEditPopup);
      },
    );
  }),
);

// profileEditForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   profileSubmitButton.textContent = "Сохранение...";
//   patchProfile(profileNameInput.value, profileAboutInput.value)
//     .then((data) => {
//       nameEl.textContent = data.name;
//       aboutEl.textContent = data.about;
//       closePopup(profileEditPopup);
//     })
//     .catch((err) => {
//       profileSubmitButton.textContent = "Ошибочка";
//       console.error(err);
//     });
// });
const updateAvatarButton = document.querySelector(".profile__avatar");
updateAvatarButton.addEventListener("click", () => {
  profileAvatarSubmitButton.textContent = "Сохранить";
  validateForm(profileAvatarForm, profileAvatarSubmitButton);
  openPopup(profileAvatarPopup);
});
profileAvatarForm.addEventListener(
  "submit",
  buildSubmitHandler(() => {
    return updateProfileAvatar(profileAvatarUrlInput.value).then((profile) => {
      profileAvatarImg.src = profile.avatar;
      closePopup(profileAvatarPopup);
    });
  }),
);

const cardAddButton = document.querySelector(".profile__add-button");
cardAddButton.addEventListener("click", () => {
  cardAddSubmitButton.textContent = "Сохранить";
  validateForm(cardAddForm, cardAddSubmitButton);
  openPopup(cardAddPopup);
});

cardAddForm.addEventListener(
  "submit",
  buildSubmitHandler(() => {
    return postCard(cardNameInput.value, cardImageUrlInput.value).then(
      (data) => {
        const cardEl = createItem(data, currentUserId);
        addItem(cardEl);
        closePopup(cardAddPopup);
      },
    );
  }),
);

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

Promise.all([getProfile(), fetchCards()])
  .then(([profileData, cards]) => {
    nameEl.textContent = profileData.name;
    aboutEl.textContent = profileData.about;
    profileAvatarImg.src = profileData.avatar;
    currentUserId = profileData._id;
    for (const card of cards) {
      const newCard = createItem(card, currentUserId);
      addItem(newCard);
    }
  })
  .catch(console.error);
