const groupId = "wbf-cohort-14";
const headers = {
    authorization: "946a8bb1-b210-4b55-a04f-e0a45b4369a0",
    "content-type": "application/json",
};

function responseToJson(res){
    return res.json()
}

export function fetchCards() {
    const cardUrl = `https://nomoreparties.co/v1/${groupId}/cards`;
    return fetch(cardUrl, {headers})
        .then(responseToJson);
}

export function postCard(name, link) {
    const cardUrl = `https://nomoreparties.co/v1/${groupId}/cards`;

    const bodyJson = JSON.stringify({
        name: name,
        link: link,
    });
    return fetch(cardUrl, {headers, method: "post", body: bodyJson})
        .then(responseToJson);

}

export function getProfile() {
    const userUrl = `https://nomoreparties.co/v1/${groupId}/users/me`;
    return fetch(userUrl, {headers})
        .then(responseToJson);
}

export function patchProfile(name, about) {
    const userUrl = `https://nomoreparties.co/v1/${groupId}/users/me`
    const bodyJson = JSON.stringify({
        name: name,
        about: about,
    });
    return fetch(userUrl, {headers, method:"patch", body: bodyJson})
        .then(responseToJson)
}

export function deleteCard(cardId) {
    const cardUrl = `https://nomoreparties.co/v1/${groupId}/cards/${cardId}`;
    return fetch(cardUrl, {headers, method: "delete"})
        .then(responseToJson)
}

export function likeCard(cardId) {
    const likeUrl = `https://nomoreparties.co/v1/${groupId}/cards/likes/${cardId}`;
    return fetch(likeUrl, {headers, method:'put'})
        .then(responseToJson)
}

export function dislikeCard(cardId) {
    const likeUrl = `https://nomoreparties.co/v1/${groupId}/cards/likes/${cardId}`;
    return fetch(likeUrl, {headers, method:'delete'})
        .then(responseToJson)
}
