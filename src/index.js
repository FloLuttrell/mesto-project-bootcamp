import "../pages/index.css"; // добавьте импорт главного файла стилей
import {addItem, createItem} from "./components/card";
import {closeCardAddPopup, closeProfileEditPopup, openCardAddPopup, openProfileEditPopup} from "./components/modal";
import {enableValidation} from "./components/validate";
import {fetchCards, getProfile, patchProfile, postCard} from "./components/api";


const nameEl = document.querySelector(".profile__name");
const aboutEl = document.querySelector(".profile__about");
const nameInput = document.querySelector(".form__input_type_user-name");
const aboutInput = document.querySelector(".form__input_type_about");
const cardNameInput = document.querySelector(".form__input_type_image-name");
const cardImageUrlInput = document.querySelector(".form__input_type_image-link");
let currentUserId = "";


const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener("click", function () {
    nameInput.value = nameEl.textContent;
    aboutInput.value = aboutEl.textContent;
    openProfileEditPopup();
});

const profileForm = document.querySelector(".popup_type_editUser .form");
profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    patchProfile(nameInput.value, aboutInput.value)
        .then(function (data) {
            nameEl.textContent = data.name;
            aboutEl.textContent = data.about;
            closeProfileEditPopup();
            console.log(data);
        });

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
    postCard(cardNameInput.value, cardImageUrlInput.value)
        .then(function (data) {
            console.log(data);
            const cardEl = createItem(data, currentUserId);
            addItem(cardEl);
            closeCardAddPopup();
        });
});


enableValidation({
    formSelector: ".popup .form",
    inputSelector: ".form__input",
    submitButtonSelector: ".form__save-button",
    // inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: "form__input-red",
    // errorClass: 'popup__error_visible'
});


getProfile().then(function (profileData) {
    console.log(profileData);
    nameEl.textContent = profileData.name;
    aboutEl.textContent = profileData.about;
    currentUserId = profileData._id;
}).then(function () {
    fetchCards()
        .then(function (cards) {
            for (const card of cards) {
                const newCard = createItem(card, currentUserId);
                addItem(newCard);
            }
        });
});

