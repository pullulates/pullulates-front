<template>
  <a-modal
    title="添加新的角色"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-row class="form-row" :gutter="24">
        <a-col :lg="8">
          <a-form-item label="角色名称">
            <a-input
              placeholder="请输入角色名称"
              v-decorator="[
                'roleName',
                {rules: [{ required: true, message: '请输入角色名称', whitespace: true},{max: 25, message: '角色名称最多25个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="角色标识">
            <a-input
              placeholder="请输入角色标识"
              v-decorator="[
                'roleKey',
                {rules: [{ required: true, message: '请输入角色标识', whitespace: true},{max: 25, message: '角色标识最多25个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="排序编号" :extra="'建议排序:' + suggestSortNo">
            <a-input-number v-decorator="['sortNo', {rules: [{required: true, message: '请输入排序编号'}], initialValue: suggestSortNo}]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="24">
        <a-col :lg="8">
          <a-form-item label="角色状态">
            <a-radio-group
              buttonStyle="solid"
              v-decorator="[
                'status',
                {rules: [{ required: true, message: '请选择角色状态'}], initialValue: '1'}
              ]"
            >
              <a-radio-button v-for="item in dataStatus" :key="item.dictValue" :value="item.dictValue">{{ item.dictName }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="全部菜单权限">
            <a-radio-group
              buttonStyle="solid"
              @change="handleMenuChange"
              v-decorator="[
                'hasAllMenu',
                {rules: [{ required: true, message: '请选择是否为全部菜单权限'}], initialValue: '2'}
              ]"
            >
              <a-radio-button v-for="item in yesOrNos" :key="item.dictValue" :value="item.dictValue">{{ item.dictName }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="全部数据权限">
            <a-radio-group
              buttonStyle="solid"
              @change="handleOrgChange"
              v-decorator="[
                'hasAllData',
                {rules: [{ required: true, message: '请选择是否为全部数据权限'}], initialValue: '2'}
              ]"
            >
              <a-radio-button v-for="item in yesOrNos" :key="item.dictValue" :value="item.dictValue">{{ item.dictName }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="24">
        <a-col :lg="12">
          <a-form-item label="菜单权限详情">
            <a-tree
              checkable
              @expand="menuOnExpand"
              :expandedKeys="menuExpandedKeys"
              :autoExpandParent="menuAutoExpandParent"
              v-model="menuCheckedKeys"
              :treeData="menuTreeData"
            />
          </a-form-item>
        </a-col>
        <a-col :lg="12">
          <a-form-item label="数据权限详情">
            <a-tree
              checkable
              @expand="orgOnExpand"
              :expandedKeys="orgExpandedKeys"
              :autoExpandParent="orgAutoExpandParent"
              v-model="orgCheckedKeys"
              :treeData="orgTreeData"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="24">
        <a-col :lg="24">
          <a-form-item label="角色描述">
            <a-textarea
              placeholder="请输入角色描述"
              :rows="3"
              v-decorator="[
                'remark',
                {rules: [{max: 125, message: '角色描述最多125个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template slot="footer">
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="save" :loading="confirmLoading" type="primary" @click="handleSave">提交</a-button>
    </template>
  </a-modal>
</template>

<script>
import { saveRole, getSuggestNo } from '@/api/role'

export default {
  name: 'Add',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      suggestSortNo: '',

      menuExpandedKeys: [],
      menuCheckedKeys: [],
      menuTreeData: [],
      menuSelectedKeys: [],
      menuAutoExpandParent: true,

      orgTreeData: [],
      orgExpandedKeys: [],
      orgAutoExpandParent: true,
      orgCheckedKeys: [],
      orgSelectedKeys: [],

      yesOrNos: [],
      dataStatus: []
    }
  },
  methods: {
    add (menuTree, orgTree, yesOrNos, dataStatus) {
      this.visible = true
      this.confirmLoading = true
      this.menuTreeData = menuTree
      this.orgTreeData = orgTree
      this.menuExpandedKeys = menuTree.map(item => item.parentId)
      this.yesOrNos = yesOrNos
      this.dataStatus = dataStatus
      this.getSuggestNo()
      this.confirmLoading = false
    },
    handleCancel () {
      this.visible = false
    },
    handleSave () {
      this.confirmLoading = true
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          if (this.menuCheckedKeys.length === 0) {
            this.$message.warning('请选择菜单权限')
            this.confirmLoading = false
            return false
          }
          if (this.orgCheckedKeys.length === 0) {
            this.$message.warning('请选择数据权限')
            this.confirmLoading = false
            return false
          }
          values.menuIds = this.menuCheckedKeys
          values.orgIds = this.orgCheckedKeys
          saveRole(values).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.$emit('ok', values)
              this.handleCancel()
              this.form.resetFields()
            } else {
              this.$message.warning(res.msg)
            }
          })
        }
        this.confirmLoading = false
      })
    },
    getSuggestNo () {
      getSuggestNo().then(res => {
        this.suggestSortNo = res.data
      })
    },
    handleMenuChange (e) {
      var value = e.target.value
      this.menuCheckedKeys = (value === '1' ? (this.menuTreeData.map(item => item.key)) : [])
    },
    handleOrgChange (e) {
      var value = e.target.value
      this.orgCheckedKeys = (value === '1' ? (this.orgTreeData.map(item => item.key)) : [])
    },
    menuOnExpand (expandedKeys) {
      this.menuExpandedKeys = expandedKeys
    },
    menuOnSelect (selectedKeys, info) {
      this.menuSelectedKeys = selectedKeys
    },
    orgOnExpand (expandedKeys) {
      this.orgExpandedKeys = expandedKeys
    },
    orgOnSelect (selectedKeys, info) {
      this.orgSelectedKeys = selectedKeys
    }
  }
}
</script>
