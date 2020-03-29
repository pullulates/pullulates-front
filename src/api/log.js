import { PULLULATES_LOG_URL } from './url/pullulates.url'
import { axios } from '@/utils/request'

/** 分页查询登录日志 */
export function getLoginLogPage (parameter) {
  return axios({
    url: PULLULATES_LOG_URL.Login_Log_Page,
    method: 'get',
    data: parameter
  })
}

/** 分页查询操作日志 */
export function getOperLogPage (parameter) {
  return axios({
    url: PULLULATES_LOG_URL.Oper_Log_Page,
    method: 'get',
    data: parameter
  })
}
