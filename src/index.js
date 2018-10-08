import './style.css';
import configElevators from './configElevators';
import { form, buildingStructure } from './ui';

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
