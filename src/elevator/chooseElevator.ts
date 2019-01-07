import * as _ from 'lodash';

import { ChooseElevator, FloorCalledFrom } from '../types';

import { Elevator } from '../elevatorModel';
import { Elevators } from '../types';

type ChosenElevator = {
  id: number;
  distance: number;
};

export const chooseElevator: ChooseElevator = (
  distributed: boolean,
  floorCall: FloorCalledFrom,
  elevators: Elevators,
  buildingFloors: number
): number => {
  const stoppedElevators = {};
  _.forEach(elevators, (el: Elevator, key) => {
    if (el.direction === 0) {
      stoppedElevators[key] = el;
    }
  });

  elevators = !_.isEmpty(stoppedElevators) ? stoppedElevators : elevators;

  let chosenElevator;

  if (distributed) {
    chosenElevator = _.reduce(elevators, (a, b) => (a.queue.length <= b.queue.length ? a : b));
  } else {
    const dirCall = floorCall.dir;
    let distance = 0;

    _.forEach(elevators, (elevator: Elevator, key) => {
      const { currentFloor, direction, queue } = elevator;
      const id = key;

      if (dirCall === 2) {
        // Called to Go up
        if (direction === 1) {
          distance = floorCall.floor - 1 + (currentFloor - 1);
        } else if (direction === 2) {
          if (currentFloor < floorCall.floor) {
            distance = floorCall.floor - currentFloor;
          } else {
            distance = buildingFloors - currentFloor - 1 + buildingFloors + floorCall.floor - 1;
          }
        }
      } else if (dirCall === 1) {
        if (direction === 2) {
          // Elevator going Up
          distance = buildingFloors - currentFloor + (buildingFloors - floorCall.floor);
        } else if (direction === 1) {
          // Elevator going Down
          if (currentFloor > floorCall.floor) {
            distance = currentFloor - floorCall.floor;
          } else {
            distance = buildingFloors - 1 + floorCall.floor - 1 + currentFloor - 1;
          }
        }
      }

      if (direction === 0) {
        distance = Math.abs(floorCall.floor - currentFloor);
      }

      const tempElevator = { id, distance };

      if (_.isEmpty(chosenElevator)) {
        chosenElevator = tempElevator;
      } else {
        chosenElevator = chosenElevator.distance > distance ? tempElevator : chosenElevator;
      }
    });
  }
  return Number(chosenElevator.id);
};
