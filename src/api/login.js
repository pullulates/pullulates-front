import api from './index'
import PULLULATES_USER_URL from './url/pullulates.user.url'
import PULLULATES_SERVICE_URL from './url/pullulates.service.url'
import { axios } from '@/utils/request'
import Qs from 'qs'

export function login (parameter) {
  return axios({
    url: PULLULATES_USER_URL.Login,
    method: 'post',
    data: Qs.stringify(parameter)
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return axios({
    url: PULLULATES_USER_URL.User_Info,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout () {
  return axios({
    url: PULLULATES_USER_URL.Logout,
    method: 'post'
  })
}

export function requestGeetest () {
  return axios({
    url: PULLULATES_SERVICE_URL.GEETEST_INIT,
    method: 'get'
  })
}
