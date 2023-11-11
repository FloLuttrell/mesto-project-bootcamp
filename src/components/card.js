import {openImageDetailPopup} from "./modal";
import {deleteCard, dislikeCard, likeCard} from "./api";

const cardTemplate = document
    .querySelector(".card-template")
    .content.querySelector(".elements__card");


const itemsBlock = document.querySelector(".elements__list");


export function createItem(item, currentUserId) {
    // creating
    const newItem = cardTemplate.cloneNode(true);
    const elementName = newItem.querySelector(".elements__title");
    elementName.textContent = item.name;
    const elementImage = newItem.querySelector(".elements__image");
    elementImage.src = item.link;
    elementImage.alt = item.name;
    // deleting
    const deleteCardButton = newItem.querySelector(".elements__trash-button");
    deleteCardButton.addEventListener("click", () => {
        if (confirm("ты дебил?")) {
            deleteCard(item._id)
                .then(function () {
                    newItem.remove();
                });
        }

    });
    if (item.owner._id !== currentUserId) {
        deleteCardButton.remove();
    }
    //like-counter
    const likeCounter = newItem.querySelector(".elements__like-counter");
    likeCounter.textContent = item.likes.length;
    //like
    const likeClass = "elements__like-button_active";

    const likeCardButton = newItem.querySelector(".elements__like-button");
    likeCardButton.addEventListener("click", () => {
        if (likeCardButton.classList.contains(likeClass)) {
            dislikeCard(item._id).then(function (card) {
                likeCardButton.classList.remove(likeClass);
                likeCounter.textContent = card.likes.length;
            });
        } else {
            likeCard(item._id).then(function (card) {
                likeCardButton.classList.add(likeClass);
                likeCounter.textContent = card.likes.length;
            });
        }
        // likeCardButton.classList.toggle("elements__like-button_active");
    });
    const myLike = item.likes.find(function (like) {
        return like._id === currentUserId;
    });
    if (myLike) {
        likeCardButton.classList.add(likeClass);
    }

    //image
    const imgBtn = newItem.querySelector(".elements__image");
    imgBtn.addEventListener("click", () => {
        openImageDetailPopup(item.link, item.name);
    });

    return newItem;
}

export function addItem(item) {
    itemsBlock.prepend(item);
}
