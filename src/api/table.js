import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

export function getMessage(params) {
  return request({
    url: '/vue-admin-template/message/list',
    method: 'get',
    params
  })
}

export function getInterface(params) {
  return request({
    url: '/vue-admin-template/interface/list',
    method: 'get',
    params
  })
}

