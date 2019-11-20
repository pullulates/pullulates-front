<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="24">
          <a-col :md="6" :sm="24">
            <a-form-item label="菜单名称">
              <a-input v-model="queryParam.menuName" placeholder="请填写菜单名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="菜单标识">
              <a-input v-model="queryParam.menuKey" placeholder="请填写菜单标识"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="菜单类型">
              <a-select v-model="queryParam.menuType" placeholder="请选择菜单类型" default-value="">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="1">模块菜单</a-select-option>
                <a-select-option value="2">目录菜单</a-select-option>
                <a-select-option value="3">列表菜单</a-select-option>
                <a-select-option value="4">按钮菜单</a-select-option>
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
      <a-button type="primary" icon="plus">添加</a-button>
    </div>
    <a-table :rowKey="rowKey" :columns="columns" :dataSource="menus" />
  </a-card>
</template>

<script>
import { getMenuListTree } from '@/api/menu'

export default {
  data () {
    return {
      menus: [],
      columns,
      rowKey: 'menuId',
      advanced: false,
      queryParam: {
        menuName: '',
        menuKey: '',
        menuType: ''
      }
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    getMenuList () {
      getMenuListTree().then((res) => {
        this.menus = res.data
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    }
  }
}

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'menuName'
  },
  {
    title: '菜单标识',
    dataIndex: 'menuKey'
  },
  {
    title: '权限标识',
    dataIndex: 'perm'
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType'
  },
  {
    title: '菜单路径',
    dataIndex: 'url'
  },
  {
    title: '是否显示',
    dataIndex: 'isShow'
  },
  {
    title: '菜单布局',
    dataIndex: 'menuLayout'
  }
]

</script>
