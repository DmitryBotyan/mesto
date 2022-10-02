const popupEditModalWindow = document.forms.edit;
const popupAddModalWindow = document.forms.add;

function isValidField(input) {
    const errorSpan = input.parentNode.querySelector(`#${input.id}-error`);
    errorSpan.textContent = input.validationMessage;
};

function buttonIsActive(button, state) {
    if (state) {
        button.classList.remove('popup__button_disabled');
        button.removeAttribute('disabled');
    }
    else {
        button.classList.add('popup__button_disabled');
        button.setAttribute('disabled');
    }
};

function handleValidateInput(evt) {
    const currentForm = evt.currentTarget;
    const popupModalWindowSubmitButton = currentForm.querySelector('.button');
    isValidField(evt.target);
    if (currentForm.checkValidity()) {
        buttonIsActive(popupModalWindowSubmitButton, true)
    }
    else {popupModalWindowSubmitButton
        buttonIsActive(popupModalWindowSubmitButton, false)
    }
};

popupAddModalWindow.addEventListener('input', handleValidateInput);
popupEditModalWindow.addEventListener('input', handleValidateInput);