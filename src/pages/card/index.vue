<template>
    <div class="card-page">
        <div class="page-form-wrapper no-tab">
            <el-form :inline="true" label-suffix="：" :size="globalSize" :mode="queryInfo">
                <el-form-item label="卡类名称">
                    <el-input v-model="queryInfo.name" placeholder="请输入卡类名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
                </el-form-item>
                <el-form-item style="float:right;">
                    <el-button @click="addCard" plain>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-content-wrapper">
            <ul class="card-list">
                <li class="card-item" v-for="(item, index) in cardList" :key="index" @click="showCardInfoDialog(item.id)">
                    <img class="card-item__pic" :src="item.imgUrl"/>
                    <div class="card-item__title">{{item.name}}</div>
                    <div class="card-item__desc">充值满&nbsp;&nbsp;&nbsp;
                        <span class="card-item__price">{{item.total}}</span>
                        &nbsp;&nbsp;&nbsp;即送
                        <el-button :size="globalSize" class="card-user-btn" type="text" @click="(e) => showCardUser(e, item.id)">持卡客户&nbsp;> </el-button>
                    </div>
                    <el-button class="card-delete-btn" @click="(e) => deleteCard(e, item.id)" plain type="primary" :size="globalSize">删除</el-button>
                </li>
            </ul>
        </div>
        <div class="pagination-wrapper" v-if="isShowPagination">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="cardList.length"
                :page-size="pageSize"
                :pager-count="7"
                :current-page="page"
                @current-change="pageChangeEvent">
            </el-pagination>
        </div>
        <card-info-dialog :show.sync="cardInfoDialogVisible" :cardId="cardId" @closed="closeCardInfoDialog"/>
        <card-user-dialog :show.sync="cardUserDialogVisible" :cardId="cardId" @closed="closeCardUserDialog"/>
    </div>
</template>
<script>
import { MessageBox } from 'element-ui'
import { mapGetters } from 'vuex'
import cardInfoDialog from '@/widget/cardInfo'
import cardUserDialog from '@/widget/cardUserList'

export default {
    name: 'Card',
    components: {
        cardInfoDialog,
        cardUserDialog
    },
    data() {
        return {
            queryInfo: {
                name: ''
            },
            page: 1,
            pageSize: 8,
            cardList: [{
                id: 1,
                name: '贵宾卡',
                imgUrl: require('@/img/mianmo.png'),
                total: 500
            },{
                id: 2,
                name: '仙女卡',
                imgUrl: require('@/img/mianmo.png'),
                total: 1000
            },{
                id: 3,
                name: '女神卡',
                imgUrl: require('@/img/mianmo.png'),
                total: 2000
            }],
            total: 0,
            cardInfoDialogVisible: false,
            cardId: null,
            cardUserDialogVisible: false
        }
    },
    computed: {
        ...mapGetters(['globalSize']),
        isShowPagination() {
            return this.total > this.pageSize
        }
    },
    methods: {
        async fetchData(obj) {
            let params = obj || {}
            console.log(params, 8888888)
            // TODO: 拉取产品列表
        },
        queryData() {
            this.page = 1
            this.fetchData({ ...this.queryInfo, page: 1, pageSize: this.pageSize})
        },
        addCard() {
            this.cardId = null
            this.cardInfoDialogVisible = true
        },
        deleteCard(e, id) {
            console.log(id)
            e.stopPropagation()
            MessageBox.confirm('确认删除该卡类', '提示', {
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
        showCardUser(e, id) {
            e.stopPropagation()
            this.cardId = id
            this.cardUserDialogVisible = true
        },
        pageChangeEvent(val) {
            this.page = val
            this.fetchData({...this.queryInfo, page: val, pageSize: this.pageSize})
        },
        showCardInfoDialog(id) {
            this.cardId = id
            this.cardInfoDialogVisible = true
        },
        closeCardInfoDialog(isUpdate) {
            this.cardInfoDialogVisible = false
            isUpdate && this.fetchData()
        },
        closeCardUserDialog(isUpdate) {
            this.cardUserDialogVisible = false
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
.card-page {
    .card-list {
        @include clearfix;
        margin-left: -20px;
    }
    .card-item {
        float: left;
        width: 390px;
        height: 220px;
        margin: 0 0px 20px 20px;
        box-sizing: border-box;
        background: #fff;
        font-size: 14px;
        border-radius: 8px;
        position: relative;
        cursor: pointer;
        &:hover {
            box-shadow: 0 0 12px #999;
            .card-delete-btn {
                display: block;
            }
        }
        &__pic{
            width: 100%;
            height: 100%;
            display: block;
        }
        &__title {
            color: darkviolet;
            line-height: 220px;
            text-align: center;
            font-weight: bold;
            font-size: 46px;
            width: 100%;
            position: absolute;
            top: 0;
            @include text-overflow-ellipsis;
        }
        &__desc {
            color: #fff;
            position: absolute;
            width: 100%;
            bottom: 0;
            font-size: 18px;
            padding-left: 20px;
        }
        &__price {
            color: #e4393c;
            font-size: 24px;
            font-style: italic;
            font-weight: bold;
        }
        .card-delete-btn {
            position: absolute;
            bottom: 10px;
            right: 10px;
            display: none;
        }
        .card-user-btn {
            margin-left: 20px;
        }
    }
}
</style>