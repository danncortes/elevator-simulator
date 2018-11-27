import {
  FloorCalledFrom
} from '../types/types';

import { updateLog } from '../log/logCtrl';

import { isAlreadyCalledFrom } from './isAlreadyCalledFrom';
import { isAtTheSameFloorFrom } from './isAtTheSameFloorFrom';
import { chooseElevator } from './chooseElevator';
import { assignAndSortQueue } from './assignAndSortQueue';

function assignFloorToElevator(elevator, calledFromFloor: FloorCalledFrom): FloorCalledFrom[] {
  const { currentFloor, direction, queue } = elevator;
  return assignAndSortQueue(calledFromFloor, currentFloor, direction, queue);
}

export function onClickElevatorCallButton(ev, elevators, buildingFloors) {
  const floor: number = Number(ev.target.dataset.floor);
  const dir: number = Number(ev.target.dataset.dir);
  const controlsContainer: HTMLElement = document.querySelector('.controls')
  const queueType: boolean = controlsContainer.dataset.queue === 'true' ? true : false;

  const calledFromFloor: FloorCalledFrom = { floor, dir };
  // Select Elevator to asign floor
  const isCalledAlready: boolean = isAlreadyCalledFrom(calledFromFloor, elevators);
  const isAtTheSameFloor: boolean = isAtTheSameFloorFrom(calledFromFloor, elevators);

  if (!isCalledAlready && !isAtTheSameFloor) {
    ev.target.classList.add('active');

    const elevatorId: number = chooseElevator(queueType, calledFromFloor, elevators, buildingFloors);
    // Asign floor to Elevator
    const elevatorQueue = elevators[elevatorId].queue;

    elevators[elevatorId].queue = assignFloorToElevator(elevators[elevatorId], calledFromFloor);
    elevators[elevatorId].setNextFloorAndDirection();
    updateLog(elevators[elevatorId]);

    if (elevators[elevatorId].isMoving === true) {
      elevators[elevatorId].reAssignElevator();
    }
    // Run Elevator
    if (!elevatorQueue.length) {
      elevators[elevatorId].startEngine();
    }
  }

  return elevators;
}
