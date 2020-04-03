<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="24">
            <a-form-item label="表名称">
              <a-input v-model="queryParam.userName" placeholder="请填写用户名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button v-action:import type="primary" icon="plus" @click="$refs.ImportTableList.show()">导入</a-button>
      <a-button
        v-action:download
        icon="download"
        v-if="selectedRowKeys.length > 0"
        :loading="waiting"
        @click="confirmBatchDownload()">
        下载
      </a-button>
      <a-button
        v-action:delete
        type="danger"
        icon="delete"
        v-if="selectedRowKeys.length > 0"
        :loading="waiting"
        @click="confirmBatchDelete()">
        删除
      </a-button>
    </div>
    <s-table
      ref="table"
      size="default"
      :loading="loading"
      :rowKey="(record) => record.tableId"
      :columns="columns"
      :data="loadData"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    >
      <span slot="action" slot-scope="text, record">
        <a-button
          type="primary"
          size="small"
          v-action:preview
          @click="handlePreview(record)"
          ghost>
          <a-icon type="eye"/>
          预览
        </a-button>
        <a-button
          type="primary"
          size="small"
          v-action:download
          @click="$refs.EditTable.show(record)"
          style="margin-left: 8px"
          :loading="waiting"
          ghost>
          <a-icon type="edit"/>
          编辑
        </a-button>
        <a-button
          type="primary"
          size="small"
          v-action:download
          @click="confirmDownload(record)"
          style="margin-left: 8px"
          :loading="waiting"
          ghost>
          <a-icon type="download"/>
          下载
        </a-button>
        <a-button
          type="danger"
          size="small"
          v-action:delete
          @click="confirmDelete(record)"
          style="margin-left: 8px"
          :loading="waiting"
          ghost>
          <a-icon type="delete"/>
          删除
        </a-button>
      </span>
    </s-table>
    <import-table-list ref="ImportTableList" @cancle="handleRefresh" @ok="handleRefresh"/>
    <preview-code ref="PreviewCode" />
    <edit-table ref="EditTable" @ok="handleRefresh"/>
  </a-card>
</template>

<script>
import ImportTableList from './module/ImportTables'
import PreviewCode from './module/Preview'
import EditTable from './module/Edit'
import { getGensList, batchDeleteTable, deleteTable, download, batchDownload } from '@/api/gen'
import { STable } from '@/components'
import { resolveBlob, mimeMap } from '@/utils/download'

export default {
  name: 'GenList',
  components: {
    STable,
    ImportTableList,
    EditTable,
    PreviewCode
  },
  data () {
    return {
      description: '使用场景：代码生成可自动生成某个业务功能的基本CRUD代码，大量减少重复劳动，提升开发效率。',
      loading: true,
      waiting: false,
      queryParam: {
      },
      columns,
      selectedRowKeys: [],
      selectedRows: [],
      loadData: parameter => {
        return this.getGens(parameter)
      }
    }
  },
  methods: {
    getGens (parameter) {
      return getGensList(Object.assign(parameter, this.queryParam)).then(res => {
        return res
      })
    },
    handlePreview (record) {
      this.$refs.PreviewCode.show(record.tableId)
    },
    confirmDelete (record) {
      const self = this
      this.$confirm({
        title: '确认继续删除已导入的表吗？',
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
      this.waiting = true
      deleteTable({ tableId: record.tableId }).then(res => {
        this.callback(res)
        this.waiting = false
      })
    },
    confirmDownload (record) {
      const self = this
      this.$confirm({
        title: '确认下载该表的代码吗？',
        okText: '继续',
        okType: 'danger',
        cancelText: '放弃',
        onOk () {
          self.handleDownload(record)
        },
        onCancel () {
          self.destroyAll()
        }
      })
    },
    handleDownload (record) {
      this.waiting = true
      download({ tableName: record.tableName }).then(res => {
        resolveBlob(res, mimeMap.zip)
        this.waiting = false
      }).catch(err => {
        this.$message.warning('系统异常，错误信息：' + err)
        this.waiting = false
      })
    },
    confirmBatchDelete () {
      const self = this
      this.$confirm({
        title: '确认继续删除已导入的表吗？',
        okText: '继续',
        okType: 'danger',
        cancelText: '放弃',
        onOk () {
          self.handleBatchDelete()
        },
        onCancel () {
          self.destroyAll()
        }
      })
    },
    handleBatchDelete () {
      this.waiting = true
      batchDeleteTable({ tableIds: this.selectedRowKeys }).then(res => {
        this.callback(res)
        this.waiting = false
      })
    },
    confirmBatchDownload () {
      const self = this
      this.$confirm({
        title: '确认下载已选表的代码吗？',
        okText: '继续',
        okType: 'danger',
        cancelText: '放弃',
        onOk () {
          self.handleBatchDownload()
        },
        onCancel () {
          self.destroyAll()
        }
      })
    },
    handleBatchDownload () {
      this.waiting = true
      var tableNames = []
      this.selectedRows.forEach(row => tableNames.push(row.tableName))
      batchDownload({ tableNames: tableNames.join(',') }).then(res => {
        resolveBlob(res, mimeMap.zip)
        this.waiting = false
      }).catch(err => {
        this.$message.warning('系统异常，错误信息：' + err)
        this.waiting = false
      })
    },
    callback (res) {
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.selectedRowKeys = []
        this.handleRefresh()
      } else {
        this.$message.warning(res.msg)
      }
      this.destroyAll()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleRefresh () {
      this.$refs.table.refresh(true)
    },
    destroyAll () {
      this.$destroyAll()
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
    title: 'Domain',
    dataIndex: 'className'
  },
  {
    title: '包名',
    dataIndex: 'packageName'
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
