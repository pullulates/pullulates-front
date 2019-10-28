<template>
  <a-table :columns="columns" :dataSource="data" :rowSelection="rowSelection" />
</template>

<script>
import { getMenuTree } from '@/api/menu'

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    key: 'menuName'
  },
  {
    title: '菜单标识',
    dataIndex: 'menuKey',
    key: 'menuKey'
  },
  {
    title: '权限标识',
    dataIndex: 'perm',
    key: 'perm'
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    key: 'menuType'
  },
  {
    title: '菜单路径',
    dataIndex: 'url',
    key: 'url'
  },
  {
    title: '是否显示',
    dataIndex: 'isShow',
    key: 'isShow'
  },
  {
    title: '菜单布局',
    dataIndex: 'menuLayout',
    key: 'menuLayout'
  }
]

const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park'
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park'
          }
        ]
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park'
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park'
  }
]

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows)
  }
}
</script>
