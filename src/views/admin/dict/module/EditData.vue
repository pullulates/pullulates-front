<template>
  <a-modal
    title="编辑字典数据"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
    @ok="handleSubmit"
  >
    <a-form :form="form">
      <a-form-item hidden="true">
        <a-input type="hidden" v-decorator="['dictId']" />
      </a-form-item>
      <a-form-item
        label="所属类别"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          showSearch
          placeholder="请选择所属类别"
          optionFilterProp="children"
          :filterOption="filterOption"
          v-decorator="['dictType', {rules: [{required: true, message: '请选择所属类别'}]}]"
        >
          <a-select-option v-for="item in dictTypeOptions" :key="item.dictType">
            {{ item.dictName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="字典数据"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['dictValue', {rules: [{required: true, message: '请输入字典数据'},{max: 25, message: '字典数据最多25个字符'}]}]" />
      </a-form-item>
      <a-form-item
        label="数据名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['dictName', {rules: [{required: true, message: '请输入数据名称'},{max: 50, message: '数据名称最多50个字符'}]}]" />
      </a-form-item>
      <a-form-item
        label="字典样式"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-select
          showSearch
          placeholder="请选择字典样式"
          optionFilterProp="children"
          :filterOption="filterOption"
          v-decorator="['dictCss', {rules: [{required: true, message: '请选择字典样式'}]}]"
        >
          <a-select-option v-for="item in dictCssOptions" :key="item.dictValue">
            {{ item.dictName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="排序编号"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-number v-decorator="['sortNo', {rules: [{required: true, message: '请输入排序编号'}]}]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { updateData, getDictTypeList, getDictDataList } from '@/api/dict'

export default {
  name: 'EditData',
  data () {
    return {
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      mdl: {},
      dictTypeOptions: [],
      dictCssOptions: []
    }
  },
  methods: {
    show (record) {
      this.getDictTypes()
      this.getDictCss()
      this.mdl = Object.assign({}, record)
      this.visible = !this.visible
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'dictId', 'dictType', 'dictValue', 'dictName', 'sortNo', 'dictCss'))
      })
    },
    handleSubmit () {
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          return false
        }
        this.confirmLoading = true
        updateData(fieldsValue).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.$emit('ok', fieldsValue)
            this.confirmLoading = false
            this.handleCancel()
          } else {
            this.$message.warning(res.msg)
            this.confirmLoading = false
          }
        })
      })
    },
    handleCancel () {
      this.visible = false
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    getDictTypes () {
      getDictTypeList().then(res => {
        this.dictTypeOptions = res.data
      })
    },
    getDictCss () {
      getDictDataList({ dictType: 'dict_css' }).then(res => {
        this.dictCssOptions = res.data
      })
    }
  }
}
</script>
