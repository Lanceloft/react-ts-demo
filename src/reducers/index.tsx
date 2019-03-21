import { IAction, IGlobalStoreState } from "./types";
import { ADD_NUMBER, REDUCE_NUMBER, SET_NUMBER } from '../constants';

const initState: IGlobalStoreState = {
  amount: 0
};

export function globalReducers(state = initState, action: IAction): IGlobalStoreState {
  const { type, payload } = action;
  switch (type) {
    case ADD_NUMBER:
      return {...state, amount: state.amount + 1};
    case REDUCE_NUMBER:
      return {...state, amount: state.amount - 1};
    case SET_NUMBER:
      return {...state, amount: payload}
    default:
      return { ...state };
  }
}
