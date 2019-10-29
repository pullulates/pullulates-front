import { PULLULATES_DICT_URL } from './url/pullulates.user.url'
import { axios } from '@/utils/request'

/** 获取字典类型集合 */
export function getDictTypeList (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Type_List,
    method: 'get',
    data: parameter
  })
}

/** 获取字典类型集合 */
export function getDictDataList (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Data_List,
    method: 'get',
    data: parameter
  })
}
