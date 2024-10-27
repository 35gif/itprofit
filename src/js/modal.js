export class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.overlay = this.modal.querySelector('.modal__overlay');
        this.closeBtn = this.modal.querySelector('.modal__close');
        this.isOpen = false;

        this.bindEvents();
    }

    bindEvents() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;
    }

    setContent(html) {
        const content = this.modal.querySelector('.modal__content');
        content.innerHTML = html;
        content.insertAdjacentHTML('beforeend', '<button class="modal__close">&times;</button>');
        this.closeBtn = this.modal.querySelector('.modal__close');
        this.bindEvents();
    }
}

export function initModal() {
    const openButton = document.querySelector('.open-modal');
    const modal = document.querySelector('.modal');
    const closeButton = modal.querySelector('.close-modal');

    openButton.addEventListener('click', () => {
        openModal(modal);
    });

    closeButton.addEventListener('click', () => {
        closeModal(modal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('open')) {
            closeModal(modal);
        }
    });
}

function openModal(modal) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.classList.add('modal-open');
    modal.classList.add('open');
}

function closeModal(modal) {
    modal.classList.remove('open');
    setTimeout(() => {
        document.body.classList.remove('modal-open');
        document.body.style.paddingRight = '';
    }, 300);
}
