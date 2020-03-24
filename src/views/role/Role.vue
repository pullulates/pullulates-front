<template>
  <a-card :bordered="false">
    <a-row :gutter="24">
      <a-col :md="18">
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
          <a-button type="primary" icon="plus" v-action:add @click="handleAdd()">添加</a-button>
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
          <span slot="action" slot-scope="text, record">
            <a href="javascript:;" v-action:edit @click="handleEdit(record)"><a-icon type="edit"/> 编辑</a>
            <a-dropdown v-action:edit>
              <a-menu slot="overlay">
                <a-menu-item v-action:allocate @click="handleAllocated(record)"><a-icon type="reload" />分配用户</a-menu-item>
                <a-menu-item v-action:delete @click="confirmDelete(record)"><a-icon type="delete" />删除角色</a-menu-item>
              </a-menu>
              <a>
                更多 <a-icon type="down" />
              </a>
            </a-dropdown>
          </span>
        </s-table>
      </a-col>
      <a-col :md="3">
        <div>
          <h3><b>菜单权限：</b></h3>
        </div>
        <a-tree
          checkable
          @expand="menuOnExpand"
          :expandedKeys="menuExpandedKeys"
          :autoExpandParent="menuAutoExpandParent"
          v-model="menuCheckedKeys"
          @select="menuOnSelect"
          :selectedKeys="menuSelectedKeys"
          :treeData="menuTreeData"
        />
      </a-col>
      <a-col :md="3">
        <div>
          <h3><b>数据权限：</b></h3>
        </div>
        <a-tree
          checkable
          @expand="orgOnExpand"
          :expandedKeys="orgExpandedKeys"
          :autoExpandParent="orgAutoExpandParent"
          v-model="orgCheckedKeys"
          @select="orgOnSelect"
          :selectedKeys="orgSelectedKeys"
          :treeData="orgTreeData"
        />
      </a-col>
    </a-row>
    <add ref="Add" @ok="handleSave"/>
    <edit ref="Edit" @ok="handleSave"/>
    <allocated ref="Allocated" @ok="handleSave"/>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { getRolePage, changeRoleStatus, deleteRole, getDataScope } from '@/api/role'
import { getDictDataListByType } from '@/api/dict'
import { getMenuTree, getMenuIdsByRoleId, getAllParentIds } from '@/api/menu'
import { getOrgTree } from '@/api/org'
import Add from './module/Add'
import Edit from './module/Edit'
import Allocated from './module/Allocated'

export default {
  name: 'Role',
  components: {
    STable,
    Add,
    Edit,
    Allocated
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
        return this.getPage(parameter)
      },

      dataStatus: [],
      yesOrNos: [],

      allMenuParentIds: [],
      menuExpandedKeys: [],
      menuCheckedKeys: [],
      menuTreeData: [],
      menuSelectedKeys: [],
      menuAutoExpandParent: false,

      orgTreeData: [],
      orgExpandedKeys: [],
      orgAutoExpandParent: false,
      orgCheckedKeys: [],
      orgSelectedKeys: [],

      form: this.$form.createForm(this)
    }
  },
  created () {
    getDictDataListByType({ dictType: 'data_status' }).then(res => {
      this.dataStatus = res.data
    })
    getDictDataListByType({ dictType: 'yes_or_no' }).then(res => {
      this.yesOrNos = res.data
    })
    getMenuTree().then(res => {
      this.menuTreeData = res.data
      this.menuExpandedKeys = res.data.map(item => item.key)
    })
    getOrgTree().then(res => {
      this.orgTreeData = res.data
      this.orgExpandedKeys = res.data.map(item => item.key)
    })
    getAllParentIds().then(res => {
      this.allMenuParentIds = res.data
    })
  },
  methods: {
    getPage (parameter) {
      return getRolePage(Object.assign(parameter, this.queryParam)).then(res => {
        return res
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      if (this.selectedRowKeys.length === 1) {
        this.loading = true
        getMenuIdsByRoleId({ 'roleId': this.selectedRowKeys[0] }).then(res => {
          this.menuCheckedKeys = res.data.filter(id => !this.allMenuParentIds.includes(id))
        })
        getDataScope({ 'roleId': this.selectedRowKeys[0] }).then(res => {
          this.orgCheckedKeys = res.data
          this.loading = false
        })
      } else {
        this.menuCheckedKeys = []
        this.orgCheckedKeys = []
      }
    },
    getDictOption (datas, param) {
      const result = datas.filter(item => item.dictValue === param)
      return result.length > 0 ? result[0].dictName : '未知'
    },
    getDictCss (datas, param) {
      const result = datas.filter(item => item.dictValue === param)
      return result.length > 0 ? result[0].dictCss : ''
    },
    handleSave () {
      this.$refs.table.refresh(true)
    },
    handleAdd () {
      this.$refs.Add.add(this.menuTreeData, this.orgTreeData, this.yesOrNos, this.dataStatus)
    },
    handleEdit (record) {
      this.$refs.Edit.edit(record, this.menuTreeData, this.orgTreeData, this.yesOrNos, this.dataStatus, this.allMenuParentIds)
    },
    handleAllocated (record) {
      this.$refs.Allocated.allolcated(this.dataStatus, record.roleId)
    },
    confirmChangeStatus (record) {
      const self = this
      this.$confirm({
        title: '确认改变当前角色的状态码?',
        okText: '是的',
        okType: 'danger',
        cancelText: '放弃',
        onOk () {
          self.handleChangeStatus(record)
        },
        onCancel () {
          self.destroyAll()
        }
      })
    },
    handleChangeStatus (record) {
      this.loading = true
      changeRoleStatus({ roleId: record.roleId, status: record.status === '1' ? '2' : '1' }).then(res => {
        if (res.code === 200) {
          record.status = record.status === '1' ? '2' : '1'
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
      this.loading = false
    },
    confirmDelete (record) {
      const self = this
      this.$confirm({
        title: '确认删除当前角色码?',
        okText: '是的',
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
      this.loading = true
      deleteRole({ roleId: record.roleId }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.$refs.table.refresh(true)
        } else {
          this.$message.warning(res.msg)
        }
      })
      this.loading = false
    },
    menuOnExpand (expandedKeys) {
      this.menuExpandedKeys = expandedKeys
    },
    menuOnSelect (selectedKeys, info) {
      this.menuSelectedKeys = selectedKeys
    },
    orgOnExpand (expandedKeys) {
      this.orgExpandedKeys = expandedKeys
    },
    orgOnSelect (selectedKeys, info) {
      this.orgSelectedKeys = selectedKeys
    },
    destroyAll () {
      this.$destroyAll()
    },
    callback (res) {
      if (res.code === 200) {
        this.$message.success(res.msg)
        this.$refs.table.refresh(true)
      } else {
        this.$message.warning(res.msg)
      }
      this.destroyAll()
    },
    handleRoleSelectChange (selectedItems) {
      this.selectedItems = selectedItems
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
        title: '全部菜单权限',
        align: 'center',
        dataIndex: 'hasAllMenu',
        scopedSlots: { customRender: 'yesOrNo' }
      },
      {
        title: '全部数据权限',
        align: 'center',
        dataIndex: 'hasAllData',
        scopedSlots: { customRender: 'yesOrNo' }
      }
    ]
  },
  {
    title: '排序编号',
    dataIndex: 'sortNo',
    align: 'center',
    sorter: true
  },
  {
    title: '角色描述',
    dataIndex: 'remark',
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
