<template>
  <a-table :rowKey="rowKey" :columns="columns" :dataSource="menus" />
</template>

<script>
import { getMenuListTree } from '@/api/menu'

export default {
  data () {
    return {
      menus: [],
      columns,
      rowKey: 'menuId'
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
