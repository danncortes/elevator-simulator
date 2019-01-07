import { configElevators } from './buildingModel';

import { form, buildingStructure, resetButton, systemStructure } from './ui/uiCtrl';

import { createLogStructure } from './log/logCtrl';

import { BuildingInterface } from './interfaces';

import { onClickElevatorCallButton } from './elevator/elevatorCtrl';

export function buildForm(mainContainer: Element): void {
  // Create Form
  mainContainer && mainContainer.insertAdjacentHTML('beforeend', form);
}

export function createBuilding(mainContainer) {
  return new Promise((resolve, reject) => {
    let building: BuildingInterface;

    const createBuildingButton = document.querySelector('.create-building');
    const settingsSection: Element = document.querySelector('.settings');
    const inputFloor: HTMLFormElement = document.querySelector('#floors');
    const inputElevators: HTMLFormElement = document.querySelector('#elevators');
    const queueCheck: HTMLFormElement = document.querySelector('#queue-check');
    const builderForm: HTMLFormElement = document.querySelector('.initial-setting-form');

    let resetBtn;
    // Config Building
    createBuildingButton.addEventListener('click', (e) => {
      const isValidForm: boolean = builderForm.checkValidity();
      if (isValidForm) {
        const nElevators: number = Number(inputElevators.value);
        const nFloors: number = Number(inputFloor.value);
        const queueType: boolean = queueCheck.value;

        building = configElevators(nElevators, nFloors);
        // Remove Form
        settingsSection.parentNode.removeChild(settingsSection);

        // Create system container
        mainContainer.insertAdjacentHTML('beforeend', systemStructure);
        const systemContainer = document.querySelector('.system-container');
        const buildingArea = document.querySelector('.building-area');

        // Insert reset Button
        systemContainer.insertAdjacentHTML('afterbegin', resetButton);
        resetBtn = document.querySelector('.reset-button');

        // Building Creation
        buildingArea.insertAdjacentHTML(
          'beforeend',
          buildingStructure(nFloors, nElevators, queueType)
        );
        // Log Area creation
        const logContainer: Element = document.querySelector('.log-container');
        logContainer.insertAdjacentHTML('beforeend', createLogStructure(building.elevators));

        // Getting all the buttons by floor
        const floorButtons = document.getElementsByClassName('floor-button');

        Array.prototype.forEach.call(floorButtons, (el) => {
          el.addEventListener('click', (ev) => {
            building.elevators = onClickElevatorCallButton(ev, building, nFloors);
          });
        });
        resolve(resetBtn);
      }
    });
  });
}
