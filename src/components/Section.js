export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  render() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(domElement) {
    this._containerSelector.append(domElement);
  }

  addItemReverse(domElement) {
    this._containerSelector.prepend(domElement);
  }
}