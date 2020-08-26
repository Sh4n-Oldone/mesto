export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._name = nameSelector;
    this._job = jobSelector;

  }

  getUserInfo() {
    return {name: this._name.value, job: this._job.value}
  }

  setUserInfo(data) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-14/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '14950384-2a2e-482b-8250-dfb0e0c885f3',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    });
  }
}