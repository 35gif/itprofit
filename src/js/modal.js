export class Modal {
    constructor(modalSelector) {
        this.modal = document.querySelector(modalSelector);
        this.overlay = this.modal.querySelector('.modal-overlay');
        this.closeBtn = this.modal.querySelector('.close-modal');
        this.openBtn = document.querySelector('.open-modal');
        this.isOpen = false;

        this.bindEvents();
    }

    bindEvents() {
        this.openBtn.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    open() {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.body.classList.add('modal-open');
        this.modal.classList.add('open');
        this.isOpen = true;
    }

    close() {
        this.modal.classList.remove('open');
        setTimeout(() => {
            document.body.classList.remove('modal-open');
            document.body.style.paddingRight = '';
            this.isOpen = false;
        }, 300);
    }
}

export function initModal() {
    new Modal('.modal');
}
