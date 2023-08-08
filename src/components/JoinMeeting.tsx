import { Button, Col, Input, message, Row } from 'antd'
import { useState } from 'react'
import { joinConference } from '../api'
import { useNavigate } from 'react-router-dom'

export const JoinMeeting = () => {
  const [roomName, setRoomName] = useState('') // 会议名
  const [useName, setUseName] = useState('') // 用户名
  const [secret, setSecret] = useState('') // 密码

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
    // 查询url、token
    const res = await joinConference({
      secret: secret,
      room: roomName,
      useName: useName,
    })

    if (res.data) {
      const params: { [key: string]: string } = {
        url: res['data'].url,
        token: res['data'].token,
        videoEnabled: '1',
        audioEnabled: '1',
        simulcast: '1',
        dynacast: '1',
        adaptiveStream: '1',
      }
      navigate({
        pathname: '/room',
        search: '?' + new URLSearchParams(params).toString(),
      })
    }
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
