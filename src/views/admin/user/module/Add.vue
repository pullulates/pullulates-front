<template>
  <a-modal
    title="添加新的用户"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-steps :current="currentStep" :style="{ marginBottom: '28px' }" size="small">
        <a-step title="用户基本信息" />
        <a-step title="组织机构信息" />
        <a-step title="用户角色信息" />
      </a-steps>
      <a-form :form="form">
        <div v-show="currentStep === 0">
          <a-form-item
            label="用户名称"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-decorator="['userName', {rules: [{required: true, message: '请输入用户名称'},{max: 25, message: '用户名称最多25个字符'}]}]" />
          </a-form-item>
          <a-form-item
            label="真实姓名"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-decorator="['realName', {rules: [{required: true, message: '请输入真实姓名'},{max: 25, message: '真实姓名最多25个字符'}]}]"/>
          </a-form-item>
          <a-form-item
            label="证件号码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-decorator="['idCard', {rules: [{required: true, message: '请输入证件号码'},{max: 18, message: '证件号码最多18个字符'}]}]"/>
          </a-form-item>
          <a-form-item
            label="手机号码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-decorator="['phone', {rules: [{required: true, message: '请输入手机号码'},{max: 11, message: '手机号码最多11个字符'}]}]"/>
          </a-form-item>
          <a-form-item
            label="电子邮箱"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input v-decorator="['email', {rules: [{required: true, message: '请输入电子邮箱'},{max: 50, message: '手机号码最多50个字符'}]}]"/>
          </a-form-item>
          <a-form-item
            label="登录密码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input type="password" v-decorator="['password', {rules: [{required: true, message: '请输入用户密码'},{max: 20, message: '用户密码最多20个字符'},{validator: validateToNextPassword}]}]" @blur="handleConfirmBlur"/>
          </a-form-item>
          <a-form-item
            label="确认密码"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input type="password" v-decorator="['confirm', {rules: [{required: true, message: '请确认用户密码'},{max: 20, message: '用户密码最多20个字符'},{validator: compareToFirstPassword}]}]" @blur="handleConfirmBlur"/>
          </a-form-item>
          <a-form-item
            label="用户性别"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-select v-decorator="['sex', {initialValue: '1', rules: [{required: true, message: '请选择用户性别'}]}]">
              <a-select-option v-for="item in sexs" :key="item.dictValue">{{ item.dictName }}</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <div v-show="currentStep === 1">
          <a-form-item
            hidden="true"
            label="组织机构ID"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input type="hidden" v-decorator="['orgId']" />
          </a-form-item>
          <s-tree
            :dataSource="orgTree"
            :autoExpandParent="autoExpandParent"
            :expandedKeys="expandedKeys"
            :search="true"
            @click="handleClick"
            @onExpand="onExpand"></s-tree>
        </div>

        <div v-show="currentStep === 2">
          <a-form-item
            hidden="true"
            label="角色key"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
          >
            <a-input type="hidden" v-decorator="['roleKeys']" />
          </a-form-item>
          <div>
            <a-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">
              全选
            </a-checkbox>
            <br><br>
            <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange" />
            <a-divider dashed></a-divider>
            <b>当前用户拥有的菜单权限：</b>
            <a-spin :spinning="spinning" />
            <a-tree
              checkable
              @expand="onMenuExpand"
              :expandedKeys="expandedMenuKeys"
              :autoExpandParent="autoExpandMenuParent"
              v-model="checkedMenuKeys"
              :treeData="menuTreeData"
            />
          </div>
        </div>
        <!-- step1 end -->
      </a-form>
    </a-spin>
    <template slot="footer">
      <a-button key="back" @click="backward" v-if="currentStep > 0" :style="{ float: 'left' }" >上一步</a-button>
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleNext(currentStep)">{{ currentStep === 2 && '完成' || '下一步' }}</a-button>
    </template>
  </a-modal>
</template>

<script>
import STree from '@/components/Tree/Tree'
import { getMenuTree, getMenuIdsByRoleKeys } from '@/api/menu'
import { saveUser } from '@/api/user'
const stepForms = [
  ['userName', 'realName', 'idCard', 'phone', 'email', 'password', 'confirm', 'sex'],
  ['orgId'],
  ['roleKeys']
]

export default {
  name: 'Add',
  components: {
    STree
  },
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
      currentStep: 0,
      mdl: {},
      sexs: [],

      form: this.$form.createForm(this),
      orgTree: [],
      expandedKeys: [],
      autoExpandParent: true,

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
    add (orgTree, roles, sexs, dataStatus) {
      this.orgTree = orgTree
      this.expandedKeys = orgTree.map(item => item.parentId)
      this.plainOptions = roles.map(item => item.roleKey)
      getMenuTree().then(res => {
        this.menuTreeData = res.data
      })
      this.sexs = sexs
      this.visible = true
    },
    handleConfirmBlur (e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword (rule, value, callback) {
      if (value && value !== this.form.getFieldValue('password')) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    },
    validateToNextPassword (rule, value, callback) {
      if (value && this.confirmDirty) {
        this.form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    handleNext (step) {
      const { form: { validateFields } } = this
      const currentStep = step + 1
      if (currentStep <= 2) {
        if (this.currentStep === 1 && !this.form.getFieldValue('orgId')) {
          this.$notification.warning({
            message: '提示',
            description: `请选择用户组织机构信息`
          })
          return
        }
        validateFields(stepForms[ this.currentStep ], (errors, values) => {
          if (!errors) {
            this.currentStep = currentStep
          }
        })
        return
      }
      if (!this.form.getFieldValue('roleKeys')) {
        this.$notification.warning({
          message: '提示',
          description: `请选择用户角色信息`
        })
        return
      }
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          saveUser(values).then(res => {
            if (res.code === 200) {
              this.$notification.success({
                message: '消息',
                description: `添加用户成功`
              })
              this.$emit('ok', values)
              this.visible = false
              this.currentStep = 0
              this.form.resetFields()
              this.checkedList = []
              this.checkedMenuKeys = []
            }
            this.confirmLoading = false
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    backward () {
      this.currentStep--
    },
    handleCancel () {
      this.visible = false
      this.currentStep = 0
    },
    handleClick (e) {
      this.form.setFieldsValue({ 'orgId': e.key })
    },
    onExpand  (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onChange (checkedList) {
      this.indeterminate = !!this.checkedList.length && this.checkedList.length < this.plainOptions.length
      this.checkAll = this.checkedList.length === this.plainOptions.length
      this.form.setFieldsValue({ 'roleKeys': this.checkedList.join(',') })
      this.getMenuIds(this.checkedList)
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
      this.form.setFieldsValue({ 'roleKeys': this.checkedList.join(',') })
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
