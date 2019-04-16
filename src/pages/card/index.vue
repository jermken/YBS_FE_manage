<template>
    <div class="card-page">
        <div class="page-form-wrapper no-tab">
            <el-form :inline="true" label-suffix="：" :size="globalSize" :mode="queryInfo">
                <el-form-item label="卡类名称">
                    <el-input v-model="queryInfo.name" placeholder="请输入卡类名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="queryData">搜索</el-button>
                    <el-button class="clear-query-btn" @click="clearQuery">清除</el-button>
                </el-form-item>
                <el-form-item style="float:right;">
                    <el-button @click="addCard" plain>新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="page-content-wrapper">
            <ul class="card-list">
                <li class="card-item" v-for="(item, index) in cardList" :key="index" @click="showCardInfoDialog(item.id)">
                    <img class="card-item__pic" src='../../img/mianmo.png'/>
                    <div class="card-item__title">{{item.name}}</div>
                    <div class="card-item__desc">充值满&nbsp;&nbsp;&nbsp;
                        <span class="card-item__price">{{item.price}}</span>
                        &nbsp;&nbsp;&nbsp;即送
                        <span class="card-item__price">{{item.present_price}}</span>
                        <el-button :size="globalSize" class="card-user-btn" type="text" @click="(e) => showCardUser(e, item.id)">持卡客户&nbsp;> </el-button>
                    </div>
                    <el-button class="card-delete-btn" @click="(e) => deleteCard(e, item.id)" plain type="primary" :size="globalSize">删除</el-button>
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
        <card-info-dialog ref="cardInfoDialog" @closed="closeCardInfoDialog"/>
        <!-- <card-user-dialog :show.sync="cardUserDialogVisible" :cardId="cardId" @closed="closeCardUserDialog"/> -->
    </div>
</template>
<script>
import { MessageBox } from 'element-ui'
import { mapGetters } from 'vuex'
import loader from '@/mixins/loader'
import cardInfoDialog from '@/widget/cardInfo'
import cardUserDialog from '@/widget/cardUserList'

export default {
    name: 'Card',
    components: {
        cardInfoDialog,
        cardUserDialog
    },
    mixins: [loader],
    data() {
        return {
            queryInfo: {
                name: '',
                page: 1,
                pageSize: 10
            },
            cardList: [],
            total: 0
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
            this.get('getCardList',params).then(res => {
                if (!res.code) {
                    this.cardList = res.data
                    this.total = res.total
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    })
                }
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: err
                })
            })
        },
        queryData() {
            this.page = 1
            this.fetchData(this.queryInfo)
        },
        clearQuery() {
            this.queryInfo.name = ''
            this.queryData()
        },
        addCard() {
            this.$refs.cardInfoDialog.open()
        },
        deleteCard(e, id) {
            e.stopPropagation()
            MessageBox.confirm('确认删除该卡类', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.post('deleteCard', { id }).then(res => {
                    if (!res.code) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                        this.queryData()
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }
                })
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: err
                })
            })
        },
        showCardUser(e, id) {
            e.stopPropagation()
            this.$refs.cardInfoDialog.open(id)
        },
        pageChangeEvent(val) {
            this.queryInfo.page = val
            this.fetchData(this.queryInfo)
        },
        showCardInfoDialog(id) {
            this.$refs.cardInfoDialog.open(id)
        },
        closeCardInfoDialog(isUpdate) {
            isUpdate && this.fetchData()
        },
        closeCardUserDialog(isUpdate) {
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
    .clear-query-btn {
        margin-left: 20px;
    }
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