import _ from 'lodash';
import config from './config';

export const form = (
  `<section class="settings">
    <form class="initial-setting-form">
      <div class="form-group">
        <label>How many Floors</label>
        <div>
          <input id="floors" type="number" class="form-control" value="4" min="4" max="25" placeholder="Type a Number">
        </div>
      </div>
      <div class="form-group">
        <label>How many elevators</label>
        <div>
          <input id="elevators" type="number" class="form-control" value="1" min="1" max="6" placeholder="Type a Number">
        </div>
      </div>
      <div class="form-group button-cont">
        <button class="create-building">Build it!</button>
      </div>
    </form>
  </section>`
);

function createFloorNumbers(floors) {
  function createNumber(num) {
    return `<div class="number">${num}</div>`;
  }
  let floorsStructure = '';
  for (let i = floors; i >= 1; i--) {
    floorsStructure += createNumber(i);
  }
  return floorsStructure;
}

function createFloors(floors) {
  let floorDivider = '';
  for (let i = 2; i <= floors; i++) {
    floorDivider += '<div class="floor"></div>';
  }
  return floorDivider;
}

function createElevatorsStructure(elevators, floors) {
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

function insertControls(floor, floors) {
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

function createFloorControl(floors) {
  let controls = '';
  for (let i = floors; i >= 1; i--) {
    controls += `<div class="control-floor">${insertControls(i, floors)}</div>`;
  }
  return controls;
}

export function buildingStructure(floors, elevators) {
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

export const logArea = (
  `<section class="log-area">
    <div class="log-container">
    </div>
  </section>`
);

export function createLogStructure(elevators) {
  let logStructure = '';
  _.forEach(elevators, (elev) => {
    const next = elev.next ? elev.next : 'None';
    const queueUp = elev.queue[2].length ? elev.queue[2] : 'None';
    const queueDown = elev.queue[1].length ? elev.queue[1] : 'None';
    logStructure += `
      <div class="log log-${elev.elevator}">
        <h2>Elevator ${elev.elevator}</h2>
        <section class="status-area">
          <p><strong>Current floor:</strong><span class="current-floor"> ${elev.floor}</span></p>
          <p><strong>Next:</strong><span class="next-floor"> ${next}</span></p>
          <div>
            <p><strong>Queue</strong></p>
            <p>Up: <span class="queue-up"> ${queueUp}</span></p>
            <p>Down: <span class="queue-down"> ${queueDown}</span></p>
          </div>
          <div class="log-status">
            <p><strong>Log</strong></p>
            <div class="log-content">

            </div>
          </div>
        </section>
      </div>
    `;
  });
  return logStructure;
}

export function insertLog(message, elevatorId) {
  const logContainer = document.querySelector(`.log-${elevatorId} .log-content`);
  if (logContainer) {
    logContainer.insertAdjacentHTML('beforeend', `<p>${message}</p>`);
  }
}

export function insertStatus(elem, message, elevatorId) {
  const statusCont = document.querySelector(`.log-${elevatorId} .${elem}`);
  if (statusCont) {
    statusCont.innerHTML = '';
    statusCont.insertAdjacentHTML('beforeend', ` ${message}`);
  }
}
