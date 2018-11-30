
import config from './config';

import {
  FloorParam,
  Elevators
} from './types';

import {
  BuildingInterface
} from './interfaces';

import { Elevator } from './elevatorModel';

class Building implements BuildingInterface {
  constructor(
    public floorParameters: FloorParam,
    public elevators: Elevators,
  ) {
  }
}

function floorParameters(floors: number): FloorParam {
  const { elevatorHeight, floorDivHeight } = config.building;
  const setting = {};
  for (let i = 1; i <= floors; i++) {
    const pos = (i - 1) * (elevatorHeight + floorDivHeight);
    setting[i] = pos;
  }

  return setting;
}

function configElevators(nElevators: number, nFloors: number): BuildingInterface {
  const floorParams = floorParameters(nFloors);

  const elevators: Elevators = {};
  for (let i = 1; i <= nElevators; i++) {
    const elevator = new Elevator(i, 1, false, 0, [], false);
    elevators[i] = elevator;
  }
  const building = new Building(floorParams, elevators);
  return building;
}

export { configElevators };