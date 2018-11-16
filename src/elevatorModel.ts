import {
  runElevator,
} from './elevatorCtrl';

import floorParameters from './floorParameters';

import {
  FormParam,
  Queue,
  Direction
} from './types/types';

function selectNextFloor(): void {
  let next: number;
  const { direction, currentFloor } = this;
  const queueUp = this.queue[2];
  const queueDown = this.queue[1];

  const higherFloor = queueUp.find(el => el > currentFloor);
  const lowerFloor = queueDown.find(el => el < currentFloor);

  if (queueUp.length && !queueDown.length && !lowerFloor) {
    [next] = queueUp;
  } else if ((!queueUp.length && queueDown.length) || (queueUp.length && !higherFloor && queueDown.length)) {
    [next] = queueDown;
  } else if (direction === 0) {
    const options = [queueUp[0], queueDown[0]];
    next = options.reduce((a, b) => (Math.abs(currentFloor - a) < Math.abs(currentFloor - b) ? a : b));
  } else if (direction === 2 && queueUp.length && higherFloor) {
    next = higherFloor;
  } else if (direction === 1 && queueDown.length && lowerFloor) {
    next = lowerFloor;
  }

  this.next = next;
  this.direction = !next ? 0 : (currentFloor > next ? 1 : 2);
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
  selectNextFloor = selectNextFloor
}

function configElevators(nElevators: number, nFloors: number): Elevators {
  const floorParams = floorParameters(nFloors);
  const elevators: Elevators = {};
  for (let i = 1; i <= nElevators; i++) {
    const elevator = new Elevator(i, 1, false, 0, { 2: [], 1: [] }, floorParams);
    elevators[i] = elevator;
  }
  return elevators;
}

export { Elevator, configElevators };