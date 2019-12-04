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

/** 根据用户id修改用户的状态 */
export function changeUserStatus (parameter) {
  return axios({
    url: PULLULATES_USER_URL.Change_User_Status,
    method: 'put',
    data: parameter
  })
}

/** 根据用户id批量修改用户的状态 */
export function batchChangeUserStatus (parameter) {
  return axios({
    url: PULLULATES_USER_URL.Batch_Change_User_Status,
    method: 'get',
    data: parameter
  })
}

/** 根据用户id重置用户的登录密码 */
export function resetPassword (parameter) {
  return axios({
    url: PULLULATES_USER_URL.Reset_Password,
    method: 'put',
    data: parameter
  })
}

/** 根据用户id删除用户 */
export function deleteUser (parameter) {
  return axios({
    url: PULLULATES_USER_URL.Delete_User,
    method: 'delete',
    data: parameter
  })
}

/** 根据用户id批量删除用户 */
export function batchDeleteUser (parameter) {
  return axios({
    url: PULLULATES_USER_URL.Batch_Delete_User,
    method: 'get',
    data: parameter
  })
}
