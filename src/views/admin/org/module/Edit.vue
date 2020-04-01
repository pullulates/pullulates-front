<template>
  <a-modal
    title="编辑组织机构"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-form-item hidden="true">
        <a-input type="hidden" v-decorator="['orgId']" />
      </a-form-item>
      <a-form-item
        label="上级机构"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        v-if="parentId != '0'"
      >
        <a-tree-select
          showSearch
          :treeData="orgTree"
          v-decorator="['parentId', {rules: [{required: true, message: '请选择上级组织机构'}]}]"
          placeholder="请选择上级组织机构"
          allowClear
          treeDefaultExpandAll
          @change="orgSelectChange"
        />
      </a-form-item>
      <a-form-item
        label="机构名称"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['orgName', {rules: [{required: true, message: '请输入机构名称'},{max: 100, message: '机构名称最多100个字符'}]}]" />
      </a-form-item>
      <a-form-item
        label="机构编号"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['orgNo', {rules: [{required: true, message: '请输入机构编号'},{max: 32, message: '机构编号最多32个字符'}]}]" />
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
        label="描述信息"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-textarea v-decorator="['desct', {rules: [{max: 150, message: '机构描述信息最多150个字符'}]}]" :rows="4" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { getOrgTree, getSuggestSortNo, updateOrg } from '@/api/org'
export default {
  name: 'EditOrg',
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
      suggestSortNo: '',
      orgTree: [],
      expandedKeys: [],
      autoExpandParent: true,
      parentId: '',
      mdl: {}
    }
  },
  created () {
    this.getOrgTrees()
  },
  methods: {
    show (record) {
      this.parentId = record.parentId
      this.mdl = Object.assign({}, record)
      this.visible = !this.visible
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'orgId', 'parentId', 'orgName', 'orgNo', 'sortNo', 'desct'))
      })
      this.getSuggestSortNo()
    },
    handleCancel () {
      this.visible = false
    },
    getOrgTrees () {
      getOrgTree().then(res => {
        this.orgTree = res.data
        this.expandedKeys = res.data.map(item => item.parentId)
      })
    },
    getSuggestSortNo () {
      getSuggestSortNo().then(res => {
        this.suggestSortNo = res.data
      })
    },
    orgSelectChange (value, label, extra) {
      getSuggestSortNo({ orgId: value }).then(res => {
        this.suggestSortNo = res.data
      })
    },
    handleSubmit () {
      this.confirmLoading = true
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          updateOrg(values).then(res => {
            if (res.code === 200) {
              this.getOrgTrees()
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
    }
  }
}
</script>
