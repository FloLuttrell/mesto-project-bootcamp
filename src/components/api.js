const fetchOpts = {
  baseURL: `https://nomoreparties.co/v1/wbf-cohort-14`,
  headers: {
    authorization: "946a8bb1-b210-4b55-a04f-e0a45b4369a0",
    "content-type": "application/json",
  },
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function fetchCards() {
  const cardUrl = `${fetchOpts.baseURL}/cards`;
  return request(cardUrl, { headers: fetchOpts.headers });
}

export function postCard(name, link) {
  const cardUrl = `${fetchOpts.baseURL}/cards`;

  const bodyJson = JSON.stringify({
    name: name,
    link: link,
  });
  return request(cardUrl, {
    headers: fetchOpts.headers,
    method: "post",
    body: bodyJson,
  });
}

export function getProfile() {
  const userUrl = `${fetchOpts.baseURL}/users/me`;
  return request(userUrl, { headers: fetchOpts.headers });
}

export function patchProfile(name, about) {
  const userUrl = `${fetchOpts.baseURL}/users/me`;
  const bodyJson = JSON.stringify({
    name: name,
    about: about,
  });
  return request(userUrl, {
    headers: fetchOpts.headers,
    method: "PATCH",
    body: bodyJson,
  });
}

export function deleteCard(cardId) {
  const cardUrl = `${fetchOpts.baseURL}/cards/${cardId}`;
  return request(cardUrl, { headers: fetchOpts.headers, method: "delete" });
}

export function likeCard(cardId) {
  const likeUrl = `${fetchOpts.baseURL}/cards/likes/${cardId}`;
  return request(likeUrl, { headers: fetchOpts.headers, method: "put" });
}

export function dislikeCard(cardId) {
  const likeUrl = `${fetchOpts.baseURL}/cards/likes/${cardId}`;
  return request(likeUrl, { headers: fetchOpts.headers, method: "delete" });
}

export function updateProfileAvatar(avatarUrl) {
  const url = `${fetchOpts.baseURL}/users/me/avatar`;
  const bodyJson = JSON.stringify({
    avatar: avatarUrl,
  });
  return request(url, {
    headers: fetchOpts.headers,
    method: "PATCH",
    body: bodyJson,
  });
}
