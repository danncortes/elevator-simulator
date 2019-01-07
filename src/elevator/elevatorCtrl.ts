import { FloorCalledFrom } from '../types';

import { updateLog } from '../log/logCtrl';

import { isAlreadyCalledFrom } from './isAlreadyCalledFrom';
import { isAtTheSameFloorFrom } from './isAtTheSameFloorFrom';
import { chooseElevator } from './chooseElevator';
import { assignAndSortQueue } from './assignAndSortQueue';

function assignFloorToElevator(elevator, calledFromFloor: FloorCalledFrom): FloorCalledFrom[] {
  const { currentFloor, direction, queue } = elevator;
  return assignAndSortQueue(calledFromFloor, currentFloor, direction, queue);
}

export function onClickElevatorCallButton(ev, building, buildingFloors) {
  const floor: number = Number(ev.target.dataset.floor);
  const dir: number = Number(ev.target.dataset.dir);
  const controlsContainer: HTMLElement = document.querySelector('.controls');
  const queueType: boolean = controlsContainer.dataset.queue === 'true' ? true : false;

  const calledFromFloor: FloorCalledFrom = { floor, dir };
  // Select Elevator to asign floor
  const isCalledAlready: boolean = isAlreadyCalledFrom(calledFromFloor, building.elevators);
  const isAtTheSameFloor: boolean = isAtTheSameFloorFrom(calledFromFloor, building.elevators);

  if (!isCalledAlready && !isAtTheSameFloor) {
    ev.target.classList.add('active');

    const elevatorId: number = chooseElevator(
      queueType,
      calledFromFloor,
      building.elevators,
      buildingFloors
    );
    // Asign floor to Elevator

    const elevatorQueue = building.elevators[elevatorId].queue;
    building.assignFloorToElevator(elevatorId, calledFromFloor);
    building.elevators[elevatorId].setNextFloorAndDirection();
    updateLog(building.elevators[elevatorId]);
    if (building.elevators[elevatorId].isMoving === true) {
      building.reAssignElevator(elevatorId);
    }
    // Run Elevator
    if (!elevatorQueue.length) {
      building.elevators[elevatorId].startEngine(building.floorParameters);
    }
  }

  return building.elevators;
}
