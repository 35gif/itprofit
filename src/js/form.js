import Inputmask from 'inputmask';
import { Api } from './modules/api';

const api = new Api('http://localhost:9090');

export function initForm() {
  const form = document.querySelector('.feedback-form');
  const phoneInput = form.querySelector('input[name="phone"]');

  Inputmask("+7 (999) 999-99-99").mask(phoneInput);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearMessages(form);

    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value,
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

function handleSuccess(form, msg) {
  form.reset();
  showMessage(form, msg, 'success');
}

function handleError(form, errors) {
  showMessage(form, 'Пожалуйста, исправьте ошибки в форме', 'error');

  for (const [field, errorMessage] of Object.entries(errors)) {
    const input = form.querySelector(`[name="${field}"]`);
    if (input) {
      input.classList.add('error');
      const errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.textContent = errorMessage;
      input.parentNode.appendChild(errorElement);
    }
  }
}

function showMessage(form, msg, type) {
  const messageElement = document.createElement('div');
  messageElement.className = `status-message ${type}`;
  messageElement.textContent = msg;
  form.appendChild(messageElement);
}

function clearMessages(form) {
  form.querySelectorAll('.status-message, .error-message').forEach(el => el.remove());
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}
