import { PULLULATES_ORG_URL } from './url/pullulates.url'
import { axios } from '@/utils/request'

/** 获取组织机构列表的树 */
export function getOrgListTree (parameter) {
  return axios({
    url: PULLULATES_ORG_URL.Org_List_Tree,
    method: 'get',
    params: parameter
  })
}

/** 获取组织机构树 */
export function getOrgTree () {
  return axios({
    url: PULLULATES_ORG_URL.Org_Tree,
    method: 'get'
  })
}

/** 获取组织机构建议排序 */
export function getSuggestSortNo (parameter) {
  return axios({
    url: PULLULATES_ORG_URL.Suggest_Sort_No,
    method: 'get',
    params: parameter
  })
}

/** 保存组织机构 */
export function saveOrg (parameter) {
  return axios({
    url: PULLULATES_ORG_URL.Org_Save,
    method: 'post',
    data: parameter
  })
}

/** 修改组织机构 */
export function updateOrg (parameter) {
  return axios({
    url: PULLULATES_ORG_URL.Org_Update,
    method: 'put',
    data: parameter
  })
}

/** 删除组织机构 */
export function deleteOrg (parameter) {
  return axios({
    url: PULLULATES_ORG_URL.Org_Delete,
    method: 'delete',
    params: parameter
  })
}
