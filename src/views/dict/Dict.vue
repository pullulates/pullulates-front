<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="5" :sm="24">
            <a-form-item label="字典类型">
              <a-input v-model="queryParam.dictType" placeholder="请填写字典类型"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="字典名称">
              <a-input v-model="queryParam.dictName" placeholder="请填写字典名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="5" :sm="24">
            <a-form-item label="是否内置">
              <a-select v-model="queryParam.isDefault" placeholder="请选择是否内置">
                <a-select-option v-for="item in isDefaults" :key="item.dictValue">{{ item.dictName }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="6" :sm="24">
              <a-form-item label="创建时间">
                <a-range-picker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="3" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="this.getTypeList">查询</a-button>
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
      <a-button type="primary" icon="plus" v-action:add @click="$refs.AddType.show()">添加字典类别</a-button>
      <a-button type="default" icon="plus" v-action:add @click="$refs.AddData.show()">添加字典数据</a-button>
    </div>
    <a-table :columns="columns" :dataSource="data" :rowKey="rowKey" @expand="expand" :expandedRowKeys="expandedRowKeys" >
      <span slot="isDefault" slot-scope="isDefault">
        <a-tag :color="getDictCss(isDefaults, isDefault)">
          {{ getDictOption(isDefaults, isDefault) }}
        </a-tag>
      </span>
      <a slot="operation" slot-scope="record">
        <a href="javascript:;" v-action:edit @click="handleEditType(record)"><a-icon type="edit"/> 编辑  </a>
        <a href="javascript:;" v-action:delete @click="confirmDeleteType(record)"><a-icon type="delete"/> 删除</a>
      </a>
      <a-table
        slot="expandedRowRender"
        :columns="innerColumns"
        :dataSource="innerData"
        :pagination="false"
        :rowKey="innerRowKey"
      >
        <a slot="operation" slot-scope="record">
          <a href="javascript:;" v-action:edit @click="handleEditData(record)"><a-icon type="edit"/> 编辑  </a>
          <a href="javascript:;" v-action:delete @click="confirmDeleteData(record)"><a-icon type="delete"/> 删除</a>
        </a>
      </a-table>
    </a-table>
    <add-type ref="AddType" @ok="handleOk"/>
    <add-data ref="AddData" @ok="handleDataOk"/>
    <edit-type ref="EditType" @ok="handleOk"/>
    <edit-data ref="EditData" @ok="handleDataOk"/>
  </a-card>
</template>
<script>
import { getDictTypeList, getDictDataList, getDictDataListByType, deleteType, deleteData } from '@/api/dict'
import AddType from './module/AddType'
import AddData from './module/AddData'
import EditType from './module/EditType'
import EditData from './module/EditData'

export default {
  components: {
    AddType,
    AddData,
    EditType,
    EditData
  },
  data () {
    return {
      description: '使用场景：数据字典维护了系统内所有可配置项字段，您可以在这里查看数据字典，但建议您不要修改或删除它们，这可能导致访问异常。',
      data: [],
      columns,
      rowKey: 'dictType',
      expandedRowKeys: [],
      innerColumns,
      innerData: [],
      innerRowKey: 'dictId',
      advanced: false,
      queryParam: {
      },
      isDefaults: []
    }
  },
  created () {
    getDictDataListByType({ dictType: 'is_default' }).then(res => {
      this.isDefaults = res.data
    })
    this.getTypeList()
  },
  methods: {
    getTypeList () {
      getDictTypeList(this.queryParam).then((res) => {
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
    handleOk () {
      this.getTypeList()
    },
    handleDataOk (parameter) {
      this.getDataList(parameter)
    },
    handleEditType (record) {
      this.$refs.EditType.show(record)
    },
    confirmDeleteType (record) {
      const self = this
      this.$confirm({
        title: '字典类别存在下级数据时，仅超级管理员有权限一次性删除，请确认是否继续当前的操作？',
        okText: '继续',
        okType: 'danger',
        cancelText: '放弃',
        onOk () {
          self.handleDeleteType(record)
        },
        onCancel () {
          self.destroyAll()
        }
      })
    },
    handleDeleteType (record) {
      deleteType({ dictId: record.dictId }).then(res => {
        this.callback(res)
      })
    },
    handleEditData (record) {
      this.$refs.EditData.show(record)
    },
    confirmDeleteData (record) {
      const self = this
      this.$confirm({
        title: '内置数据字典仅超级管理员有权限删除，请确认是否继续当前的操作？',
        okText: '继续',
        okType: 'danger',
        cancelText: '放弃',
        onOk () {
          self.handleDeleteData(record)
        },
        onCancel () {
          self.destroyAll()
        }
      })
    },
    handleDeleteData (record) {
      deleteData({ dictId: record.dictId }).then(res => {
        this.callback(res)
      })
    },
    destroyAll () {
      this.$destroyAll()
    },
    callback (res) {
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.getTypeList()
      } else {
        this.$message.warning(res.msg)
      }
      this.destroyAll()
    },
    getDictOption (datas, param) {
      const result = datas.filter(item => item.dictValue === param)
      return result.length > 0 ? result[0].dictName : '未知'
    },
    getDictCss (datas, param) {
      const result = datas.filter(item => item.dictValue === param)
      return result.length > 0 ? result[0].dictCss : ''
    }
  }
}

const columns = [
  { title: '字典类型', dataIndex: 'dictType' },
  { title: '字典名称', dataIndex: 'dictName' },
  { title: '是否内置', dataIndex: 'isDefault', scopedSlots: { customRender: 'isDefault' } },
  { title: '排序编号', dataIndex: 'sortNo' },
  { title: '创建人', dataIndex: 'createBy' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } }
]

const innerColumns = [
  { title: '字典值', dataIndex: 'dictValue' },
  { title: '字典名称', dataIndex: 'dictName' },
  { title: '字典排序', dataIndex: 'sortNo' },
  { title: '字典样式', dataIndex: 'dictCss' },
  { title: '创建人', dataIndex: 'createBy' },
  { title: '创建时间', dataIndex: 'createTime' },
  { title: '操作', key: 'operation', scopedSlots: { customRender: 'operation' } }
]
</script>
