const PULLULATES_USER_BASE_URL = '/pullulates_user_api'

export const PULLULATES_USER_URL = {
  Login: PULLULATES_USER_BASE_URL + '/login',
  Logout: PULLULATES_USER_BASE_URL + '/logout',
  User_Info: PULLULATES_USER_BASE_URL + '/users/get',
  User_List: PULLULATES_USER_BASE_URL + '/users/list',
  User_Save: PULLULATES_USER_BASE_URL + '/users/save'
}

export const PULLULATES_ROLE_URL = {
  Role_List: PULLULATES_USER_BASE_URL + '/roles/list'
}

export const PULLULATES_MENU_URL = {
  Menu_Tree: PULLULATES_USER_BASE_URL + '/menus/tree',
  My_MenuIds: PULLULATES_USER_BASE_URL + '/menus/menuids/my',
  Role_MenuIds_By_RoleId: PULLULATES_USER_BASE_URL + '/menus/menuids/roleid',
  Role_MenuIds_By_RoleKeys: PULLULATES_USER_BASE_URL + '/menus/menuids/rolekeys',
  Menu_List_Tree: PULLULATES_USER_BASE_URL + '/menus/list/tree'
}

export const PULLULATES_ORG_URL = {
  Org_List_Tree: PULLULATES_USER_BASE_URL + '/orgs/list/tree',
  Org_Tree: PULLULATES_USER_BASE_URL + '/orgs/tree'
}

export const PULLULATES_DICT_URL = {
  Dict_Type_List: PULLULATES_USER_BASE_URL + '/dicts/types/list',
  Dict_Data_List: PULLULATES_USER_BASE_URL + '/dicts/datas/list'
}
