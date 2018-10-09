import './style.css';
import configElevators from './configElevators';
import { form, buildingStructure } from './ui';
import { selectElevator, asignFloorToElevator } from './elevatorController';

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

  elevators = [...configElevators(nElevators, nFloors)];
  settingsSection.parentNode.removeChild(settingsSection);

  // Building Creation
  mainContainer.insertAdjacentHTML('beforeend', buildingStructure(nFloors, nElevators));

  const floorButtons = document.getElementsByClassName('floor-button');
  Array.prototype.forEach.call(floorButtons, (el) => {
    el.addEventListener('click', (e) => {
      const floor = Number(e.target.dataset.floor);
      const dir = Number(e.target.dataset.dir);

      const floorCall = { floor, dir };
      // Select Elevator
      const elevatorId = selectElevator(floorCall, elevators, nFloors);
      // Asign to Elevator
      asignFloorToElevator.call(elevators[elevatorId], { floor, dir });

      console.log(elevators);
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
