import { PULLULATES_MENU_URL } from './url/pullulates.user.url'
import { axios } from '@/utils/request'

/** 获取所有菜单的菜单树 */
export function getMenuTree () {
  return axios({
    url: PULLULATES_MENU_URL.Menu_Tree,
    method: 'get'
  })
}

/** 获取当前用户的菜单id集合 */
export function getMyMenuIds () {
  return axios({
    url: PULLULATES_MENU_URL.My_MenuIds,
    method: 'get'
  })
}

/** 获取指定角色的菜单id集合 */
export function getMenuIdsByRoleId (parameter) {
  return axios({
    url: PULLULATES_MENU_URL.Role_MenuIds_By_RoleId,
    method: 'get',
    data: parameter
  })
}

/** 获取指定角色(可能为多个)的菜单id集合 */
export function getMenuIdsByRoleKeys (parameter) {
  return axios({
    url: PULLULATES_MENU_URL.Role_MenuIds_By_RoleKeys,
    method: 'get',
    data: parameter
  })
}

/** 获取菜单列表的菜单树 */
export function getMenuListTree () {
  return axios({
    url: PULLULATES_MENU_URL.Menu_List_Tree,
    method: 'get'
  })
}
