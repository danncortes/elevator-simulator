import * as _ from 'lodash';

export function logItem(logInfo) {
  const { id, direction, next, queue, currentFloor, isMoving } = logInfo;

  const dirStatus = direction === 0 ? '-' : direction === 2 ? '>' : '<';
  const isQueueEmpty = queue.length === 0;

  const isStop = direction === 0 && isQueueEmpty && !isMoving;

  const queueList = () => {
    let list = '';
    queue.forEach((element) => {
      list += `<li><span class="floor">${element}</span></li>`;
    });
    return list;
  };

  function statusText(statusText) {
    return `
      <div class="status-text">
        ${statusText}
      </div>
    `;
  }

  const queueInfo = `<div class="status">
      <div class="icon">${dirStatus}</div>
    </div>
    <div class="queue">
      <div class="next">${next}</div>
      <ul>
        ${queueList()}
      </ul>
    </div>`;

  function displayState() {
    if (isStop) {
      return statusText('Stopped');
    }
    return queueInfo;
  }

  return `
    <article class="log-item log-elev-${id}">
      <div class="title">
        <h3>Elevator ${id}</h3>
      </div>
      <div class="current">${currentFloor}</div>
      ${displayState()}
    </article>
  `;
}

export function getLogInfo(elevator) {
  const { direction, queue, id, currentFloor, isMoving } = elevator;
  let queueList = [];
  queueList =
    direction === 2
      ? [...queue[2], ...queue[1]]
      : direction === 1
      ? [...queue[1], ...queue[2]]
      : [];
  const next = queueList.shift();
  return {
    id,
    direction,
    currentFloor,
    isMoving,
    next,
    queue: queueList
  };
}

export function createLogStructure(elevators): string {
  let logStructure = '';
  _.forEach(elevators, (elev) => {
    const logInfo = getLogInfo(elev);
    logStructure += `<li>${logItem(logInfo)}</li>`;
  });
  return logStructure;
}

export function setLog(elevator) {
  const { id } = elevator;
  const selectLogElement = document.querySelector(`.log-elev-${id}`);
  const liLog = selectLogElement.parentElement;
  liLog.removeChild(selectLogElement);
  const logInfo = getLogInfo(elevator);
  liLog.insertAdjacentHTML('beforeend', logItem(logInfo));
}
