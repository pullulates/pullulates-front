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
    url: PULLULATES_MENU_URL.Role_MenuIds,
    method: 'get',
    data: parameter
  })
}
