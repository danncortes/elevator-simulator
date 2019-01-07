import { isAlreadyCalledFrom } from './isAlreadyCalledFrom';

it('Should return false if the elevator has not been called already from a floor', () => {
  const elevators = {
    1: { queue: [{ floor: 5, dir: 1 }] },
    2: { queue: [{ floor: 6, dir: 2 }] }
  };
  const isAlredyCalled = isAlreadyCalledFrom({ floor: 7, dir: 1 }, elevators);
  expect(isAlredyCalled).toBe(false);
});

it('Should return true if the elevator has been called already from a floor', () => {
  const elevators = {
    1: { queue: [{ floor: 5, dir: 1 }] },
    2: { queue: [{ floor: 6, dir: 2 }] }
  };
  const isAlredyCalled = isAlreadyCalledFrom({ floor: 6, dir: 2 }, elevators);
  expect(isAlredyCalled).toBe(true);
});
