type FloorCalledFrom = {
  floor: number,
  dir: number
};

type SelectElevator = (floorCalledFrom: FloorCalledFrom, elevators: string[], nFloors: number) => number;

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

export {
  FloorCalledFrom,
  SelectElevator,
  EnvironmentConfig
};

