import _ from 'lodash';
import config from '../config';

import {
  FloorCalledFrom
} from '../types/types';

import {
  setLog
} from '../logCtrl';

import { isAlreadyCalledFrom } from './isAlreadyCalledFrom';
import { isAtTheSameFloorFrom } from './isAtTheSameFloorFrom';
import { chooseElevator } from './chooseElevator';
import { assignAndSortQueue } from './assignAndSortQueue';

const {
  messages: {
    nextFloors, closingDoors, waitingMs, arrived, moving,
  },
  times: { openCloseDoors, waiting },
} = config;

export function removeFloorFromQueue(): number {
  const { direction, queue, next } = this;
  if (direction === 2) {
    if (queue[direction][0] === next) {
      this.currentFloor = queue[direction].shift();
      return 2;
    }
    this.currentFloor = queue[1].shift();
    return 1;
  }
  if (queue[direction][0] === next) {
    this.currentFloor = queue[direction].shift();
    return 1;
  }
  this.currentFloor = queue[2].shift();
  return 2;
}

function desactivateButton(elev, dir: number): void {
  const { currentFloor } = elev;
  const button = document.querySelectorAll(`[data-floor="${currentFloor}"][data-dir="${dir}"]`)[0];
  button.classList.remove('active');
}

export function moveElevator(): number {
  const elevatorId = this.id;
  const { next, currentFloor } = this;

  const elevatorElement = <HTMLElement>document.querySelectorAll(`[data-elevator="${elevatorId}"]`)[0];
  const position = this.floorParameters[next];
  const floorDiff = Math.abs(currentFloor - next);
  const travelTime = config.times.speedByFloor * floorDiff;
  elevatorElement.style.transition = `bottom ${travelTime}ms`;
  elevatorElement.style.transitionTimingFunction = 'ease-in-out';
  elevatorElement.style.bottom = `${position}px`;
  return travelTime;
}

export function runElevator(): void {
  if (!!this.queue) {
    // //Waiting...
    this.setNextFloorAndDirection();
    console.log(this);
    setTimeout(() => {
      //Closing doors...
      this.setNextFloorAndDirection();
      console.log(this);
      setTimeout(() => {
        //Starting travel...
        //console.log(this)
        this.setNextFloorAndDirection();
        console.log(this);

        // const travelTime = moveElevator.call(this);
        // this.isMoving = true;
        // setLog(this)
        // setTimeout(() => {
        //   this.isMoving = false;
        //   setLog(this)
        //   const dirToRemoveFloor = removeFloorFromQueue.call(this);
        //   desactivateButton(this, dirToRemoveFloor);
        //   runElevator.call(this);
        // }, travelTime);
      }, openCloseDoors);
    }, waiting);
  } else {
    this.direction = 0;
    setLog(this)
  }
}



// export function asignFloorToElevator(params: FloorCalledFrom): void {
//   const { floor, dir } = params;
//   const { isMoving } = this;
//   const isTheFloorAlready = this.queue[dir].find(el => el === floor);
//   if (!isTheFloorAlready) {
//     if (isMoving) {
//       const firstQup = this.queue[1].shift();
//       const firstQdown = this.queue[2].shift();
//       this.queue[dir].push(floor);
//       this.queue[1].sort((a, b) => b - a);
//       this.queue[2].sort((a, b) => a - b);
//       if (firstQup) {
//         this.queue[1].unshift(firstQup);
//       }
//       if (firstQdown) {
//         this.queue[2].unshift(firstQdown);
//       }
//     } else {
//       this.queue[dir].push(floor);
//       this.queue[1].sort((a, b) => b - a);
//       this.queue[2].sort((a, b) => a - b);
//     }
//   }
// }

function assignFloorToElevator(elevator, calledFromFloor: FloorCalledFrom): FloorCalledFrom[] {
  const { currentFloor, direction, queue } = elevator;
  return assignAndSortQueue(calledFromFloor, currentFloor, direction, queue);
}

export function onClickElevatorCallButton(ev, elevators, buildingFloors) {
  const floor: number = Number(ev.target.dataset.floor);
  const dir: number = Number(ev.target.dataset.dir);

  const calledFromFloor: FloorCalledFrom = { floor, dir };
  // Select Elevator to asign floor
  const isCalledAlready: boolean = isAlreadyCalledFrom(calledFromFloor, elevators);
  const isAtTheSameFloor: boolean = isAtTheSameFloorFrom(calledFromFloor, elevators);

  if (!isCalledAlready && !isAtTheSameFloor) {
    ev.target.classList.add('active');
    const elevatorId: number = chooseElevator(calledFromFloor, elevators, buildingFloors);
    // Asign floor to Elevator
    const elevatorQueue = elevators[elevatorId].queue;

    elevators[elevatorId].queue = assignFloorToElevator(elevators[elevatorId], calledFromFloor);
    elevators[elevatorId].setNextFloorAndDirection();
    // Run Elevator
    if (!elevatorQueue.length) {
      elevators[elevatorId].startEngine();
    }
  }

  return elevators;
}
