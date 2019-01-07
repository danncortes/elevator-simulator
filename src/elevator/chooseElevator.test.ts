import { chooseElevator } from './chooseElevator';

describe('No distributed queue', () => {
  const distributed = false;
  it('Should select the first stopped elevator, case 1', () => {
    const elevators = {
      1: {
        direction: 2
      },
      2: {
        direction: 0
      }
    };

    const choosenElevator = chooseElevator(distributed, { floor: 4, dir: 2 }, elevators, 8);
    const expectedId = 2;
    expect(choosenElevator).toEqual(expectedId);
  });

  it('Should select the right elevator, case 2', () => {
    const elevators = {
      1: {
        currentFloor: 5,
        direction: 2
      },
      2: {
        currentFloor: 2,
        direction: 1
      }
    };

    const choosenElevator = chooseElevator(distributed, { floor: 4, dir: 2 }, elevators, 8);
    const expectedId = 2;
    expect(choosenElevator).toEqual(expectedId);
  });

  it('Should select the right elevator, case 3', () => {
    const elevators = {
      1: {
        currentFloor: 7,
        direction: 2
      },
      2: {
        currentFloor: 2,
        direction: 1
      }
    };

    const choosenElevator = chooseElevator(distributed, { floor: 6, dir: 1 }, elevators, 8);
    const expectedId = 1;
    expect(choosenElevator).toEqual(expectedId);
  });

  it('Should select the right elevator, case 4', () => {
    const elevators = {
      1: {
        currentFloor: 7,
        direction: 2
      },
      2: {
        currentFloor: 6,
        direction: 1
      }
    };

    const choosenElevator = chooseElevator(distributed, { floor: 3, dir: 1 }, elevators, 8);
    const expectedId = 2;
    expect(choosenElevator).toEqual(expectedId);
  });
});

describe('Distributed queue', () => {
  const distributed = true;
  it('Should select the right elevator, case 1', () => {
    const elevators = {
      1: {
        id: 1,
        queue: [{ floor: 5, dir: 2 }],
        direction: 2
      },
      2: {
        id: 2,
        queue: [],
        direction: 0
      },
      3: {
        id: 3,
        queue: [],
        direction: 0
      }
    };

    const choosenElevator = chooseElevator(distributed, { floor: 3, dir: 2 }, elevators, 8);
    const expectedId = 2;
    expect(choosenElevator).toEqual(expectedId);
  });
  it('Should select the right elevator, case 1', () => {
    const elevators = {
      1: {
        id: 1,
        queue: [{ floor: 5, dir: 2 }],
        direction: 2
      },
      2: {
        id: 2,
        queue: [{ floor: 6, dir: 2 }],
        direction: 1
      },
      3: {
        id: 3,
        queue: [],
        direction: 0
      }
    };

    const choosenElevator = chooseElevator(distributed, { floor: 3, dir: 2 }, elevators, 8);
    const expectedId = 3;
    expect(choosenElevator).toEqual(expectedId);
  });
  it('Should select the right elevator, case 1', () => {
    const elevators = {
      1: {
        id: 1,
        queue: [{ floor: 5, dir: 2 }],
        direction: 2
      },
      2: {
        id: 2,
        queue: [{ floor: 6, dir: 2 }],
        direction: 2
      },
      3: {
        id: 3,
        queue: [{ floor: 7, dir: 2 }],
        direction: 2
      }
    };

    const choosenElevator = chooseElevator(distributed, { floor: 3, dir: 1 }, elevators, 8);
    const expectedId = 1;
    expect(choosenElevator).toEqual(expectedId);
  });
});
