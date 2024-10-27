import Inputmask from 'inputmask';
import { Validator } from './validation';
import { Api } from './api';
import { Modal } from './modal';

export class FeedbackForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.validator = new Validator(this.form);
        this.api = new Api('http://localhost:9090');
        this.modal = new Modal('modal');

        this.initialize();
    }

    initialize() {
        const phoneInput = this.form.querySelector('input[name="phone"]');
        Inputmask({ mask: '+7 (999) 999-99-99' }).mask(phoneInput);
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(event) {
        event.preventDefault();

        if (!this.validator.validate()) {
            this.validator.showErrors();
            return;
        }

        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            const response = await this.api.sendForm(data);

            if (response.status === 'success') {
                this.handleSuccess(response.msg);
            }
        } catch (error) {
            if (error.status === 'error' && error.fields) {
                this.handleValidationErrors(error.fields);
            } else {
                this.handleError('Произошла ошибка при отправке формы');
            }
        }
    }

    handleSuccess(message) {
        this.form.reset();
        this.validator.clearErrors();

        this.modal.setContent(`
            <h2>Успех!</h2>
            <p>${message}</p>
        `);
        this.modal.open();
    }

    handleValidationErrors(fields) {
        this.validator.errors = fields;
        this.validator.showErrors();
    }

    handleError(message) {
        this.modal.setContent(`
            <h2>Ошибка</h2>
            <p>${message}</p>
        `);
        this.modal.open();
    }
}