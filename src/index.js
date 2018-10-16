import './style.css';
import configElevators from './elevatorModel';
import {
  form, buildingStructure, logArea, createLogStructure,
} from './uiCtrl';
import {
  selectElevator, asignFloorToElevator, runElevator, selectNextFloor, isAlreadyCalled, isAtTheFloor,
} from './elevatorCtrl';

let elevators = [];

const mainContainer = document.querySelector('.main-container');

// Create Form
mainContainer.insertAdjacentHTML('beforeend', form);

const settingsSection = document.querySelector('.settings');
const createBuildingButton = document.querySelector('.create-building');
const inputFloor = document.querySelector('#floors');
const inputElevators = document.querySelector('#elevators');

// Config Building
createBuildingButton.addEventListener('click', (e) => {
  e.preventDefault();
  const nElevators = Number(inputElevators.value);
  const nFloors = Number(inputFloor.value);

  elevators = configElevators(nElevators, nFloors, runElevator, selectNextFloor);
  // Remove Form
  settingsSection.parentNode.removeChild(settingsSection);

  // Building Creation
  mainContainer.insertAdjacentHTML('beforeend', buildingStructure(nFloors, nElevators));

  // Log Area creation
  mainContainer.insertAdjacentHTML('beforeend', logArea);

  const logContainer = document.querySelector('.log-container');
  if (logContainer) {
    logContainer.insertAdjacentHTML('beforeend', createLogStructure(elevators));
  }

  const floorButtons = document.getElementsByClassName('floor-button');
  Array.prototype.forEach.call(floorButtons, (el) => {
    el.addEventListener('click', (ev) => {
      const floor = Number(ev.target.dataset.floor);
      const dir = Number(ev.target.dataset.dir);

      const floorCall = { floor, dir };
      // Select Elevator to asign floor
      const isCalledAlready = isAlreadyCalled(floorCall, elevators);
      const isAtTheSameFloor = isAtTheFloor(floorCall, elevators);

      if (!isCalledAlready && !isAtTheSameFloor) {
        const elevatorId = selectElevator(floorCall, elevators, nFloors);
        // Asign floor to Elevator
        const elevatorQueue = elevators[elevatorId].queue;
        if (!elevatorQueue[1].length && !elevatorQueue[2].length) {
          asignFloorToElevator.call(elevators[elevatorId], { floor, dir });
          // Run Elevator
          elevators[elevatorId].startEngine();
        } else {
          asignFloorToElevator.call(elevators[elevatorId], { floor, dir });
        }
      }
    });
  });
});

const floorButton = document.querySelector('.floor-button');
if (floorButton) {
  floorButton.addEventListener('click', () => {
    if (!elevators[0].queue.length) {
      elevators[0].queue.push(8);
      elevators[0].startEngine();
    }
    elevators[0].queue.push(8);
  });
}
