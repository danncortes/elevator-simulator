import { chooseElevator } from './chooseElevator';

it('Should select the first stopped elevator, case 1', () => {
  const elevators = {
    1: {
      direction: 2
    },
    2: {
      direction: 0
    }
  }

  const choosenElevator = chooseElevator({ floor: 4, dir: 2 }, elevators, 8)
  const expectedId = 2;
  expect(choosenElevator).toEqual(expectedId)
})

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
  }

  const choosenElevator = chooseElevator({ floor: 4, dir: 2 }, elevators, 8)
  const expectedId = 2;
  expect(choosenElevator).toEqual(expectedId)
})


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
  }

  const choosenElevator = chooseElevator({ floor: 6, dir: 1 }, elevators, 8)
  const expectedId = 1;
  expect(choosenElevator).toEqual(expectedId)
})

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
  }

  const choosenElevator = chooseElevator({ floor: 3, dir: 1 }, elevators, 8)
  const expectedId = 2;
  expect(choosenElevator).toEqual(expectedId)
})