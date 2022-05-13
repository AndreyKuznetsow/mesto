import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [
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

const config = {
  inputSelector: '.popup__input',
  submitSelector:  '.popup__submit',
  submitInactiveSelector: 'popup__submit_inactive',
  inputTypeError: 'popup__input_type_error',
  errorCaption: 'popup__input-error_active'
};

const initialCardsReversed = initialCards.reverse();
const cardsContainer = document.querySelector('.elements');
const template = document.querySelector('.template').content;

function renderInitialCard() {
  initialCardsReversed.forEach((card) => {
    cardsContainer.prepend(createNewCard(card).createCard());   
  });
};

function createNewCard(card) {
  const newCard = new Card(card, template, openPopupImageViewFunc);
  return newCard
}

renderInitialCard();

//Profile popup

const profileEditButton = document.querySelector ('.profile__edit-button');
const profileName = document.querySelector ('.profile__name');
const profileProfession = document.querySelector ('.profile__profession');
const popupProfile = document.querySelector ('.popup_profile');
const formProfile = popupProfile.querySelector ('.popup__container');
const nameInput = formProfile.querySelector ('.popup__input_type_name');
const jobInput = formProfile.querySelector ('.popup__input_type_profession');

const profileValidator = new FormValidator (config, popupProfile);
profileValidator.enableValidation();

function openPopupProfile () {
  openPopup (popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  profileValidator.resetFofm();
 
};

function openPopup (popup) {
  popup.classList.add ('popup_opened');
  document.addEventListener('keydown', closeByEsc);  
};

function closePopup (popup) {
  document.removeEventListener('keydown', closeByEsc);
  popup.classList.remove ('popup_opened');  
};

function updateFormProfile () {
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopup (popupProfile);
};

profileEditButton.addEventListener ('click', openPopupProfile);
formProfile.addEventListener ('submit', updateFormProfile);

//popup_NewElement

const elementAddButton = document.querySelector('.profile__add-button');
const popupNewElement = document.querySelector('.popup_new-element');
const formNewElement = popupNewElement.querySelector('.popup__container');
const captionInput = formNewElement.querySelector('.popup__input_type_caption');
const urlInput = formNewElement.querySelector('.popup__input_type_url');

elementAddButton.addEventListener('click', openPopupNewElement);
formNewElement.addEventListener('submit', createNewElement);

const newElementValidator = new FormValidator (config, popupNewElement);
newElementValidator.enableValidation();

function createNewElement(evt) {
  const newItem = {
    name: captionInput.value,
    link: urlInput.value
  };
  cardsContainer.prepend(createNewCard(newItem).createCard());
  closePopup (popupNewElement);
};

function openPopupNewElement () {
  captionInput.value = '';
  urlInput.value = '';
  openPopup (popupNewElement);
  newElementValidator.resetFofm();
};

//Закрытие popup по кнопке Esc 

function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  };
};

// Закрытие popup по клику по оверлею и кнопке "Закрыть"

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    };
  });
})

//Открытие предосмотра

const popupImageView = document.querySelector('.popup_image');
const viewUrl = popupImageView.querySelector('.popup__foto');
const viewCaption = popupImageView.querySelector('.popup__caption');

function openPopupImageViewFunc(text) {  
  viewUrl.src = text.link;
  viewUrl.alt = text.name;
  viewCaption.textContent = text.name;
  openPopup(popupImageView);
};