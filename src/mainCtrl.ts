import {
  form
} from './ui/uiCtrl';

export function buildForm(mainContainer: Element): Element {
  // Create Form
  (mainContainer && mainContainer.insertAdjacentHTML('beforeend', form));
  return document.querySelector('.create-building');
}