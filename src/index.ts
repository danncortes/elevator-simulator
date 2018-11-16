import './style.scss';
import {
  buildForm,
  createBuilding
} from './mainCtrl';

function initSystem(): void {

  const mainContainer: Element = document.querySelector('.main-container');
  // Build form
  buildForm(mainContainer);

  createBuilding(mainContainer).then((res: Element) => {
    const resetButton = res;
    resetButton.addEventListener('click', () => {
      const systemContainer: Element = document.querySelector('.system-container');
      systemContainer.parentNode.removeChild(systemContainer);
      initSystem();
    })
  })
}

initSystem();
