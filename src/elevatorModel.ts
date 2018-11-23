import { updateLog } from './log/logCtrl';
import { desactivateFloorButton } from './elevator/desactivateFloorButton';
import { floorParameters } from './elevator/floorParameters';
import config from './config';

const {
  times: { openCloseDoors, waiting },
} = config;

import {
  FormParam,
  Queue,
  Direction,
  FloorCalledFrom
} from './types/types';

import { setTravelTime } from './elevator/setTravelTime';

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

function moveElevator(): void {
  const { id, next, currentFloor, isMoving } = this;
  const elevatorElement = <HTMLElement>document.querySelectorAll(`[data-elevator="${id}"]`)[0];
  const nextYPosition = this.floorParameters[next.floor];
  const travelTime = setTravelTime(isMoving, elevatorElement, nextYPosition, currentFloor, next);
  elevatorElement.style.transition = `bottom ${travelTime}ms`;
  elevatorElement.style.transitionTimingFunction = 'linear';
  elevatorElement.style.bottom = `${nextYPosition}px`;
  this.isMoving = true;
  this.setTimeOut = setTimeout(() => {
    this.whenElevatorArrives()
  }, travelTime)
}

function reAssignElevator() {
  clearTimeout(this.setTimeOut);
  this.moveElevator()
}

export function runElevator(): void {
  if (!!this.queue.length) {
    //Waiting...
    setTimeout(() => {
      //Closing doors...
      setTimeout(() => {
        //Starting travel...
        this.moveElevator();
      }, openCloseDoors);
    }, waiting);
  } else {
    this.direction = 0;
    updateLog(this)
  }
}

type Elevators = {
  [key: number]: Elevator
}

class Elevator {
  constructor(
    public id: number,
    public currentFloor: number,
    public isMoving: boolean,
    public direction: Direction,
    public queue: Queue,
    public floorParameters: FormParam,
    public next: boolean | FloorCalledFrom,
  ) { }

  startEngine = runElevator
  setNextFloorAndDirection = setNextFloorAndDirection
  setTimeOut: null | Function = null
  moveElevator = moveElevator
  reAssignElevator = reAssignElevator
  whenElevatorArrives = whenElevatorArrives
}

function configElevators(nElevators: number, nFloors: number): Elevators {
  const floorParams = floorParameters(nFloors);
  const elevators: Elevators = {};
  for (let i = 1; i <= nElevators; i++) {
    const elevator = new Elevator(i, 1, false, 0, [], floorParams, false);
    elevators[i] = elevator;
  }
  return elevators;
}

export { Elevator, configElevators, Elevators };