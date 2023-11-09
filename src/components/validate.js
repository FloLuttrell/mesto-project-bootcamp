export function enableValidation(options) {
    const formElements = document.querySelectorAll(options.formSelector);
    for (const formElement of formElements) {
        const formInputs = formElement.querySelectorAll(options.inputSelector);
        const submitButton = formElement.querySelector(
            options.submitButtonSelector
        );
        for (const inputEl of formInputs) {
            const errorSpanId = "error-" + inputEl.id;
            const errorSpanEl = document.getElementById(errorSpanId);
            inputEl.addEventListener("input", function () {
                if (inputEl.validity.valid) {
                    errorSpanEl.textContent = "";
                    inputEl.classList.remove(options.inputErrorClass);
                } else {
                    errorSpanEl.textContent = inputEl.validationMessage;
                    inputEl.classList.add(options.inputErrorClass);
                }
                if (formElement.checkValidity()) {
                    submitButton.removeAttribute('disabled', '');
                } else {
                    submitButton.setAttribute('disabled', '');
                }
            });
        }
    }
}