<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="36">
          <a-col :md="6" :sm="18">
            <a-form-item label="用户名称">
              <a-input v-model="queryParam.userName" placeholder="请填写用户名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="18">
            <a-form-item label="手机号码">
              <a-input v-model="queryParam.phone" placeholder="请填写手机号码"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="18">
            <a-form-item label="电子邮箱">
              <a-input v-model="queryParam.email" placeholder="请填写电子邮箱"/>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="6" :sm="18">
              <a-form-item label="用户性别">
                <a-select v-model="queryParam.sex" placeholder="请选择性别" default-value="">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="1">男</a-select-option>
                  <a-select-option value="2">女</a-select-option>
                  <a-select-option value="3">未知</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="18">
              <a-form-item label="用户状态">
                <a-select v-model="queryParam.status" placeholder="请选择状态" default-value="">
                  <a-select-option value="">全部</a-select-option>
                  <a-select-option value="1">启用</a-select-option>
                  <a-select-option value="2">禁用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="18">
              <a-form-item label="更新时间">
                <a-range-picker
                  :ranges="{ '今天': [moment(), moment()], '这个月': [moment(), moment().endOf('month')] }"
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
      <a-button type="primary" icon="plus" @click="$refs.AddUser.add()">添加</a-button>
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
    >
      <a slot="detail" slot-scope="text" href="javascript:;" @click="$refs.UserInfo.visible()">{{ text }}</a>
      <span slot="sex" slot-scope="sex">
        <a-tag
          :color="sex==='1' ? 'red' : (sex === '2' ? 'geekblue' : 'green')"
        >
          {{ sex==='1' ? '男' : (sex === '2' ? '女' : '未知') }}
        </a-tag>
      </span>
      <span slot="status" slot-scope="status">
        <a-tag
          :color="status==='1' ? 'green' : 'red'"
        >
          {{ status==='1' ? '启用' : '禁用' }}
        </a-tag>
      </span>
      <span slot="action">
        <a href="javascript:;">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item><a-icon type="unlock" />启用</a-menu-item>
            <a-menu-item><a-icon type="lock" />禁用</a-menu-item>
            <a-menu-item><a-icon type="delete" />删除</a-menu-item>
          </a-menu>
          <a>
            更多 <a-icon type="down" />
          </a>
        </a-dropdown>
      </span>
    </s-table>
    <add-user ref="AddUser" @ok="handleSave"/>
  </a-card>
</template>

<script>
import { getUserList } from '@/api/user'
import { STable } from '@/components'
import moment from 'moment'
import { AddUser, UserDetail } from './modal'

export default {
  components: {
    STable,
    AddUser,
    UserDetail
  },
  data () {
    return {
      loading: true,
      advanced: false,
      queryParam: {
        userName: '',
        sex: ''
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
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    moment,
    handleSave () {
      this.$refs.table.refresh(true)
    }
  }
}

const columns = [
  {
    title: '用户名称',
    dataIndex: 'userName',
    align: 'center',
    scopedSlots: { customRender: 'detail' }
  },
  {
    title: '姓名',
    dataIndex: 'realName',
    align: 'center'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center',
    scopedSlots: { customRender: 'sex' }
  },
  {
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' }
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
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center',
    sorter: true
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
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
