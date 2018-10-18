<template>
    <div class="login-bg">
        <div class="login-content" v-if="tab === 'register'">
            <p class="login-title">注册</p>
            <el-form :model="registerFormInfo" ref="registerForm">
                <el-form-item :error="validReg.name" required label="用户名" label-width="80px" prop="name">
                    <el-input v-model="registerFormInfo.name" size="small" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item :error="validReg.password" required label="密码" label-width="80px" prop="password">
                    <el-input v-model="registerFormInfo.password" size="small" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item :error="validReg.repassword" required label="确认密码" label-width="80px" prop="repassword">
                    <el-input v-model="registerFormInfo.repassword" size="small" type="password" placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <el-form-item :error="validReg.icode" required label="推荐码" label-width="80px" prop="icode">
                    <el-input v-model="registerFormInfo.icode" size="small" type="password" placeholder="请输入推荐码"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-bottom">
                <router-link class="to-login-link" to="/login">已有账号，去登陆？</router-link>
                <el-button type="primary" @click="register">注册</el-button>
            </div>
        </div>
        <div class="login-content" v-else-if="tab === 'change'">
            <p class="login-title">修改密码</p>
            <el-form :model="changeFormInfo" ref="changeForm">
                <el-form-item :error="validChange.name" required label="用户名" label-width="80px" prop="name">
                    <el-input v-model="changeFormInfo.name" size="small" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item :error="validChange.oldpassword" required label="原密码" label-width="80px" prop="oldpassword">
                    <el-input v-model="changeFormInfo.oldpassword" size="small" type="password" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item :error="validChange.newpassword" required label="新密码" label-width="80px" prop="newpassword">
                    <el-input v-model="changeFormInfo.newpassword" size="small" type="password" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item :error="validChange.renewpassword" required label="新密码" label-width="80px" prop="renewpassword">
                    <el-input v-model="changeFormInfo.renewpassword" size="small" type="password" placeholder="请再次输入新密码"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-bottom">
                <router-link class="to-login-link" to="/login">放弃修改，去登陆？</router-link>
                <el-button type="primary" @click="passwordChange">修改密码</el-button>
            </div>
        </div>
        <div class="login-content" v-else>
            <p class="login-title">登录</p>
            <el-form :model="loginFormInfo" ref="loginForm">
                <el-form-item :error="validLogin.name" required label="用户名" label-width="80px" prop="name">
                    <el-input v-model="loginFormInfo.name" size="small" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item :error="validLogin.password" required label="密码" label-width="80px" prop="password">
                    <el-input v-model="loginFormInfo.password" size="small" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-bottom">
                <router-link class="to-login-link" to="/login?tab=register">没有账号，去注册？</router-link>
                <el-button type="primary" @click="login">登录</el-button>
            </div>
            <div style="text-align: center;">
                <el-checkbox label="保存密码" v-model="isSave"></el-checkbox>
            </div>
        </div>
    </div>
</template>
<script>
import loader from '@/mixins/loader'
import md5 from 'js-md5'
import moment from 'moment'
import utils from '@/utils/index'

export default {
    name: 'Login',
    mixins: [loader],
    data() {
        let { tab } = this.$route.query
        let isSave = localStorage.getItem('savePassword') ? true : false
        let name
        let password
        if (isSave) {
            name = localStorage.getItem('sys_user_info')? JSON.parse(localStorage.getItem('sys_user_info')).name : ''
            password = localStorage.getItem('sys_user_info')? JSON.parse(localStorage.getItem('sys_user_info')).password : ''
        } else {
            name = ''
            password = ''
        }
        return {
            tab,
            isSave,
            registerFormInfo: {
                name: '',
                password: '',
                repassword: '',
                icode: ''
            },
            validReg: {
                name: '',
                password: '',
                repassword: '',
                icode: ''
            },
            changeFormInfo: {
                name: '',
                oldpassword: '',
                newpassword: '',
                renewpassword: ''
            },
            validChange: {
                name: '',
                oldpassword: '',
                newpassword: '',
                renewpassword: ''
            },
            loginFormInfo: {
                name,
                password
            },
            validLogin: {
                name: '',
                password: ''
            }
        }
    },
    watch: {
        $route: function(obj) {
            this.tab = obj.query.tab
            this.validReg = {
                name: '',
                password: '',
                repassword: '',
                icode: ''
            }
            this.validChange = {
                name: '',
                oldpassword: '',
                newpassword: '',
                renewpassword: ''
            }
            this.validLogin = {
                name: '',
                password: ''
            }
        }
    },
    methods: {
        register() {
            let $form = this.$refs.registerForm
            let isValidate = true
            if (utils.isValidateName(this.registerFormInfo.name)) {
                this.validReg.name = ''
            } else {
                this.validReg.name = '由数字字母下划线组成，长度为3-16'
            }
            if (utils.isValidatePassword(this.registerFormInfo.password)) {
                this.validReg.password = ''
            } else {
                this.validReg.password = '由数字字母下划线组成，长度为6-16'
            }
            if (!utils.isValidatePassword(this.registerFormInfo.repassword)) {
                this.validReg.repassword = '由数字字母下划线组成，长度为6-16'
            } else if (this.registerFormInfo.password !== this.registerFormInfo.repassword){
                this.validReg.repassword = '两次密码不一致'
            } else {
                this.validReg.repassword = ''
            }
            if (utils.isNull(this.registerFormInfo.icode)) {
                this.validReg.icode = '邀请码为必填项'
            } else {
                this.validReg.icode = ''
            }
            for (let i in this.validReg) {
                if(this.validReg[i]) {
                    isValidate = false
                    break
                }
            }
            if (isValidate) {
                let now = moment().format('YYYY-MM-DD HH:mm:ss')
                this.post('register', {
                    name: this.registerFormInfo.name,
                    password: md5(this.registerFormInfo.password),
                    repassword: md5(this.registerFormInfo.repassword),
                    create_time: now,
                    update_time: now,
                    icode: this.registerFormInfo.icode
                }).then((res) => {
                    if (!res.code) {
                        this.$message({
                            message: '注册成功',
                            type: 'success'
                        })
                        $form.resetFields()
                        this.$router.push('/login')
                    } else {
                        this.$msgbox({
                            type: 'error',
                            message: res.msg
                        })
                    }
                })
            }
        },
        passwordChange() {
            let $form = this.$refs.changeForm
            let isValidate = true
            if (utils.isNull(this.changeFormInfo.name)) {
                this.validChange.name = '请输入用户名'
            } else {
                this.validChange.name = ''
            }
            if (utils.isNull(this.changeFormInfo.oldpassword)) {
                this.validChange.oldpassword = '原密码必填'
            } else {
                this.validChange.oldpassword = ''
            }
            if (!utils.isValidatePassword(this.changeFormInfo.newpassword)) {
                this.validChange.newpassword = '由数字字母下划线组成，长度为6-16'
            } else {
                this.validChange.newpassword = ''
            }
            if (!utils.isValidatePassword(this.changeFormInfo.renewpassword)) {
                this.validChange.renewpassword = '由数字字母下划线组成，长度为6-16'
            } else if (this.changeFormInfo.newpassword !== this.changeFormInfo.renewpassword){
                this.validChange.renewpassword = '两次新密码不一致'
            } else {
                this.validChange.renewpassword = ''
            }
            for (let i in this.validChange) {
                if(this.validChange[i]) {
                    isValidate = false
                    break
                }
            }
            if (isValidate) {
                this.post('passwordChange', {
                    name: this.changeFormInfo.name,
                    oldpassword: md5(this.changeFormInfo.oldpassword),
                    newpassword: md5(this.changeFormInfo.newpassword),
                    renewpassword: md5(this.changeFormInfo.renewpassword),
                    update_time: moment().format('YYYY-MM-DD HH:mm:ss')
                }).then((res) => {
                    if (!res.code) {
                        this.$message({
                            message: '密码修改成功',
                            type: 'success'
                        })
                        $form.resetFields()
                        this.$router.push('/login')
                    } else {
                        this.$msgbox({
                            type: 'error',
                            message: res.msg
                        })
                    }
                })
            }
        },
        login() {
            let isValidate = true
            if (utils.isNull(this.loginFormInfo.name)) {
                this.validLogin.name = '请填写用户名'
            } else {
                this.validLogin.name = ''
            }
            if (utils.isNull(this.loginFormInfo.password)) {
                this.validLogin.password = '密码必填'
            } else {
                this.validLogin.password = ''
            }
            for (let i in this.validLogin) {
                if(this.validLogin[i]) {
                    isValidate = false
                    break
                }
            }
            if (isValidate) {
                this.post('login', {
                    name: this.loginFormInfo.name,
                    password: md5(this.loginFormInfo.password)
                }).then((res) => {
                    if (!res.code) {
                        this.savePassWord()
                        this.$router.push('/payment')
                    } else {
                        this.$msgbox({
                            type: 'error',
                            message: res.msg
                        })
                    }
                })
            }
        },
        savePassWord() {
            if (this.isSave) {
                let obj = {
                    name: this.loginFormInfo.name,
                    password: this.loginFormInfo.password
                }
                localStorage.setItem('sys_user_info', JSON.stringify(obj))
                localStorage.setItem('savePassword', 1)
            } else {
                localStorage.removeItem('sys_user_info')
                localStorage.removeItem('savePassword')
            }
        }
    }
}
 </script>
<style lang="scss">
.login-bg {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-image: url('./img/login_bg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .login-content {
        width: 300px;
        padding: 20px;
        background: #111;
        opacity: 0.8;
        border-radius: 6px;
        color: #fff;
    }
    .login-title {
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .login-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .el-form-item__label {
        color: #fff !important;
    }
    .to-login-link {
        color: rgb(64, 158, 255);
        margin-left: 20px;
    }
}
</style>