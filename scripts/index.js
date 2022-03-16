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

const template = document.querySelector('.template').content;
const elements = document.querySelector('.elements');
reversInitialCards = initialCards.reverse();

function render() {
  reversInitialCards.forEach(renderElement);
};

function renderElement(text) {
  const newElement = template.cloneNode(true);
  newElement.querySelector('.element__foto').src =  text.link;
  newElement.querySelector('.element__caption').textContent = text.name;
  newElement.querySelector('.element__delete-button').addEventListener('click', hendleDelete);
  newElement.querySelector('.element__foto').addEventListener('click', popupImageViewOpenFunc);
  newElement.querySelector('.element__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like-button_active')});
  elements.prepend(newElement);
}

render();

//Profile popup

const profileEditButton = document.querySelector ('.profile__edit-button');
const profileName = document.querySelector ('.profile__name')
const profileProfession = document.querySelector ('.profile__profession')
const openPopupProfile = document.querySelector ('.popup_profile');

const formProfile = openPopupProfile.querySelector ('.popup__container');
const closeProfilePopupButton = formProfile.querySelector ('.popup__close');
const nameInput = formProfile.querySelector ('.popup__input_type_name');
const jobInput = formProfile.querySelector ('.popup__input_type_profession');

function openPopupProfileFunc () {
  openPopupFunc(openPopupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
}

function closePopupProfileFunc () {
  closePopupFunc (openPopupProfile);
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
  closePopupFunc (openPopupProfile);
};

profileEditButton.addEventListener ('click', openPopupProfileFunc);
closeProfilePopupButton.addEventListener ('click', closePopupProfileFunc);
formProfile.addEventListener ('submit', submitHandlerFormProfile);

//popup_NewElement

const addElementButton = document.querySelector('.profile__add-button');
const openPopupNewElement = document.querySelector('.popup_NewElement');

const formNewElement = openPopupNewElement.querySelector('.popup__container');
const closeNewElementPopup = formNewElement.querySelector('.popup__close');
const captionInput = formNewElement.querySelector('.popup__input_type_caption');
const urlInput = formNewElement.querySelector('.popup__input_type_url')


addElementButton.addEventListener('click', openPopupNewElementFunc);
closeNewElementPopup.addEventListener('click', closePopupNewElementFunc);
formNewElement.addEventListener('submit', submitHandlerFormNewElement);

function submitHandlerFormNewElement(evt) {
  evt.preventDefault ();
  if (captionInput.value === '' || urlInput.value === '') {
    closePopupFunc (openPopupNewElement);
  } else {
      let newCard = {
      name: captionInput.value,
      link: urlInput.value
    };
    renderElement(newCard);
    closePopupFunc (openPopupNewElement);
  }
}

function openPopupNewElementFunc () {
  captionInput.value = '';
  urlInput.value = '';
  openPopupFunc (openPopupNewElement);
};

function closePopupNewElementFunc() {
  closePopupFunc(openPopupNewElement);
};

// Удаление элементов

function hendleDelete(event) {
  event.target.closest('.element').remove();
};

//popup_Image

const openPopupImageView = document.querySelector('.popup_Image');
const closePopupImageView = openPopupImageView.querySelector('.popup__close');
const viewUrl = openPopupImageView.querySelector('.popup__foto');
const viewCaption = openPopupImageView.querySelector('.popup__caption');

closePopupImageView.addEventListener('click', сlosePopupImageViewFunc);

function сlosePopupImageViewFunc() {
  closePopupFunc(openPopupImageView);
};

function popupImageViewOpenFunc(event) {
  viewUrl.src = event.target.src;
  viewCaption.textContent = event.target.closest('.element').querySelector('.element__caption').textContent;
  openPopupFunc(openPopupImageView);
};