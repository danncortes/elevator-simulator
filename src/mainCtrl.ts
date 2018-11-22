import { configElevators } from './elevatorModel';

import {
  form,
  buildingStructure,
  logArea,
  resetButton,
  systemStructure
} from './ui/uiCtrl';

import { createLogStructure } from './logCtrl/logCtrl';

import {
  onClickElevatorCallButton,
} from './elevatorCtrl/elevatorCtrl';

import {
  FloorCalledFrom,
} from './types/types';

export function buildForm(mainContainer: Element): void {
  // Create Form
  (mainContainer && mainContainer.insertAdjacentHTML('beforeend', form));
}

export function createBuilding(mainContainer) {
  return new Promise((resolve, reject) => {

    let elevators = {};

    const createBuildingButton = document.querySelector('.create-building');;
    const settingsSection: Element = document.querySelector('.settings');
    const inputFloor: HTMLFormElement = document.querySelector('#floors');
    const inputElevators: HTMLFormElement = document.querySelector('#elevators');
    const builderForm: HTMLFormElement = document.querySelector('.initial-setting-form');

    let resetBtn;
    // Config Building
    createBuildingButton.addEventListener('click', (e) => {
      const isValidForm: boolean = builderForm.checkValidity();
      if (isValidForm) {
        const nElevators: number = Number(inputElevators.value);
        const nFloors: number = Number(inputFloor.value);

        elevators = configElevators(nElevators, nFloors);
        // Remove Form
        settingsSection.parentNode.removeChild(settingsSection);

        //Create system container
        mainContainer.insertAdjacentHTML('beforeend', systemStructure);
        const systemContainer = document.querySelector('.system-container');
        const buildingArea = document.querySelector('.building-area');

        //Insert reset Button
        systemContainer.insertAdjacentHTML('afterbegin', resetButton);
        resetBtn = document.querySelector('.reset-button');

        // Building Creation
        buildingArea.insertAdjacentHTML('beforeend', buildingStructure(nFloors, nElevators));

        // Log Area creation
        const logContainer: Element = document.querySelector('.log-container');
        logContainer.insertAdjacentHTML('beforeend', createLogStructure(elevators));

        // Getting all the buttons by floor
        const floorButtons = document.getElementsByClassName('floor-button');

        Array.prototype.forEach.call(floorButtons, (el) => {
          el.addEventListener('click', (ev) => {
            elevators = onClickElevatorCallButton(ev, elevators, nFloors);
          });
        });
        resolve(resetBtn)
      }
    })
  })
}