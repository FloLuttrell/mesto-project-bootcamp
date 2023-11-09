import {openImageDetailPopup} from './modal'

const cardTemplate = document
    .querySelector(".card-template")
    .content.querySelector(".elements__card");


const itemsBlock = document.querySelector(".elements__list");

export function createItem(item) {
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
        openImageDetailPopup(item.link, item.name)
    });

    return newItem;
}

export function addItem(item) {
    itemsBlock.prepend(item);
}
