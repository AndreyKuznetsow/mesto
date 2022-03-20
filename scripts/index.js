const template = document.querySelector('.template').content;
const elements = document.querySelector('.elements');
initialCardsReversed = initialCards.reverse();

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
  newElement.querySelector('.element__delete-button').addEventListener('click', hendleDelete);
  newFoto.addEventListener('click', () => openPopupImageViewFunc(text));
  newElement.querySelector('.element__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like-button_active')});
  return newElement;
}

render();

function insertElement (element) {
  elements.prepend(element);
};

//Profile popup

const profileEditButton = document.querySelector ('.profile__edit-button');
const profileName = document.querySelector ('.profile__name')
const profileProfession = document.querySelector ('.profile__profession')
const popupProfile = document.querySelector ('.popup_profile');

const formProfile = popupProfile.querySelector ('.popup__container');
const profilePopupClose = formProfile.querySelector ('.popup__close');
const nameInput = formProfile.querySelector ('.popup__input_type_name');
const jobInput = formProfile.querySelector ('.popup__input_type_profession');

function openPopupProfileFunc () {
  openPopupFunc(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}

function closePopupProfileFunc () {
  closePopupFunc (popupProfile);
}

function openPopupFunc (popup) {
  popup.classList.add ('popup_opened');  
};

function closePopupFunc (popup) {
  popup.classList.remove ('popup_opened');
};

function submitHandlerFormProfile (evt) {
  evt.preventDefault ();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopupFunc (popupProfile);
};

profileEditButton.addEventListener ('click', openPopupProfileFunc);
profilePopupClose.addEventListener ('click', closePopupProfileFunc);
formProfile.addEventListener ('submit', submitHandlerFormProfile);

//popup_NewElement

const elementAddButton = document.querySelector('.profile__add-button');
const popupNewElement = document.querySelector('.popup_new-element');

const formNewElement = popupNewElement.querySelector('.popup__container');
const closeNewElementPopup = formNewElement.querySelector('.popup__close');
const captionInput = formNewElement.querySelector('.popup__input_type_caption');
const urlInput = formNewElement.querySelector('.popup__input_type_url')


elementAddButton.addEventListener('click', openPopupNewElementFunc);
closeNewElementPopup.addEventListener('click', closePopupNewElementFunc);
formNewElement.addEventListener('submit', submitHandlerFormNewElement);

function submitHandlerFormNewElement(evt) {
  evt.preventDefault ();
  if (captionInput.value === '' || urlInput.value === '') {
    closePopupFunc (popupNewElement);
  } else {
      const newCard = {
      name: captionInput.value,
      link: urlInput.value
    };
    insertElement(renderElement(newCard));
    closePopupFunc (popupNewElement);
  }
}

function openPopupNewElementFunc () {
  captionInput.value = '';
  urlInput.value = '';
  openPopupFunc (popupNewElement);
};

function closePopupNewElementFunc() {
  closePopupFunc(popupNewElement);
};

// Удаление элементов

function hendleDelete(event) {
  event.target.closest('.element').remove();
};

//popup_Image

const popupImageView = document.querySelector('.popup_Image');
const popupImageViewClose = popupImageView.querySelector('.popup__close');
const viewUrl = popupImageView.querySelector('.popup__foto');
const viewCaption = popupImageView.querySelector('.popup__caption');

popupImageViewClose.addEventListener('click', сlosePopupImageViewFunc);

function сlosePopupImageViewFunc() {
  closePopupFunc(popupImageView);
};

function openPopupImageViewFunc(text) {
  viewUrl.src = text.link;
  viewUrl.alt = text.name;
  viewCaption.textContent = text.name;
  openPopupFunc(popupImageView);
};