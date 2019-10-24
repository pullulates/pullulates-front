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
          :autoExpandParent="autoExpandParent"
          :defaultExpandAll="defaultExpandAll"
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
      <a-divider dashed>用户信息</a-divider>
    </a-row>
  </a-card>
</template>

<script>
import { getRoleList } from '@/api/role'
import { getMenuTree, getMyMenuIds } from '@/api/menu'
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
      autoExpandParent: true,
      defaultExpandAll: true,
      selectedKeys: [],
      treeData: []
    }
  },
  created () {
    getRoleList().then((res) => {
      this.roles = res.data
      this.roles.push({
        roleId: '-1',
        roleName: '新增角色',
        desct: '新增一个角色'
      })
    })
    getMenuTree().then((res) => {
      this.treeData = res.data
    })
  },
  methods: {
    add () {
      this.edit({ id: 0 })
    },

    edit (record) {
      this.mdl = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'roleId', 'roleKey', 'roleName', 'status', 'desct'))
      })
      getMyMenuIds().then((res) => {
        this.selectedKeys = res.data
      })
    },

    onSelect (selectedKeys, info) {
      this.selectedKeys = selectedKeys
    }
  }
}
</script>

<style scoped>

</style>
