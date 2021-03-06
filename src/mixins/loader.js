import axios from 'axios'

const interfaces = {
    register: '/api/register',
    passwordChange: '/api/password_change',
    login: '/api/login',
    loginOut: '/api/out_login',
    // 员工
    getStaffList: '/api/get_staff',
    addStaff: '/api/add_staff',
    updateStaff: '/api/update_staff',
    deleteStaff: '/api/delete_staff',
    getStaffDetail: '/api/get_staff_detail',
    // 产品
    getGoodsList: '/api/get_goods',
    addGoods: '/api/add_goods',
    updateGoods: '/api/update_goods',
    deleteGoods: '/api/delete_goods',
    getGoodsDetail: '/api/get_goods_detail',
    // 用户
    getUserList: '/api/get_user',
    addUserList: '/api/add_user',
    updateUser: '/api/update_user',
    deleteUser: '/api/delete_user',
    getUserDetail: '/api/get_user_detail',
    // 卡类
    getCardList: '/api/get_card',
    getCardDetail: '/api/get_card_detail',
    addCard: '/api/add_card',
    updateCard: '/api/update_card',
    deleteCard:'/api/delete_card',
    addUserToCard: '/api/add_userto_card',
    deleteUserFromCard: '/api/delete_userfrom_card',
    addCardSaleList: '/api/add_cardsale_list',
    queryCardSaleList: '/api/get_cardsale_list',
    // 账单
    getBillList: '/api/get_bill',
    getBillDetail: '/api/get_bill_detail',
    addBill: '/api/add_bill',
    updateBill: '/api/update_bill',
    deleteBill:'/api/delete_bill',
    auditorBill: '/api/auditor_bill',
    // 套餐
    getSetMeal: '/api/get_setmeal',
    getSetMealDetail: '/api/get_setmeal_detail',
    addSetMeal:'/api/add_setmeal',
    updateSetMeal: '/api/update_setmeal',
    deleteSetMeal: '/api/delete_setmeal',
    getSetmealSaleList: '/api/get_setmeal_salelist',
    addSetmealSaleList: '/api/add_setmeal_salelist',
    updateSetmealSaleList: '/api/update_setmeal_salelist',
    // 预约
    getBookList: '/api/get_book',
    addBook: '/api/add_book',
    updateBook: '/api/update_book',
    deleteBook: '/api/delete_book',
    // 库存
    getGoodsStore: '/api/get_goodsstore',
    getStore: '/api/get_store',
    createStore: '/api/create_store',
    deleteStore: '/api/delete_store',
    updateStore: '/api/update_store',
    storeDetail: '/api/store_detail',
    // 文档
    getDocument: '/api/get_document',
    addDocument: '/api/add_document',
    updateDocument: '/api/update_document',
    deleteDocument: '/api/delete_document',
    // 上传凭证接口
    getUploadToken: '/api/get_upload_token'
}

const loader = {
    methods: {
        get: function(url, params) {
            let arr = []
            params = params || {}
            for (let i in params) {
                arr.push(`${i}=${params[i]}`)
            }
            arr.push(`timestamp=${+new Date()}`)
            url = `${interfaces[url]}?${arr.join('&')}`
            return new Promise((resolve, reject) => {
                axios.get(url).then((res) => {
                    if (res.status < 500) {
                        resolve(res.data)
                    } else {
                        this.$message({
                            type: 'error',
                            message: '服务器异常，请稍后重试'
                        })
                        reject('服务器异常，请稍后重试')
                    }
                }).catch((err) => {
                    this.$message({
                        type: 'error',
                        message: err
                    })
                    reject(err)
                })
            })
        },
        post: function(url, params) {
            return new Promise((resolve, reject) => {
                axios.post(interfaces[url], params).then((res) => {
                    if (res.status < 500) {
                        resolve(res.data)
                    } else {
                        this.$message({
                            type: 'error',
                            message: '服务器异常，请稍后重试'
                        })
                        reject('服务器异常，请稍后重试')
                    }
                }).catch((err) => {
                    this.$message({
                        type: 'error',
                        message: err
                    })
                    reject(err)
                })
            })
        }
    }
}
export default loader