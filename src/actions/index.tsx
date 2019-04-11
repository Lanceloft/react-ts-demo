import * as constants from "../constants";
import { IAction } from "../reducers/types";

export function addNumber(): IAction {
  return {
    type: constants.ADD_NUMBER,
    payload: ""
  };
}

export function reduceNumber(): IAction {
  return {
    type: constants.REDUCE_NUMBER,
    payload: ""
  };
}

export function setNumber(number: Number): IAction {
  return {
    type: constants.SET_NUMBER,
    payload: number
  };
}

export function getTask(): IAction {
  return {
    type: constants.GET_TASL,
    payload: ""
  }
}
