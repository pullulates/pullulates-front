<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="用户名称">
              <a-input v-model="queryParam.id" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="性别">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">男</a-select-option>
                <a-select-option value="2">女</a-select-option>
                <a-select-option value="3">未知</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">添加</a-button>
      <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="unlock" />启用</a-menu-item>
          <a-menu-item key="2"><a-icon type="lock" />禁用</a-menu-item>
          <a-menu-item key="3"><a-icon type="delete" />删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>
    <s-table
      ref="table"
      size="default"
      :loading="loading"
      :rowKey="(record) => record.userId"
      :columns="columns"
      :data="loadData"
      :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    ></s-table>
  </a-card>
</template>

<script>
import { getUserList } from '@/api/user'
import { STable } from '@/components'

export default {
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
        return this.getUsers(parameter)
      }
    }
  },
  methods: {
    getUsers (parameter) {
      return getUserList(Object.assign(parameter, this.queryParam)).then(res => {
        return res
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }
  }
}

const columns = [
  {
    title: '用户名称',
    dataIndex: 'userName',
    align: 'center'
  },
  {
    title: '姓名',
    dataIndex: 'realName',
    align: 'center'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center'
  },
  {
    title: '证件号码',
    dataIndex: 'idCard',
    align: 'center'
  },
  {
    title: '组织机构',
    align: 'center',
    children: [
      {
        title: '机构编号',
        align: 'center',
        dataIndex: 'org.orgNo'
      },
      {
        title: '机构名称',
        align: 'center',
        dataIndex: 'org.orgName'
      }
    ]
  },
  {
    title: '联系方式',
    align: 'center',
    children: [
      {
        title: '手机',
        align: 'center',
        dataIndex: 'phone'
      },
      {
        title: '邮箱',
        align: 'center',
        dataIndex: 'email'
      }
    ]
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: 'center',
    sorter: true
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
