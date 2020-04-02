<template>
  <a-modal
    title="编辑生成信息"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="配置信息" key="1">
        <a-form :form="form">
          <a-form-item hidden="true">
            <a-input type="hidden" v-decorator="['tableId']" />
          </a-form-item>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
              <a-form-item
                label="名称"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
              >
                <a-input v-decorator="['tableName', {rules: [{ required: true, message: '请输入表名称', whitespace: true},{max: 50, message: '表名称最多50个字符'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12">
              <a-form-item
                label="描述"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
              >
                <a-input v-decorator="['tableComment', {rules: [{ required: true, message: '请输入表描述', whitespace: true},{max: 100, message: '表描述最多100个字符'}]}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
              <a-form-item
                label="类名"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
              >
                <a-input v-decorator="['className', {rules: [{ required: true, message: '请输入类名', whitespace: true},{max: 50, message: '类名最多50个字符'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12">
              <a-form-item
                label="包名"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
              >
                <a-input v-decorator="['packageName', {rules: [{ required: true, message: '请输入包名', whitespace: true},{max: 50, message: '包名最多50个字符'}]}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
              <a-form-item
                label="模块名称"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
              >
                <a-input v-decorator="['moduleName', {rules: [{ required: true, message: '请输入模块名称', whitespace: true},{max: 15, message: '模块名称最多15个字符'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12">
              <a-form-item
                label="业务名称"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
              >
                <a-input v-decorator="['businessName', {rules: [{ required: true, message: '请输入业务名称', whitespace: true},{max: 15, message: '业务名称最多15个字符'}]}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="form-row" :gutter="24">
            <a-col :lg="12">
              <a-form-item
                label="功能名称"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
              >
                <a-input v-decorator="['functionName', {rules: [{ required: true, message: '请输入功能名称', whitespace: true},{max: 25, message: '功能名称最多25个字符'}]}]" />
              </a-form-item>
            </a-col>
            <a-col :lg="12">
              <a-form-item
                label="作者名称"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
              >
                <a-input v-decorator="['functionAuthor', {rules: [{ required: true, message: '请输入作者名称', whitespace: true},{max: 25, message: '作者名称最多25个字符'}]}]" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <a-divider />
        <div class="step-form-style-desc">
          <h3>关于配置信息的说明</h3>
          <h4>1.包名</h4>
          <p>
            包名影响的是后台代码生成的路径即domain、mapper、controller、service、impl，默认包名在配置文件里配置。根据业务需求，在这里做不同的更改。
            例如：当我们生成gen_table的代码时，由于我们工具类的代码都放在基础包路径的tool包下，因此，我们需要在基础包路径后加上“.tool”
          </p>
          <h4>2.模块名称</h4>
          <p>
            模块名称影响的是xml、页面文件的生成路径，以gen_table为例：默认xml文件生成在mybatis目录下，但代码生成隶属于工具类业务，
            因此需要放在mybatis/tool目录下；页面文件默认放在src/views目录下，代码生成的页面则需要放在src/views/tool目录下
          </p>
          <h4>3.业务名称</h4>
          <p>
            业务名称影响页面文件的生成路径，是模块名称的更深一级的划分，以gen_table为例：如果业务名称为gen，那么最终生成的路径是：src/views/tool/gen<br>
            业务名称影响路由的定义，rest风格路由已定义，不必单独添加后缀s
          </p>
          <h4>4.功能名称与作者</h4>
          <p>
            功能名称与作者体现在类及方法的注释上，一般不作修改
          </p>
          <h4>5.类名</h4>
          <p>
            类名影响各个类、方法、页面文件及其对应注释的命名，一般不作修改
          </p>
        </div>
      </a-tab-pane>
      <a-tab-pane tab="字段信息" key="2" forceRender>
          
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { updateTable } from '@/api/gen'
export default {
  name: 'EditTable',
  data () {
    return {
      visible: false,
      confirmLoading: false,
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      mdl: {}
    }
  },
  methods: {
    show (record) {
      this.mdl = Object.assign({}, record)
      this.visible = !this.visible
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(this.mdl, 'tableId', 'tableName', 'tableComment', 'className', 'packageName', 'moduleName', 'businessName', 'functionName', 'functionAuthor', 'pkColumn'))
      })
    },
    handleCancel () {
      this.visible = false
      this.form.resetFields()
    },
    handleSubmit () {
      this.confirmLoading = true
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          updateTable(values).then(res => {
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
    callback (key) {
    }
  }
}
</script>

<style lang="less" scoped>
.step-form-style-desc {
  padding: 0 56px;
  color: rgba(0,0,0,.45);

  h3 {
    margin: 0 0 12px;
    color: rgba(0,0,0,.45);
    font-size: 16px;
    line-height: 32px;
  }

  h4 {
    margin: 0 0 4px;
    color: rgba(0,0,0,.45);
    font-size: 14px;
    line-height: 22px;
  }

  p {
    margin-top: 0;
    margin-bottom: 12px;
    line-height: 22px;
  }
}
</style>
