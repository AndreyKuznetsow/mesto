export class Card {
  constructor(data, template, openPopupImageView) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._data = data;
    this._openPopupImageView =  openPopupImageView;
  };

  createCard() {
    this._view = this._template.cloneNode(true).children[0];
    const newFoto = this._view.querySelector('.element__foto');
    this._likeButton = this._view.querySelector('.element__like-button');
    newFoto.src =  this._link;
    newFoto.alt = this._name;
    this._view.querySelector('.element__caption').textContent = this._name;
    this._view.querySelector('.element__delete-button').addEventListener('click', this._deleteElement);
    newFoto.addEventListener('click', () => this._openPopupImageView(this._data));
    this._likeButton.addEventListener('click', () => this._toogleLikeButton());
    return this._view
  };

  _toogleLikeButton() { 
    this._likeButton.classList.toggle('element__like-button_active'); 
  } 

  _deleteElement= (event) => {
    this._view.remove();
    this._view = null;
  }; 
};