import { PULLULATES_GEN_URL } from './url/pullulates.url'
import { axios } from '@/utils/request'

/** 获取已导入表集合 */
export function getGensList (parameter) {
  return axios({
    url: PULLULATES_GEN_URL.Gen_List,
    method: 'get',
    data: parameter
  })
}

/** 获取已导入表集合 */
export function getUnImportedTableList (parameter) {
  return axios({
    url: PULLULATES_GEN_URL.Un_Imported_Table_List,
    method: 'get',
    data: parameter
  })
}

/** 导入表 */
export function importTables (parameter) {
  return axios({
    url: PULLULATES_GEN_URL.Import_Tables,
    method: 'post',
    data: parameter
  })
}
