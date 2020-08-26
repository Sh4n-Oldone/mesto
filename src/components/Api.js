export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getData() {
    return fetch(this._baseUrl, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setData(data) {
    return fetch(this._baseUrl, {
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
    });
  }

  removeCard(_id) {
    return fetch(this._baseUrl + '/' + _id, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  putLike(_id) {
    return fetch(this._baseUrl + '/likes/' + _id, {
      method: 'PUT',
      headers: this._headers
    })
  }

  removeLike(id) {
    return fetch(this._baseUrl + '/likes/' + _id, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  setNewAvatar(data) {
    return fetch(this._baseUrl + '/avatar', {
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
    });
  }
}