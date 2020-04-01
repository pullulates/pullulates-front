<template>
  <a-modal
    title="添加定时任务"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-form-item
        label="任务名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['name', {rules: [{required: true, message: '请输入任务名称'},{max: 25, message: '任务名称最多25个字符'}]}]" />
      </a-form-item>
      <a-form-item
        label="任务组名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['groupName', {rules: [{required: true, message: '请输入任务组名称'},{max: 25, message: '任务组名称最多25个字符'}]}]" />
      </a-form-item>
      <a-form-item
        label="执行目标"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        help="执行目标为top.pullulates.tool.quartz.job包下的指定实现定时任务的类名"
      >
        <a-input v-decorator="['invokeTarget', {rules: [{required: true, message: '请输入执行目标'},{max: 50, message: '执行目标最多50个字符'}]}]" />
      </a-form-item>
      <a-form-item
        label="任务状态"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-radio-group
          buttonStyle="solid"
          v-decorator="[
            'status',
            {rules: [{ required: true, message: '请选择任务状态'}], initialValue: '1'}
          ]"
        >
          <a-radio-button v-for="item in jobStatus" :key="item.dictValue" :value="item.dictValue">{{ item.dictName }}</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="执行表达式"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <cron
          ref="innerVueCron"
          @change="handleChangeCorn">
        </cron>
        <a-form-item hidden="true">
          <a-input type="hidden" v-decorator="['cron']" />
        </a-form-item>
      </a-form-item>
      <a-form-item
        label="备注信息"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-textarea v-decorator="['remark', {rules: [{max: 500, message: '备注信息最多500个字符'}]}]" :rows="4" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { saveJob } from '@/api/job'
import Cron from '@/components/Cron/Cron'

export default {
  name: 'AddJob',
  components: {
    Cron
  },
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
      jobStatus: []
    }
  },
  methods: {
    show (jobStatus) {
      this.visible = !this.visible
      this.confirmLoading = true
      this.jobStatus = jobStatus
      this.confirmLoading = false
    },
    handleCancel () {
      this.visible = false
    },
    handleSubmit () {
      this.confirmLoading = true
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          if (!this.form.getFieldValue('cron')) {
            this.$message.warning('请生成执行表达式')
            this.confirmLoading = false
            return
          }
          saveJob(values).then(res => {
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
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleChangeCorn (cron) {
      this.form.setFieldsValue({ 'cron': cron })
    }
  }
}
</script>
