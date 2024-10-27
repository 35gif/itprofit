import Inputmask from 'inputmask';
import { Api } from './modules/api';
import { Validator } from './modules/validation';

const api = new Api('http://localhost:9090');

export function initForm() {
  const form = document.querySelector('.feedback-form');
  const phoneInput = form.querySelector('input[name="phone"]');
  const validator = new Validator(form);

  // Обновленные настройки Inputmask
  const maskOptions = {
    mask: "+7 (999) 999-99-99",
    showMaskOnHover: false,
    inputmode: "tel",
    onBeforePaste: function (pastedValue, opts) {
      const cleanedValue = pastedValue.replace(/[^0-9]/g, '');
      return '+7' + cleanedValue.slice(-10);
    }
  };

  Inputmask(maskOptions).mask(phoneInput);

  // Обработчик вставки для телефона
  phoneInput.addEventListener('paste', function(e) {
    e.preventDefault();
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    const cleanedValue = pastedText.replace(/[^0-9]/g, '');
    const formattedValue = '+7' + cleanedValue.slice(-10);
    setTimeout(() => {
      this.inputmask.setValue(formattedValue);
      this.dispatchEvent(new Event('input'));
    }, 0);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    validator.clearAllErrors();

    if (!validator.validateForm()) {
      return; // Прекращаем отправку формы, если есть ошибки валидации
    }

    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
    };

    try {
      const response = await api.sendForm(formData);
      
      if (response.status === 'success') {
        handleSuccess(form, response.message);
      } else if (response.status === 'error') {
        handleError(form, response.errors);
      } else {
        throw new Error('Неизвестный статус ответа');
      }
    } catch (error) {
      console.error('Error:', error);
      handleError(form, { general: 'Произошла ошибка при отправке формы' });
    }
  });
}

function handleSuccess(form, message) {
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.textContent = message;
  form.appendChild(successMessage);
  form.reset();
}

function handleError(form, errors) {
  Object.entries(errors).forEach(([field, message]) => {
    const input = form.querySelector(`[name="${field}"]`);
    if (input) {
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      input.parentNode.insertBefore(errorElement, input.nextSibling);
      input.classList.add('error');
    }
  });
}

function clearMessages(form) {
  form.querySelectorAll('.error-message, .success-message').forEach(el => el.remove());
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}
