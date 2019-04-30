import { IAction, IGlobalStoreState } from "./types";
import { ADD_NUMBER, REDUCE_NUMBER, GET_TASL } from "../constants";

const initState: IGlobalStoreState = {
  amount: 0,
  data: []
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
    case GET_TASL:
      return { ...state, data: payload };
    default:
      return { ...state };
  }
}
