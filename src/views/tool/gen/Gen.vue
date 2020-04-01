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
      <a-button type="primary" icon="plus" v-action:import @click="$refs.ImportTableList.show()">导入</a-button>
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
          v-action:edit
          @click="handleEdit(record)"
          ghost>
          <a-icon type="edit"/>编辑</a-button>
      </span>
    </s-table>
    <import-table-list ref="ImportTableList" @cancle="handleCancle" @ok="handleOk"/>
  </a-card>
</template>

<script>
import ImportTableList from './module/ImportTables'
import { getGensList } from '@/api/gen'
import { STable } from '@/components'

export default {
  name: 'GenList',
  components: {
    STable,
    ImportTableList
  },
  data () {
    return {
      description: '使用场景：代码生成可自动生成某个业务功能的基本CRUD代码，大量减少重复劳动，提升开发效率。',
      loading: true,
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
  created () {
  },
  methods: {
    getGens (parameter) {
      return getGensList(Object.assign(parameter, this.queryParam)).then(res => {
        return res
      })
    },
    handleEdit (record) {
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleOk () {
      this.$refs.table.refresh(true)
    },
    handleCancle () {
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
    title: '模板类型',
    dataIndex: 'tplCategory'
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
