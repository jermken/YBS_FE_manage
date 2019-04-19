export const USER_LIST = [{
    id: 1,
    name: '王小姐',
    date: '2018-07-03 23:23:23',
    sexual: '1',
    isVip: true,
    even_amount: '600.00',
    tell: '13212343212',
    consume_total: '3000.00',
    consume_times: '5',
    card_amount: '200.00',
    present_amount: '100.00',
    last_consume: '2018-09-23 18:23:21',
    no_pay: '0',
    points: '0',
    desc: '这是备注'
}, {
    id: 2,
    name: '刘小姐',
    date: '2018-07-03 23:23:23',
    sexual: '1',
    isVip: false,
    even_amount: '100.00',
    tell: '13212343212',
    consume_total: '3000.00',
    consume_times: '30',
    card_amount: '0',
    present_amount: '0',
    last_consume: '2018-09-23 18:23:21',
    no_pay: '0',
    points: '0',
    desc: '这是备注'
}]

export const STAFF_LIST = [{
    name: '小婕',
    sexual: '1',
    birthday: '1993-09-08',
    role: 'staff',
    tell: '13212345678',
    id: 1
}, {
    name: '小琴',
    sexual: '1',
    birthday: '1993-09-03',
    role: 'manager',
    tell: '13987634672',
    id: 2
}, {
    name: '小婷',
    sexual: '1',
    birthday: '1993-02-03',
    role: 'boss',
    tell: '13532345643',
    id: 3
}]

export const PORJECT_LIST = [{
    id: 1,
    name: '美甲'
}]

export const GOODS_LIST = [{
    id: 1,
    name: '面膜',
    imgUrl: require('@/img/mianmo.png'),
    price: '200.00',
    size: '10片/盒',
    minNum: 5
}]

export const CARD_LIST = [{
    id: 1,
    name: '贵宾卡',
    imgUrl: require('@/img/mianmo.png'),
    total: 500
}, {
    id: 2,
    name: '仙女卡',
    imgUrl: require('@/img/mianmo.png'),
    total: 1000
}, {
    id: 3,
    name: '女神卡',
    imgUrl: require('@/img/mianmo.png'),
    total: 2000
}]

export const SETMEAL_LIST = [{
    id: 1,
    name: '国庆活动套卡',
    total: 200,
    date: '2018-09-01,2018-12-30',
    sub_project: '美甲，洗脸,化妆',
    sub_times: '1,1,1'
}]

export const users = [{
    name: 'name1',
    id: 1,
    role: 'vip',
    balance: 10,
    sendMoney: 10,
    grender: 1,
    tell: 'xx',
    cardList: [1]
}]

export const cardList = [{
    id: 1,
    name: 'c1',
    project: [{
        name: 'p1',
        times: 5
    }],
    userList: [1, 2, 3]
}]

export const setmeal = [{
    id: 1,
    name: '名称',
    create_time: '',
    update_time: '',
    project: [{
        name: 'p1',
        times: 5,
        consume_times: 3
    }]
}]

// export const billList = [{
//     id: 1,
//     name: '',
//     user_type: 1,
//     user_id: 1,
//     server_id: 1,
//     create_time: 0,
//     update_time: 0,
//     project: [{name: '', type: 'setmeal', info:{id: 1, name: '美甲',num: 1}, tc: 1, price: 0, ratio:[{server_id: 1, price: 100}]}],
//     total: 100,
//     card_minu: 0,
//     pay_amount: 100,
//     no_pay: 0,
//     pay_type_detail: [{type: 'WECHAT', num: 100},
//     {type: 'ALPAY', num: 0},
//     {type: 'CASH', num: 0},
//     {type: 'BANK_CARD', num: 0},
//     {type: 'BALANCE', num: 0}],
//     status: 1,
//     remark: ''
// }]
export const setmealConsumeList = [{
    id: 1,
    user_id: 1,
    user_name: '',
    setmeal_id: 1,
    setmeal_name: '',
    project:[{
        name: 'p1',
        times: 5,
        consume_times: 3
    }]
}]

export const billList = [{
    id: 1,
    name: 'username',
    date: '2019-09-09',
    total: '应收金额',
    pay_amount: '实收金额',
    no_pay: '未付金额',
    pay_type: '付款方式',
    card_minu: '扣卡金额',
    remark: '备注',
    status: '结清',
    project: '[{name: "产品",params: "price:12"},{name: "小气泡",params: "{price:0}"}]'
}]