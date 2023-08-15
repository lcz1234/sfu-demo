import { makeAutoObservable } from 'mobx'
import SfuApi from 'client-sfu-sdk'

/**
 * SFU Cliet
 */
class SfuApiStore {
  // 1.定义数据
  sfuApi = new SfuApi()
  constructor() {
    // 2.把数据弄成响应式
    makeAutoObservable(this)
  }
  // 3.定义action函数（修改数据）
  setSfuApi = (sfuApi: SfuApi) => {
    this.sfuApi = sfuApi
  }
}

export { SfuApiStore }
