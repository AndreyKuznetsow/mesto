let profileEditButton = document.querySelector ('.profile__edit-button');
let profileName = document.querySelector ('.profile__name')
let profileProfession = document.querySelector ('.profile__profession')
let openPopup = document.querySelector ('.popup');

let formElement = document.querySelector ('.popup__container');
let closePopupButton = formElement.querySelector ('.popup__close');
let nameInput = formElement.querySelector ('.popup__input_name');
let jobInput = formElement.querySelector ('.popup__input_profession');

function popupOpenFunc () {
  openPopup.classList.add ('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
};

function popupCloseFunc () {
    openPopup.classList.remove ('popup_opened');
};

function formSubmitHandler (evt) {
    evt.preventDefault ();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    popupCloseFunc ();
};

profileEditButton.addEventListener ('click', popupOpenFunc);
closePopupButton.addEventListener ('click', popupCloseFunc);
formElement.addEventListener ('submit', formSubmitHandler);