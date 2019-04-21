import { ERROR, SUCCESS } from 'constants/status.js';

export const allFailed = (requestsArray) => {
  return requestsArray.every((element) => element === ERROR);
};
export const allFinished = (requestsArray) => {
  return requestsArray.every(
    (element) => element === ERROR || element === SUCCESS,
  );
};
export const someFailed = (requestsArray) => {
  return requestsArray.some((element) => element === ERROR);
};
