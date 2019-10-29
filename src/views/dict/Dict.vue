<template>
  <a-table :columns="columns" :dataSource="data" :rowKey="rowKey" @expand="expand" :expandedRowKeys="expandedRowKeys" >
    <a-table
      slot="expandedRowRender"
      :columns="innerColumns"
      :dataSource="innerData"
      :pagination="false"
      :rowKey="innerRowKey"
    >
    </a-table>
  </a-table>
</template>
<script>
import { getDictTypeList, getDictDataList } from '@/api/dict'

export default {
  data () {
    return {
      data: [],
      columns,
      rowKey: 'dictType',
      expandedRowKeys: [],
      innerColumns,
      innerData: [],
      innerRowKey: 'dictId'
    }
  },
  created () {
    this.getTypeList()
  },
  methods: {
    getTypeList (parameter) {
      getDictTypeList(parameter).then((res) => {
        this.data = res.data
      })
    },
    getDataList (parameter) {
      getDictDataList(parameter).then((res) => {
        this.innerData = res.data
      })
    },
    expand (expanded, record) {
      this.expandedRowKeys = []
      if (expanded) {
        this.expandedRowKeys = [record.dictType]
        this.getDataList({ 'dictType': this.expandedRowKeys[0] })
      }
    }
  }
}

const columns = [
  { title: '字典类型', dataIndex: 'dictType' },
  { title: '字典名称', dataIndex: 'dictName' },
  { title: '是否默认', dataIndex: 'isDefault' },
  { title: '排序编号', dataIndex: 'sortNo' },
  { title: '创建人', dataIndex: 'createBy' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '修改人', dataIndex: 'updateBy' },
  { title: '修改时间', dataIndex: 'updateTime' }
]

const innerColumns = [
  { title: '字典类型', dataIndex: 'dictType' },
  { title: '字典值', dataIndex: 'dictValue' },
  { title: '字典名称', dataIndex: 'dictName' },
  { title: '字典排序', dataIndex: 'sortNo' },
  { title: '字典样式', dataIndex: 'dictCss' },
  { title: '创建人', dataIndex: 'createBy' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '修改人', dataIndex: 'updateBy' },
  { title: '修改时间', dataIndex: 'updateTime' }
]
</script>
