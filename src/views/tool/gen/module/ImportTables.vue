<template>
  <a-modal
    title="导入表"
    :width="1000"
    :visible="visible"
    :footer="null"
    @cancel="handleCancle"
  >
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="24">
            <a-form-item label="表名称">
              <a-input v-model="queryParam.tableName" placeholder="请填写表名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a-button type="primary" v-if="selectedRowKeys.length > 0" :loading="loading" style="margin-left: 8px" @click="handleBatchImport()">批量导入</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      ref="table"
      size="default"
      :loading="loading"
      :rowKey="(record) => record.tableName"
      :columns="columns"
      :data="loadData"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    >
      <span slot="action" slot-scope="text, record">
        <a-button
          type="primary"
          size="small"
          v-action:edit
          :loading="loading"
          @click="handleImport(record)"
          ghost>
          <a-icon type="download"/>导入</a-button>
      </span>
    </s-table>
  </a-modal>
</template>

<script>
import { getUnImportedTableList, importTables } from '@/api/gen'
import { STable } from '@/components'

export default {
  name: 'ImportTableList',
  components: {
    STable
  },
  data () {
    return {
      visible: false,
      loading: false,
      queryParam: {
      },
      columns,
      selectedRowKeys: [],
      selectedRows: [],
      loadData: parameter => {
        return this.getUnImportedTables(parameter)
      }
    }
  },
  created () {
  },
  methods: {
    show () {
      this.visible = true
      if (this.$refs.table) {
        this.$refs.table.refresh(true)
      }
    },
    getUnImportedTables (parameter) {
      return getUnImportedTableList(Object.assign(parameter, this.queryParam)).then(res => {
        return res
      })
    },
    handleImport (record) {
      this.loading = true
      const tableNames = [record.tableName].join(',')
      importTables({ tableNames: tableNames }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.$refs.table.refresh(true)
        } else {
          this.$message.warning(res.msg)
        }
        this.loading = false
      })
    },
    handleBatchImport () {
      this.loading = true
      var tableNames = []
      this.selectedRows.forEach(row => tableNames.push(row.tableName))
      importTables({ tableNames: tableNames.join(',') }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.$refs.table.refresh(true)
        } else {
          this.$message.warning(res.msg)
        }
        this.loading = false
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleCancle () {
      this.$emit('ok')
      this.visible = false
    }
  }
}

const columns = [
  {
    title: '表名称',
    dataIndex: 'tableName'
  },
  {
    title: '表描述',
    dataIndex: 'tableComment'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
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
