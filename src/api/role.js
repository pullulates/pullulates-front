import { PULLULATES_ROLE_URL } from './url/pullulates.user.url'
import { axios } from '@/utils/request'

/** 获取角色分页集合 */
export function getRolePage (parameter) {
  return axios({
    url: PULLULATES_ROLE_URL.Role_Page,
    method: 'get',
    data: parameter
  })
}

/** 获取角色集合 */
export function getRoleList (parameter) {
  return axios({
    url: PULLULATES_ROLE_URL.Role_List,
    method: 'get',
    data: parameter
  })
}

/** 保存新的角色 */
export function saveRole (parameter) {
  return axios({
    url: PULLULATES_ROLE_URL.Role_Save,
    method: 'post',
    data: parameter
  })
}

/** 获取角色推荐的排序编号 */
export function getSuggestNo (parameter) {
  return axios({
    url: PULLULATES_ROLE_URL.Role_Suggest_No,
    method: 'get',
    data: parameter
  })
}

/** 根据角色id修改用户的状态 */
export function changeRoleStatus (parameter) {
  return axios({
    url: PULLULATES_ROLE_URL.Change_Role_Status,
    method: 'put',
    data: parameter
  })
}
