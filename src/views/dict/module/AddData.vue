<template>
  <a-modal
    title="添加字典数据"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form :form="form">
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
import { saveData, getDictTypeList, getDictDataList } from '@/api/dict'
export default {
  name: 'AddData',
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
      dictTypeOptions: [],
      dictCssOptions: []
    }
  },
  methods: {
    show () {
      this.visible = !this.visible
      this.getDictTypes()
      this.getDictCss()
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
    },
    handleSubmit () {
      this.confirmLoading = true
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          saveData(values).then(res => {
            if (res.code === 200) {
              this.$notification.success({
                message: '消息',
                description: `添加字典数据成功`
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
