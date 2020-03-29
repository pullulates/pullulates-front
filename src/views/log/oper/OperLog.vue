<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="24">
            <a-form-item label="日志标题">
              <a-input v-model="queryParam.title" placeholder="请填写日志标题"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="操作人">
              <a-input v-model="queryParam.operName" placeholder="请填写操作人"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="是否异常">
              <a-select v-model="queryParam.status" placeholder="请选择是否异常">
                <a-select-option v-for="item in exceptionStatus" :key="item.dictValue">{{ item.dictName }}</a-select-option>
              </a-select>
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
    <s-table
      ref="table"
      size="default"
      :loading="loading"
      :rowKey="(record) => record.operId"
      :columns="columns"
      :data="loadData"
    >
      <span slot="businessType" slot-scope="businessType">
        <a-tag :color="getDictCss(operTypes, businessType)">
          {{ getDictOption(operTypes, businessType) }}
        </a-tag>
      </span>
      <span slot="status" slot-scope="status">
        <a-tag :color="getDictCss(exceptionStatus, status)">
          {{ getDictOption(exceptionStatus, status) }}
        </a-tag>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import { getOperLogPage } from '@/api/log'
import { getDictDataListByType } from '@/api/dict'
import { STable } from '@/components'

export default {
  name: 'OperLog',
  components: {
    STable
  },
  data () {
    return {
      loading: true,
      queryParam: {
      },
      columns,
      selectedRowKeys: [],
      selectedRows: [],
      loadData: parameter => {
        return this.getOperLogs(parameter)
      },
      operTypes: [],
      exceptionStatus: []
    }
  },
  created () {
    getDictDataListByType({ dictType: 'oper_type' }).then(res => {
      this.operTypes = res.data
    })
    getDictDataListByType({ dictType: 'exception_status' }).then(res => {
      this.exceptionStatus = res.data
    })
  },
  methods: {
    getOperLogs (parameter) {
      return getOperLogPage(Object.assign(parameter, this.queryParam)).then(res => {
        return res
      })
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
  {
    title: '日志编号',
    align: 'center',
    dataIndex: 'operId'
  },
  {
    title: '日志标题',
    align: 'center',
    dataIndex: 'title'
  },
  {
    title: '操作类型',
    align: 'center',
    dataIndex: 'businessType',
    scopedSlots: { customRender: 'businessType' }
  },
  {
    title: '是否异常',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '客户端信息',
    align: 'center',
    children: [
      {
        title: '操作IP',
        align: 'center',
        dataIndex: 'operIp'
      },
      {
        title: '操作地址',
        align: 'center',
        dataIndex: 'operLocation'
      }
    ]
  },
  {
    title: '请求地址',
    dataIndex: 'operUrl',
    align: 'center'
  },
  {
    title: '操作人',
    dataIndex: 'operName',
    align: 'center'
  },
  {
    title: '操作时间',
    dataIndex: 'operTime',
    align: 'center',
    sorter: true
  }
]
</script>
