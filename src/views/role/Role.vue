<template>
  <a-card :bordered="false" :style="{ height: '100%' }">
    <a-row :gutter="24">
      <a-col :md="4">
        <div>
          <h3><b>角色列表：</b></h3>
        </div>
        <a-list itemLayout="vertical" :dataSource="roles">
          <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
            <a-list-item-meta :style="{ marginBottom: '0' }">
              <span slot="description" style="text-align: center; display: block">{{ item.desct }}</span>
              <a slot="title" style="text-align: center; display: block" @click="edit(item)">{{ item.roleName }}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
      <a-col :md="10">
        <div style="max-width: 800px">
          <a-divider v-if="isMobile()" />
          <div>
            <h3><b v-if="mdl.roleId">当前角色：{{ mdl.roleName }}</b><b v-else>未选中任何角色</b></h3>
          </div>
          <a-form :form="form" :layout="isMobile() ? 'vertical' : 'horizontal'">
            <a-form-item label="角色标识">
              <a-input v-decorator="[ 'roleKey', {rules: [{ required: true, max: 10, message: '请填写唯一的角色标识!' }]} ]" placeholder="请填写唯一的角色标识" />
            </a-form-item>

            <a-form-item label="角色名称">
              <a-input v-decorator="[ 'roleName', {rules: [{ required: true, max: 15, message: '请填写角色名称!' }]} ]" placeholder="请填写角色名称" />
            </a-form-item>

            <a-form-item label="状态">
              <a-select :value="mdl.status === '1'?'启用':'禁用'">
                <a-select-option :value="1">启用</a-select-option>
                <a-select-option :value="2">禁用</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="角色描述">
              <a-textarea :row="3" v-decorator="[ 'desct', {rules: [{ required: true, max: 100, message: '请填写角色描述!' }]} ]" placeholder="请填写角色描述" />
            </a-form-item>
          </a-form>
        </div>
      </a-col>
      <a-col :md="5">
        <div>
          <h3><b>菜单权限：</b></h3>
        </div>
        <a-tree
          checkable
          @expand="onExpand"
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          v-model="checkedKeys"
          @select="onSelect"
          :selectedKeys="selectedKeys"
          :treeData="treeData"
        />
      </a-col>
      <a-col :md="5">
        <div>
          <h3><b>数据权限：</b></h3>
        </div>
        <div>
          <h3>正在开发中......</h3>
        </div>
      </a-col>
    </a-row>
    <a-row>
      <a-divider dashed><b>用户信息</b></a-divider>
      <a-table
        :columns="columns"
        :rowKey="record => record.userId"
        :dataSource="users"
        :pagination="pagination"
        :loading="loading"
        :rowSelection="rowSelection"
      >
      </a-table>
    </a-row>
  </a-card>
</template>

<script>
import { getRoleList } from '@/api/role'
import { getMenuTree, getMenuIdsByRoleId } from '@/api/menu'
import { getUserList } from '@/api/user'
import { mixinDevice } from '@/utils/mixin'
import pick from 'lodash.pick'

export default {
  name: 'RoleList',
  mixins: [mixinDevice],
  components: {},
  data () {
    return {
      form: this.$form.createForm(this),
      mdl: {},
      roles: [],
      expandedKeys: [],
      checkedKeys: [],
      treeData: [],
      selectedKeys: [],
      autoExpandParent: true,
      users: [],
      pagination: {
        pageSize: 5
      },
      loading: false,
      columns,
      rowSelection: {
        type: 'checkbox'
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      this.getRoles()
      this.getMenuTree()
      this.getUsers()
      this.loading = false
    },

    getRoles () {
      getRoleList().then((res) => {
        this.roles = res.data
        this.roles.push({
          roleId: '-1',
          roleName: '新增角色',
          desct: '新增一个角色'
        })
      })
    },

    getUsers (parameter) {
      getUserList(parameter).then(res => {
        const pagination = { ...this.pagination }
        pagination.total = res.data.length
        this.users = res.data
        this.pagination = pagination
      })
    },

    getMenuTree () {
      getMenuTree().then((res) => {
        this.treeData = res.data
      })
    },

    add () {
      this.edit({ id: 0 })
    },

    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
    },

    edit (record) {
      this.mdl = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'roleId', 'roleKey', 'roleName', 'status', 'desct'))
      })
      const params = { 'roleId': record.roleId }
      getMenuIdsByRoleId(params).then((res) => {
        this.checkedKeys = res.data
      })
      this.getUsers(params)
    },
    onCheck (checkedKeys) {
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      this.selectedKeys = selectedKeys
    }
  }
}

const columns = [
  {
    title: '用户ID',
    dataIndex: 'userId',
    width: '10%'
  },
  {
    title: '账户名称',
    dataIndex: 'userName',
    width: '20%'
  },
  {
    title: '姓名',
    dataIndex: 'realName',
    width: '10%'
  },
  {
    title: '证件号码',
    dataIndex: 'idCard',
    width: '20%'
  },
  {
    title: '手机',
    dataIndex: 'phone',
    width: '20%'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    filters: [{ text: '男', value: '1' }, { text: '女', value: '2' }, { text: '未知', value: '3' }],
    width: '10%'
  },
  {
    title: '所属机构',
    dataIndex: 'org.orgName',
    width: '20%'
  }
]
</script>

<style scoped>

</style>
