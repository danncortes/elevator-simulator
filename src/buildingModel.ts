import config from './config';

import { FloorParam, Elevators, FloorCalledFrom } from './types';

import { BuildingInterface } from './interfaces';

import { Elevator } from './elevatorModel';

import { assignAndSortQueue } from './elevator/assignAndSortQueue';

class Building implements BuildingInterface {
  constructor(public floorParameters: FloorParam, public elevators: Elevators) {}

  assignFloorToElevator(elevatorId, calledFromFloor: FloorCalledFrom) {
    return assignFloorToElevator.call(this, elevatorId, calledFromFloor);
  }

  reAssignElevator(elevatorId) {
    return reAssignElevator.call(this, elevatorId);
  }
}

function assignFloorToElevator(elevatorId, calledFromFloor: FloorCalledFrom): void {
  const { currentFloor, direction, queue } = this.elevators[elevatorId];
  this.elevators[elevatorId].queue = assignAndSortQueue(
    calledFromFloor,
    currentFloor,
    direction,
    queue
  );
}

function reAssignElevator(elevatorId) {
  clearTimeout(this.elevators[elevatorId].setTimeOut);
  this.elevators[elevatorId].moveElevator(this.floorParameters);
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
