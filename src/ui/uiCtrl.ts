import _ from 'lodash';
import config from '../config';
import formGroup from './formGroup';

export const resetButton = `
  <div class="reset-bnt-container">
    <button class="reset-button">Reset</button>
  </div>
`;

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
    elevatorStructure += `<div class="elevator-lane" style="height:${elevatorLaneHeight}px">
        <div class="elevator" data-elevator="${i}" style="width:${elevatorWidth}px; height:${elevatorHeight}px"></div>
      </div>`;
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

export const form: string = `<section class="settings">
  <form class="initial-setting-form">
    ${formGroup('How many Floors?', 'floors', 4, 4, 80, 'Type a number', 'This field is required!')}
    ${formGroup(
      'How many elevators?',
      'elevators',
      2,
      1,
      10,
      'Type a number',
      'This field is required!'
    )}
    <div class="switch-container">
      <h4 class="title">Distributed queue?</h4>
      <div class="doc-switch">
        <input type="checkbox" value="true" id="queue-check" checked onClick="(()=>{this.value = !this.value})()">
        <div></div>
      </div>
    </div>
    <div class="form-group button-cont">
      <button class="create-building">Build it!</button>
    </div>
  </form>
</section>`;

export const systemStructure = `<section class="system-container">
    <section class="columns-cont">
      <section class="log-area">
        <ul class="log-container">
        </ul>
      </section>
      <section class="building-area">
      </section>
    </section>
  </section>`;

export function buildingStructure(floors: number, elevators: number, queueType): string {
  const { floorHeight } = config.building;
  return `<div class="building-container">
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
      <div class="controls" data-queue="${queueType}">
        ${createFloorControl(floors)}
      </div>
    </div>`;
}

export const logArea: string = `<section class="log-area">
    <div class="log-container">
    </div>
  </section>`;
