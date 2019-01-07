import { InfoLog } from '../types';

export function logListItem(logInfo: InfoLog) {
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
      <div class="next">${next.floor}</div>
      <ul>
        ${queueList()}
      </ul>
    </div>`;

  function displayState() {
    if (isStop) {
      return statusText('Stopped');
    } else {
      return queueInfo;
    }
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
