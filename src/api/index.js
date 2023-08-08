import { post } from "../utils/request"

/**
 * 创建会议
 */
export function createConference (data) {
  return post("/api/cloud-visual/schedule/createConference", data)
}

/**
 * 加入会议
 */
export function joinConference (data) {
  return post("/api/cloud-visual/schedule/joinConference", data)
}

/**
 * 测试接口
 */
export function startRecord () {
  return post("/api/cloud-visual/schedule/startRecord")
}
