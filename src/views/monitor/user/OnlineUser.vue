<template>
  <a-card :bordered="false">
    <s-table
      ref="table"
      size="default"
      :loading="loading"
      :rowKey="(record) => record.user.userId"
      :columns="columns"
      :data="loadData"
    >
      <span slot="sex" slot-scope="sex">
        <a-tag :color="getDictCss(sexs, sex)">
          {{ getDictOption(sexs, result) }}
        </a-tag>
      </span>
    </s-table>
  </a-card>
</template>

<script>
import { getOnlineUserList } from '@/api/user'
import { getDictDataListByType } from '@/api/dict'
import { STable } from '@/components'

export default {
  name: 'OnlineUser',
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
        return this.getOnlineUsers(parameter)
      },
      sexs: []
    }
  },
  created () {
    getDictDataListByType({ dictType: 'sex' }).then(res => {
      this.sexs = res.data
    })
  },
  methods: {
    getOnlineUsers (parameter) {
      return getOnlineUserList(Object.assign(parameter, this.queryParam)).then(res => {
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
    title: '登录凭证',
    align: 'center',
    dataIndex: 'token'
  },
  {
    title: '登录用户',
    align: 'center',
    dataIndex: 'user.userName'
  },
  {
    title: '登录信息',
    align: 'center',
    children: [
      {
        title: 'ip',
        align: 'center',
        dataIndex: 'ip'
      },
      {
        title: '位置',
        align: 'center',
        dataIndex: 'location'
      },
      {
        title: '操作系统',
        align: 'center',
        dataIndex: 'os'
      },
      {
        title: '浏览器',
        align: 'center',
        dataIndex: 'browser'
      }
    ]
  },
  {
    title: '用户信息',
    align: 'center',
    children: [
      {
        title: '真实姓名',
        align: 'center',
        dataIndex: 'user.realName'
      },
      {
        title: '性别',
        align: 'center',
        dataIndex: 'user.sex',
        scopedSlots: { customRender: 'sex' }
      },
      {
        title: '联系方式',
        align: 'center',
        dataIndex: 'user.phone'
      },
      {
        title: '组织机构',
        align: 'center',
        dataIndex: 'user.org.orgName'
      }
    ]
  }
]
</script>
