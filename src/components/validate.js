function validateInput(inputEl, errorSpanEl, inputErrorClass) {
  if (inputEl.validity.valid) {
    errorSpanEl.textContent = "";
    inputEl.classList.remove(inputErrorClass);
  } else {
    errorSpanEl.textContent = inputEl.validationMessage;
    inputEl.classList.add(inputErrorClass);
  }
}

export function validateForm(formEl, submitButtonEl) {
  if (formEl.checkValidity()) {
    submitButtonEl.removeAttribute("disabled", "");
  } else {
    submitButtonEl.setAttribute("disabled", "");
  }
}

export function enableValidation(options) {
  const formElements = document.querySelectorAll(options.formSelector);
  for (const formElement of formElements) {
    const formInputs = formElement.querySelectorAll(options.inputSelector);
    const submitButton = formElement.querySelector(
      options.submitButtonSelector,
    );
    for (const inputEl of formInputs) {
      const errorSpanId = "error-" + inputEl.id;
      const errorSpanEl = document.getElementById(errorSpanId);
      inputEl.addEventListener("input", () => {
        validateInput(inputEl, errorSpanEl, options.inputErrorClass);
        validateForm(formElement, submitButton);
      });
    }
    validateForm(formElement, submitButton);
  }
}
