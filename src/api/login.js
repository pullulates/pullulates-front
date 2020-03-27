import api from './index'
import { PULLULATES_USER_URL, PULLULATES_GEETEST_URL } from './url/pullulates.url'
import { axios } from '@/utils/request'

export function login (parameter) {
  return axios({
    url: PULLULATES_USER_URL.Login,
    method: 'post',
    data: parameter
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
    url: PULLULATES_USER_URL.My_User_Info,
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
    url: PULLULATES_GEETEST_URL.GEETEST_INIT,
    method: 'get'
  })
}
