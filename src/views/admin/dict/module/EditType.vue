<template>
  <a-modal
    title="编辑字典类别"
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
        label="字典类别"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['dictType', {rules: [{required: true, message: '请输入字典类别'},{max: 25, message: '字典类别最多25个字符'}]}]" />
      </a-form-item>
      <a-form-item
        label="字典名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['dictName', {rules: [{required: true, message: '请输入字典名称'},{max: 50, message: '字典名称最多50个字符'}]}]" />
      </a-form-item>
      <a-form-item
        label="排序编号"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input-number v-decorator="['sortNo', {rules: [{required: true, message: '请输入排序编号'}]}]" />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <span slot="label">
          是否内置&nbsp;
          <a-tooltip title="选择内置在添加后非超级管理员不可再操作">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-select v-decorator="['isDefault']">
          <a-select-option value="1">内置</a-select-option>
          <a-select-option value="2">非内置</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { updateType } from '@/api/dict'

export default {
  name: 'EditType',
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
      mdl: {}
    }
  },
  methods: {
    show (record) {
      this.mdl = Object.assign({}, record)
      this.visible = !this.visible
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'dictId', 'dictType', 'dictName', 'sortNo', 'isDefault'))
      })
    },
    handleSubmit () {
      this.form.validateFields((err, fieldsValue) => {
        if (err) {
          return false
        }
        this.confirmLoading = true
        updateType(fieldsValue).then(res => {
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
    }
  }
}
</script>
