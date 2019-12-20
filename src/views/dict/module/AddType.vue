<template>
  <a-modal
    title="添加字典类别"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form :form="form">
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
        :extra="'建议排序:' + suggestSortNo"
      >
        <a-input-number v-decorator="['sortNo', {rules: [{required: true, message: '请输入排序编号'}], initialValue: suggestSortNo}]" />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <span slot="label">
          是否内置&nbsp;
          <a-tooltip title="选择内置在添加后不可再操作">
            <a-icon type="question-circle-o" />
          </a-tooltip>
        </span>
        <a-select v-decorator="['isDefault', { initialValue: '2' }]">
          <a-select-option value="1">内置</a-select-option>
          <a-select-option value="2">非内置</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { saveType, getSuggestSortNo } from '@/api/dict'
export default {
  name: 'AddType',
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
      suggestSortNo: ''
    }
  },
  methods: {
    show () {
      this.visible = !this.visible
      this.getSuggestSortNo()
    },
    handleCancel () {
      this.visible = false
    },
    getSuggestSortNo () {
      getSuggestSortNo().then(res => {
        this.suggestSortNo = res.data
      })
    },
    handleSubmit () {
      this.confirmLoading = true
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          saveType(values).then(res => {
            if (res.code === 200) {
              this.$notification.success({
                message: '消息',
                description: `添加字典类别成功`
              })
              this.$emit('ok', values)
              this.visible = false
              this.form.resetFields()
            }
            this.confirmLoading = false
          })
        } else {
          this.confirmLoading = false
        }
      })
    }
  }
}
</script>
