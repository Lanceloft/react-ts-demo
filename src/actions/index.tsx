import * as constants from "../constants";
import { IAction } from "../reducers/types";
import { Dispatch } from "redux";
import http from "../common/http";
import paramInspect from "../common/paramInspect";

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
    http.post("/test", param).then(data => {
      if (data.status === 0) {
        dispatch<any>(getTask(""));
      }
    });
  };
}

export function getTask(taskName: string): (dispatch: Dispatch) => void {
  const param = {
    task: taskName
  };
  return (dispatch: Dispatch) => {
    http.get("/test", param).then(data => {
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
    http.post("/test/delete", param).then(data => {
      if (data.status === 0) {
        dispatch<any>(getTask(""));
      }
    });
  };
}

export function editItem(
  id: number,
  name: string,
  image: string
): (dispatch: Dispatch) => void {
  const param = {
    id: id,
    task: name,
    image: image
  };

  return (dispatch: Dispatch) => {
    http.post("/test/edit", paramInspect(param)).then(data => {
      if (data.status === 0) {
        dispatch<any>(getTask(""));
      }
    });
  };
}
