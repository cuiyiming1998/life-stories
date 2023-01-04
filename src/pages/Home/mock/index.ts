import Mock from 'mockjs'
import setupMock, { successResponseWrap } from '@/utils/setup-mock'
import { nanoid } from 'nanoid'

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/home/events'), () => {
      const data = Mock.mock({
        'data|4-6': [
          {
            'id|+1': nanoid(),
            time: '@date(yyyy-MM-dd HH:mm:ss)',
            'shortcuts|1-3': '@paragraph(1, 15)',
            'tags|1-2': '@sentence(5)'
          }
        ]
      })
      return successResponseWrap(data.data)
    })
  }
})
