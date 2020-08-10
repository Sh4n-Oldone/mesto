export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._name = nameSelector;
    this._job = jobSelector;
  }

  getUserInfo() {
    return {name: this._name.value, job: this._job.value}
  }

  setUserInfo(data) {
    document.querySelector('.profile__name').textContent = data.name;
    document.querySelector('.profile__title').textContent = data.job;
  }
}