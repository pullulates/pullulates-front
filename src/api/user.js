import { PULLULATES_USER_URL } from './url/pullulates.user.url'
import { axios } from '@/utils/request'

/** 获取用户集合 */
export function getUserList (parameter) {
  return axios({
    url: PULLULATES_USER_URL.User_List,
    method: 'get',
    data: parameter
  })
}
