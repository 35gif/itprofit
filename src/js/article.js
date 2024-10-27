export function initArticle() {
  const article = document.querySelector('.article');
  const toggleButton = article.querySelector('.toggle-article');
  const content = article.querySelector('.article-content');

  toggleButton.addEventListener('click', () => {
    content.classList.toggle('collapsed');
    toggleButton.textContent = content.classList.contains('collapsed') ? 'Развернуть' : 'Свернуть';
  });
}
