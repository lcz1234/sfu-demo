import { Button, Col, Row, Popover } from 'antd'
import { useState, useEffect } from 'react'
import { CheckOutlined } from '@ant-design/icons'
import { MeetingManage } from './api/MeetingManage'
import SfuApi from 'client-sfu-sdk'

export const EmceePage = () => {
  const [leftSize, setLeftSize] = useState(24) // 初始化左边大小
  const [rightSize, setRightSize] = useState(0) // 初始化右边大小
  const [memberFlag, setMemberFlag] = useState(false) // 右侧成员列表切换
  const [exitFlag, setExitFlag] = useState(true) // 结束会议切换
  const [memberList, setMemberList] = useState<string[]>([]) // 成员列表

  const [meetingManage, setMeetingManage] = useState<MeetingManage>() // 初始化会控管理

  // useEffect(() => {
  //   const mm = new MeetingManage();
  //   setMeetingManage(mm);
  // }, [meetingManage]);

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
    const c = new SfuApi('http://127.0.0.1', '5000')
    c.createMeeting()
    console.log('结束会议,并返回首页')
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

  const allowMemOpenCamClick = () => {
    const mm = meetingManage
    mm?.setAllowMemOpenCam()
    setMeetingManage(mm)
  }

  // 会控管理内容
  const meetingSetCon = (
    <div>
      <div onClick={allowMemOpenCamClick}>
        <div className="iconStyle">
          {meetingManage?.allowMemOpenCam ? <CheckOutlined /> : null}
        </div>
        允许成员开启视频
      </div>
      <div>
        <div className="iconStyle">
          {meetingManage?.allowMemRename ? <CheckOutlined /> : null}
        </div>
        允许成员改名
      </div>
      <div>
        <div className="iconStyle">
          {meetingManage?.allowMemOpenMic ? <CheckOutlined /> : null}
        </div>
        允许成员自我解除静音
      </div>
      <div>
        <div className="iconStyle">
          {meetingManage?.allowMemHandsUp ? <CheckOutlined /> : null}
        </div>
        允许成员举手
      </div>
      <div>
        <div className="iconStyle">
          {meetingManage?.allowMemShareScreen ? <CheckOutlined /> : null}
        </div>
        允许屏幕共享
      </div>
      <div>
        <div className="iconStyle">
          {meetingManage?.micOpen ? <CheckOutlined /> : null}
        </div>
        成员入会时静音
      </div>
      <div>
        <div className="iconStyle">
          {meetingManage?.allowMemJoinSound ? <CheckOutlined /> : null}
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
            左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器左边容器
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
