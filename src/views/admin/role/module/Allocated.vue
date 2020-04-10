<template>
  <a-modal
    title="分配用户"
    :width="1200"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
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
            <a-form-item label="角色类型">
              <a-select v-model="queryParam.roleIds" placeholder="请选择角色类型" mode="multiple" @change="handleRoleSelectChange">
                <a-select-option v-for="item in roles" :key="item.roleId">{{ item.roleName }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="组织机构">
              <a-tree-select
                showSearch
                :treeData="orgTree"
                v-model="queryParam.orgId"
                placeholder="请选择组织机构"
                allowClear
                treeDefaultExpandAll
              />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <span class="table-page-search-submitButtons" :style="{ float: 'right', overflow: 'hidden' }">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator" style="margin: 0 0 10px 0">
      <a-button type="primary" icon="plus" @click="confirmOper(1)" v-if="selectedRowKeys.length > 0">分配</a-button>
      <a-button type="danger" icon="delete" @click="confirmOper(2)" v-if="selectedRowKeys.length > 0" style="margin-left: 8px">移除</a-button>
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
      <span slot="sex" slot-scope="sex">
        <a-tag :color="getDictCss(sexs, sex)">
          {{ getDictOption(sexs, sex) }}
        </a-tag>
      </span>
      <span slot="status" slot-scope="text">
        <a-switch checkedChildren="启用" unCheckedChildren="禁用" :checked="text === '1'" />
      </span>
    </s-table>
    <template slot="footer">
      <a-button type="primary" key="cancel" @click="handleCancel">关闭</a-button>
    </template>
  </a-modal>
</template>

<script>
import { getUserList } from '@/api/user'
import { getOrgTree } from '@/api/org'
import { getRoleList, allocateIn, allocateOut } from '@/api/role'
import { getDictDataListByType } from '@/api/dict'
import { STable } from '@/components'

export default {
  name: 'Allocated',
  components: {
    STable
  },
  data () {
    return {
      queryParam: {
        roleIds: []
      },
      roleId: '',
      columns,
      selectedRowKeys: [],
      selectedRows: [],
      loadData: parameter => {
        return this.getUsers(parameter)
      },
      sexs: [],
      dataStatus: [],
      roles: [],
      orgTree: [],
      expandedKeys: [],
      autoExpandParent: true,
      visible: false,
      loading: false,
      confirmLoading: false
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
    confirmOper (oper) {
      const self = this
      this.$confirm({
        title: '请确认是否将选中用户' + (oper === 1 ? '分配至' : '移出') + '当前角色？',
        okText: '确认',
        okType: 'danger',
        cancelText: '放弃',
        onOk () {
          oper === 1 ? self.handleAdd() : self.handleDelete()
        },
        onCancel () {
          self.destroyAll()
        }
      })
    },
    handleAdd () {
      allocateIn({ roleId: this.roleId, userIds: this.selectedRowKeys }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.$refs.table.refresh(true)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    handleDelete () {
      allocateOut({ roleId: this.roleId, userIds: this.selectedRowKeys }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.$refs.table.refresh(true)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    getDictOption (datas, param) {
      const result = datas.filter(item => item.dictValue === param)
      return result.length > 0 ? result[0].dictName : '未知'
    },
    getDictCss (datas, param) {
      const result = datas.filter(item => item.dictValue === param)
      return result.length > 0 ? result[0].dictCss : ''
    },
    allolcated (dataStatus, roleId) {
      this.visible = true
      this.loading = true
      this.dataStatus = dataStatus
      this.roleId = roleId
      this.queryParam.roleIds = []
      this.queryParam.roleIds.push(roleId)
      if (this.$refs.table) {
        this.$refs.table.refresh(true)
      }
      this.loading = false
    },
    handleCancel () {
      this.visible = false
    },
    handleRoleSelectChange (selectedItems) {
      this.selectedItems = selectedItems
    },
    destroyAll () {
      this.$destroyAll()
    }
  }
}

const columns = [
  {
    title: '用户名称',
    dataIndex: 'userName',
    align: 'center'
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
    title: '组织机构',
    align: 'center',
    children: [
      {
        title: '机构编号',
        align: 'center',
        dataIndex: 'org.orgNo'
      },
      {
        title: '机构名称',
        align: 'center',
        dataIndex: 'org.orgName'
      }
    ]
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
  }
]
</script>
