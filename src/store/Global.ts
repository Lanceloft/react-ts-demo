import { observable, computed, action } from 'mobx';

class GlobalStore {
  @observable showLoading : boolean = false
  @observable number : number = 0

  @computed get loading() : boolean {
    return this.showLoading
  }

  @action toShowLoding = () : void => {
    this.showLoading = true
  }

  @action toHideLoading = () : void  => {
    this.showLoading = false;
  }

  @action addNumber = () : void => {
    this.number = this.number + 1
  }

  @action reduceNumber = () : void => {
    this.number = this.number - 1
  }
}


export default GlobalStore;
