import { Button, Col, Row, Popover } from 'antd'
import { useState, useEffect } from 'react'
import { CheckOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { renderParticipant } from './core/renderParticipant'
import SfuApi from 'client-sfu-sdk'
// 导入中间件连接mobx和react 完成响应式变化
import { observer } from 'mobx-react-lite'
import { useStore } from './store'

function EmceePage() {
  const [leftSize, setLeftSize] = useState(24) // 初始化左边大小
  const [rightSize, setRightSize] = useState(0) // 初始化右边大小
  const [memberFlag, setMemberFlag] = useState(false) // 右侧成员列表切换
  const [exitFlag, setExitFlag] = useState(true) // 结束会议切换
  const [memberList, setMemberList] = useState<string[]>([]) // 成员列表

  // 状态管理
  const { sfuApiStore, meetingSetStore } = useStore()

  const query = new URLSearchParams(useLocation().search)
  const participant: any = query.get('localParticipant')
  const localParticipant: any = JSON.parse(participant)
  console.log('localParticipant', localParticipant)

  let sfuApi: SfuApi = sfuApiStore.sfuApi

  useEffect(() => {
    renderParticipant(sfuApi.room.localParticipant, false, sfuApi)
    sfuApi.room.participants.forEach((participant: any) => {
      renderParticipant(participant, false, sfuApi)
    })
  }, [sfuApi])

  const participantsq: any = query.get('participants')
  const participants = JSON.parse(participantsq)
  //console.log('participants', participants)

  const navigate = useNavigate()
  const onLeave = () => {
    navigate('/')
  }

  // 管理成员列表动态切换
  const viewMember = () => {
    if (memberFlag) {
      setMemberFlag(false)
      setLeftSize(24)
      setRightSize(0)
    } else {
      setMemberFlag(true)
      setLeftSize(18)
      setRightSize(6)
    }
  }

  // 结束会议
  const endMeeting = () => {
    console.log('结束会议,并返回首页')
    onLeave()
  }

  // 退出会议
  const exitMeeting = () => {
    console.log('调用退出会议接口')
  }

  // 获取会议成员列表信息
  const getMeetingMember = () => {
    // 获取会议成员列表信息
    return ['终端1', '终端2']
  }

  // 指定一人为主持人
  const setHost = (item: string) => {
    console.log('调用接口设置主持人', item)
    // 设置成功后,退出会议
    exitMeeting()
  }

  // 主持人离开会议
  const leaveMeeting = () => {
    // 获取所有参会人员 如果没有人在会议中 直接结束会议 有人则指定一人为主持人
    let members = getMeetingMember()
    if (members.length > 0) {
      setMemberList(members)
      // 切换选择
      setExitFlag(false)
    } else {
      // 直接结束会议
      endMeeting()
    }
  }

  const exitContent = (
    <div>
      <div>
        <Button onClick={endMeeting}>结束会议</Button>
      </div>
      <div>
        <Button onClick={leaveMeeting}>离开会议</Button>
      </div>
    </div>
  )

  const exitContent2 = (
    <div>
      <div>指定一人为主持人</div>
      {memberList.map((item) => (
        <p
          key={item}
          onClick={() => setHost(item)}
          style={{ cursor: 'pointer' }}>
          {item}
        </p>
      ))}
    </div>
  )

  // 会控管理内容
  const meetingSetCon = (
    <div className="meetset">
      <div onClick={() => meetingSetStore.setAllowMemOpenCam()}>
        <div className="iconStyle">
          {meetingSetStore.allowMemOpenCam ? <CheckOutlined /> : null}
        </div>
        允许成员开启视频
      </div>
      <div onClick={() => meetingSetStore.setAllowMemRename()}>
        <div className="iconStyle">
          {meetingSetStore.allowMemRename ? <CheckOutlined /> : null}
        </div>
        允许成员改名
      </div>
      <div onClick={() => meetingSetStore.setAllowMemOpenMic()}>
        <div className="iconStyle">
          {meetingSetStore.allowMemOpenMic ? <CheckOutlined /> : null}
        </div>
        允许成员自我解除静音
      </div>
      <div onClick={() => meetingSetStore.setAllowMemHandsUp()}>
        <div className="iconStyle">
          {meetingSetStore.allowMemHandsUp ? <CheckOutlined /> : null}
        </div>
        允许成员举手
      </div>
      <div onClick={() => meetingSetStore.setAllowMemShareScreen()}>
        <div className="iconStyle">
          {meetingSetStore.allowMemShareScreen ? <CheckOutlined /> : null}
        </div>
        允许屏幕共享
      </div>
      <div onClick={() => meetingSetStore.setMicOpen()}>
        <div className="iconStyle">
          {meetingSetStore.micOpen === 0 ? <CheckOutlined /> : null}
        </div>
        成员入会时静音
      </div>
      <div onClick={() => meetingSetStore.setAllowMemJoinSound()}>
        <div className="iconStyle">
          {meetingSetStore.allowMemJoinSound ? <CheckOutlined /> : null}
        </div>
        成员进入时播放提示音
      </div>
    </div>
  )

  return (
    <div>
      <Row className="upContainer">
        <Col span={leftSize}>
          <div className="leftContainer">
            <div id="participants-area"></div>
          </div>
          <div className="leftDownContainer">
            <Row>
              <Col span={8}>
                <div>
                  <Button>解除静音</Button>
                  <Button>开启视频</Button>
                </div>
              </Col>
              <Col span={8}>
                <div className="midStyle">
                  <Button>共享屏幕</Button>
                  <Button onClick={viewMember}>管理成员</Button>
                  <Button>回应举手</Button>
                </div>
              </Col>
              <Col span={8}>
                <div className="rigStyle">
                  <Popover
                    content={exitFlag ? exitContent : exitContent2}
                    title=""
                    trigger="click">
                    <Button onClick={() => setExitFlag(true)}>结束会议</Button>
                  </Popover>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={rightSize}>
          <div className="rightContainer">管理成员</div>
          <div className="rightDownContainer">
            <Row>
              <Col span={1}></Col>
              <Col span={17}>
                <div>
                  <Button>全体静音</Button>
                  <Button>解除全体静音</Button>
                </div>
              </Col>
              <Col span={6}>
                <div className="rigStyle">
                  <Popover
                    content={meetingSetCon}
                    title="会中设置"
                    trigger="click">
                    <Button>会控管理</Button>
                  </Popover>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default observer(EmceePage)
