const PULLULATES_BASE_URL = '/pullulates_api'

export const PULLULATES_USER_URL = {
  Login: PULLULATES_BASE_URL + '/login',
  Logout: PULLULATES_BASE_URL + '/logout',
  My_User_Info: PULLULATES_BASE_URL + '/users/get/my',
  User_List: PULLULATES_BASE_URL + '/users/list',
  User_Save: PULLULATES_BASE_URL + '/users/save',
  User_Update: PULLULATES_BASE_URL + '/users/update',
  User_Info: PULLULATES_BASE_URL + '/users/get',
  Change_User_Status: PULLULATES_BASE_URL + '/users/update/status',
  Batch_Change_User_Status: PULLULATES_BASE_URL + '/users/batch-update/status',
  Reset_Password: PULLULATES_BASE_URL + '/users/update/reset-password',
  Delete_User: PULLULATES_BASE_URL + '/users/delete',
  Batch_Delete_User: PULLULATES_BASE_URL + '/users/batch-delete',
  Online_User: PULLULATES_BASE_URL + '/users/online'
}

export const PULLULATES_ROLE_URL = {
  Role_Page: PULLULATES_BASE_URL + '/roles/page',
  Role_List: PULLULATES_BASE_URL + '/roles/list',
  Role_Save: PULLULATES_BASE_URL + '/roles/save',
  Role_Suggest_No: PULLULATES_BASE_URL + '/roles/suggest-sortno',
  Change_Role_Status: PULLULATES_BASE_URL + '/roles/update/status',
  Delete_Role: PULLULATES_BASE_URL + '/roles/delete',
  Datascope: PULLULATES_BASE_URL + '/roles/datascope',
  Role_Update: PULLULATES_BASE_URL + '/roles/update',
  Role_Allocate_In: PULLULATES_BASE_URL + '/roles/allocate/in',
  Role_Allocate_Out: PULLULATES_BASE_URL + '/roles/allocate/out'
}

export const PULLULATES_MENU_URL = {
  Menu_Tree: PULLULATES_BASE_URL + '/menus/tree',
  My_MenuIds: PULLULATES_BASE_URL + '/menus/menuids/my',
  Role_MenuIds_By_RoleId: PULLULATES_BASE_URL + '/menus/menuids/roleid',
  Role_MenuIds_By_RoleKeys: PULLULATES_BASE_URL + '/menus/menuids/rolekeys',
  Menu_List_Tree: PULLULATES_BASE_URL + '/menus/list/tree',
  Menu_Save: PULLULATES_BASE_URL + '/menus/save',
  Menu_Update: PULLULATES_BASE_URL + '/menus/update',
  Menu_Delete: PULLULATES_BASE_URL + '/menus/delete',
  Menu_All_ParentIds: PULLULATES_BASE_URL + '/menus/parentids'
}

export const PULLULATES_ORG_URL = {
  Org_List_Tree: PULLULATES_BASE_URL + '/orgs/list/tree',
  Org_Tree: PULLULATES_BASE_URL + '/orgs/tree',
  Suggest_Sort_No: PULLULATES_BASE_URL + '/orgs/suggest-sortno',
  Org_Save: PULLULATES_BASE_URL + '/orgs/save',
  Org_Update: PULLULATES_BASE_URL + '/orgs/update',
  Org_Delete: PULLULATES_BASE_URL + '/orgs/delete'
}

export const PULLULATES_DICT_URL = {
  Dict_Type_List: PULLULATES_BASE_URL + '/dicts/types/list',
  Dict_Data_List: PULLULATES_BASE_URL + '/dicts/datas/list',
  Dict_Data_List_By_Type: PULLULATES_BASE_URL + '/dicts/datas/list/dicttype',
  Dict_Data_Info: PULLULATES_BASE_URL + '/dicts/datas/info',
  Dict_Save_Type: PULLULATES_BASE_URL + '/dicts/types/save',
  Dict_Save_Data: PULLULATES_BASE_URL + '/dicts/datas/save',
  Dict_Update_Type: PULLULATES_BASE_URL + '/dicts/types/update',
  Dict_Update_Data: PULLULATES_BASE_URL + '/dicts/datas/update',
  Dict_Type_Suggest_Sortno: PULLULATES_BASE_URL + '/dicts/types/suggest-sortno',
  Dict_DeleteType: PULLULATES_BASE_URL + '/dicts/types/delete',
  Dict_DeleteData: PULLULATES_BASE_URL + '/dicts/datas/delete'
}

export const PULLULATES_LOG_URL = {
  Login_Log_Page: PULLULATES_BASE_URL + '/logs/login/page',
  Oper_Log_Page: PULLULATES_BASE_URL + '/logs/oper/page'
}

export const PULLULATES_GEN_URL = {
  Gen_List: PULLULATES_BASE_URL + '/gens/list',
  Un_Imported_Table_List: PULLULATES_BASE_URL + '/gens/list/unimported',
  Import_Tables: PULLULATES_BASE_URL + '/gens/import',
  Preview_Codes: PULLULATES_BASE_URL + '/gens/preview'
}

export const PULLULATES_QUARTZ_URL = {
  Job_Page: PULLULATES_BASE_URL + '/jobs/page',
  Job_Save: PULLULATES_BASE_URL + '/jobs/save',
  Job_Update: PULLULATES_BASE_URL + '/jobs/update',
  Job_Pause: PULLULATES_BASE_URL + '/jobs/pause',
  Job_Excute: PULLULATES_BASE_URL + '/jobs/excute',
  Job_Excute_Atonce: PULLULATES_BASE_URL + '/jobs/excute/atonce',
  Job_Delete: PULLULATES_BASE_URL + '/jobs/delete'
}

export const PULLULATES_GEETEST_URL = {
  GEETEST_INIT: PULLULATES_BASE_URL + '/captcha/geetest/init'
}
