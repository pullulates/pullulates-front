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
      <a-button type="primary" icon="plus" @click="$refs.AddOrg.show()">添加机构</a-button>
    </div>
    <a-table :rowKey="rowKey" :columns="columns" :dataSource="orgs" />
    <add-org ref="AddOrg" @ok="handleOk"/>
  </a-card>
</template>

<script>
import { getOrgListTree } from '@/api/org'
import AddOrg from './module/Add'

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
    AddOrg
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
    handleOk () {
      this.getOrgList()
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
  }
]

</script>
