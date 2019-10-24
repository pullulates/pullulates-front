const PULLULATES_USER_BASE_URL = '/pullulates_user_api'

export const PULLULATES_USER_URL = {
  Login: PULLULATES_USER_BASE_URL + '/login',
  Logout: PULLULATES_USER_BASE_URL + '/logout',
  User_Info: PULLULATES_USER_BASE_URL + '/users/get',
  User_List: PULLULATES_USER_BASE_URL + '/users/list'
}

export const PULLULATES_ROLE_URL = {
  Role_List: PULLULATES_USER_BASE_URL + '/roles/list'
}

export const PULLULATES_MENU_URL = {
  Menu_Tree: PULLULATES_USER_BASE_URL + '/menus/tree',
  My_MenuIds: PULLULATES_USER_BASE_URL + '/menus/menuids/my',
  Role_MenuIds: PULLULATES_USER_BASE_URL + '/menus/menuids/role'
}
