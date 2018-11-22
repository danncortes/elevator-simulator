import {
  runElevator,
} from './elevatorCtrl/elevatorCtrl';

import floorParameters from './floorParameters';

import {
  FormParam,
  Queue,
  Direction
} from './types/types';

function setNextFloorAndDirection(): void {
  const { currentFloor } = this;
  this.next = this.queue[0];
  this.direction = this.next.floor > currentFloor ? 2 : 1;
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
  ) { }

  startEngine = runElevator
  setNextFloorAndDirection = setNextFloorAndDirection
}

function configElevators(nElevators: number, nFloors: number): Elevators {
  const floorParams = floorParameters(nFloors);
  const elevators: Elevators = {};
  for (let i = 1; i <= nElevators; i++) {
    const elevator = new Elevator(i, 1, false, 0, [], floorParams);
    elevators[i] = elevator;
  }
  return elevators;
}

export { Elevator, configElevators, Elevators };