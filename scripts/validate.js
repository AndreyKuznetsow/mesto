// Функция, которая добавляет класс с ошибкой

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(config.inputTypeError);
  errorElement.classList.add(config.errorCaption);
};

// Функция, которая удаляет класс с ошибкой

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputTypeError);
  errorElement.classList.remove(config.errorCaption);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}; 

//Установка отработчика событий для всех элементов

const setEventListeners = (formElement,  config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

enableValidation({
  formSelector: 'form.popup__container',
  inputSelector: '.popup__input',
  submitSelector:  '.popup__submit',
  submitInactiveSelector: 'popup__submit_inactive',
  inputTypeError: 'popup__input_type_error',
  errorCaption: 'popup__input-error_active'
});

// Проверка всех полей на валидность

function hasInvalidInput (inputhList) {
  return inputhList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

//Выключение кнопки при невалидном поле

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.submitInactiveSelector);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(config.submitInactiveSelector);
    buttonElement.removeAttribute('disabled');
    };
};