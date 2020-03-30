
<template>
  <a-modal
    title="用户详细信息"
    :width="960"
    :visible="visible"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-spin :spinning="spinning">
      <detail-list title="基本信息" :col="3">
        <detail-list-item term="用户名称">{{ user.userName }}</detail-list-item>
        <detail-list-item term="真实姓名">{{ user.realName }}</detail-list-item>
        <detail-list-item term="证件号码">{{ user.idCard }}</detail-list-item>
        <detail-list-item term="用户性别"><a-tag :color="getDictCss(sexs, user.sex)">{{ getDictOption(sexs, user.sex) }}</a-tag></detail-list-item>
        <detail-list-item term="用户状态"><a-tag :color="getDictCss(dataStatus, user.status)">{{ getDictOption(dataStatus, user.status) }}</a-tag></detail-list-item>
        <detail-list-item term="手机号码">{{ user.phone }}</detail-list-item>
        <detail-list-item term="电子邮箱">{{ user.email }}</detail-list-item>
        <detail-list-item term="创建时间">{{ user.createTime }}</detail-list-item>
        <detail-list-item term="创建人">{{ user.createBy }}</detail-list-item>
        <detail-list-item term="更新时间">{{ user.updateTime }}</detail-list-item>
        <detail-list-item term="更新人">{{ user.updateBy }}</detail-list-item>
        <detail-list-item term="最近签名">{{ user.sign }}</detail-list-item>
      </detail-list>
      <a-divider dashed/>
      <detail-list title="角色信息" :col="1">
        <detail-list-item term="拥有角色"><a-tag v-for="(item, index) in user.roles" :key="index">{{ item.roleName }}</a-tag></detail-list-item>
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
import { getDictDataListByType } from '@/api/dict'

const DetailListItem = DetailList.Item

export default {
  name: 'Detail',
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
      autoExpandParent: false,
      sexs: [],
      dataStatus: []
    }
  },
  created () {
    getDictDataListByType({ dictType: 'sex' }).then(res => {
      this.sexs = res.data
    })
    getDictDataListByType({ dictType: 'data_status' }).then(res => {
      this.dataStatus = res.data
    })
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
</script>
