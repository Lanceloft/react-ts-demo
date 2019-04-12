import { IHomePageStoreState } from "../pages/Home/types";

export interface IAction {
  type: string;
  payload: any;
}

export interface IGlobalStoreState {
  amount: number;
  data: array;
}

export interface IStoreState {
  global: IGlobalStoreState;
  name: string;
}

export interface APIAction {
  type?: any;
}
