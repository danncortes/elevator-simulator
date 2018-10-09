import _ from 'lodash';
import config from './config';

const {
  messages: {
    nextFloors, closingDoors, waitingMs, arrived, moving,
  },
  times: { openCloseDoors, waiting },
} = config;

export function runElevator() {
  const queueUp = this.queue[2].length;
  const queueDown = this.queue[1].length;
  if (queueUp || queueDown) {
    console.log(`${nextFloors} ${this.queue}`);
    console.log(`${waitingMs}`);
    setTimeout(() => {
      console.log(`${closingDoors}`);
      setTimeout(() => {
        // this.queue.splice(0, 2);
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
  this.queue[dir].push(floor);
  this.queue[1].sort((a, b) => b - a);
  this.queue[2].sort((a, b) => a - b);
}
