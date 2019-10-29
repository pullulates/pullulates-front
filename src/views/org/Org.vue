<template>
  <a-table :rowKey="rowKey" :columns="columns" :dataSource="orgs" />
</template>

<script>
import { getOrgListTree } from '@/api/org'

export default {
  data () {
    return {
      orgs: [],
      columns,
      rowKey: 'orgId'
    }
  },
  mounted () {
    this.getOrgList()
  },
  methods: {
    getOrgList () {
      getOrgListTree().then((res) => {
        this.orgs = res.data
      })
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
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '创建人',
    dataIndex: 'createBy'
  }
]

</script>
