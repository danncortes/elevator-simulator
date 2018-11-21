type FloorCalledFrom = {
  floor: number,
  dir: number
};

type ChooseElevator = (floorCalledFrom: FloorCalledFrom, elevators: {}, nFloors: number) => number;

type EnvironmentConfig = {
  speed: number,
  building: {
    floorHeight: number,
    elevatorHeight: number,
    elevatorWidth: number,
    floorDivHeight: number,
    elevatorLaneHeight: (floors: number) => number
  },
  times: {
    speedByFloor: number,
    openCloseDoors: number,
    waiting: number,
  },
  messages: {
    nextFloors: string,
    waitingMs: string,
    closingDoors: string,
    moving: string,
    arrived: string,
  },
};

type FormParam = {
  [key: number]: number
};

type Queue = FloorCalledFrom[]

type Direction = 0 | 1 | 2;

export {
  FloorCalledFrom,
  ChooseElevator,
  EnvironmentConfig,
  FormParam,
  Queue,
  Direction
};

