import * as _ from 'lodash';

import { logListItem } from './logListItem';
import { getLogInfo } from './getLogInfo';

export function createLogStructure(elevators): string {
  let logStructure = '';
  _.forEach(elevators, (elev) => {
    const logInfo = getLogInfo(elev);
    logStructure += `<li>${logListItem(logInfo)}</li>`;
  });
  return logStructure;
}

export function updateLog(elevator) {
  const { id } = elevator;
  const selectLogElement = document.querySelector(`.log-elev-${id}`);
  const liLog = selectLogElement.parentElement;
  liLog.removeChild(selectLogElement);
  const logInfo = getLogInfo(elevator);
  liLog.insertAdjacentHTML('beforeend', logListItem(logInfo));
}
