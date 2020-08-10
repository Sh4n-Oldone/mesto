export default class Section {
  constructor({item, renderer}, containerSelector) {
    this._item = item;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  render() {
    this._renderer(this._item);
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }
}