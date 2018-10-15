import axios from 'axios'

const interfaces = {
    getStaffList: '/api/get_staff',
    addStaff: '/api/add_staff',
    updateStaff: '/api/update_staff',
    deleteStaff: '/api/delete_staff',

    getGoodsList: '/api/get_goods',
    addGoods: '/api/add_goods',
    updateGoods: '/api/update_goods',
    deleteGoods: '/api/delete_goods',

    getCardList: '/api/get_card',
    addCard: '/api/add_card',
    updateCard: '/api/update_card',
    deleteCard:'/api/delete_card',

    getBillList: '/api/get_bill',
    addBill: '/api/add_bill',
    updateBill: '/api/update_bill',
    deleteBill:'/api/delete_bill',

    getSetMeal: '/api/get_setmeal',
    addSetMeal:'/api/add_setmeal',
    updateSetMeal: '/api/update_setmeal',
    deleteSetMeal: '/api/delete_setmeal'
}
console.log(interfaces)
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