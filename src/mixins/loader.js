import axios from 'axios'

const interfaces = {
    register: '/api/register',
    passwordChange: '/api/password_change',
    login: '/api/login',
    // 员工
    getStaffList: '/api/get_staff',
    addStaff: '/api/add_staff',
    updateStaff: '/api/update_staff',
    deleteStaff: '/api/delete_staff',
    // 产品
    getGoodsList: '/api/get_goods',
    addGoods: '/api/add_goods',
    updateGoods: '/api/update_goods',
    deleteGoods: '/api/delete_goods',
    // 用户
    getUserList: '/api/get_user',
    addUserList: '/api/add_user',
    updateUser: '/api/update_user',
    deleteUser: '/api/delete_user',
    // 卡类
    getCardList: '/api/get_card',
    addCard: '/api/add_card',
    updateCard: '/api/update_card',
    deleteCard:'/api/delete_card',
    // 账单
    getBillList: '/api/get_bill',
    addBill: '/api/add_bill',
    updateBill: '/api/update_bill',
    deleteBill:'/api/delete_bill',
    // 套餐
    getSetMeal: '/api/get_setmeal',
    addSetMeal:'/api/add_setmeal',
    updateSetMeal: '/api/update_setmeal',
    deleteSetMeal: '/api/delete_setmeal',
    // 预约
    getBookList: '/api/get_book',
    addBook: '/api/add_book',
    updateBook: '/api/update_book',
    deleteBook: '/api/delete_book',
    // 库存
    getStore: '/api/get_store',
    addStore: '/api/add_store',
    outStore: '/api/out_store',
    getJoinStore: '/api/get_joinstore',
    getOutStore: '/api/get_outstore',
    // 文档
    getDocument: '/api/get_document',
    addDocument: '/api/add_document',
    updateDocument: '/api/update_document',
    deleteDocument: '/api/delete_document'
}

const loader = {
    methods: {
        get: function(url, params) {
            let keys = params? Object.keys(params) : []
            let vals = params? Object.value(params) : []
            let arr = []
            for(let i = 0; i < keys.length; i++) {
                arr.push(`${keys[i]}=${vals[i]}`)
            }
            url = `${interfaces[url]}?${arr.join('&')}`
            return new Promise((resolve, reject) => {
                axios.get(url).then((res) => {
                    if (res.status < 500) {
                        resolve(res.data)
                    } else {
                        reject('服务器异常，请稍后重试')
                    }
                }).catch((err) => {
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
                        reject('服务器异常，请稍后重试')
                    }
                }).catch((err) => {
                    reject(err)
                })
            })
        }
    }
}
export default loader