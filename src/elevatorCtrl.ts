import _ from 'lodash';
import config from './config';
import { insertLog, insertStatus } from './ui/uiCtrl';

import {
  SelectElevator,
  FloorCalledFrom
} from './types/types';

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

function removeStatus(container: string, elevator: number): void {
  const statusCont = document.querySelector(`.log-${elevator} .${container}`);
  if (statusCont) {
    statusCont.innerHTML = '';
  }
}

function desactivateButton(elev, dir: number): void {
  const { currentFloor } = elev;
  const button = document.querySelectorAll(`[data-floor="${currentFloor}"][data-dir="${dir}"]`)[0];
  button.classList.remove('active');
}

export function moveElevator(): number {
  const elevatorId = this.id;
  const { next, currentFloor } = this;

  const elevatorElement = document.querySelectorAll(`[data-elevator="${elevatorId}"]`)[0];
  const position = this.floorParameters[next];
  const floorDiff = Math.abs(currentFloor - next);
  const travelTime = config.times.speedByFloor * floorDiff;
  insertLog('Moving...', elevatorId);
  elevatorElement.style.transition = `bottom ${travelTime}ms`;
  elevatorElement.style.transitionTimingFunction = 'ease-in-out';
  elevatorElement.style.bottom = `${position}px`;
  return travelTime;
}

export function runElevator(): void {
  const elevatorId = this.id;
  const queueUp = this.queue[2].length ? this.queue[2] : false;
  const queueDown = this.queue[1].length ? this.queue[1] : false;
  if (queueUp || queueDown) {
    insertStatus('queue-up', queueUp, elevatorId);
    insertStatus('queue-down', queueDown, elevatorId);
    insertLog(`${waitingMs}`, elevatorId);
    setTimeout(() => {
      this.selectNextFloor();
      const { next } = this;
      insertStatus('next-floor', next, elevatorId);
      insertLog(`${closingDoors}`, elevatorId);
      setTimeout(() => {
        const travelTime = moveElevator.call(this);
        this.isMoving = true;
        setTimeout(() => {
          this.isMoving = false;
          insertLog(`${arrived}`, elevatorId);
          const dirToRemoveFloor = removeFloorFromQueue.call(this);
          this.direction = 0;
          desactivateButton(this, dirToRemoveFloor);
          insertStatus('current-floor', this.currentFloor, elevatorId);
          removeStatus('next-floor', elevatorId);
          removeStatus('queue-up', elevatorId);
          removeStatus('queue-down', elevatorId);
          runElevator.call(this);
        }, travelTime);
      }, openCloseDoors);
    }, waiting);
  }
}

export function isAlreadyCalled(floorCall: FloorCalledFrom, elevators: {}): boolean {
  const elevatorAsigned: Element = _.find(elevators, elevator => elevator.queue[floorCall.dir][0] === floorCall.floor);
  return (!!elevatorAsigned && true);
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
