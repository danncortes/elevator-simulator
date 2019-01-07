import { isAtTheSameFloorFrom } from './isAtTheSameFloorFrom';

it('Should return TRUE if the elevator IS in the same floor where the is called from', () => {
  const elevators = {
    1: { direction: 0, currentFloor: 5 }
  };
  const isAtTheSameFloor = isAtTheSameFloorFrom({ floor: 5, dir: 1 }, elevators);
  expect(isAtTheSameFloor).toBe(true);
});

it('Should return FALSE if the elevator is NOT in the same floor where the is called from', () => {
  const elevators = {
    1: { direction: 0, currentFloor: 5 }
  };
  const isAtTheSameFloor = isAtTheSameFloorFrom({ floor: 4, dir: 2 }, elevators);
  expect(isAtTheSameFloor).toBe(false);
});
