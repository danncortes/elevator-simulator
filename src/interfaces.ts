import {
  Elevators,
  FloorParam,
  Queue,
  Direction,
  FloorCalledFrom
} from './types';

interface ElevatorInterface {
  id: number,
  currentFloor: number,
  direction: Direction,
  isMoving: boolean,
  next: boolean | FloorCalledFrom,
  queue: Queue,
  startEngine(floorParameters: FloorParam): void,
  setNextFloorAndDirection(): void,
  setTimeOut: null | Function,
  moveElevator(floorParameters: FloorParam): void,
  reAssignElevator(floorParameters: FloorParam): void,
  whenElevatorArrives(): void,
}

interface BuildingInterface {
  readonly floorParameters: FloorParam,
  elevators: Elevators
}

export { ElevatorInterface, BuildingInterface };