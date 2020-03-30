import { PULLULATES_QUARTZ_URL } from './url/pullulates.url'
import { axios } from '@/utils/request'

/** 分页查询定时任务 */
export function getJobPage (parameter) {
  return axios({
    url: PULLULATES_QUARTZ_URL.Job_Page,
    method: 'get',
    data: parameter
  })
}

/** 保存定时任务 */
export function saveJob (parameter) {
  return axios({
    url: PULLULATES_QUARTZ_URL.Job_Save,
    method: 'post',
    data: parameter
  })
}
