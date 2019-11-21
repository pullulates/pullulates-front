<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="24">
            <a-form-item label="字典类型">
              <a-input v-model="queryParam.dictType" placeholder="请填写字典类型"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="字典名称">
              <a-input v-model="queryParam.dictName" placeholder="请填写字典名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="是否内置">
              <a-select v-model="queryParam.isDefault" placeholder="请选择是否内置" default-value="">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">内置</a-select-option>
                <a-select-option value="2">非内置</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="7" :sm="24">
              <a-form-item label="创建时间">
                <a-range-picker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.AddType.show()">添加字典类别</a-button>
      <a-button type="default" icon="plus" @click="$refs.AddData.show()">添加字典数据</a-button>
    </div>
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
    <add-type ref="AddType" @ok="handleSaveType"/>
    <add-data ref="AddData" @ok="handleSaveData"/>
  </a-card>
</template>
<script>
import { getDictTypeList, getDictDataList } from '@/api/dict'
import AddType from './module/AddType'
import AddData from './module/AddData'

export default {
  components: {
    AddType,
    AddData
  },
  data () {
    return {
      data: [],
      columns,
      rowKey: 'dictType',
      expandedRowKeys: [],
      innerColumns,
      innerData: [],
      innerRowKey: 'dictId',
      advanced: false,
      queryParam: {
        dictType: '',
        dictName: '',
        isDefault: ''
      }
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
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    handleSaveType () {
      this.getTypeList()
    },
    handleSaveData () {
      this.getTypeList()
    }
  }
}

const columns = [
  { title: '字典类型', dataIndex: 'dictType' },
  { title: '字典名称', dataIndex: 'dictName' },
  { title: '是否默认', dataIndex: 'isDefault' },
  { title: '排序编号', dataIndex: 'sortNo' },
  { title: '创建人', dataIndex: 'createBy' },
  { title: '创建时间', dataIndex: 'createTime' }
]

const innerColumns = [
  { title: '字典值', dataIndex: 'dictValue' },
  { title: '字典名称', dataIndex: 'dictName' },
  { title: '字典排序', dataIndex: 'sortNo' },
  { title: '字典样式', dataIndex: 'dictCss' },
  { title: '创建人', dataIndex: 'createBy' },
  { title: '创建时间', dataIndex: 'createTime' }
]
</script>
