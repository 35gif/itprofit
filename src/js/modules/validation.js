export class Validator {
    constructor(form) {
        this.form = form;
        this.errors = {};
    }

    validateField(name, value) {
        const errorMessages = {
            name: 'Имя обязательно для заполнения',
            email: {
                required: 'Email обязателен для заполнения',
                invalid: 'Неверный формат email',
            },
            phone: {
                required: 'Телефон обязателен для заполнения',
                invalid: 'Неверный формат телефона',
            },
            message: 'Сообщение обязательно для заполнения',
        };

        if (!value.trim()) {
            return errorMessages[name]?.required || errorMessages.message;
        }

        if (name === 'email' && !this.validateEmail(value)) {
            return errorMessages.email.invalid;
        }

        if (name === 'phone' && !this.validatePhone(value)) {
            return errorMessages.phone.invalid;
        }

        return null;
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    validatePhone(phone) {
        return phone.replace(/\D/g, '').length === 11;
    }

    validate() {
        this.errors = {};
        const formData = new FormData(this.form);

        for (const [name, value] of formData.entries()) {
            const error = this.validateField(name, value);
            if (error) this.errors[name] = error;
        }

        return Object.keys(this.errors).length === 0;
    }

    showErrors() {
        this.clearErrors();

        Object.entries(this.errors).forEach(([name, message]) => {
            const field = this.form.querySelector(`[name="${name}"]`);
            const errorElement = field.nextElementSibling;

            field.classList.add('error');
            errorElement.textContent = message;
            errorElement.classList.add('active');
        });
    }

    clearErrors() {
        this.form.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.classList.remove('active');
        });
        this.form.querySelectorAll('input, textarea').forEach(el => {
            el.classList.remove('error');
        });
    }
}