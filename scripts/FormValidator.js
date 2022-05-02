export class FormValidator {
  constructor (config, currentForm) {
    this._form = currentForm;
    this._config = config;
  };

  enableValidation () {   
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._form, this._config);
  };

  _setEventListeners = (formElement,  config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitSelector);
    this._toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement, config);
        this._toggleButtonState(inputList, buttonElement, config);
      });
    });
  };

  _toggleButtonState(inputList, buttonElement, config) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.submitInactiveSelector);
      buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(config.submitInactiveSelector);
        buttonElement.removeAttribute('disabled');
      };
  };

  _isValid = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        this._hideInputError(formElement, inputElement, config);
      }
  };

  _showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(config.inputTypeError);
    errorElement.classList.add(config.errorCaption);
  };

  _hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputTypeError);
    errorElement.classList.remove(config.errorCaption);
    errorElement.textContent = '';
  };

  _hasInvalidInput (inputhList) {
    return inputhList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
};