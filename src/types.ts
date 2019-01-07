import { ElevatorInterface } from './interfaces';

type FloorCalledFrom = {
  floor: number;
  dir: number;
};

type ChooseElevator = (
  distributed: boolean,
  floorCalledFrom: FloorCalledFrom,
  elevators: {},
  nFloors: number
) => number;

type EnvironmentConfig = {
  speed: number;
  averageQueue: boolean;
  building: {
    floorHeight: number;
    elevatorHeight: number;
    elevatorWidth: number;
    floorDivHeight: number;
    elevatorLaneHeight: (floors: number) => number;
  };
  times: {
    speedByFloor: number;
    openCloseDoors: number;
    waiting: number;
  };
};

type InfoLog = {
  id: number;
  direction: Direction;
  currentFloor: number;
  isMoving: boolean;
  next: FloorCalledFrom;
  queue: Queue;
};

type FloorParam = {
  [key: number]: number;
};

type Queue = FloorCalledFrom[];

type Direction = 0 | 1 | 2;

type Elevators = {
  [key: number]: ElevatorInterface;
};

export {
  Elevators,
  FloorCalledFrom,
  ChooseElevator,
  EnvironmentConfig,
  FloorParam,
  Queue,
  Direction,
  InfoLog
};
