import Mock from 'mockjs'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'
import { nanoid } from 'nanoid'

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/home/events'), () => {
      const data = Mock.mock({
        code: 0,
        msg: '请求成功',
        timestamp: 1111,
        'data|4-6': [
          {
            id: nanoid(),
            time: '@date(yyyy-MM-dd HH:mm:ss)',
            shortcuts: '@sentence(5)',
            'tags|1-3': ['@sentence']
          }
        ]
      })
      return successResponseWrap(data.data)
    })
  }
})
