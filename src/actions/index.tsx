import * as constants from '../constants'
import { IAction } from '../reducers/types';

export function addNumber(): IAction {
  return {
    type: constants.ADD_NUMBER,
    payload: ''
  };
}

export function reduceNumber(): IAction {
  return {
    type: constants.REDUCE_NUMBER,
    payload: ''
  }
}

export function setNumber(): IAction {
  return {
    type: constants.SET_NUMBER,
    payload: 10
  }
}
