import _ from 'lodash';
import config from '../config';

import {
  SelectElevator,
  FloorCalledFrom
} from '../types/types';

import {
  setLog
} from '../logCtrl';

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
  const queueUp = this.queue[2].length ? this.queue[2] : false;
  const queueDown = this.queue[1].length ? this.queue[1] : false;
  if (queueUp || queueDown) {
    console.log(this.queue)
    //Waiting...
    setLog(this);
    setTimeout(() => {
      //Closing doors...
      setLog(this);
      setTimeout(() => {
        //Starting travel...
        this.selectNextFloor();
        const travelTime = moveElevator.call(this);
        this.isMoving = true;
        setLog(this)
        setTimeout(() => {
          this.isMoving = false;
          setLog(this)
          const dirToRemoveFloor = removeFloorFromQueue.call(this);
          desactivateButton(this, dirToRemoveFloor);
          runElevator.call(this);
        }, travelTime);
      }, openCloseDoors);
    }, waiting);
  } else {
    this.direction = 0;
    setLog(this)
  }
}

/**
 * Determines if the there is an elevator stopped
 * in the same floor where the elevator is called from
*/
export function isAtTheFloor(floorCall: FloorCalledFrom, elevators: {}): boolean {
  const stoppedElevators = _.filter(elevators, elevator => elevator.direction === 0);
  const stoppedElevSameFloor = _.find(stoppedElevators, elev => elev.currentFloor === floorCall.floor);
  return (!!stoppedElevSameFloor && true);
}

export const selectElevator: SelectElevator = (floorCall, elevators, floors) => {
  const stoppedElevators = {};
  _.forEach(elevators, (el, key) => {
    if (el.dir === 0) {
      stoppedElevators[key] = el;
    }
  });

  elevators = (_.isEmpty(stoppedElevators)) ? elevators : stoppedElevators;

  const dirCall = floorCall.dir;
  let closestElevator;
  let distance = 0;

  _.forEach(elevators, (elevator, key) => {
    const { currentFloor, direction } = elevator;
    const id = key;

    if (dirCall === 2) {
      // Called to Go up
      if (direction === 1) {
        distance = (floorCall.floor - 1) + (currentFloor - 1);
      } else if (direction === 2) {
        if (currentFloor < floorCall.floor) {
          distance = floorCall.floor - currentFloor;
        } else {
          distance = floors - currentFloor - 1 + floors + floorCall.floor - 1;
        }
      }
    } else if (dirCall === 1) {
      if (direction === 2) { // Elevator going Up
        distance = (floors - currentFloor) + (floors - floorCall.floor);
      } else if (direction === 1) { // Elevator going Down
        if (currentFloor > floorCall.floor) {
          distance = currentFloor - floorCall.floor;
        } else {
          distance = floors - 1 + floorCall.floor - 1 + currentFloor - 1;
        }
      }
    }

    if (direction === 0 && (dirCall === 1 || dirCall === 2)) {
      distance = Math.abs(floorCall.floor - currentFloor);
    }

    const tempElevator = { id, distance };
    if (_.isEmpty(closestElevator)) {
      closestElevator = tempElevator;
    } else {
      closestElevator = closestElevator.distance > distance ? tempElevator : closestElevator;
    }
  });
  return closestElevator.id;
}

export function asignFloorToElevator(params: FloorCalledFrom): void {
  const { floor, dir } = params;
  const { isMoving } = this;
  const isTheFloorAlready = this.queue[dir].find(el => el === floor);
  if (!isTheFloorAlready) {
    if (isMoving) {
      const firstQup = this.queue[1].shift();
      const firstQdown = this.queue[2].shift();
      this.queue[dir].push(floor);
      this.queue[1].sort((a, b) => b - a);
      this.queue[2].sort((a, b) => a - b);
      if (firstQup) {
        this.queue[1].unshift(firstQup);
      }
      if (firstQdown) {
        this.queue[2].unshift(firstQdown);
      }
    } else {
      this.queue[dir].push(floor);
      this.queue[1].sort((a, b) => b - a);
      this.queue[2].sort((a, b) => a - b);
    }
  }
}
