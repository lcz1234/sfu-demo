import { Tabs, Col, Row } from 'antd'
import type { TabsProps } from 'antd'
import { CreateMeeting } from './CreateMeeting'
import { JoinMeeting } from './JoinMeeting'

const onChange = (key: string) => {
  console.log(key)
}

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `创建会议`,
    children: <CreateMeeting />,
  },
  {
    key: '2',
    label: `加入会议`,
    children: <JoinMeeting />,
  },
]

export const JoinMeetingPage = () => {
  return (
    <div>
      <Row className="rowStyle">
        <Col span={2}></Col>
        <Col span={10}>
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={onChange}
            className="tabStyle"
          />
        </Col>
      </Row>
    </div>
  )
}
