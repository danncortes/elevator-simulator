import _ from 'lodash';
import config from './config';
import { insertLog, insertStatus } from './uiCtrl';

const {
  messages: {
    nextFloors, closingDoors, waitingMs, arrived, moving,
  },
  times: { openCloseDoors, waiting },
} = config;

export function removeFloorFromQueue() {
  const { dir, queue, next } = this;
  if (dir === 2) {
    if (queue[dir][0] === next) {
      this.floor = queue[dir].shift();
      return 2;
    }
    this.floor = queue[1].shift();
    return 1;
  } if (queue[dir][0] === next) {
    this.floor = queue[dir].shift();
    return 1;
  }
  this.floor = queue[2].shift();
  return 2;
}

function removeStatus(container, elevator) {
  const statusCont = document.querySelector(`.log-${elevator} .${container}`);
  if (statusCont) {
    statusCont.innerHTML = '';
  }
}

function desactivateButton(elev, dir) {
  const { floor } = elev;
  const button = document.querySelectorAll(`[data-floor="${floor}"][data-dir="${dir}"]`)[0];
  button.classList.remove('active');
}

export function moveElevator() {
  const elevatorId = this.elevator;
  const elevator = document.querySelectorAll(`[data-elevator="${elevatorId}"]`)[0];
  const position = this.floorParameters[this.next];
  const floorDiff = Math.abs(this.floor - this.next);
  const travelTime = config.times.speedByFloor * floorDiff;
  insertLog('Moving...', elevatorId);
  elevator.style.transition = `bottom ${travelTime}ms`;
  elevator.style.transitionTimingFunction = 'ease-in-out';
  elevator.style.bottom = `${position}px`;
  return travelTime;
}

export function runElevator() {
  this.selectNextFloor();
  const { next, elevator } = this;
  const queueUp = this.queue[2].length ? this.queue[2] : 'None';
  const queueDown = this.queue[1].length ? this.queue[1] : 'None';
  if (next) {
    insertStatus('next-floor', next, elevator);
    insertStatus('queue-up', queueUp, elevator);
    insertStatus('queue-down', queueDown, elevator);
    insertLog(`${waitingMs}`, elevator);
    setTimeout(() => {
      insertLog(`${closingDoors}`, elevator);
      setTimeout(() => {
        const travelTime = moveElevator.call(this);
        setTimeout(() => {
          insertLog(`${arrived}`, elevator);
          const dirToRemoveFloor = removeFloorFromQueue.call(this);
          desactivateButton(this, dirToRemoveFloor);
          insertStatus('current-floor', this.floor, elevator);
          removeStatus('next-floor', elevator);
          removeStatus('queue-up', elevator);
          removeStatus('queue-down', elevator);
          runElevator.call(this);
        }, travelTime);
      }, openCloseDoors);
    }, waiting);
  }
}

export function isAlreadyCalled(floorCall, elevators) {
  return _.find(elevators, elevator => elevator.queue[floorCall.dir][0] === floorCall.floor);
}

export function isAtTheFloor(floorCall, elevators) {
  return _.find(_.filter(elevators, elevator => elevator.dir === 0), elev => elev.floor === floorCall.floor);
}

export function selectElevator(floorCall, elevators, floors) {
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
    const elevatorFloor = elevator.floor;
    const { dir } = elevator;
    const id = key;

    if (dirCall === 2) {
      // Called to Go up
      if (dir === 1) {
        distance = (floorCall.floor - 1) + (elevatorFloor - 1);
      } else if (dir === 2) {
        if (elevatorFloor < floorCall.floor) {
          distance = floorCall.floor - elevatorFloor;
        } else {
          distance = floors - elevatorFloor - 1 + floors + floorCall.floor - 1;
        }
      }
    } else if (dirCall === 1) {
      if (dir === 2) { // Elevator going Up
        distance = (floors - elevatorFloor) + (floors - floorCall.floor);
      } else if (dir === 1) { // Elevator going Down
        if (elevatorFloor > floorCall.floor) {
          distance = elevatorFloor - floorCall.floor;
        } else {
          distance = floors - 1 + floorCall.floor - 1 + elevatorFloor - 1;
        }
      }
    }

    if (dir === 0 && (dirCall === 1 || dirCall === 2)) {
      distance = Math.abs(floorCall.floor - elevatorFloor);
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

export function asignFloorToElevator(params) {
  const { floor, dir } = params;
  const isTheFloorAlready = this.queue[dir].find(el => el === floor);
  if (!isTheFloorAlready) {
    this.queue[dir].push(floor);
    this.queue[1].sort((a, b) => b - a);
    this.queue[2].sort((a, b) => a - b);
  }
}

export function selectNextFloor() {
  let next;
  const { dir, floor } = this;
  const queueUp = this.queue[2];
  const queueDown = this.queue[1];
  if (dir === 0) {
    if (queueUp.length && !queueDown.length) {
      [next] = queueUp;
    } else if (!queueUp.length && queueDown.length) {
      [next] = queueDown;
    } else {
      const options = [queueUp[0], queueDown[0]];
      next = options.reduce((a, b) => (Math.abs(floor - a) < Math.abs(floor - b) ? a : b));
    }
  } else if (dir === 2) {
    if (queueUp.length) {
      const higherFloor = queueUp.find(el => el > floor);
      if (higherFloor) {
        next = higherFloor;
      } else if (!higherFloor && queueDown.length) {
        [next] = queueDown;
      } else {
        [next] = queueUp;
      }
    } else if (queueDown.length) {
      [next] = queueDown;
    }
  } else if (queueDown.length) {
    const lowerFloor = queueDown.find(el => el < floor);
    if (lowerFloor) {
      next = lowerFloor;
    } else if (!lowerFloor && queueUp.length) {
      [next] = queueUp;
    } else {
      [next] = queueDown;
    }
  } else if (queueUp.length) {
    [next] = queueUp;
  }
  this.next = next;
  this.dir = !next ? 0 : (floor > next ? 1 : 2);
}
