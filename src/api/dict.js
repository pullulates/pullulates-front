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

/** 获取字典数据集合 */
export function getDictDataList (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Data_List,
    method: 'get',
    data: parameter
  })
}

/** 根据字典类型获取制定的字典数据集合 */
export function getDictDataListByType (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Data_List_By_Type,
    method: 'get',
    data: parameter
  })
}

/** 根据字典类别和字典值获取字典数据详细信息 */
export function getDictDataInfo (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Data_Info,
    method: 'get',
    data: parameter
  })
}

/** 保存字典类别信息 */
export function saveType (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Save_Type,
    method: 'post',
    data: parameter
  })
}

/** 保存字典数据信息 */
export function saveData (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Save_Data,
    method: 'post',
    data: parameter
  })
}

/** 获取建议排序编号 */
export function getSuggestSortNo () {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Type_Suggest_Sortno,
    method: 'get'
  })
}
