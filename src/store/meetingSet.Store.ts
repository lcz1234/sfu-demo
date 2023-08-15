import { makeAutoObservable } from 'mobx'

/**
 * meeting set
 */
class MeetingSetStore {
  // 1.定义数据
  // 允许成员开启视频
  allowMemOpenCam: boolean = true

  // 允许成员改名
  allowMemRename: boolean = true

  // 允许成员自我解除静音
  allowMemOpenMic: boolean = true

  // 允许成员举手
  allowMemHandsUp: boolean = true

  // 允许屏幕共享
  allowMemShareScreen: boolean = true

  // 成员入会时静音 1-打开，0-静音
  micOpen: number = 0

  // 成员进入时播放提示音
  allowMemJoinSound: boolean = false

  constructor() {
    // 2.把数据弄成响应式
    makeAutoObservable(this)
  }

  // 3.定义action函数（修改数据）
  setAllowMemOpenCam() {
    this.allowMemOpenCam = !this.allowMemOpenCam
  }

  setAllowMemRename() {
    this.allowMemRename = !this.allowMemRename
  }

  setAllowMemOpenMic() {
    this.allowMemOpenMic = !this.allowMemOpenMic
  }

  setAllowMemHandsUp() {
    this.allowMemHandsUp = !this.allowMemHandsUp
  }

  setAllowMemShareScreen() {
    this.allowMemShareScreen = !this.allowMemShareScreen
  }

  setMicOpen() {
    this.micOpen = this.micOpen === 0 ? 1 : 0
  }

  setAllowMemJoinSound() {
    this.allowMemJoinSound = !this.allowMemJoinSound
  }
}

export { MeetingSetStore }
