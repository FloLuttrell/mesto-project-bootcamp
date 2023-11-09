
const imageDetailPopup = document.querySelector(".popup_type_image");
const imageDetailPopupImg = imageDetailPopup.querySelector(".popup__image");
const imageDetailPopupImgTitle = imageDetailPopup.querySelector(".popup__image-title");

const cardAddPopup = document.querySelector(".popup_type_addElement");

const profileEditPopup = document.querySelector(".popup_type_editUser");

const allPopups = document.querySelectorAll(".popup");

function closePopup (popup) {
    popup.classList.remove("popup_opened");
}

function openPopup (popup) {
    popup.classList.add("popup_opened");
}

export function openImageDetailPopup(itemLink, itemName) {
    imageDetailPopupImg.src = itemLink;
    imageDetailPopupImg.alt = itemName;
    imageDetailPopupImgTitle.textContent = itemName;
    openPopup(imageDetailPopup)
}

export function openCardAddPopup () {
    openPopup(cardAddPopup)
}

export function closeCardAddPopup () {
    closePopup(cardAddPopup);
}

export function openProfileEditPopup () {
    openPopup(profileEditPopup)
}

export function closeProfileEditPopup () {
    closePopup(profileEditPopup);
}

document.addEventListener('keydown', function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup !== null) {
            closePopup(openedPopup);
        }
    }
});

for (const popup of allPopups) {
    popup.addEventListener('click', function(event){
        if (event.target === popup) {
            closePopup(popup)
        }
    })

    const exitBtn = popup.querySelector(".popup__close");
    exitBtn.addEventListener("click", function () {
        closePopup(popup);
    });
}