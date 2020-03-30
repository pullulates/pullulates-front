<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="24">
            <a-form-item label="任务名称">
              <a-input v-model="queryParam.name" placeholder="请填写任务名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="任务组名称">
              <a-input v-model="queryParam.groupName" placeholder="请填写任务组名称"/>
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
      <a-button type="primary" icon="plus" v-action:add @click="handleAdd()">添加</a-button>
    </div>
    <s-table
      ref="table"
      size="default"
      :loading="loading"
      :rowKey="(record) => record.jobId"
      :columns="columns"
      :data="loadData"
    >
      <span slot="status" slot-scope="status">
        <a-tag :color="getDictCss(jobStatus, status)">
          {{ getDictOption(jobStatus, status) }}
        </a-tag>
      </span>
    </s-table>
    <add-job ref="AddJob" @ok="handleOk"></add-job>
  </a-card>
</template>

<script>
import { getJobPage } from '@/api/job'
import { getDictDataListByType } from '@/api/dict'
import { STable } from '@/components'
import AddJob from './module/Add'

export default {
  name: 'Job',
  components: {
    STable,
    AddJob
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
        return this.getJobs(parameter)
      },
      jobStatus: []
    }
  },
  created () {
    getDictDataListByType({ dictType: 'job_status' }).then(res => {
      this.jobStatus = res.data
    })
  },
  methods: {
    getJobs (parameter) {
      return getJobPage(Object.assign(parameter, this.queryParam)).then(res => {
        return res
      })
    },
    handleAdd () {
      this.$refs.AddJob.show(this.jobStatus)
    },
    getDictOption (datas, param) {
      const result = datas.filter(item => item.dictValue === param)
      return result.length > 0 ? result[0].dictName : '未知'
    },
    getDictCss (datas, param) {
      const result = datas.filter(item => item.dictValue === param)
      return result.length > 0 ? result[0].dictCss : ''
    },
    handleOk () {
      this.$refs.table.refresh(true)
    }
  }
}

const columns = [
  {
    title: '任务编号',
    align: 'center',
    dataIndex: 'jobId'
  },
  {
    title: '任务名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '任务组',
    dataIndex: 'groupName',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '调用目标',
    dataIndex: 'invokeTarget',
    align: 'center'
  },
  {
    title: '执行表达式',
    dataIndex: 'cron',
    align: 'center'
  },
  {
    title: '创建人',
    dataIndex: 'createBy',
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    sorter: true
  }
]
</script>
