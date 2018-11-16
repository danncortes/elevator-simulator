import './style.scss';
import { configElevators } from './elevatorModel';
import {
  buildForm,
  createBuilding
} from './mainCtrl';

import {
  form,
  buildingStructure,
  logArea,
  createLogStructure,
} from './ui/uiCtrl';
import {
  selectElevator,
  asignFloorToElevator,
  isAlreadyCalled,
  isAtTheFloor,
} from './elevatorCtrl';

import {
  FloorCalledFrom,
  SelectElevator
} from './types/types';

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
