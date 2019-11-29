
<template>
  <a-modal
    title="用户详细信息"
    :width="960"
    :visible="visible"
    @cancel="handleCancel"
  >
    <a-spin :spinning="spinning">
      <detail-list title="基本信息">
        <detail-list-item term="用户名称">{{ user.userName }}</detail-list-item>
        <detail-list-item term="真实姓名">{{ user.realName }}</detail-list-item>
        <detail-list-item term="证件号码">{{ user.idCard }}</detail-list-item>
        <detail-list-item term="用户性别"><a-tag :color="user.sex === '1' ? 'red' : 'green'">{{ user.sex === '1' ? '男':'女' }}</a-tag></detail-list-item>
        <detail-list-item term="用户状态"><a-tag :color="user.status === '1' ? 'green' : 'red'">{{ user.status === '1' ? '启用':'禁用' }}</a-tag></detail-list-item>
        <detail-list-item term="手机号码">{{ user.phone }}</detail-list-item>
        <detail-list-item term="电子邮箱">{{ user.email }}</detail-list-item>
        <detail-list-item term="创建时间">{{ user.createTime }}</detail-list-item>
        <detail-list-item term="创建人">{{ user.createBy }}</detail-list-item>
        <detail-list-item term="更新时间">{{ user.updateTime }}</detail-list-item>
        <detail-list-item term="更新人">{{ user.updateBy }}</detail-list-item>
        <detail-list-item term="最近签名">{{ user.sign }}</detail-list-item>
      </detail-list>
      <a-divider dashed/>
      <detail-list title="角色信息">
        <detail-list-item term="拥有角色"><a-tag v-for="(item, index) in user.roles" :key="index">{{ item.roleName }}</a-tag></detail-list-item>
        <br><br>
        <detail-list-item term="菜单权限">
          <a-tree
            :treeData="menuTree"
            :autoExpandParent="autoExpandParent"
            @onExpand="onExpand"></a-tree>
        </detail-list-item>
      </detail-list>
      <a-divider dashed/>
      <detail-list title="组织机构信息">
        <detail-list-item term="机构名称">{{ org.orgName }}</detail-list-item>
        <detail-list-item term="机构编号">{{ org.orgNo }}</detail-list-item>
        <detail-list-item term="机构状态"><a-tag :color="org.status === '1' ? 'green' : 'red'">{{ org.status === '1' ? '启用':'禁用' }}</a-tag></detail-list-item>
        <detail-list-item term="排序编号">{{ org.sortNo }}</detail-list-item>
        <detail-list-item term="机构描述">{{ org.desct }}</detail-list-item>
      </detail-list>
    </a-spin>
  </a-modal>
</template>

<script>
import DetailList from '@/components/tools/DetailList'
import { getUserInfo } from '@/api/user'
import { getMenuTree } from '@/api/menu'

const DetailListItem = DetailList.Item

export default {
  name: 'UserDetail',
  components: {
    DetailList,
    DetailListItem
  },
  data () {
    return {
      visible: false,
      spinning: false,
      user: '',
      org: '',
      menuTree: [],
      autoExpandParent: false
    }
  },
  methods: {
    show (record) {
      this.visible = true
      this.spinning = true
      getUserInfo({ userId: record.userId }).then(res => {
        this.user = res.data
        this.org = this.user.org
      })
      getMenuTree().then(res => {
        this.menuTree = res.data
        this.spinning = false
      })
    },
    handleCancel () {
      this.visible = false
    },
    onExpand (expandedKeys) {
    }
  }
}
</script>
