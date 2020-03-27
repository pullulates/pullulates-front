<template>
  <a-modal
    title="添加新的菜单"
    :width="1100"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-alert
        message="模块及目录菜单仅作为扩展支持，系统当前不支持自定义添加；按钮菜单不需要填写布局、选择图标。"
        type="warning"
        closable
      />
      <a-row class="form-row" :gutter="24">
        <a-col :lg="6">
          <a-form-item label="上级菜单">
            <a-tree-select
              :treeData="menuTree"
              v-decorator="[
                'parentId',
                {rules: [{ required: true, message: '请选择上级菜单'}]}
              ]"
              placeholder="请选择上级菜单"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :lg="6">
          <a-form-item label="菜单名称">
            <a-input
              placeholder="请输入菜单名称"
              v-decorator="[
                'menuName',
                {rules: [{ required: true, message: '请输入菜单名称', whitespace: true},{max: 32, message: '菜单名称最多32个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :lg="6">
          <a-form-item label="布局名称">
            <a-input
              placeholder="请输入布局名称"
              v-decorator="[
                'menuLayout',
                {rules: [{max: 25, message: '布局名称最多25个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :lg="6">
          <a-form-item label="排序编号">
            <a-input-number
              v-decorator="[
                'sortNo',
                {rules: [{ required: true, message: '请输入排序编号'}]}
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="24">
        <a-col :lg="6">
          <a-form-item label="菜单类型">
            <a-radio-group
              buttonStyle="solid"
              v-decorator="[
                'menuType',
                {rules: [{ required: true, message: '请选择菜单类型'}], initialValue: '3'}
              ]"
            >
              <a-radio-button v-for="item in menuType" :key="item.dictValue" :value="item.dictValue">{{ item.dictName }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6">
          <a-form-item label="权限标识">
            <a-input
              placeholder="请输入权限标识"
              v-decorator="[
                'perm',
                {rules: [{ required: true, message: '请输入权限标识', whitespace: true},{max: 32, message: '权限标识最多32个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :lg="6">
          <a-form-item label="请求路径">
            <a-input
              placeholder="请输入请求路径"
              v-decorator="[
                'url',
                {rules: [{ required: false, message: '请输入请求路径', whitespace: true},{max: 150, message: '请求路径最多150个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :lg="6">
          <a-form-item label="重定向路径">
            <a-input
              placeholder="请输入重定向路径"
              v-decorator="[
                'redirect',
                {rules: [{ required: false, message: '请输入重定向路径', whitespace: true},{max: 150, message: '重定向路径最多150个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="24">
        <a-col :lg="6">
          <a-form-item label="打开方式">
            <a-radio-group
              buttonStyle="solid"
              v-decorator="[
                'target',
                {rules: [{ required: true, message: '请选择打开方式'}], initialValue: '1'}
              ]"
            >
              <a-radio-button v-for="item in target" :key="item.dictValue" :value="item.dictValue">{{ item.dictName }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6">
          <a-form-item label="缓存路由">
            <a-radio-group
              buttonStyle="solid"
              v-decorator="[
                'keepAlive',
                {rules: [{ required: true, message: '请选择是否缓存路由'}], initialValue: '1'}
              ]"
            >
              <a-radio-button v-for="item in keepAlive" :key="item.dictValue" :value="item.dictValue">{{ item.dictName }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6">
          <a-form-item label="是否显示">
            <a-radio-group
              buttonStyle="solid"
              v-decorator="[
                'isShow',
                {rules: [{ required: true, message: '请选择是否是否显示菜单'}], initialValue: '1'}
              ]"
            >
              <a-radio-button v-for="item in isVisible" :key="item.dictValue" :value="item.dictValue">{{ item.dictName }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :lg="6">
          <a-form-item label="是否显示标题及面包屑">
            <a-radio-group
              buttonStyle="solid"
              v-decorator="[
                'hiddenHeaderContent',
                {rules: [{ required: true, message: '请选择是否显示标题及面包屑'}], initialValue: '1'}
              ]"
            >
              <a-radio-button v-for="item in isVisible" :key="item.dictValue" :value="item.dictValue">{{ item.dictName }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="24">
        <a-col :lg="24">
          <a-form-item label="菜单图标">
            <icon-selector @change="handleIconChange"/>
          </a-form-item>
          <a-form-item hidden="true">
            <a-input type="hidden" v-decorator="['icon']" />
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
import { getDictDataListByType } from '@/api/dict'
import { getMenuTree, saveMenu } from '@/api/menu'
import IconSelector from '@/components/IconSelector'

export default {
  name: 'Add',
  components: {
    IconSelector
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
      form: this.$form.createForm(this),
      menuTree: [],
      expandedKeys: [],
      autoExpandParent: true,

      menuType: [],
      pageLayout: [],
      target: [],
      keepAlive: [],
      isVisible: []
    }
  },
  created () {
    getDictDataListByType({ dictType: 'page_layout' }).then(res => {
      this.pageLayout = res.data
    })
    getDictDataListByType({ dictType: 'menu_open_type' }).then(res => {
      this.target = res.data
    })
    getDictDataListByType({ dictType: 'keep_alive' }).then(res => {
      this.keepAlive = res.data
    })
    getDictDataListByType({ dictType: 'is_visible' }).then(res => {
      this.isVisible = res.data
    })
    this.getMenuList()
  },
  methods: {
    add (menuType) {
      this.visible = true
      this.confirmLoading = true
      this.menuType = menuType
      this.confirmLoading = false
    },
    getMenuList (parameter) {
      getMenuTree(parameter).then(res => {
        this.menuTree = res.data
      })
    },
    handleCancel () {
      this.visible = false
      this.form.resetFields()
    },
    handleSave () {
      this.confirmLoading = true
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          if (this.form.getFieldValue('menuType') === '3') {
            if (!this.form.getFieldValue('menuLayout')) {
              this.$message.warning('请填写布局名称')
              this.confirmLoading = false
              return false
            }
            if (!this.form.getFieldValue('icon')) {
              this.$message.warning('请选择菜单的图标')
              this.confirmLoading = false
              return false
            }
            if (!this.form.getFieldValue('url')) {
              this.$message.warning('请填写菜单地址')
              this.confirmLoading = false
              return false
            }
          }
          saveMenu(values).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
              this.$emit('ok', values)
              this.visible = false
              this.form.resetFields()
            } else {
              this.$message.warning(res.msg)
            }
            this.confirmLoading = false
          })
        }
        this.confirmLoading = false
      })
    },
    handleIconChange (icon) {
      this.form.setFieldsValue({ 'icon': icon })
    }
  }
}
</script>
