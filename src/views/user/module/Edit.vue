<template>
  <a-modal
    title="编辑用户"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :bordered="false"
    @cancel="handleCancel"
  >
    <a-form :form="form">
      <a-card title="基本信息">
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
            <a-form-item label="用户名称">
              <a-input
                placeholder="请输入用户名称"
                v-decorator="[
                  'userName',
                  {rules: [{ required: true, message: '请输入用户名称', whitespace: true}]}
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="用户姓名">
              <a-input
                placeholder="请输入用户姓名"
                v-decorator="[
                  'realName',
                  {rules: [{ required: true, message: '请输入用户姓名', whitespace: true}]}
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="证件号码">
              <a-input
                placeholder="请输入证件号码"
                v-decorator="[
                  'idCard',
                  {rules: [{ required: true, message: '请输入证件号码', whitespace: true}]}
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="form-row" :gutter="24">
          <a-col :lg="8">
            <a-form-item label="用户性别">
              <a-select
                placeholder="请选择用户性别"
                v-decorator="[
                  'sex',
                  {rules: [{ required: true, message: '请选择用户性别称', whitespace: true}]}
                ]"
              >
                <a-select-option v-for="item in sexs" :key="item.dictValue">{{ item.dictName }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="用户姓名">
              <a-input
                placeholder="请输入用户姓名"
                v-decorator="[
                  'realName',
                  {rules: [{ required: true, message: '请输入用户姓名', whitespace: true}]}
                ]"
              />
            </a-form-item>
          </a-col>
          <a-col :lg="8">
            <a-form-item label="证件号码">
              <a-input
                placeholder="请输入证件号码"
                v-decorator="[
                  'idCard',
                  {rules: [{ required: true, message: '请输入证件号码', whitespace: true}]}
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>
      <a-card title="组织机构信息"></a-card>
      <a-card title="角色信息"></a-card>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  name: 'EditUser',
  props: {
  },
  data () {
    return {
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      sexs: [],
      dataStatus: []
    }
  },
  methods: {
    edit (record, sexs, dataStatus) {
      this.visible = true
      this.sexs = sexs
      this.dataStatus = dataStatus
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
