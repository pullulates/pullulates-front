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
              <a-button type="primary" @click="this.getMenuList">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" v-action:add @click="handleAdd()">添加</a-button>
    </div>
    <a-table :rowKey="rowKey" :columns="columns" :dataSource="menus">
      <span slot="menuType" slot-scope="text">
        <a-tag :color="getDictCss(menuType, text)">
          {{ getDictOption(menuType, text) }}
        </a-tag>
      </span>
      <span slot="isShow" slot-scope="text">
        <a-tag :color="getDictCss(isShow, text)">
          {{ getDictOption(isShow, text) }}
        </a-tag>
      </span>
      <span slot="operation" slot-scope="text, record">
        <a-button
          v-if="record.parentId != '1'"
          type="primary"
          size="small"
          v-action:edit
          @click="handleEdit(record)"
          ghost>
          <a-icon type="edit"/> 编辑</a-button>
        <a-button
          v-if="record.parentId != '1'"
          v-action:delete
          type="danger"
          size="small"
          @click="confirmDelete(record)"
          style="margin-left: 8px"
          ghost>
          <a-icon type="delete"/> 删除</a-button>
      </span>
    </a-table>
    <add ref="Add" @ok="handleOk"/>
    <edit-menu ref="EditMenu" @ok="handleOk"/>
  </a-card>
</template>

<script>
import { getMenuListTree, deleteMenu } from '@/api/menu'
import { getDictDataListByType } from '@/api/dict'
import Add from './module/Add'
import EditMenu from './module/Edit'

export default {
  components: {
    Add,
    EditMenu
  },
  data () {
    return {
      description: '使用场景：菜单管理维护了系统内的页面菜单和功能菜单，您可以在这里查看菜单资源，但建议您不要修改或删除它们，这可能导致访问异常或资源丢失。',
      menus: [],
      columns,
      rowKey: 'menuId',
      queryParam: {
      },
      menuType: [],
      isShow: []
    }
  },
  created () {
    getDictDataListByType({ dictType: 'menu_type' }).then(res => {
      this.menuType = res.data
    })
    getDictDataListByType({ dictType: 'is_visible' }).then(res => {
      this.isShow = res.data
    })
    this.getMenuList()
  },
  methods: {
    getMenuList () {
      getMenuListTree(this.queryParam).then((res) => {
        this.menus = res.data
      })
    },
    handleAdd () {
      this.$refs.Add.add(this.menuType)
    },
    handleEdit (record) {
      this.$refs.EditMenu.show(record, this.menuType)
    },
    confirmDelete (record) {
      const self = this
      this.$confirm({
        title: '菜单删除属于不可逆操作，请确认是否继续？',
        okText: '继续',
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
      deleteMenu({ menuId: record.menuId }).then(res => {
        this.callback(res)
      })
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
      this.getMenuList()
    },
    callback (res) {
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.getMenuList()
      } else {
        this.$message.warning(res.msg)
      }
      this.destroyAll()
    },
    destroyAll () {
      this.$destroyAll()
    }
  }
}

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'menuName'
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    scopedSlots: { customRender: 'menuType' }
  },
  {
    title: '权限标识',
    dataIndex: 'perm'
  },
  {
    title: '菜单路径',
    dataIndex: 'url'
  },
  {
    title: '菜单布局',
    dataIndex: 'menuLayout'
  },
  {
    title: '是否显示',
    dataIndex: 'isShow',
    scopedSlots: { customRender: 'isShow' }
  },
  {
    title: '操作',
    key: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]

</script>
