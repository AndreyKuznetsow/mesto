import { initialCards, Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const config = {
  inputSelector: '.popup__input',
  submitSelector:  '.popup__submit',
  submitInactiveSelector: 'popup__submit_inactive',
  inputTypeError: 'popup__input_type_error',
  errorCaption: 'popup__input-error_active'
};

const initialCardsReversed = initialCards.reverse();
const elements = document.querySelector('.elements');

function renderInitialCard() {
  initialCardsReversed.forEach((card) => {
    const newCard = new Card(card, elements);
    newCard.render();
  });
};
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
  resetFofm(popupProfile, nameInput);
  resetFofm(popupProfile, jobInput);
  const buttonElement = popupProfile.querySelector('.popup__submit');
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add('popup__submit_inactive');
};

function openPopup (popup) {
  popup.classList.add ('popup_opened');
  document.addEventListener('keydown', closeByEsc);  
};

function closePopup (popup) {
  document.removeEventListener('keydown', closeByEsc);
  popup.classList.remove ('popup_opened');  
};

function updateFormProfile (evt) {
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
  const newCard = new Card (newItem, elements);
  newCard.render();
  closePopup (popupNewElement);
};

function openPopupNewElement () {
  captionInput.value = '';
  urlInput.value = '';
  openPopup (popupNewElement);
  resetFofm (popupNewElement, captionInput);
  resetFofm (popupNewElement, urlInput);
  const buttonElement = popupNewElement.querySelector('.popup__submit');
  buttonElement.setAttribute('disabled', true);
  buttonElement.classList.add('popup__submit_inactive');
};

//Закрытие popup по кнопке Esc 

function closeByEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  };
};

// Закрытие popup по клику по оверлею и кнопке "Закрыть"

const popups = document.querySelectorAll('.popup_input');
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    };
  });
})

// Функция, которая удаляет ошибки при повторном открытии

function resetFofm (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};