/**
 * 会控管理类
 */
export class MeetingManage {
  // 允许成员开启视频
  allowMemOpenCam: boolean

  // 允许成员改名
  allowMemRename: boolean

  // 允许成员自我解除静音
  allowMemOpenMic: boolean

  // 允许成员举手
  allowMemHandsUp: boolean

  // 允许屏幕共享
  allowMemShareScreen: boolean

  // 成员入会时静音 1-打开，0-静音
  micOpen: Number

  // 成员进入时播放提示音
  allowMemJoinSound: boolean

  constructor() {
    this.allowMemOpenCam = true
    this.allowMemRename = true
    this.allowMemOpenMic = true
    this.allowMemHandsUp = true
    this.allowMemShareScreen = true
    this.micOpen = 0
    this.allowMemJoinSound = false
  }

  setAllowMemOpenCam() {
    this.allowMemOpenCam = !this.allowMemOpenCam
  }
}
