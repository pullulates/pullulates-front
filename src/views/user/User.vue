<template>
  <s-table
    ref="table"
    size="default"
    :loading="loading"
    :rowKey="(record) => record.userId"
    :columns="columns"
    :data="getUsers"
    :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
  ></s-table>
</template>

<script>
import { getUserList } from '@/api/user'
import { STable } from '@/components'

export default {
  components: {
    STable
  },
  data () {
    return {
      loading: true,
      queryParam: {},
      columns,
      getUsers: this.getData,
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getUserList().then(res => {
        this.loading = false
        this.users = res.data
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}

const columns = [
  {
    title: '用户名称',
    dataIndex: 'userName'
  },
  {
    title: '姓名',
    dataIndex: 'realName'
  },
  {
    title: '性别',
    dataIndex: 'sex'
  },
  {
    title: '证件号码',
    dataIndex: 'idCard'
  },
  {
    title: '手机',
    dataIndex: 'status',
    needTotal: true
  },
  {
    title: '邮箱',
    dataIndex: 'email'
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
