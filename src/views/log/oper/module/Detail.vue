
<template>
  <a-modal
    title="操作日志详细信息"
    :width="960"
    :visible="visible"
    :footer="null"
    @cancel="handleCancel"
  >
    <a-spin :spinning="spinning">
      <detail-list :col="2">
        <detail-list-item term="日志标题">
          {{ record.title }}  <a-tag :color="getDictCss(operTypes, record.businessType)">{{ getDictOption(operTypes, record.businessType) }}</a-tag>
        </detail-list-item>
        <detail-list-item term="操作时间">
          {{ record.operTime }}
        </detail-list-item>
        <detail-list-item term="请求地址">{{ record.operUrl }}</detail-list-item>
        <detail-list-item term="是否异常">
          <a-tag :color="getDictCss(exceptionStatus, record.status)">{{ getDictOption(exceptionStatus, record.status) }}</a-tag>
        </detail-list-item>
        <detail-list-item term="操作人信息">{{ record.operIp }}/{{ record.operLocation }}/{{ record.operName }}</detail-list-item>
        <detail-list-item term="请求方式">{{ record.requestMethod }}</detail-list-item>
      </detail-list>
      <detail-list :col="1">
        <detail-list-item term="请求方法">{{ record.method }}</detail-list-item>
      </detail-list>
      <detail-list title="请求参数" size="small" :col="1">
        <json-view
          :data="operParam"
          :deep="1">
        </json-view>
      </detail-list>
      <detail-list title="返回信息" size="small" :col="1">
        <json-view
          :data="jsonResult"
          :deep="1">
        </json-view>
      </detail-list>
      <detail-list title="异常消息" size="small" :col="1">
        <pre>{{ record.errorMsg }}</pre>
      </detail-list>
    </a-spin>
  </a-modal>
</template>

<script>
import DetailList from '@/components/tools/DetailList'
import jsonView from 'vue-json-views'

const DetailListItem = DetailList.Item

export default {
  name: 'OperLogDetail',
  components: {
    DetailList,
    DetailListItem,
    jsonView
  },
  data () {
    return {
      visible: false,
      spinning: false,
      record: '',
      operTypes: [],
      exceptionStatus: [],
      operParam: '',
      jsonResult: ''
    }
  },
  created () {
  },
  methods: {
    show (record, operTypes, exceptionStatus) {
      this.visible = true
      this.spinning = true
      this.record = record
      this.operTypes = operTypes
      this.exceptionStatus = exceptionStatus
      this.operParam = JSON.parse(record.operParam)
      this.jsonResult = JSON.parse(record.jsonResult)
      this.spinning = false
    },
    handleCancel () {
      this.visible = false
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
