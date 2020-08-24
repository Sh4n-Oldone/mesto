export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getData() {
    return fetch(this._baseUrl, {
      headers: this._headers
    })
      .then(res => res.json())
  }

  setData(data) {
    fetch(this._baseUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  removeCard(card) {
    fetch(this._baseUrl, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: card
      })
    })
  }

  setNewAvatar() {
    fetch(this._baseUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }
}