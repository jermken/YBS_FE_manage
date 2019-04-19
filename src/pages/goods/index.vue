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
        <div class="pagination-wrapper" v-if="total">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="queryInfo.pageSize"
                :current-page="queryInfo.page"
                @current-change="pageChangeEvent">
            </el-pagination>
        </div>
        <goods-info-dialog ref="goodsInfo" @closed="closeGoodsInfoDialog"></goods-info-dialog>
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
                status: 1,
                page: 1,
                pageSize: 8
            },
            total: 0,
            goodsList: []
        }
    },
    computed: {
        ...mapGetters(['globalSize'])
    },
    methods: {
        async fetchData() {
            this.get('getGoodsList', this.queryInfo).then((res) => {
                if (!res.code) {
                    this.goodsList = res.data
                    this.total = res.total
                }
            })
        },
        queryData() {
            this.queryInfo.page = 1
            this.fetchData()
        },
        addGoods() {
            this.$refs.goodsInfo.open()
        },
        deleteGoods(e, id) {
            e.stopPropagation()
            MessageBox.confirm('确认删除该产品', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.post('deleteGoods', { id }).then(res => {
                    if (!res.code) {
                        MessageBox({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.queryData()
                    } else {
                        MessageBox({
                            type: 'error',
                            message: '删除失败'
                        })
                    }
                })
            }).catch(() => {
            })
        },
        pageChangeEvent(val) {
            this.queryInfo.page = val
            this.fetchData()
        },
        showGoodsInfoDialog(id) {
            this.$refs.goodsInfo.open(id)
        },
        closeGoodsInfoDialog(isUpdate) {
            isUpdate && this.fetchData()
        }
    },
    mounted() {
        this.fetchData()
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