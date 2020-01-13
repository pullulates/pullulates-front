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
          <a-col :md="6" :sm="24">
            <a-form-item label="电子邮箱">
              <a-input v-model="queryParam.email" placeholder="请填写电子邮箱"/>
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
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAdd()" v-if="selectedRowKeys.length > 0">分配</a-button>
      <a-button type="danger" icon="delete" @click="confirmBatchDelete()" v-if="selectedRowKeys.length > 0">移除</a-button>
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
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="save" :loading="confirmLoading" type="primary" @click="handleSave">提交</a-button>
    </template>
  </a-modal>
</template>

<script>
import { getUserList } from '@/api/user'
import { getOrgTree } from '@/api/org'
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

      orgTree: [],
      expandedKeys: [],
      autoExpandParent: true,
      visible: false,
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
  },
  methods: {
    getUsers (parameter) {
      return getUserList(Object.assign(parameter, this.queryParam)).then(res => {
        return res
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
      this.confirmLoading = true
      this.dataStatus = dataStatus
      this.queryParam.roleIds.push(roleId)
      this.$refs.table.refresh(true)
      this.confirmLoading = false
    },
    handleCancel () {
      this.visible = false
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
