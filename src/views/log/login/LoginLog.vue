<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="24">
            <a-form-item label="用户名称">
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
    <s-table
      ref="table"
      size="default"
      :loading="loading"
      :rowKey="(record) => record.loginId"
      :columns="columns"
      :data="loadData"
    >
      <span slot="result" slot-scope="result">
        <a-tag :color="getDictCss(results, result)">
          {{ getDictOption(results, result) }}
        </a-tag>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import { getLoginLogPage } from '@/api/log'
import { getDictDataListByType } from '@/api/dict'
import { STable } from '@/components'

export default {
  name: 'LoginLog',
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
        return this.getLoginLogs(parameter)
      },
      results: []
    }
  },
  created () {
    getDictDataListByType({ dictType: 'oper_result' }).then(res => {
      this.results = res.data
    })
  },
  methods: {
    getLoginLogs (parameter) {
      return getLoginLogPage(Object.assign(parameter, this.queryParam)).then(res => {
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
    title: '登录编号',
    align: 'center',
    dataIndex: 'loginId'
  },
  {
    title: '登录用户',
    align: 'center',
    dataIndex: 'userName'
  },
  {
    title: '登录结果',
    dataIndex: 'result',
    align: 'center',
    scopedSlots: { customRender: 'result' }
  },
  {
    title: '登录时间',
    dataIndex: 'loginTime',
    align: 'center',
    sorter: true
  },
  {
    title: '客户端信息',
    align: 'center',
    children: [
      {
        title: '浏览器',
        align: 'center',
        dataIndex: 'browserType'
      },
      {
        title: '登录IP',
        align: 'center',
        dataIndex: 'ipAddr'
      },
      {
        title: '登录地址',
        align: 'center',
        dataIndex: 'location'
      },
      {
        title: '操作系统',
        align: 'center',
        dataIndex: 'os'
      }
    ]
  },
  {
    title: '返回消息',
    dataIndex: 'msg',
    align: 'center'
  }
]
</script>
