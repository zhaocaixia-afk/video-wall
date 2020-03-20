import { request } from './request'

// 2.食品分类列表
export function getMenu() {
  return request({
    url: '/menu'
  })
}
