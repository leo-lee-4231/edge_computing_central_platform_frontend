import Mock from 'mockjs'

const data = Mock.mock({
  'items|4': [{
    id: '@id',
    'name|+1': ['边缘计算测试', '国际象棋', '八皇后问题', '函数计算'],
    'language|1': ['Java - Android', 'Kotlin - Android', 'Python - Linux', 'go - Linux', 'Objective-C - IOS', 'Swift - IOS'],
    cpu: '@integer(0, 500)',
    'memory|1': ['128MB', '256MB', '512MB', '1GB', '2GB', '4GB'],
    'disk|1': ['1GB', '2GB', '4GB', '8GB', '16GB', '64GB'],
    bandwidth: '@integer(0, 500)',
    'status|+1': ['available', 'unavailable', 'ready']
  }]
})

const messageData = Mock.mock({
  'items|2': [{
    id: '@id',
    'name|+1': ['DropEggRequest', 'DropEggReply'],
    'type|+1': ['Request', 'Reply'],
    parameter: '@integer(1, 6)'
  }]
})

const interfaceData = Mock.mock({
  'items': [{
    id: 1,
    name: 'dropEgg',
    input: 'DropEggRequest',
    output: 'DropEggReply'
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
  },
  {
    url: '/vue-admin-template/message/list',
    type: 'get',
    response: config => {
      const items = messageData.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-admin-template/interface/list',
    type: 'get',
    response: config => {
      const items = interfaceData.items
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
