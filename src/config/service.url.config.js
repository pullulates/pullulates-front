/**
 * 
 * 配置各个服务的基础路径
 * 
 */

/**用户服务基础路径 */
const USER_SERVICE_BASE_URL = 'http://localhost:7600/user'

// 用户服务
export const USER_SERVICE_URL = {
    LOGIN: USER_SERVICE_BASE_URL+'/login',
    LOGIN_OUT: USER_SERVICE_BASE_URL+'/loginout'
}