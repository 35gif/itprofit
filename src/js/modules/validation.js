export class Validator {
    constructor(form) {
        this.form = form;
        this.errors = {};
    }

    validateForm() {
        this.errors = {};
        const fields = this.form.querySelectorAll('input, textarea');

        fields.forEach(field => {
            const fieldName = field.name;
            const value = field.value.trim();

            switch (fieldName) {
                case 'name':
                    if (!this.validateName(value)) {
                        this.addError(field, 'Имя должно содержать только буквы и быть не короче 2 символов');
                    }
                    break;
                case 'email':
                    if (!this.validateEmail(value)) {
                        this.addError(field, 'Пожалуйста, введите корректный email адрес');
                    }
                    break;
                case 'phone':
                    if (!this.validatePhone(value)) {
                        this.addError(field, 'Введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX');
                    }
                    break;
                case 'message':
                    if (value.length < 10) {
                        this.addError(field, 'Сообщение должно содержать не менее 10 символов');
                    }
                    break;
                default:
                    if (value === '') {
                        this.addError(field, 'Это поле обязательно для заполнения');
                    }
            }
        });

        this.showErrors();
        return Object.keys(this.errors).length === 0;
    }

    validateName(name) {
        return /^[а-яА-ЯёЁa-zA-Z]{2,}$/.test(name);
    }

    validateEmail(email) {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return re.test(email.toLowerCase());
    }

    validatePhone(phone) {
        return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone);
    }

    addError(field, message) {
        this.errors[field.name] = message;
    }

    showErrors() {
        for (const [fieldName, errorMessage] of Object.entries(this.errors)) {
            const field = this.form.querySelector(`[name="${fieldName}"]`);
            this.showError(field, errorMessage);
        }
    }

    showError(field, message) {
        this.clearError(field);
        field.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }

    clearError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    clearAllErrors() {
        this.form.querySelectorAll('.error-message').forEach(el => el.remove());
        this.form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    }
}

export function validateForm(form) {
    let isValid = true;
    const fields = form.querySelectorAll('input, textarea');

    fields.forEach(field => {
        const fieldName = field.name;
        const value = field.value.trim();

        switch (fieldName) {
            case 'name':
                if (!validateName(value)) {
                    showError(field, 'Имя должно содержать только буквы и быть не короче 2 символов');
                    isValid = false;
                } else {
                    clearError(field);
                }
                break;
            case 'email':
                if (!validateEmail(value)) {
                    showError(field, 'Пожалуйста, введите корректный email адрес');
                    isValid = false;
                } else {
                    clearError(field);
                }
                break;
            case 'phone':
                if (!validatePhone(value)) {
                    showError(field, 'Введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX');
                    isValid = false;
                } else {
                    clearError(field);
                }
                break;
            case 'message':
                if (value.length < 10) {
                    showError(field, 'Сообщение должно содержать не менее 10 символов');
                    isValid = false;
                } else {
                    clearError(field);
                }
                break;
            default:
                if (value === '') {
                    showError(field, 'Это поле обязательно для заполнения');
                    isValid = false;
                } else {
                    clearError(field);
                }
        }
    });

    return isValid;
}

function validateName(name) {
    return /^[а-яА-ЯёЁa-zA-Z]{2,}$/.test(name);
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email.toLowerCase());
}

function validatePhone(phone) {
    return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone);
}

function showError(field, message) {
    clearError(field);
    field.classList.add('error');
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearError(field) {
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}
