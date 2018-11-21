
import { isAlreadyCalledFrom } from './isAlreadyCalledFrom';

it('Should return false if the elevator has not been called already from a floor', () => {
  const elevators = {
    1: { queue: [] },
    2: { queue: [] },
  };
  const isAlredyCalled = isAlreadyCalledFrom({ floor: 5, dir: 2 }, elevators);
});
