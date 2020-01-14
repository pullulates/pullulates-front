<template>
  <a-modal
    title="添加新的菜单"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-row class="form-row" :gutter="24">
        <a-col :lg="12">
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
        <a-col :lg="12">
          <a-form-item label="菜单类型">
            <a-radio-group
              buttonStyle="solid"
              v-decorator="[
                'menuType',
                {rules: [{ required: true, message: '请选择菜单类型'}], initialValue: '1'}
              ]"
            >
              <a-radio-button v-for="item in menuType" :key="item.dictValue" :value="item.dictValue">{{ item.dictName }}</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="24">
        <a-col :lg="12">
          <a-form-item label="菜单标识">
            <a-input
              placeholder="请输入菜单标识"
              v-decorator="[
                'menuKey',
                {rules: [{ required: true, message: '请输入菜单标识', whitespace: true},{max: 32, message: '菜单标识最多32个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :lg="12">
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
      </a-row>
      <a-row class="form-row" :gutter="24">
        <a-col :lg="12">
          <a-form-item label="请求路径">
            <a-input
              placeholder="请输入请求路径"
              v-decorator="[
                'url',
                {rules: [{ required: true, message: '请输入请求路径', whitespace: true},{max: 150, message: '请求路径最多150个字符'}]}
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :lg="12">
          <a-form-item label="重定向路径">
            <a-input
              placeholder="请输入重定向路径"
              v-decorator="[
                'redirect',
                {rules: [{ required: true, message: '请输入重定向路径', whitespace: true},{max: 150, message: '重定向路径最多150个字符'}]}
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
          <a-form-item label="菜单布局">
            <a-select
              v-decorator="[
                'pageLayout',
                {rules: [{ required: true, message: '请选择菜单布局'}], initialValue: 'BasicLayout'}
              ]"
              placeholder="请选择菜单布局">
              <a-select-option
                v-for="item in pageLayout"
                :key="item.dictValue"
              >{{ item.dictName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="form-row" :gutter="24">
        <a-col :lg="12">
          <a-form-item label="菜单图标">
            <a-select
              v-decorator="[
                'icon',
                {rules: [{ required: true, message: '请选择菜单图标'}], initialValue: 'BasicLayout'}
              ]"
              placeholder="请选择菜单图标">
              <a-select-option
                v-for="item in pageLayout"
                :key="item.dictValue"
              >{{ item.dictName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="12">
          <a-form-item label="排序编号">
            <a-input-number
              v-decorator="[
                'sortNo',
                {rules: [{ required: true, message: '请输入排序编号', whitespace: true}]}
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
import { getDictDataListByType } from '@/api/dict'

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
  },
  methods: {
    add (menuType) {
      this.visible = true
      this.confirmLoading = true
      this.menuType = menuType
      this.confirmLoading = false
    },
    handleCancel () {
      this.visible = false
    },
    handleSave () {
    }
  }
}
</script>
