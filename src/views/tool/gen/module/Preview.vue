<template>
  <a-modal
    :visible="visible"
    :width="1200"
    :bodyStyle="bodyStyle"
    :footer="null"
    :destroyOnClose="true"
    @cancel="handleCancel"
  >
    <a-tabs @change="callback" v-if="codes" tabPosition="left">
      <a-tab-pane :tab="key.substring(key.lastIndexOf('/')+1,key.indexOf('.vm'))" v-for="(value, key) in codes" :key="key"><pre>{{ value }}</pre></a-tab-pane>
    </a-tabs>
  </a-modal>
</template>
<script>
import { previewCodes } from '@/api/gen'
export default {
  name: 'PreviewCode',
  data () {
    return {
      visible: false,
      codes: null,
      bodyStyle: {
        'height': '700px',
        'overflow-y': 'scroll'
      }
    }
  },
  methods: {
    show (tableId) {
      previewCodes({ tableId: tableId }).then(res => {
        this.codes = res.data
      })
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    callback () {
    }
  }
}
</script>
