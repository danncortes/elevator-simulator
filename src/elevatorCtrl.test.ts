import { asignFloorToElevator2 } from './elevatorCtrl';

it('Should add the floor to the queue when it\'s empty', () => {
  const currentQueue = [];
  const queue = asignFloorToElevator2({ floor: 2, dir: 2 }, 1, currentQueue)
  expect(queue).toEqual([{ floor: 2, dir: 2 }]);
});

describe('When the call is from a higher floor and the elevator is going up', () => {
  it('Should add the floor as next if there no more next stop going up', () => {
    const currentQueue = [
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 }
    ];
    const queue = asignFloorToElevator2({ floor: 5, dir: 2 }, 3, currentQueue)
    const expectedQueue = [
      { floor: 5, dir: 2 },
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 }
    ];
    expect(queue).toEqual(expectedQueue);
  })
  it('Should add the floor as next if the next floor in the queue is higher than the floor where is called from', () => {
    const currentQueue = [
      { floor: 6, dir: 2 },
      { floor: 7, dir: 2 },
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 },
      { floor: 6, dir: 1 },
    ];
    const queue = asignFloorToElevator2({ floor: 5, dir: 2 }, 3, currentQueue);
    const expectedQueue = [
      { floor: 5, dir: 2 },
      { floor: 6, dir: 2 },
      { floor: 7, dir: 2 },
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 },
      { floor: 6, dir: 1 },
    ];
    expect(queue).toEqual(expectedQueue);
  })
  it('Should add the floor in the right position in the queue', () => {
    const currentQueue = [
      { floor: 4, dir: 2 },
      { floor: 5, dir: 2 },
      { floor: 7, dir: 2 },
      { floor: 6, dir: 1 },
    ];
    const queue = asignFloorToElevator2({ floor: 6, dir: 2 }, 3, currentQueue);
    const expectedQueue = [
      { floor: 4, dir: 2 },
      { floor: 5, dir: 2 },
      { floor: 6, dir: 2 },
      { floor: 7, dir: 2 },
      { floor: 6, dir: 1 },
    ];
    expect(queue).toEqual(expectedQueue);
  })
})

