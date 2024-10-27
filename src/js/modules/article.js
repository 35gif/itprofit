export class Article {
    constructor(articleSelector) {
      this.article = document.querySelector(articleSelector);
      this.content = this.article.querySelector('.article__content');
      this.toggleBtn = this.article.querySelector('.article__toggle');
      this.isExpanded = false;
  
      this.initialize();
    }
  
    initialize() {
      this.toggleBtn.addEventListener('click', () => this.toggle());
    }
  
    toggle() {
      this.isExpanded = !this.isExpanded;
      this.content.classList.toggle('expanded');
      this.toggleBtn.textContent = this.isExpanded ? 'Свернуть' : 'Развернуть';
    }
  }