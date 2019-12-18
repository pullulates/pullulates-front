<template>
  <a-card :bordered="false">
    <a-row :gutter="24">
      <a-col :col="12">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="24">
              <a-col :md="6" :sm="24">
                <a-form-item label="角色名称">
                  <a-input v-model="queryParam.roleName" placeholder="请填写角色名称" />
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item label="角色状态">
                  <a-select v-model="queryParam.status" placeholder="请选择角色状态">
                    <a-select-option
                      v-for="item in dataStatus"
                      :key="item.dictValue"
                    >{{ item.dictName }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item label="角色标识">
                  <a-input v-model="queryParam.roleKey" placeholder="请填写角色标识" />
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <span class="table-page-search-submitButtons" >
                  <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="table-operator">
          <a-button type="primary" icon="plus" @click="handleAdd()">添加</a-button>
        </div>
        <s-table
          ref="table"
          size="default"
          :loading="loading"
          :rowKey="(record) => record.roleId"
          :columns="columns"
          :data="loadData"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        >
          <span slot="status" slot-scope="text, record">
            <a-switch checkedChildren="启用" unCheckedChildren="禁用" :checked="text === '1'" @click="confirmChangeStatus(record)" />
          </span>
          <span slot="yesOrNo" slot-scope="yesOrNo">
            <a-tag :color="getDictCss(yesOrNos, yesOrNo)">
              {{ getDictOption(yesOrNos, yesOrNo) }}
            </a-tag>
          </span>
        </s-table>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getRoleList } from '@/api/role'
import { getDictDataListByType } from '@/api/dict'

export default {
  name: 'Role',
  components: {
    STable
  },
  data () {
    return {
      description: '使用场景：角色管理管理了系统内部所有用户的菜单权限和数据权限，您可以在这里维护权限信息以达到控制系统资源的目的。',
      loading: true,
      queryParam: {
      },
      selectedRowKeys: [],
      selectedRows: [],
      columns,
      loadData: parameter => {
        return this.getList(parameter)
      },

      dataStatus: [],
      yesOrNos: []
    }
  },
  created () {
    getDictDataListByType({ dictType: 'data_status' }).then(res => {
      this.dataStatus = res.data
    })
    getDictDataListByType({ dictType: 'yes_or_no' }).then(res => {
      this.yesOrNos = res.data
    })
  },
  methods: {
    getList (parameter) {
      return getRoleList(Object.assign(parameter, this.queryParam)).then(res => {
        return res
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
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
    title: '角色名称',
    dataIndex: 'roleName',
    align: 'center'
  },
  {
    title: '角色标识',
    dataIndex: 'roleKey',
    align: 'center'
  },
  {
    title: '角色状态',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '角色权限',
    align: 'center',
    children: [
      {
        title: '是否拥有全部菜单权限',
        align: 'center',
        dataIndex: 'hasAllMenu',
        scopedSlots: { customRender: 'yesOrNo' }
      },
      {
        title: '是否拥有全部数据权限',
        align: 'center',
        dataIndex: 'hasAllData',
        scopedSlots: { customRender: 'yesOrNo' }
      }
    ]
  },
  {
    title: '角色描述',
    dataIndex: 'desct',
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
    dataIndex: 'action',
    width: '150px',
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
</script>
