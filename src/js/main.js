import '../scss/main.scss';
import { initForm } from './form';
import { initModal } from './modal';
import { initArticle } from './article';

document.addEventListener('DOMContentLoaded', () => {
  initForm();
  initModal();
  initArticle();
});
