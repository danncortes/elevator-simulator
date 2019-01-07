import { Elevators, FloorParam, Queue, Direction, FloorCalledFrom } from './types';

interface ElevatorInterface {
  id: number;
  currentFloor: number;
  direction: Direction;
  isMoving: boolean;
  next: boolean | FloorCalledFrom;
  queue: Queue;
  startEngine(floorParameters: FloorParam): void;
  setNextFloorAndDirection(): void;
  setTimeOut: null | Function;
  moveElevator(floorParameters: FloorParam): void;
  whenElevatorArrives(floorParameters: FloorParam): void;
}

interface BuildingInterface {
  readonly floorParameters: FloorParam;
  elevators: Elevators;
  assignFloorToElevator(elevatorId: number, calledFromFloor: FloorCalledFrom): void;
  reAssignElevator(floorParameters: FloorParam): void;
}

export { ElevatorInterface, BuildingInterface };
