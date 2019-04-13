import GlobalStore from './Global';

class RootStore {
  globalStore: GlobalStore;
  constructor() {
    this.globalStore = new GlobalStore()
  }
}

export default RootStore;
