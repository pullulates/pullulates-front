<template>
  <div>
    <a-card style="margin-top: 24px" :bordered="false" title="用户列表">
      <div class="operate">
        <a-button type="primary" icon="plus" @click="$refs.taskForm.add()">添加</a-button>
      </div>
      <a-divider dashed />

      <div slot="extra">
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>

      <a-list size="large" itemLayout="horizontal" :dataSource="data" :pagination="pagination">
        <div slot="footer"><b>总有一天，你要成为像我这样的人</b> — 来自于帅气的超级管理员</div>
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions">编辑</a>
          <a slot="actions">更多</a>
          <a-list-item-meta :description="item.sign">
            <a-tooltip placement="topLeft" title="点击查看详细信息" slot="title">{{ item.userName }} <a-tag v-for="role in item.roles" color="pink" :key="role">{{ role.roleName }}</a-tag></a-tooltip>
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
          <div class="list-content">
            <div class="list-content-item">
              <p>{{ item.realName }}</p>
            </div>
            <div class="list-content-item">
              <p>{{ item.idCard }}</p>
            </div>
            <div class="list-content-item">
              <p>{{ item.sex == 1?'男':'女' }}</p>
            </div>
            <div class="list-content-item">
              <p>{{ item.status == 1?'启用':'禁用' }}</p>
            </div>
            <div class="list-content-item">
              <p>{{ item.phone }}</p>
            </div>
            <div class="list-content-item">
              <p>{{ item.email }}</p>
            </div>
          </div>
        </a-list-item>
      </a-list>

      <task-form ref="taskForm" />
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import TaskForm from '@/views/list/modules/TaskForm'
import { getUserList } from '@/api/user'

export default {
  name: 'StandardList',
  components: {
    HeadInfo,
    TaskForm
  },
  data () {
    return {
      data: [],
      pagination: {
        pageSize: 5
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      getUserList().then(res => {
        this.loading = false
        this.data = res.data
      })
    },
    onLoadMore () {
      this.loadingMore = true
      getUserList().then(res => {
        this.data = this.data.concat(res.data)
      })
      this.loadingMore = false
    }
  }
}
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
