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
              <a-select v-model="queryParam.menuType" placeholder="请选择菜单类型">
                <a-select-option
                  v-for="item in menuType"
                  :key="item.dictValue"
                >{{ item.dictName }}</a-select-option>
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
    <div class="table-operator">
      <a-button type="primary" icon="plus">添加</a-button>
    </div>
    <a-table :rowKey="rowKey" :columns="columns" :dataSource="menus" />
  </a-card>
</template>

<script>
import { getMenuListTree } from '@/api/menu'
import { getDictDataListByType } from '@/api/dict'

export default {
  data () {
    return {
      description: '使用场景：菜单管理维护了系统内的页面菜单和功能菜单，您可以在这里查看菜单资源，但建议您不要修改或删除它们，这可能导致访问异常或资源丢失。',
      menus: [],
      columns,
      rowKey: 'menuId',
      queryParam: {
      },
      menuType: []
    }
  },
  created () {
    getDictDataListByType({ dictType: 'menu_type' }).then(res => {
      this.menuType = res.data
    })
    this.getMenuList()
  },
  methods: {
    getMenuList () {
      getMenuListTree().then((res) => {
        this.menus = res.data
      })
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
