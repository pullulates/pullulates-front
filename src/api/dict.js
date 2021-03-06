import { PULLULATES_DICT_URL } from './url/pullulates.url'
import { axios } from '@/utils/request'

/** 获取字典类型集合 */
export function getDictTypeList (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Type_List,
    method: 'get',
    params: parameter
  })
}

/** 获取字典数据集合 */
export function getDictDataList (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Data_List,
    method: 'get',
    params: parameter
  })
}

/** 根据字典类型获取制定的字典数据集合 */
export function getDictDataListByType (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Data_List_By_Type,
    method: 'get',
    params: parameter
  })
}

/** 根据字典类别和字典值获取字典数据详细信息 */
export function getDictDataInfo (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Data_Info,
    method: 'get',
    params: parameter
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

/** 修改字典类别信息 */
export function updateType (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Update_Type,
    method: 'put',
    data: parameter
  })
}

/** 删除字典类别信息 */
export function deleteType (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_DeleteType,
    method: 'delete',
    params: parameter
  })
}

/** 修改字典数据信息 */
export function updateData (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Update_Data,
    method: 'put',
    data: parameter
  })
}

/** 删除字典数据信息 */
export function deleteData (parameter) {
  return axios({
    url: PULLULATES_DICT_URL.Dict_DeleteData,
    method: 'delete',
    params: parameter
  })
}

/** 获取建议排序编号 */
export function getSuggestSortNo () {
  return axios({
    url: PULLULATES_DICT_URL.Dict_Type_Suggest_Sortno,
    method: 'get'
  })
}

/** 获取字典选项描述文本 */
export function getDictOption (datas, param) {
  const result = datas.filter(item => item.dictValue === param)
  return result.length > 0 ? result[0].dictName : '未知'
}

/** 获取字典选项描述文本 */
export function getDictCss (datas, param) {
  const result = datas.filter(item => item.dictValue === param)
  return result.length > 0 ? result[0].dictCss : ''
}
