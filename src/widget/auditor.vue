<template>
<el-dialog :visible.sync="dialogShow" :title="config.title" width="500px" :before-close="beforeClose">
    <span slot="footer">
        <el-button @click="cancelEvent" :size="globalSize">取消</el-button>
        <el-button @click="disAgree" :size="globalSize" type="primary">不通过</el-button>
        <el-button @click="agree" :size="globalSize" type="primary">通过</el-button>
    </span>
</el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'AuditorDialog',
    props: {
        config: {
            visible: false,
            title: ''
        }
    },
    computed: {
        ...mapGetters(['globalSize']),
        dialogShow: function() {
            return this.config.visible
        }
    },
    methods: {
        cancelEvent() {
            this.$emit('closed')
        },
        agree() {
            this.$emit('auditor', true)
        },
        disAgree() {
            this.$emit('auditor', false)
        },
        beforeClose() {
            this.$emit('closed')
        }
    }
}
</script>