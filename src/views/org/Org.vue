<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="5" :sm="24">
            <a-form-item label="机构名称">
              <a-input v-model="queryParam.orgName" placeholder="请填写机构名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="机构编号">
              <a-input v-model="queryParam.orgNo" placeholder="请填写机构编号"/>
            </a-form-item>
          </a-col>
          <a-col :md="3" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="this.getOrgList">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" v-action:add @click="$refs.AddOrg.show()">添加机构</a-button>
    </div>
    <a-table :rowKey="rowKey" :columns="columns" :dataSource="orgs">
      <span slot="operation" slot-scope="record">
        <a-button type="primary" size="small" v-action:edit @click="handleEdit(record)" ghost><a-icon type="edit"/> 编辑</a-button>
        <a-button
          type="danger"
          size="small"
          v-action:delete
          @click="confirmDelete(record)"
          ghost
          style="margin-left: 8px">
          <a-icon type="delete"/> 删除</a-button>
      </span>
    </a-table>
    <add-org ref="AddOrg" @ok="handleOk"/>
    <edit-org ref="EditOrg" @ok="handleOk"/>
  </a-card>
</template>

<script>
import { getOrgListTree, deleteOrg } from '@/api/org'
import AddOrg from './module/Add'
import EditOrg from './module/Edit'

export default {
  data () {
    return {
      orgs: [],
      columns,
      rowKey: 'orgId',
      queryParam: {}
    }
  },
  components: {
    AddOrg,
    EditOrg
  },
  mounted () {
    this.getOrgList()
  },
  methods: {
    getOrgList () {
      getOrgListTree(this.queryParam).then((res) => {
        this.orgs = res.data
      })
    },
    handleEdit (record) {
      this.$refs.EditOrg.show(record)
    },
    confirmDelete (record) {
      const self = this
      this.$confirm({
        title: '机构删除属于不可逆操作，请确认是否继续？',
        okText: '继续',
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
      deleteOrg({ orgId: record.orgId }).then(res => {
        this.callback(res)
      })
    },
    handleOk () {
      this.getOrgList()
    },
    callback (res) {
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.getOrgList()
      } else {
        this.$message.warning(res.msg)
      }
      this.destroyAll()
    },
    destroyAll () {
      this.$destroyAll()
    }
  }
}

const columns = [
  {
    title: '机构名称',
    dataIndex: 'orgName'
  },
  {
    title: '机构编号',
    dataIndex: 'orgNo'
  },
  {
    title: '排序编号',
    dataIndex: 'sortNo'
  },
  {
    title: '机构描述',
    dataIndex: 'desct'
  },
  {
    title: '创建人',
    dataIndex: 'createBy'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    key: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

</script>
