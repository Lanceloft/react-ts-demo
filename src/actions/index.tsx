import * as constants from "../constants";
import { IAction, APIAction } from "../reducers/types";
import { Dispatch } from "redux";
import http from '../common/http';

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


export function getTask () : (dispatch : Dispatch<any>) => void {
  return (dispatch : Dispatch) => {
    http.get('http://127.0.0.1:5000/test')
    .then((data) => {
      dispatch({
        type: constants.GET_TASL,
        payload: data.data
      });
    })
  }
}
