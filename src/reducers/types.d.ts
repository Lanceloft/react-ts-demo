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

