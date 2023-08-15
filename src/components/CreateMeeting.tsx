import { Button, Col, Input, message, Row } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SfuApi from 'client-sfu-sdk'
// 导入中间件连接mobx和react 完成响应式变化
import { observer } from 'mobx-react-lite'
import { useStore } from '../store'
import { renderParticipant } from '../core/renderParticipant'

function CreateMeeting() {
  const [roomName, setRoomName] = useState('') // 会议名
  const [useName, setUseName] = useState('') // 用户名
  const [secret, setSecret] = useState('') // 密码
  const [limitNum, setLimitNum] = useState<number>(2) // 限制人数

  // 状态管理
  const { sfuApiStore, meetingSetStore } = useStore()

  const navigate = useNavigate()

  const [messageApi, contextHolder] = message.useMessage()
  const messageTip = (tip: string) =>
    messageApi.open({
      type: 'warning',
      content: tip,
    })

  const joinMeeting = async () => {
    if (!roomName) {
      messageTip('会议名不能为空')
      return
    }
    if (!useName) {
      messageTip('用户名不能为空')
      return
    }
    if (!secret) {
      messageTip('密码不能为空')
      return
    }

    let sfuApi = new SfuApi('http://localhost', '5000')

    // 监听新成员入会
    sfuApi.on('ParticipantConnect', (str: any) => {
      str.forEach((participant: any) => {
        renderParticipant(participant, false, sfuApi)
      })
    })

    const result: any = await sfuApi.createMeeting({
      password: secret,
      roomName: roomName,
      useName: useName,
      maxMembers: limitNum,
      allowMemOpenCam: meetingSetStore.allowMemOpenCam,
      allowMemRename: meetingSetStore.allowMemRename,
      allowMemOpenMic: meetingSetStore.allowMemOpenMic,
      allowMemHandsUp: meetingSetStore.allowMemHandsUp,
      allowMemShareScreen: meetingSetStore.allowMemShareScreen,
      micOpen: meetingSetStore.micOpen,
      allowMemJoinSound: meetingSetStore.allowMemJoinSound,
    })

    setTimeout(() => {
      console.log('res-sfuApi', sfuApi)
      // stroe 赋值
      sfuApiStore.setSfuApi(sfuApi)

      const params: { [key: string]: any } = {
        localParticipant: JSON.stringify(result.localParticipant),
        participants: JSON.stringify(Array.from(result.participants.entries())),
      }

      navigate({
        pathname: '/emcee',
        search: '?' + new URLSearchParams(params).toString(),
      })
    }, 3000)

    // 查询url、token
    // const res = await createConference({
    //   password: secret,
    //   roomName: roomName,
    //   useName: useName,
    //   maxMembers: limitNum,
    //   ...meetingManage,
    // })

    // if (res.data) {
    //   const params: { [key: string]: string } = {
    //     url: res['data'].url,
    //     token: res['data'].token,
    //     videoEnabled: '1',
    //     audioEnabled: '1',
    //     simulcast: '1',
    //     dynacast: '1',
    //     adaptiveStream: '1',
    //   }

    // }
  }

  return (
    <div>
      {contextHolder}
      <Row className="rowStyle">
        <Col span={3}>
          <div className="colTitle">会议名称</div>
        </Col>
        <Col span={10}>
          <Input
            placeholder="请输入 会议名"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}></Input>
        </Col>
      </Row>
      <Row className="rowStyle">
        <Col span={3}>
          <div className="colTitle">会议密码</div>
        </Col>
        <Col span={10}>
          <Input.Password
            required
            placeholder="请输入 密码"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="rowStyle">
        <Col span={3}>
          <div className="colTitle">用户名</div>
        </Col>
        <Col span={10}>
          <Input
            placeholder="请输入 用户名"
            value={useName}
            onChange={(e) => setUseName(e.target.value)}></Input>
        </Col>
      </Row>
      <Row className="rowStyle">
        <Col span={3}>
          <div className="colTitle">限制人数</div>
        </Col>
        <Col span={10}>
          <Input
            required
            type="number"
            value={limitNum.toString()}
            onChange={(e) => setLimitNum(parseInt(e.target.value))}></Input>
        </Col>
      </Row>
      <Row className="rowStyle">
        <Col span={3}></Col>
        <Col span={6}>
          <Button type="primary" onClick={joinMeeting}>
            JOIN
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default observer(CreateMeeting)
