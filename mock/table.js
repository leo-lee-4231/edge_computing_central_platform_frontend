import Mock from 'mockjs'

const data = Mock.mock({
  'items|3': [{
    id: '@id',
    name: '边缘节点@integer(0, 100)',
    ip: '@ip',
    port: '@integer(8000, 30000)',
    'status|+1': ['online', 'offline', 'error']
  }]
})

export default [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
