export default class Api {
  constructor(options) {
    this._userUrl = options.userUrl;
    this._cardsUrl = options.cardsUrl;
    this._headers = options.headers;
  }

  getUserData() {
    return fetch(this._userUrl, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getCardsData() {
    return fetch(this._cardsUrl, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  setUserData(data) {
    return fetch(this._userUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  setCardsData(data) {
    return fetch(this._cardsUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  removeCard(_id) {
    return fetch(this._cardsUrl + '/' + _id, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  putLike(_id) {
    return fetch(this._cardsUrl + '/likes/' + _id, {
      method: 'PUT',
      headers: this._headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  removeLike(_id) {
    return fetch(this._cardsUrl + '/likes/' + _id, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  setNewAvatar(data) {
    return fetch(this._userUrl + '/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}