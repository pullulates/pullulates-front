import { PULLULATES_GEN_URL } from './url/pullulates.url'
import { axios, noFilterResAxios } from '@/utils/request'

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

/** 预览代码 */
export function previewCodes (parameter) {
  return axios({
    url: PULLULATES_GEN_URL.Preview_Codes,
    method: 'get',
    data: parameter
  })
}

/** 批量删除已导入的表 */
export function deleteTable (parameter) {
  return axios({
    url: PULLULATES_GEN_URL.Delete_Table,
    method: 'delete',
    data: parameter
  })
}

/** 批量删除已导入的表 */
export function batchDeleteTable (parameter) {
  return axios({
    url: PULLULATES_GEN_URL.Batch_Delete_Table,
    method: 'get',
    data: parameter
  })
}

/** 下载代码 */
export function download (parameter) {
  return noFilterResAxios({
    url: PULLULATES_GEN_URL.Download,
    method: 'post',
    data: parameter
  })
}

/** 批量下载代码 */
export function batchDownload (parameter) {
  return noFilterResAxios({
    url: PULLULATES_GEN_URL.Batch_Download,
    method: 'post',
    data: parameter
  })
}
