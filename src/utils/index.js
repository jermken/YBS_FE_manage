export default {
    // 判断是否为空
    isNull(str) {
        str = str.toString().replace(/(^\s*)|(\s*$)/g, '')
        return !str.length
    },
    // 判断价格格式 最多带有两位小数的正实数
    isValidatePrice(str) {
        str = str.toString()
        let str1 = str.replace('.', '')
        if (!str || !/\d{1,}/.test(str1) || !/^[0-9]+(.[0-9]{0,2})?$/.test(str)) {
            return false
        }
        return true
    },
    // 判断手机号格式
    isValidateTell(str) {
        let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
        return reg.test(str)
    },
    // 判断是否是正整数
    isInt(str) {
        return /^\d+$/.test(str)
    },
    // 判断用户名的合法性
    isValidateName(str) {
        return /^[a-zA-Z0-9]{3,16}$/.test(str)
    },
    // 判断密码的合法性
    isValidatePassword(str) {
        return /^[a-zA-Z0-9]{6,16}$/.test(str)
    }
}