import { updateLog } from './log/logCtrl';
import { desactivateFloorButton } from './elevator/desactivateFloorButton';
import { setTravelTime } from './elevator/setTravelTime';

import config from './config';

const {
  times: { openCloseDoors, waiting },
} = config;

import {
  Queue,
  Direction,
  FloorCalledFrom,
} from './types';


import {
  ElevatorInterface
} from './interfaces';

class Elevator implements ElevatorInterface {
  constructor(
    public id: number,
    public currentFloor: number,
    public isMoving: boolean,
    public direction: Direction,
    public queue: Queue,
    public next: boolean | FloorCalledFrom,
  ) { }

  startEngine = runElevator
  setNextFloorAndDirection = setNextFloorAndDirection
  setTimeOut: null | Function = null
  moveElevator = moveElevator
  reAssignElevator = reAssignElevator
  whenElevatorArrives = whenElevatorArrives
}

function setNextFloorAndDirection(): void {
  const { currentFloor } = this;
  this.next = (this.queue[0] || false);
  this.direction = this.next ? (this.next.floor > currentFloor ? 2 : 1) : 0;
}

function whenElevatorArrives() {
  this.currentFloor = this.queue.shift().floor;
  desactivateFloorButton(this.currentFloor, this.next.dir);
  this.setNextFloorAndDirection();
  this.isMoving = false;
  updateLog(this)
  this.startEngine();
}

function moveElevator(floorParameters): void {
  const { id, next, currentFloor, isMoving } = this;
  const elevatorElement = <HTMLElement>document.querySelectorAll(`[data-elevator="${id}"]`)[0];
  const nextYPosition = floorParameters[next.floor];
  const travelTime = setTravelTime(isMoving, elevatorElement, nextYPosition, currentFloor, next);
  elevatorElement.style.transition = `bottom ${travelTime}ms`;
  elevatorElement.style.transitionTimingFunction = 'linear';
  elevatorElement.style.bottom = `${nextYPosition}px`;
  this.isMoving = true;
  this.setTimeOut = setTimeout(() => {
    this.whenElevatorArrives()
  }, travelTime)
}

function reAssignElevator(floorParameters) {
  clearTimeout(this.setTimeOut);
  this.moveElevator(floorParameters)
}

function runElevator(floorParameters): void {
  if (!!this.queue.length) {
    //Waiting...
    setTimeout(() => {
      //Closing doors...
      setTimeout(() => {
        //Starting travel...
        this.moveElevator(floorParameters);
      }, openCloseDoors);
    }, waiting);
  } else {
    this.direction = 0;
    updateLog(this)
  }
}

export {
  Elevator
};