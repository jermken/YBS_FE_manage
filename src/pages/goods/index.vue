<template>
    <div class="goods-page">
        <div class="page-form-wrapper no-tab">
            <el-form :inline="true" label-suffix=":" :size="globalSize" :mode="queryInfo">
                <el-form-item label="产品名称">
                    <el-input v-model="queryInfo.name" placeholder="请输入产品名称"></el-input>
                </el-form-item>
                <el-form-item label="编码">
                    <el-input  v-model="queryInfo.code" placeholder="请输入编码"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="queryInfo.status" @change="queryData">
                        <el-radio :label="1">上架产品</el-radio>
                        <el-radio :label="0">下架产品</el-radio>
                        <el-radio :label="2">全部产品</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
                </el-form-item>
                <el-form-item style="float:right;">
                    <el-button @click="addGoods" plain>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-content-wrapper">
            <ul class="goods-list">
                <li class="goods-item" v-for="(item, index) in goodsList" :key="index" @click="showGoodsInfoDialog(item.id)">
                    <img :src="item.imgUrl" class="goods-item__pic"/>
                    <p class="goods-item__price">￥{{item.price}}</p>
                    <p class="goods-item__title" :title="`${item.name} （${item.size}）`">{{item.name}} （{{item.size}}）</p>
                    <p class="goods-item__title">
                        预警线：<span class="goods-item__txt">{{item.minNum}}</span> 
                    </p>
                    <el-button class="goods-delete-btn" @click="(e) => deleteGoods(e, item.id)" plain type="primary" :size="globalSize">删除</el-button>
                </li>
            </ul>
        </div>
        <div class="pagination-wrapper" v-if="goodsList.length">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :pager-count="7"
                :current-page="page"
                @current-change="pageChangeEvent">
            </el-pagination>
        </div>
        <goods-info-dialog :goodsId.sync="goodsId" :show.sync="goodsInfoDialogVisible" @closed="closeGoodsInfoDialog"></goods-info-dialog>
    </div>
</template>
<script>
import { MessageBox } from 'element-ui'
import GoodsInfoDialog from '@/widget/goodsInfo'
import { mapGetters } from 'vuex'
import loader from '@/mixins/loader'

export default {
    name: 'Goods',
    components: {
        GoodsInfoDialog
    },
    mixins: [loader],
    data() {
        return {
            queryInfo: {
                name: '',
                code: '',
                status: 1
            },
            page: 1,
            pageSize: 8,
            total: 0,
            goodsId: null,
            goodsInfoDialogVisible: false,
            goodsList: []
        }
    },
    computed: {
        ...mapGetters(['globalSize'])
    },
    methods: {
        async fetchData(obj) {
            let params = obj || {}
            console.log(params, 8888888)
            // TODO: 拉取产品列表
            this.get('getGoodsList', {
                ...params
            }).then((res) => {
                console.log(res)
                this.goodsList = res.data
                this.total = res.total
            })
        },
        queryData() {
            this.page = 1
            this.fetchData({ ...this.queryInfo, page: 1, pageSize: this.pageSize})
        },
        addGoods() {
            this.goodsInfoDialogVisible = true
        },
        deleteGoods(e, id) {
            console.log(id)
            e.stopPropagation()
            MessageBox.confirm('确认删除该产品', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                // TODO: 删除产品接口
                MessageBox({
                    type: 'success',
                    message: '删除成功'
                })
            }).catch(() => {
            })
        },
        pageChangeEvent(val) {
            this.page = val
            this.fetchData({...this.queryInfo, page: val, pageSize: this.pageSize})
        },
        showGoodsInfoDialog(id) {
            this.goodsId = id
            this.goodsInfoDialogVisible = true
        },
        closeGoodsInfoDialog(isUpdate) {
            this.goodsInfoDialogVisible = false
            isUpdate && this.fetchData()
        }
    },
    mounted() {
        this.fetchData()
        console.log(this)
    }
}
</script>
<style lang="scss">
@import '@/scss/mixin.scss';
.goods-page {
    .goods-list {
        @include clearfix;
        margin-left: -20px;
    }
    .goods-item {
        float: left;
        width: 200px;
        margin: 0 20px 20px;
        box-sizing: border-box;
        background: #fff;
        padding: 10px;
        font-size: 14px;
        border-radius: 8px;
        position: relative;
        cursor: pointer;
        &:hover {
            box-shadow: 0 0 12px #999;
            .goods-delete-btn {
                display: block;
            }
        }
        &__pic{
            width: 120px;
            height: 120px;
            margin: 0 auto 10px;
            display: block;
        }
        &__title {
            color: #999;
            line-height: 24px;
            width: 140px;
            @include text-overflow-ellipsis;
        }
        &__txt {
            color: #666;
        }
        &__price {
            color: #e4393c;
            font-size: 22px;
            font-weight: bold;
        }
        .goods-delete-btn {
            position: absolute;
            bottom: 10px;
            right: 10px;
            display: none;
        }
    }
}
</style>