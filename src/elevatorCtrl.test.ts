import { asignFloorToElevator2 } from './elevatorCtrl';

it('Should add the floor to the queue when it\'s empty', () => {
  const currentQueue = [];
  const queue = asignFloorToElevator2({ floor: 2, dir: 2 }, 1, 2, currentQueue)
  expect(queue).toEqual([{ floor: 2, dir: 2 }]);
});

describe('When the elevator is going up', () => {
  it('Should add the floor in the right position in the queue Case 1', () => {
    const currentQueue = [
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 },
      { floor: 1, dir: 2 },
      { floor: 2, dir: 2 }
    ];
    const queue = asignFloorToElevator2({ floor: 5, dir: 2 }, 3, 2, currentQueue)
    const expectedQueue = [
      { floor: 5, dir: 2 },
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 },
      { floor: 1, dir: 2 },
      { floor: 2, dir: 2 }
    ];
    expect(queue).toEqual(expectedQueue);
  })

  it('Should add the floor in the right position in the queue Case 2', () => {
    const currentQueue = [
      { floor: 6, dir: 2 },
      { floor: 8, dir: 1 },
      { floor: 1, dir: 2 },
      { floor: 2, dir: 2 },
    ];
    const queue = asignFloorToElevator2({ floor: 5, dir: 2 }, 3, 2, currentQueue);
    const expectedQueue = [
      { floor: 5, dir: 2 },
      { floor: 6, dir: 2 },
      { floor: 8, dir: 1 },
      { floor: 1, dir: 2 },
      { floor: 2, dir: 2 },
    ];
    expect(queue).toEqual(expectedQueue);
  })
  it('Should add the floor in the right position in the queue Case 3', () => {
    const currentQueue = [
      { floor: 4, dir: 2 },
      { floor: 5, dir: 2 },
      { floor: 7, dir: 2 },
      { floor: 6, dir: 1 },
      { floor: 1, dir: 2 },
      { floor: 2, dir: 2 },
    ];
    const queue = asignFloorToElevator2({ floor: 6, dir: 2 }, 3, 2, currentQueue);
    const expectedQueue = [
      { floor: 4, dir: 2 },
      { floor: 5, dir: 2 },
      { floor: 6, dir: 2 },
      { floor: 7, dir: 2 },
      { floor: 6, dir: 1 },
      { floor: 1, dir: 2 },
      { floor: 2, dir: 2 },
    ];
    expect(queue).toEqual(expectedQueue);
  })

  it('Should add the floor in the right position in the queue Case 4', () => {
    const currentQueue = [
      { floor: 7, dir: 2 },
      { floor: 6, dir: 1 },
      { floor: 1, dir: 2 },
      { floor: 2, dir: 2 },
    ];
    const queue = asignFloorToElevator2({ floor: 8, dir: 2 }, 3, 2, currentQueue);
    const expectedQueue = [
      { floor: 7, dir: 2 },
      { floor: 8, dir: 2 },
      { floor: 6, dir: 1 },
      { floor: 1, dir: 2 },
      { floor: 2, dir: 2 },
    ];
    expect(queue).toEqual(expectedQueue);
  })

  it('Should add the floor in the right position in the queue Case 5', () => {
    const currentQueue = [
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 },
      { floor: 1, dir: 2 },
    ];
    const queue = asignFloorToElevator2({ floor: 2, dir: 2 }, 3, 2, currentQueue);
    const expectedQueue = [
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 },
      { floor: 1, dir: 2 },
      { floor: 2, dir: 2 },
    ];
    expect(queue).toEqual(expectedQueue);
  })

  it('Should add the floor in the right position in the queue Case 6', () => {
    const currentQueue = [
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 },
      { floor: 2, dir: 2 },
    ];
    const queue = asignFloorToElevator2({ floor: 1, dir: 2 }, 4, 2, currentQueue);
    const expectedQueue = [
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 },
      { floor: 1, dir: 2 },
      { floor: 2, dir: 2 },
    ];
    expect(queue).toEqual(expectedQueue);
  })

  it('Should add the floor in the right position in the queue Case 7', () => {
    const currentQueue = [
      { floor: 3, dir: 1 },
      { floor: 2, dir: 1 },
      { floor: 1, dir: 2 },
      { floor: 3, dir: 2 },
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 },
    ];
    const queue = asignFloorToElevator2({ floor: 4, dir: 1 }, 6, 1, currentQueue);
    const expectedQueue = [
      { floor: 4, dir: 1 },
      { floor: 3, dir: 1 },
      { floor: 2, dir: 1 },
      { floor: 1, dir: 2 },
      { floor: 3, dir: 2 },
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 },
    ];
    expect(queue).toEqual(expectedQueue);
  })

  it('Should add the floor in the right position in the queue Case 8', () => {
    const currentQueue = [
      { floor: 2, dir: 2 },
      { floor: 3, dir: 2 },
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 },
    ];
    const queue = asignFloorToElevator2({ floor: 4, dir: 1 }, 6, 1, currentQueue);
    const expectedQueue = [
      { floor: 4, dir: 1 },
      { floor: 2, dir: 2 },
      { floor: 3, dir: 2 },
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 },
    ];
    expect(queue).toEqual(expectedQueue);
  })

  it('Should add the floor in the right position in the queue Case 9', () => {
    const currentQueue = [
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 },
    ];
    const queue = asignFloorToElevator2({ floor: 4, dir: 1 }, 6, 1, currentQueue);
    const expectedQueue = [
      { floor: 4, dir: 1 },
      { floor: 8, dir: 1 },
      { floor: 7, dir: 1 },
    ];
    expect(queue).toEqual(expectedQueue);
  })
})

