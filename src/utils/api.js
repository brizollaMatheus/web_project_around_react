class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _request(path, options = {}) {
    return fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: this.headers,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.status}`);
      }

      return response.json();
    });
  }

  getUserInfo() {
    return this._request("/users/me");
  }

  getCardList() {
    return this._request("/cards/");
  }

  setUserInfo({ name, about }) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    });
  }

  setUserAvatar({ avatar }) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  addCard({ name, link }) {
    return this._request("/cards/", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  changeLikeCardStatus(cardId, shouldLike) {
    return this._request(`/cards/${cardId}/likes`, {
      method: shouldLike ? "PUT" : "DELETE",
    });
  }
}

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "f07f983a-0d46-4759-8a14-d69539571335",
    "Content-Type": "application/json",
  },
});

export default api;
