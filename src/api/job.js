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

/** 修改定时任务 */
export function updateJob (parameter) {
  return axios({
    url: PULLULATES_QUARTZ_URL.Job_Update,
    method: 'put',
    data: parameter
  })
}

/** 暂停定时任务 */
export function pauseJob (parameter) {
  return axios({
    url: PULLULATES_QUARTZ_URL.Job_Pause,
    method: 'put',
    data: parameter
  })
}

/** 执行定时任务 */
export function excuteJob (parameter) {
  return axios({
    url: PULLULATES_QUARTZ_URL.Job_Excute,
    method: 'put',
    data: parameter
  })
}

/** 立即执行一次定时任务 */
export function excuteJobAtonece (parameter) {
  return axios({
    url: PULLULATES_QUARTZ_URL.Job_Excute_Atonce,
    method: 'put',
    data: parameter
  })
}

/** 删除定时任务 */
export function deleteJob (parameter) {
  return axios({
    url: PULLULATES_QUARTZ_URL.Job_Delete,
    method: 'delete',
    data: parameter
  })
}
