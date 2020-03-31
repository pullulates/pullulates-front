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
      <span slot="operation" slot-scope="text, record">
        <a-button type="primary" size="small" v-action:edit @click="handleEdit(record)" ghost><a-icon type="edit"/> 编辑</a-button>
        <a-dropdown v-action:edit>
          <a-menu slot="overlay">
            <a-menu-item v-if="record.status === '2'" v-action:excute @click="confirmExcute(record)"><a-icon type="caret-right" />执行</a-menu-item>
            <a-menu-item v-if="record.status === '1'" v-action:pause @click="confirmPause(record)"><a-icon type="pause" />暂停</a-menu-item>
            <a-menu-item v-action:excute @click="confirmExcuteAtonce(record)"><a-icon type="forward" />执行一次</a-menu-item>
            <a-menu-item v-action:delete @click="confirmDelete(record)"><a-icon type="delete" />删除</a-menu-item>
          </a-menu>
          <a-button type="primary" size="small" style="margin-left: 8px" ghost> 更多 <a-icon type="down" /> </a-button>
        </a-dropdown>
      </span>
    </s-table>
    <add-job ref="AddJob" @ok="handleOk"></add-job>
    <edit-job ref="EditJob" @ok="handleOk"></edit-job>
  </a-card>
</template>

<script>
import { getJobPage, excuteJob, excuteJobAtonece, deleteJob, pauseJob } from '@/api/job'
import { getDictDataListByType } from '@/api/dict'
import { STable } from '@/components'
import AddJob from './module/Add'
import EditJob from './module/Edit'

export default {
  name: 'Job',
  components: {
    STable,
    AddJob,
    EditJob
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
    handleEdit (record) {
      this.$refs.EditJob.show(record, this.jobStatus)
    },
    confirmExcute (record) {
      const self = this
      this.$confirm({
        title: '确认执行该任务吗?',
        okText: '是的',
        okType: 'danger',
        cancelText: '放弃',
        onOk () {
          self.handleExcute(record)
        },
        onCancel () {
          self.destroyAll()
        }
      })
    },
    handleExcute (record) {
      this.loading = true
      excuteJob({ jobId: record.jobId }).then(res => {
        this.callback(res)
      })
    },
    confirmExcuteAtonce (record) {
      const self = this
      this.$confirm({
        title: '确认立即执行一次该任务吗?',
        okText: '是的',
        okType: 'danger',
        cancelText: '放弃',
        onOk () {
          self.handleExcuteAtonce(record)
        },
        onCancel () {
          self.destroyAll()
        }
      })
    },
    handleExcuteAtonce (record) {
      this.loading = true
      excuteJobAtonece({ jobId: record.jobId }).then(res => {
        this.callback(res)
      })
    },
    confirmPause (record) {
      const self = this
      this.$confirm({
        title: '确认暂停该任务吗?',
        okText: '是的',
        okType: 'danger',
        cancelText: '放弃',
        onOk () {
          self.handlePause(record)
        },
        onCancel () {
          self.destroyAll()
        }
      })
    },
    handlePause (record) {
      this.loading = true
      pauseJob({ jobId: record.jobId }).then(res => {
        this.callback(res)
      })
    },
    confirmDelete (record) {
      const self = this
      this.$confirm({
        title: '确认删除该任务吗?',
        okText: '是的',
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
      this.loading = true
      deleteJob({ jobId: record.jobId }).then(res => {
        this.callback(res)
      })
    },
    callback (res) {
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.$refs.table.refresh(true)
      } else {
        this.$message.warning(res.msg)
      }
      this.loading = false
      this.destroyAll()
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
    },
    destroyAll () {
      this.$destroyAll()
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
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'center',
    scopedSlots: { customRender: 'operation' }
  }
]
</script>
