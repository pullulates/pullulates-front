import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
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
        description: '认证失败咯，请先去登录一下啦~'
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
    if (error.response.status === 504) {
      notification.error({
        message: '提示',
        description: '网关服务转发超时，请检查当前服务是否可用或联系帅气的管理员'
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

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['PULLULATES-TOKEN'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
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
