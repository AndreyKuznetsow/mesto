const template = document.querySelector('.template').content;
const elements = document.querySelector('.elements');
const initialCardsReversed = initialCards.reverse();

function render() {
  initialCardsReversed.forEach((card) => {
    insertElement(renderElement(card));
  });
};

function renderElement(text) {
  const newElement = template.cloneNode(true);
  const newFoto = newElement.querySelector('.element__foto');
  newFoto.src =  text.link;
  newFoto.alt = text.name;
  newElement.querySelector('.element__caption').textContent = text.name;
  newElement.querySelector('.element__delete-button').addEventListener('click', deleteElement);
  newFoto.addEventListener('click', () => openPopupImageView (text));
  newElement.querySelector('.element__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like-button_active')});
  return newElement;
};

render();

function insertElement (element) {
  elements.prepend(element);
};

//Profile popup

const profileEditButton = document.querySelector ('.profile__edit-button');
const profileName = document.querySelector ('.profile__name');
const profileProfession = document.querySelector ('.profile__profession');
const popupProfile = document.querySelector ('.popup_profile');

const formProfile = popupProfile.querySelector ('.popup__container');
const nameInput = formProfile.querySelector ('.popup__input_type_name');
const jobInput = formProfile.querySelector ('.popup__input_type_profession');

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

function closePopupProfile () {
  closePopup (popupProfile);
};

function openPopup  (popup) {
  popup.classList.add ('popup_opened');
  document.addEventListener('keydown', closeByEsc); 
};

function closePopup (popup) {
  document.removeEventListener('keydown', closeByEsc);
  popup.classList.remove ('popup_opened');
  
};

function updateFormProfile (evt) {
  evt.preventDefault ();
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

function createNewElement(evt) {
  evt.preventDefault ();
  const newCard = {
    name: captionInput.value,
    link: urlInput.value
  };
  insertElement(renderElement(newCard));
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

// Удаление элементов

function deleteElement(event) {
  event.target.closest('.element').remove();
};

//popup_Image

const popupImageView = document.querySelector('.popup_image');
const viewUrl = popupImageView.querySelector('.popup__foto');
const viewCaption = popupImageView.querySelector('.popup__caption');

function openPopupImageView (text) {
  viewUrl.src = text.link;
  viewUrl.alt = text.name;
  viewCaption.textContent = text.name;
  openPopup (popupImageView);
};

//закрытие popup при нажатии Esc

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

// Функция, которая удаляет ошибки при повторном открытии

function resetFofm (formElement, inputElement) {
  errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};