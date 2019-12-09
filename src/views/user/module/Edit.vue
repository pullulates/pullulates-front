<template>
  <a-modal
    title="编辑用户"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item hidden="true">
        <a-input type="hidden" v-decorator="['userId']" />
      </a-form-item>
      <a-row class="form-row" :gutter="24">
        <a-col :lg="8">
          <a-form-item label="用户名称">
            <a-input
              placeholder="请输入用户名称"
              v-decorator="[
                'userName',
                {rules: [{ required: true, message: '请输入用户名称', whitespace: true},{max: 25, message: '用户名称最多25个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="用户姓名">
            <a-input
              placeholder="请输入用户姓名"
              v-decorator="[
                'realName',
                {rules: [{ required: true, message: '请输入用户姓名', whitespace: true},{max: 25, message: '用户姓名最多25个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="证件号码">
            <a-input
              placeholder="请输入证件号码"
              v-decorator="[
                'idCard',
                {rules: [{ required: true, message: '请输入证件号码', whitespace: true},{max: 18, message: '证件号码最多18个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="24">
        <a-col :lg="8">
          <a-form-item label="用户性别">
            <a-select
              placeholder="请选择用户性别"
              v-decorator="[
                'sex',
                {rules: [{ required: true, message: '请选择用户性别称', whitespace: true}]}
              ]"
            >
              <a-select-option v-for="item in sexs" :key="item.dictValue">{{ item.dictName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="手机号码">
            <a-input
              placeholder="请输入手机号码"
              v-decorator="[
                'phone',
                {rules: [{ required: true, message: '请输入手机号码', whitespace: true},{max: 11, message: '手机号码最多11个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="电子邮箱">
            <a-input
              placeholder="请输入电子邮箱"
              v-decorator="[
                'email',
                {rules: [{ required: true, message: '请输入电子邮箱', whitespace: true},{max: 50, message: '手机号码最多50个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="24">
        <a-col :lg="12">
          <a-form-item label="角色信息">
            <a-checkbox
              :indeterminate="indeterminate"
              @change="onCheckAllChange"
              :checked="checkAll">
              全选
            </a-checkbox>
            <br>
            <a-checkbox-group
              :options="plainOptions"
              v-model="checkedList"
              @change="onRoleChange"/>
          </a-form-item>
        </a-col>
        <a-col :lg="12">
          <a-form-item label="菜单权限">
            <a-spin :spinning="spinning">
              <a-tree
                checkable
                @expand="onMenuExpand"
                :expandedKeys="expandedMenuKeys"
                :autoExpandParent="autoExpandMenuParent"
                v-model="checkedMenuKeys"
                :treeData="menuTreeData"
              />
            </a-spin>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="24">
        <a-col :lg="24">
          <a-form-item label="组织机构名称">
            <a-tree-select
              showSearch
              :treeData="orgTree"
              placeholder="请选择组织机构信息"
              allowClear
              treeDefaultExpandAll
              :value="orgId"
              @change="onOrgChange"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="24">
        <a-col :lg="24">
          <a-form-item label="状态签名">
            <a-textarea
              placeholder="请输入状态签名"
              :rows="3"
              v-decorator="[
                'sign',
                {rules: [{max: 125, message: '状态签名最多125个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import STree from '@/components/Tree/Tree'
import { getMenuTree, getMenuIdsByRoleKeys } from '@/api/menu'
import { getUserInfo, updateUser } from '@/api/user'

export default {
  name: 'Edit',
  props: {
  },
  components: {
    STree
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      sexs: [],
      dataStatus: [],
      mdl: {},
      orgTree: [],
      roles: [],
      orgId: '',
      indeterminate: true,
      checkAll: false,
      plainOptions: [],
      checkedList: [],
      expandedMenuKeys: [],
      autoExpandMenuParent: true,
      checkedMenuKeys: [],
      menuTreeData: [],

      spinning: false
    }
  },
  methods: {
    edit (record, orgTree, roles, sexs, dataStatus) {
      this.orgId = record.orgId
      this.orgTree = orgTree
      this.roles = roles
      this.plainOptions = roles.map(item => item.roleKey)
      this.sexs = sexs
      this.dataStatus = dataStatus
      this.loadEditInfo(record)
    },
    loadEditInfo (record) {
      getMenuTree().then(res => {
        this.menuTreeData = res.data
      })
      getUserInfo({ userId: record.userId }).then(res => {
        this.checkedList = res.data.roles.map(item => item.roleKey)
        this.onRoleChange(this.checkedList)
      })
      this.mdl = Object.assign({}, record)
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'userId', 'userName', 'realName', 'idCard', 'sex', 'phone', 'email', 'sign'))
      })
      this.visible = true
    },
    handleSubmit () {
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          return false
        }
        if (this.checkedList.length === 0) {
          this.$notification.warning({
            message: '提示',
            description: `请选择用户角色信息`
          })
          return
        }
        fieldsValue.orgId = this.orgId
        fieldsValue.roleKeys = this.checkedList.join(',')
        updateUser(fieldsValue).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.$emit('ok', fieldsValue)
            this.handleCancel()
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
    },
    handleCancel () {
      this.visible = false
    },
    onOrgChange (value) {
      this.orgId = value
    },
    onRoleChange (checkedList) {
      this.indeterminate = !!this.checkedList.length && this.checkedList.length < this.plainOptions.length
      this.checkAll = this.checkedList.length === this.plainOptions.length
      this.getMenuIds(this.checkedList)
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
      this.getMenuIds(this.checkedList)
    },
    onMenuExpand (expandedMenuKeys) {
      this.expandedMenuKeys = expandedMenuKeys
    },
    getMenuIds (parameter) {
      if (parameter.length > 0) {
        this.changeSpinning()
        getMenuIdsByRoleKeys({ roleKeys: parameter }).then(res => {
          this.checkedMenuKeys = res.data
          this.changeSpinning()
        })
      } else {
        this.checkedMenuKeys = []
      }
    },
    changeSpinning () {
      this.spinning = !this.spinning
    }
  }
}
</script>
