import {
  runElevator,
  selectNextFloor,
} from './elevatorCtrl';

import floorParameters from './floorParameters';

type Queue = {
  1: number[],
  2: number[]
};

type Direction = 0 | 1 | 2;
class Elevator {
  id: number;
  currentFloor: number;
  isMoving: boolean;
  direction: Direction;
  queue: Queue;
  floorParams: {};

  constructor(
    id: number,
    currentFloor: number,
    isMoving: boolean,
    direction: Direction,
    queue: Queue,
    floorParams: {},
  ) {
    this.id = id;
    this.currentFloor = currentFloor;
    this.isMoving = isMoving;
    this.direction = direction;
    this.queue = queue;
    this.floorParams = floorParams;
  }

  startEngine() {
    return runElevator;
  }

  selectNextFloor() {
    return selectNextFloor;
  }
}

export default function configElevators(nElevators, nFloors, runElevator, selectNextFloor) {
  const floorParams = floorParameters(nFloors);
  const engine = {
    floorParameters: floorParams,
    startEngine: runElevator,
    selectNextFloor,
  };
  const elevators = {};
  for (let i = 1; i <= nElevators; i++) {
    const elevator = Object.create(engine, {
      elevator: {
        value: i,
        writable: true,
        enumerable: true,
      },
      floor: {
        value: 1,
        writable: true,
        enumerable: true,
      },
      isMoving: {
        value: false,
        writable: true,
        enumerable: true,
      },
      dir: {
        value: 0,
        writable: true,
        enumerable: true,
      },
      queue: {
        value: { 2: [], 1: [] },
        writable: true,
        enumerable: true,
      },
    });
    elevators[i] = elevator;
  }
  console.log(new Elevator(2, 1, false, 0, { 2: [], 1: [] }, {}))
  return elevators;
}
