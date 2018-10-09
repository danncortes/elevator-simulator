import _ from 'lodash';
import config from './config';

const {
  messages: {
    nextFloors, closingDoors, waitingMs, arrived, moving,
  },
  times: { openCloseDoors, waiting },
} = config;

export function moveElevator(elevatorId) {
  const elevator = document.querySelectorAll(`[data-elevator="${elevatorId}"]`);
  console.log(elevator);
}

export function runElevator() {
  this.selectNextFloor();
  const { next, elevator } = this;
  if (next) {
    console.log(`${nextFloors} ${next}`);
    console.log(`${waitingMs}`);
    setTimeout(() => {
      console.log(`${closingDoors}`);
      setTimeout(() => {
        // this.queue.splice(0, 2);
        moveElevator(elevator);
        console.log('Moving');
        setTimeout(() => {
          console.log(`${arrived}`);
          runElevator.call(this);
        }, 4000);
      }, openCloseDoors);
    }, waiting);
  }
}


export function selectElevator(floorCall, elevators, floors) {
  const stoppedElevators = {};
  for (const key in elevators) {
    if (elevators[key].dir === 0) {
      stoppedElevators[key] = elevators[key];
    }
  }
  elevators = (_.isEmpty(stoppedElevators)) ? elevators : stoppedElevators;

  const dirCall = floorCall.dir;
  let closestElevator;
  let distance = 0;

  for (const elevator in elevators) {
    const elevatorFloor = elevators[elevator].floor;
    const { dir } = elevators[elevator];
    const id = elevator;

    if (dirCall === 2) {
      // Called to Go up
      if (dir === 1) {
        distance = (floorCall.floor - 1) + (elevatorFloor - 1);
      } else if (dir === 2) {
        if (elevatorFloor < floorCall.floor) {
          distance = floorCall.floor - elevatorFloor;
        } else {
          distance = floors.length - elevatorFloor - 1 + floors.length + floorCall.floor - 1;
        }
      }
    } else {
      // Called to down
      if (dir === 2) { // Elevator going Up
        distance = (floors.length - elevatorFloor) + (floors.length - floorCall.floor);
      } else if (dir === 1) { // Elevator going Down
        if (elevatorFloor > floorCall.floor) {
          distance = elevatorFloor - floorCall.floor;
        } else {
          distance = floors.length - 1 + floorCall.floor - 1 + elevatorFloor - 1;
        }
      }
    }

    if (dir === 1 || dir === 2) {
      if (dir === 0) {
        if (floorCall.floor > elevatorFloor) {
          distance = floorCall.floor - elevatorFloor;
        } else {
          distance = floorCall.floor - elevatorFloor;
        }
      }
    }

    const tempElevator = { id, distance };
    if (_.isEmpty(closestElevator)) {
      closestElevator = tempElevator;
    } else {
      closestElevator = closestElevator.distance > distance ? tempElevator : closestElevator;
    }
  }
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
      next = queueUp[0];
    } else if (!queueUp.length && queueDown.length) {
      next = queueDown[0];
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
        next = queueDown[0];
      } else {
        next = queueUp[0];
      }
    } else if (queueDown.length) {
      next = queueDown[0];
    }
  } else if (queueDown.length) {
    const lowerFloor = queueDown.find(el => el < floor);
    if (lowerFloor) {
      next = lowerFloor;
    } else if (!lowerFloor && queueUp.length) {
      next = queueUp[0];
    } else {
      next = queueDown[0];
    }
  } else if (queueUp.length) {
    next = queueUp[0];
  }
  this.next = next;
  if (!next) {
    this.dir = 0;
  }
}
