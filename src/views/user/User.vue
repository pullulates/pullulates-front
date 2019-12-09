<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="4">
        <s-tree
          :dataSource="orgTree"
          :autoExpandParent="autoExpandParent"
          :expandedKeys="expandedKeys"
          :search="false"
          @click="handleClick"
          @onExpand="onExpand"></s-tree>
      </a-col>
      <a-col :span="20">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="24">
              <a-col :md="6" :sm="24">
                <a-form-item label="用户名称">
                  <a-input v-model="queryParam.userName" placeholder="请填写用户名称"/>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item label="手机号码">
                  <a-input v-model="queryParam.phone" placeholder="请填写手机号码"/>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item label="电子邮箱">
                  <a-input v-model="queryParam.email" placeholder="请填写电子邮箱"/>
                </a-form-item>
              </a-col>
              <template v-if="advanced">
                <a-col :md="6" :sm="24">
                  <a-form-item label="用户性别">
                    <a-select v-model="queryParam.sex" placeholder="请选择性别">
                      <a-select-option v-for="item in sexs" :key="item.dictValue">{{ item.dictName }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <a-form-item label="用户状态">
                    <a-select v-model="queryParam.status" placeholder="请选择状态">
                      <a-select-option v-for="item in dataStatus" :key="item.dictValue">{{ item.dictName }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <a-form-item label="所属角色">
                    <a-select v-model="queryParam.roleIds" placeholder="请选择所属角色" mode="multiple" @change="handleRoleSelectChange">
                      <a-select-option v-for="item in roles" :key="item.roleId">{{ item.roleName }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="12">
                  <a-form-item label="创建时间">
                    <a-range-picker
                      :ranges="{ '今天': [moment(), moment()], '这个月': [moment(), moment().endOf('month')] }"
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                    />
                  </a-form-item>
                </a-col>
              </template>
              <a-col :md="4" :sm="24">
                <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                  <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                  <a @click="toggleAdvanced" style="margin-left: 8px">
                    {{ advanced ? '收起' : '展开' }}
                    <a-icon :type="advanced ? 'up' : 'down'"/>
                  </a>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="handleAdd()">添加</a-button>
          <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="confirmBatchChangeStatus('1')"><a-icon type="unlock" />启用</a-menu-item>
              <a-menu-item key="2" @click="confirmBatchChangeStatus('2')"><a-icon type="lock" />禁用</a-menu-item>
              <a-menu-item key="3" @click="confirmBatchDelete()"><a-icon type="delete" />删除</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              批量操作 <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </div>
        <s-table
          ref="table"
          size="default"
          :loading="loading"
          :rowKey="(record) => record.userId"
          :columns="columns"
          :data="loadData"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <a slot="detail" slot-scope="text, record" href="javascript:;" @click="$refs.Detail.show(record)">{{ text }}</a>
          <span slot="sex" slot-scope="sex">
            <a-tag :color="getDictCss(sexs, sex)">
              {{ getDictOption(sexs, sex) }}
            </a-tag>
          </span>
          <span slot="status" slot-scope="text, record">
            <a-switch checkedChildren="启用" unCheckedChildren="禁用" :checked="text === '1'" @click="confirmChangeStatus(record)" />
          </span>
          <span slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="handleEdit(record)"><a-icon type="edit"/> 编辑</a>
            <a-divider type="vertical" />
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item @click="openResetModal(record)"><a-icon type="reload" />重置密码</a-menu-item>
                <a-menu-item @click="confirmDelete(record)"><a-icon type="delete" />删除用户</a-menu-item>
              </a-menu>
              <a>
                更多 <a-icon type="down" />
              </a>
            </a-dropdown>
          </span>
        </s-table>
      </a-col>
    </a-row>
    <add ref="Add" @ok="handleSave"/>
    <detail ref="Detail" />
    <edit ref="Edit" @ok="handleSave"/>
    <a-modal
      title="重置密码"
      :visible="resetVisible"
      @ok="handleResetOk"
      @cancel="handleResetCancel"
    >
      <a-form
        :form="resetForm"
      >
        <a-form-item label="重置用户" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
          {{ userName }}
        </a-form-item>
        <a-form-item label="密码" extra="默认的重置密码为：111111" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
          <a-input
            type="password"
            placeholder="请输入重置后的密码"
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入重置后的密码!' }], initialValue: resetValue }
            ]" >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import { getUserList, changeUserStatus, resetPassword, deleteUser, batchChangeUserStatus, batchDeleteUser } from '@/api/user'
import { getOrgTree } from '@/api/org'
import { getRoleList } from '@/api/role'
import { getDictDataListByType } from '@/api/dict'
import { STable } from '@/components'
import STree from '@/components/Tree/Tree'
import moment from 'moment'
import Add from './module/Add'
import Detail from './module/Detail'
import Edit from './module/Edit'

export default {
  components: {
    STable,
    STree,
    Add,
    Detail,
    Edit
  },
  data () {
    return {
      description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',
      loading: true,
      advanced: false,
      queryParam: {
      },
      columns,
      selectedRowKeys: [],
      selectedRows: [],
      loadData: parameter => {
        return this.getUsers(parameter)
      },
      sexs: [],
      dataStatus: [],
      resetForm: this.$form.createForm(this),
      resetVisible: false,
      resetValue: '111111',
      userId: '',
      userName: '',

      orgTree: [],
      expandedKeys: [],
      autoExpandParent: true,

      roles: [],
      selectedItems: []
    }
  },
  created () {
    getOrgTree().then(res => {
      this.orgTree = res.data
      this.expandedKeys = res.data.map(item => item.parentId)
    })
    getDictDataListByType({ dictType: 'sex' }).then(res => {
      this.sexs = res.data
    })
    getDictDataListByType({ dictType: 'data_status' }).then(res => {
      this.dataStatus = res.data
    })
    getRoleList().then(res => {
      this.roles = res.data
    })
  },
  methods: {
    getUsers (parameter) {
      return getUserList(Object.assign(parameter, this.queryParam)).then(res => {
        return res
      })
    },
    handleAdd () {
      this.$refs.Add.add(this.orgTree, this.roles, this.sexs, this.dataStatus)
    },
    handleEdit (record) {
      this.$refs.Edit.edit(record, this.orgTree, this.roles, this.sexs, this.dataStatus)
    },
    confirmChangeStatus (record) {
      const self = this
      this.$confirm({
        title: '确认改变当前用户的状态码?',
        okText: '是的',
        okType: 'danger',
        cancelText: '放弃',
        onOk () {
          self.handleChangeStatus(record)
        },
        onCancel () {
          self.destroyAll()
        }
      })
    },
    handleChangeStatus (record) {
      this.loading = true
      changeUserStatus({ userId: record.userId, status: record.status === '1' ? '2' : '1' }).then(res => {
        if (res.code === 200) {
          record.status = record.status === '1' ? '2' : '1'
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
      this.loading = false
    },
    openResetModal (record) {
      this.userId = record.userId
      this.userName = record.userName
      this.resetVisible = true
    },
    handleResetCancel () {
      this.userName = ''
      this.userId = ''
      this.resetVisible = false
    },
    handleResetOk () {
      this.resetForm.validateFields((err, fieldsValue) => {
        if (err) {
          return false
        }
        fieldsValue.userId = this.userId
        resetPassword(fieldsValue).then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.handleResetCancel()
          } else {
            this.$message.warning(res.msg)
          }
        })
      })
    },
    confirmDelete (record) {
      const self = this
      this.$confirm({
        title: '确认删除当前选中的用户吗?',
        okText: '是的',
        okType: 'danger',
        cancelText: '放弃',
        onOk () {
          self.handleDelete(record)
        },
        onCancel () {
          self.destroyAll()
        }
      })
    },
    handleDelete (record) {
      deleteUser({ userId: record.userId }).then(res => {
        this.callback(res)
      })
    },
    confirmBatchChangeStatus (status) {
      const self = this
      this.$confirm({
        title: '确认批量更改已选用户的状态吗?',
        onOk () {
          self.handleBatchChangeStatus(status)
        },
        onCancel () {
          self.destroyAll()
        }
      })
    },
    handleBatchChangeStatus (status) {
      batchChangeUserStatus({ userIds: this.selectedRowKeys, status: status }).then(res => {
        this.callback(res)
      })
    },
    confirmBatchDelete () {
      const self = this
      this.$confirm({
        title: '确认批量删除已选用户吗?',
        onOk () {
          self.handleBatchDelete(status)
        },
        onCancel () {
          self.destroyAll()
        }
      })
    },
    handleBatchDelete () {
      batchDeleteUser({ userIds: this.selectedRowKeys }).then(res => {
        this.callback(res)
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    moment,
    handleSave () {
      this.$refs.table.refresh(true)
    },
    getDictOption (datas, param) {
      const result = datas.filter(item => item.dictValue === param)
      return result.length > 0 ? result[0].dictName : '未知'
    },
    getDictCss (datas, param) {
      const result = datas.filter(item => item.dictValue === param)
      return result.length > 0 ? result[0].dictCss : ''
    },
    destroyAll () {
      this.$destroyAll()
    },
    callback (res) {
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.$refs.table.refresh(true)
      } else {
        this.$message.warning(res.msg)
      }
      this.destroyAll()
    },
    handleClick (e) {
      this.queryParam.orgId = e.key
      this.$refs.table.refresh(true)
    },
    onExpand  (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    handleRoleSelectChange (selectedItems) {
      this.selectedItems = selectedItems
    }
  }
}

const columns = [
  {
    title: '用户名称',
    dataIndex: 'userName',
    align: 'center',
    scopedSlots: { customRender: 'detail' }
  },
  {
    title: '姓名',
    dataIndex: 'realName',
    align: 'center'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    scopedSlots: { customRender: 'sex' }
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '证件号码',
    dataIndex: 'idCard',
    align: 'center'
  },
  {
    title: '联系方式',
    align: 'center',
    children: [
      {
        title: '手机',
        align: 'center',
        dataIndex: 'phone'
      },
      {
        title: '邮箱',
        align: 'center',
        dataIndex: 'email'
      }
    ]
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
</script>

<style lang="less" scoped>
.ant-avatar-lg {
  width: 48px;
  height: 48px;
  line-height: 48px;
}

.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
  span {
    line-height: 20px;
  }
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
</style>
