import { IAction, IGlobalStoreState } from "./types";
import { ADD_NUMBER, REDUCE_NUMBER, SET_NUMBER, GET_TASL } from "../constants";
import http from '../common/http';

const initState: IGlobalStoreState = {
  amount: 0,
  data: [],
};

export function globalReducers(
  state = initState,
  action: IAction
): IGlobalStoreState {
  const { type, payload } = action;
  switch (type) {
    case ADD_NUMBER:
      return { ...state, amount: state.amount + 1 };
    case REDUCE_NUMBER:
      return { ...state, amount: state.amount - 1 };
    case SET_NUMBER:
      const param = {
        task: payload
      }
      http.post('http://127.0.0.1:5000/test', param)
      .then((response : Object) => {
        console.log(response)
      })
      return { ...state, amount: payload };
    case GET_TASL:
      return { ...state, data: payload};
    default:
      return { ...state };
  }
}
