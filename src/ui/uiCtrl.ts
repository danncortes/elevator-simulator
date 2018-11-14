import _ from 'lodash';
import config from '../config';
import formGroup from './formGroup';

export const resetButton = (`
  <div class="reset-bnt-container">
    <button class="reset-button">Reset</button>
  </div>
`)

function createFloorNumbers(floors: number): string {
  let floorsStructure: string = '';
  for (let i = floors; i >= 1; i--) {
    floorsStructure += `<div class="number">${i}</div>`;
  }
  return floorsStructure;
}

function createFloors(floors: number): string {
  let floorDivider: string = '';
  for (let i = 2; i <= floors; i++) {
    floorDivider += '<div class="floor"></div>';
  }
  return floorDivider;
}

function createElevatorsStructure(elevators: number, floors: number): string {
  let elevatorStructure = '';
  const elevatorLaneHeight = config.building.elevatorLaneHeight(floors);
  const { elevatorWidth, elevatorHeight } = config.building;
  for (let i = 1; i <= elevators; i++) {
    elevatorStructure += (
      `<div class="elevator-lane" style="height:${elevatorLaneHeight}px">
        <div class="elevator" data-elevator="${i}" style="width:${elevatorWidth}px; height:${elevatorHeight}px"></div>
      </div>`
    );
  }
  return elevatorStructure;
}

function insertControls(floor: number, floors: number): string {
  const buttonUp = `<div class="floor-button up" data-dir="2" data-floor="${floor}"></div>`;
  const buttonDown = `<div class="floor-button down" data-dir="1" data-floor="${floor}"></div>`;

  if (floor === 1) {
    return buttonUp;
  }
  if (floor === floors) {
    return buttonDown;
  }
  return buttonUp + buttonDown;
}

function createFloorControl(floors: number): string {
  let controls = '';
  for (let i = floors; i >= 1; i--) {
    controls += `<div class="control-floor">${insertControls(i, floors)}</div>`;
  }
  return controls;
}

export const form: string = (
  `<section class="settings">
    <form class="initial-setting-form">
      ${formGroup('How many Floors?', 'floors', 4, 4, 80, 'Type a number', 'This field is required!')}
      ${formGroup('How many elevators?', 'elevators', 2, 2, 10, 'Type a number', 'This field is required!')}
      <div class="form-group button-cont">
        <button class="create-building">Build it!</button>
      </div>
    </form>
  </section>`
);

export function buildingStructure(floors: number, elevators: number): string {
  const { floorHeight } = config.building;
  return (
    `<section class="building-area">
      <div class="building-container">
        <div class="floor-numbers">
          ${createFloorNumbers(floors)}
        </div>
        <div class="building">
          <div class="floors" style="bottom:${floorHeight}px; top:${20 + floorHeight}px;">
            ${createFloors(floors)}
          </div>
          <div class="elevators-cont">
            ${createElevatorsStructure(elevators, floors)}
          </div>
        </div>
        <div class="controls">
          ${createFloorControl(floors)}
        </div>
      </div>
    </section>`
  );
}

export const logArea: string = (
  `<section class="log-area">
    <div class="log-container">
    </div>
  </section>`
);

export function createLogStructure(elevators): string {
  let logStructure = '';
  _.forEach(elevators, (elev) => {
    const next = elev.next ? elev.next : 'None';
    const queueUp = elev.queue[2].length ? elev.queue[2] : 'None';
    const queueDown = elev.queue[1].length ? elev.queue[1] : 'None';
    const { id, currentFloor } = elev;
    logStructure += `
      <div class="log log-${id}">
        <h2>Elevator ${id}</h2>
        <section class="status-area">
          <p><strong>Current floor:</strong><span class="current-floor"> ${currentFloor}</span></p>
          <p><strong>Next:</strong><span class="next-floor"> ${next}</span></p>
          <div>
            <p><strong>Queue</strong></p>
            <p>Up: <span class="queue-up"> ${queueUp}</span></p>
            <p>Down: <span class="queue-down"> ${queueDown}</span></p>
          </div>
          <div class="log-status">
            <p><strong>Log</strong></p>
            <div class="log-content"></div>
          </div>
        </section>
      </div>
    `;
  });
  return logStructure;
}

export function insertLog(message: string, elevatorId: number): void {
  const logContainer = document.querySelector(`.log-${elevatorId} .log-content`);
  if (logContainer) {
    logContainer.innerHTML = '';
    logContainer.insertAdjacentHTML('beforeend', `<p>${message}</p>`);
  }
}

export function insertStatus(elem: string, message: string, elevatorId: number): void {
  const statusCont = document.querySelector(`.log-${elevatorId} .${elem}`);
  if (statusCont) {
    statusCont.innerHTML = '';
    statusCont.insertAdjacentHTML('beforeend', ` ${message}`);
  }
}
