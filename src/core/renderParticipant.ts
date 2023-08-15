import SfuApi from 'client-sfu-sdk'
// 参会者UI渲染
export const renderParticipant = (
  participant: any,
  remove: boolean = false,
  sfuApi: SfuApi
) => {
  const container = document.getElementById('participants-area')
  if (!container) return
  const { identity } = participant
  let div = document.getElementById(`participant-${identity}`)
  if (!div && !remove) {
    div = document.createElement('div')
    div.id = `participant-${identity}`
    div.className = 'participant'
    div.innerHTML = `
      <video id="video-${identity}"></video>
      <audio id="audio-${identity}"></audio>
      <div class="info-bar">
        <div id="name-${identity}" class="name">
        </div>
        <div style="text-align: center;">
          <span id="codec-${identity}" class="codec">
          </span>
          <span id="size-${identity}" class="size">
          </span>
          <span id="bitrate-${identity}" class="bitrate">
          </span>
        </div>
        <div class="right">
          <span id="signal-${identity}"></span>
          <span id="mic-${identity}" class="mic-on"></span>
          <span id="e2ee-${identity}" class="e2ee-on"></span>
        </div>
      </div>
    `
    container.appendChild(div)

    const sizeElm = document.getElementById(`size-${identity}`)
    const videoElm = <HTMLVideoElement>(
      document.getElementById(`video-${identity}`)
    )
    videoElm.onresize = () => {
      updateVideoSize(videoElm!, sizeElm!)
    }
  }
  const videoElm = <HTMLVideoElement>(
    document.getElementById(`video-${identity}`)
  )
  const audioELm = <HTMLAudioElement>(
    document.getElementById(`audio-${identity}`)
  )
  if (remove) {
    div?.remove()
    if (videoElm) {
      videoElm.srcObject = null
      videoElm.src = ''
    }
    if (audioELm) {
      audioELm.srcObject = null
      audioELm.src = ''
    }
    return
  }

  // update properties
  document.getElementById(`name-${identity}`)!.innerHTML = participant.identity
  if (participant.isLocal) {
    document.getElementById(`name-${identity}`)!.innerHTML += ' (you)'
  }
  const micElm = document.getElementById(`mic-${identity}`)!
  const signalElm = document.getElementById(`signal-${identity}`)!
  //const cameraPub = participant.getTrack(Track.Source.Camera)
  //const micPub = participant.getTrack(Track.Source.Microphone)
  if (participant.isSpeaking) {
    div!.classList.add('speaking')
  } else {
    div!.classList.remove('speaking')
  }

  // if (!participant.isLocal) {
  //   const volumeSlider = <HTMLInputElement>(
  //     document.getElementById(`volume-${identity}`)
  //   )
  //   volumeSlider.addEventListener('input', (ev) => {
  //     participant.setVolume(
  //       Number.parseFloat((ev.target as HTMLInputElement).value)
  //     )
  //   })
  // }

  // 参会者是否开启视频
  if (participant.cameraEnabled) {
    if (participant.isLocal) {
      // flip
      videoElm.style.transform = 'scale(-1, 1)'
    } else if (!participant.isIncludeVideoElm(videoElm)) {
      const renderStartTime = Date.now()
      // measure time to render
      videoElm.onloadeddata = () => {
        const elapsed = Date.now() - renderStartTime
        let fromJoin = 0
        if (
          participant.joinedAt &&
          participant.joinedAt.getTime() < participant.startTime
        ) {
          fromJoin = Date.now() - participant.startTime
        }
      }
    }
    //sfuApi.attachVideo(videoElm)
  } else {
    // clear information display
    document.getElementById(`size-${identity}`)!.innerHTML = ''
    if (participant?.videoTrack) {
      // detach manually whenever possible
      //cameraPub.videoTrack?.detach(videoElm)
    } else {
      videoElm.src = ''
      videoElm.srcObject = null
    }
  }
  console.log(sfuApi.room.localParticipant)
  console.log(sfuApi.room.localParticipant.connectionQuality)

  sfuApi.attachVideo(videoElm)

  //const micEnabled = micPub && micPub.isSubscribed && !micPub.isMuted
  // 参会者是否开启麦克风
  if (participant.micEnabled) {
    if (!participant.isLocal) {
      // don't attach local audio
      audioELm.onloadeddata = () => {
        if (
          participant.joinedAt &&
          participant.joinedAt.getTime() < participant.startTime
        ) {
          const fromJoin = Date.now() - participant.startTime
        }
      }
      //micPub?.audioTrack?.attach(audioELm)
    }
    micElm.className = 'mic-on'
    micElm.innerHTML = '<i class="fas fa-microphone"></i>'
  } else {
    micElm.className = 'mic-off'
    micElm.innerHTML = '<i class="fas fa-microphone-slash"></i>'
  }
  //sfuApi.attachAudio(audioELm)

  // 是否加密
  const e2eeElm = document.getElementById(`e2ee-${identity}`)!
  if (participant.isEncrypted) {
    e2eeElm.className = 'e2ee-on'
    e2eeElm.innerHTML = '<i class="fas fa-lock"></i>'
  } else {
    e2eeElm.className = 'e2ee-off'
    e2eeElm.innerHTML = '<i class="fas fa-unlock"></i>'
  }

  // 参会者连接质量
  switch (participant.connectionQuality) {
    case ConnectionQuality.Excellent:
    case ConnectionQuality.Good:
    case ConnectionQuality.Poor:
      signalElm.className = `connection-${participant.connectionQuality}`
      signalElm.innerHTML = '<i class="fas fa-circle"></i>'
      break
    default:
      signalElm.innerHTML = ''
    // do nothing
  }
}

// 窗口大小
function updateVideoSize(element: HTMLVideoElement, target: HTMLElement) {
  target.innerHTML = `(${element.videoWidth}x${element.videoHeight})`
}

export enum ConnectionQuality {
  Excellent = 'excellent',
  Good = 'good',
  Poor = 'poor',
  Unknown = 'unknown',
}
