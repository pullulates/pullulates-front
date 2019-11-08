import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import Qs from 'qs'

const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 403) {
      notification.error({
        message: '提示',
        description: data.message
      })
    }
    if (error.response.status === 401) {
      notification.error({
        message: '提示',
        description: '权限不足，请先登录'
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
    if (error.response.status === 404) {
      notification.error({
        message: '提示',
        description: '您访问的资源丢失了，请检查访问地址或联系帅气的管理员'
      })
    }
    if (error.response.status === 500) {
      notification.error({
        message: '提示',
        description: error.response.data.msg || '服务器错误，请联系帅气的管理员'
      })
    }
    if (error.response.status === 504) {
      notification.error({
        message: '提示',
        description: '服务响应超时，请检查当前服务是否可用或联系帅气的管理员'
      })
    }
    if (error.response.data.code === 500 && !(error.response.status === 401 || error.response.status === 403 || error.response.status === 404)) {
      notification.error({
        message: '提示',
        description: error.response.data.msg
      })
    }
  }
  return Promise.reject(error)
}

service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['PULLULATES-TOKEN'] = token
  }
  if (config.method === 'get') {
    config.params = config.data
    config.paramsSerializer = function (params) {
      return Qs.stringify(params, { arrayFormat: 'repeat' })
    }
  } else if (config.method === 'post') {
    config.data = Qs.stringify(config.data)
  }
  return config
}, err)

service.interceptors.response.use((response) => {
  if (response.data.code === 500) {
    notification.error({
      message: '提示',
      description: response.data.msg
    })
  }
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
