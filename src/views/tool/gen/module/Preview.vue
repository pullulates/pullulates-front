<template>
  <a-modal
    :visible="visible"
    :width="1000"
    bodyStyle="height: 700px;overflow-y:scroll;"
    :footer="null"
    destroyOnClose="true"
    @ok="handleOk"
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
      codes: null
    }
  },
  methods: {
    show (tableId) {
      previewCodes({ tableId: tableId }).then(res => {
        this.codes = res.data
      })
      this.visible = true
    },
    handleOk (e) {
      console.log(e)
      this.visible = false
    },
    callback (key) {
      console.log(key)
    }
  }
}
</script>
