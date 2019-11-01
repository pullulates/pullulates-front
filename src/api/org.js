import { PULLULATES_ORG_URL } from './url/pullulates.user.url'
import { axios } from '@/utils/request'

/** 获取组织机构列表的树 */
export function getOrgListTree (parameter) {
  return axios({
    url: PULLULATES_ORG_URL.Org_List_Tree,
    method: 'get',
    data: parameter
  })
}

/** 获取组织机构树 */
export function getOrgTree () {
  return axios({
    url: PULLULATES_ORG_URL.Org_Tree,
    method: 'get'
  })
}
