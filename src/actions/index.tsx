import * as constants from "../constants";
import { IAction } from "../reducers/types";
import { Dispatch } from "redux";
import http from "../common/http";

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

export function setNumber(number: Number): (dispatch: Dispatch) => void {
  const param = {
    task: number
  };
  return (dispatch: Dispatch) => {
    http.post("http://127.0.0.1:5000/test", param).then(data => {
      if (data.status === 0) {
        dispatch<any>(getTask());
      }
    });
  };
}

export function getTask(): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch) => {
    http.get("http://127.0.0.1:5000/test").then(data => {
      dispatch({
        type: constants.GET_TASL,
        payload: data.data
      });
    });
  };
}

export function deleteItem(id: number): (dispatch: Dispatch) => void {
  const param = {
    id: id
  };
  return (dispatch: Dispatch) => {
    http.post("http://127.0.0.1:5000/test/delete", param).then(data => {
      console.log(data);
      if (data.status === 0) {
        dispatch<any>(getTask());
      }
    });
  };
}
