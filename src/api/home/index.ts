import { Event } from '@/pages/Home/types'
import { http } from '@/utils/request'
import '@/mock'

export function getTimeLine(data: any) {
  return http.request<BasicResponseModel<Event[]>>({
    url: '/api/home/events',
    method: 'GET',
    data
  })
}
