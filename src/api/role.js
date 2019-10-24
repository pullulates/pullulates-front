import { PULLULATES_ROLE_URL } from './url/pullulates.user.url'
import { axios } from '@/utils/request'
import Qs from 'qs'

/** 获取角色集合 */
export function getRoleList (parameter) {
  return axios({
    url: PULLULATES_ROLE_URL.Role_List,
    method: 'get',
    data: Qs.stringify(parameter)
  })
}
