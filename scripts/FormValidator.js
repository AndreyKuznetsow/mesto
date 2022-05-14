export class FormValidator {

  constructor (config, currentForm) {
    this._form = currentForm;
    this._config = config;
    this._inputList = Array.from(this._form.querySelectorAll(config.inputSelector));
    this._buttonElement = this._form.querySelector(config.submitSelector);
  };

  enableValidation () {   
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._config.submitInactiveSelector);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._config.submitInactiveSelector);
      this._buttonElement.removeAttribute('disabled');
      };
  };

  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
        this._hideInputError(inputElement);
      }
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._config.inputTypeError);
    errorElement.classList.add(this._config.errorCaption);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputTypeError);
    errorElement.classList.remove(this._config.errorCaption);
    errorElement.textContent = '';
  };

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  resetFofm () {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => this._hideInputError(inputElement));     
  };
};