import './style.scss';
import { configElevators } from './elevatorModel';
import {
  form,
  buildingStructure,
  logArea,
  createLogStructure,
  resetButton
} from './ui/uiCtrl';
import {
  selectElevator,
  asignFloorToElevator,
  runElevator,
  isAlreadyCalled,
  isAtTheFloor,
} from './elevatorCtrl';

import {
  FloorCalledFrom,
  SelectElevator
} from './types/types';

let elevators: {};

const mainContainer: Element = document.querySelector('.main-container');

// Create Form
mainContainer.insertAdjacentHTML('beforeend', form);

const settingsSection: Element = document.querySelector('.settings');
const createBuildingButton: Element = document.querySelector('.create-building');
const inputFloor: HTMLFormElement = document.querySelector('#floors');
const inputElevators: HTMLFormElement = document.querySelector('#elevators');
const buildForm: HTMLFormElement = document.querySelector('.initial-setting-form');

// Config Building
createBuildingButton.addEventListener('click', (e) => {
  const isValidForm: boolean = buildForm.checkValidity();
  if (isValidForm) {
    const nElevators: number = Number(inputElevators.value);
    const nFloors: number = Number(inputFloor.value);

    elevators = configElevators(nElevators, nFloors);
    // Remove Form
    settingsSection.parentNode.removeChild(settingsSection);

    mainContainer.insertAdjacentHTML('beforeend', resetButton);
    const resetBtn = document.querySelector('.reset-button');

    // Building Creation
    mainContainer.insertAdjacentHTML('beforeend', buildingStructure(nFloors, nElevators));

    // Log Area creation
    mainContainer.insertAdjacentHTML('beforeend', logArea);

    const buildingAreaToRemove = document.querySelector('.building-area');
    const logAreaToRemove = document.querySelector('.log-area');

    resetBtn.addEventListener('click', (e) => {
      location.reload();
    })

    const logContainer: Element = document.querySelector('.log-container');
    if (logContainer) {
      logContainer.insertAdjacentHTML('beforeend', createLogStructure(elevators));
    }
    /** Getting all the buttons by floor */
    const floorButtons = document.getElementsByClassName('floor-button');

    Array.prototype.forEach.call(floorButtons, (el) => {

      el.addEventListener('click', (ev) => {

        const floor: number = Number(ev.target.dataset.floor);
        const dir: number = Number(ev.target.dataset.dir);

        const calledFromFloor: FloorCalledFrom = { floor, dir };
        // Select Elevator to asign floor
        const isCalledAlready: boolean = isAlreadyCalled(calledFromFloor, elevators);
        const isAtTheSameFloor: boolean = isAtTheFloor(calledFromFloor, elevators);

        if (!isCalledAlready && !isAtTheSameFloor) {
          ev.target.classList.add('active');
          const elevatorId: number = selectElevator(calledFromFloor, elevators, nFloors);
          // Asign floor to Elevator
          const elevatorQueue = elevators[elevatorId].queue;
          if (!elevatorQueue[1].length && !elevatorQueue[2].length) {
            asignFloorToElevator.call(elevators[elevatorId], calledFromFloor);
            // Run Elevator
            elevators[elevatorId].startEngine();
          } else {
            asignFloorToElevator.call(elevators[elevatorId], calledFromFloor);
          }
        }
      });
    });
  }
});
