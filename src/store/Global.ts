import { observable, action } from 'mobx';

export interface IMobxStore {
  number: number;
  addNumber(): void;
  reduceNumber(): void
}

class GlobalStore implements IMobxStore {
  @observable number = 0

  @action addNumber = () => {
    this.number = this.number + 1
  }

  @action reduceNumber = ()=> {
    this.number = this.number - 1
  }
}


export default GlobalStore;
