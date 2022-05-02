export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

export class Card {
  static _template = document.querySelector('.template').content;
  constructor(data, container) {
    this._name = data.name;
    this._link = data.link;
    this._container = container;
    this._closeImagePopup = this._closeImagePopup.bind(this);
    this._closeImageByEsc = this._closeImageByEsc.bind(this);
  };

  render() {
    this._view = Card._template.cloneNode(true);
    const newFoto = this._view.querySelector('.element__foto');
    newFoto.src =  this._link;
    newFoto.alt = this._name;
    this._view.querySelector('.element__caption').textContent = this._name;
    this._view.querySelector('.element__delete-button').addEventListener('click', this._deleteElement);
    newFoto.addEventListener('click', () => this._openPopupImageView());
    this._view.querySelector('.element__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like-button_active')});        
    this._container.prepend(this._view);
  };

  _deleteElement (event) {
    event.target.closest('.element').remove();
  };

  _openPopupImageView() {
    const popupImageView = document.querySelector('.popup_image');
    const viewUrl = popupImageView.querySelector('.popup__foto');
    const viewCaption = popupImageView.querySelector('.popup__caption');
    viewUrl.src = this._link;
    viewUrl.alt = this._name;
    viewCaption.textContent = this._name;
    popupImageView.classList.add ('popup_opened');
    document.addEventListener('keydown',this._closeImageByEsc);
    popupImageView.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
        this._closeImagePopup(popupImageView);
      };
    });
  };

  _closeImageByEsc (evt) {
    if (evt.key === 'Escape') {
      const openedImagePopup = document.querySelector('.popup_opened');
      this._closeImagePopup(openedImagePopup);
    };
  };

  _closeImagePopup (popup) {
    document.removeEventListener('keydown', this._closeImageByEsc);
    popup.classList.remove ('popup_opened');
  };
};