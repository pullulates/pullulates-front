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

/** 保存新的用户 */
export function saveUser (parameter) {
  return axios({
    url: PULLULATES_USER_URL.User_Save,
    method: 'post',
    data: parameter
  })
}

/** 根据用户id获取用户的一些核心信息，包含了用户基本信息，用户组织机构信息， 用户角色信息 */
export function getUserInfo (parameter) {
  return axios({
    url: PULLULATES_USER_URL.User_Info,
    method: 'get',
    data: parameter
  })
}
