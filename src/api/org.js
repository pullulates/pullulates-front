import { PULLULATES_ORG_URL } from './url/pullulates.user.url'
import { axios } from '@/utils/request'

/** 获取角色集合 */
export function getOrgListTree (parameter) {
  return axios({
    url: PULLULATES_ORG_URL.Org_List_Tree,
    method: 'get',
    data: parameter
  })
}
