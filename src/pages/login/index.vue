<template>
    <div class="login-bg">
        <div class="login-content" v-if="tab === 'register'">
            <p class="login-title">注册</p>
            <el-form :model="registerFormInfo" :rules="registerRule" ref="registerForm">
                <el-form-item required label="用户名" label-width="70px" prop="name">
                    <el-input v-model="registerFormInfo.name" size="small" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item required label="密码" label-width="70px" prop="password">
                    <el-input v-model="registerFormInfo.password" size="small" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item required label="确认密码" label-width="70px" prop="repassword">
                    <el-input v-model="registerFormInfo.repassword" size="small" type="password" placeholder="请再次输入密码"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-bottom">
                <router-link class="to-login-link" to="/login">已有账号，去登陆？</router-link>
                <el-button type="primary" @click="register">注册</el-button>
            </div>
        </div>
        <div class="login-content" v-else-if="tab === 'change'">
            <p class="login-title">修改密码</p>
            <el-form :model="changeFormInfo" :rules="changeRule" ref="changeForm">
                <el-form-item required label="用户名" label-width="70px" prop="name">
                    <el-input v-model="changeFormInfo.name" size="small" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item required label="原密码" label-width="70px" prop="oldpassword">
                    <el-input v-model="changeFormInfo.oldpassword" size="small" type="password" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item required label="新密码" label-width="70px" prop="newpassword">
                    <el-input v-model="changeFormInfo.newpassword" size="small" type="password" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item required label="新密码" label-width="70px" prop="renewpassword">
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
            <el-form :model="loginFormInfo" :rules="loginRule" ref="loginForm">
                <el-form-item required label="用户名" label-width="70px" prop="name">
                    <el-input v-model="loginFormInfo.name" size="small" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item required label="密码" label-width="70px" prop="password">
                    <el-input v-model="loginFormInfo.password" size="small" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-bottom">
                <router-link class="to-login-link" to="/login?tab=register">没有账号，去注册？</router-link>
                <el-button type="primary" @click="login">登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import loader from '@/mixins/loader'
import md5 from 'js-md5'

export default {
    name: 'Login',
    mixins: [loader],
    data() {
        let { tab } = this.$route.query
        return {
            tab,
            registerFormInfo: {
                name: '',
                password: '',
                repassword: ''
            },
            registerRule: {
                name: [{
                    required: true,
                    message: '用户名不能为空',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur'
                }],
                repassword: [{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur'
                }]
            },
            changeFormInfo: {
                name: '',
                oldpassword: '',
                newpassword: '',
                renewpassword: ''
            },
            changeRule: {
                name: [{
                    required: true,
                    message: '用户名不能为空',
                    trigger: 'blur'
                }],
                oldpassword: [{
                    required: true,
                    message: '原密码必填',
                    trigger: 'blur'
                }],
                newpassword: [{
                    required: true,
                    message: '新密码不能为空',
                    trigger: 'blur'
                }],
                renewpassword: [{
                    required: true,
                    message: '新密码不能为空',
                    trigger: 'blur'
                }]
            },
            loginFormInfo: {
                name: '',
                password: ''
            },
            loginRule: {
                name: [{
                    required: true,
                    message: '用户名不能为空',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur'
                }]
            }
        }
    },
    watch: {
        $route: function(obj) {
            this.tab = obj.query.tab
        }
    },
    methods: {
        register() {
            let $form = this.$refs.registerForm
            $form.validate((valid) => {
                if (valid) {
                    console.log(valid)
                    this.post('register', {
                        name: this.registerFormInfo.name,
                        password: md5(this.registerFormInfo.password),
                        repassword: md5(this.registerFormInfo.repassword)
                    }).then((res) => {
                        console.log(res)
                        if (!res.code) {
                            this.$success('注册成功').then(() => {
                                $form.resetFields()
                                this.$route.push('/login')
                            })
                        } else {
                            this.$message(res.msg)
                        }
                    }).catch((err) => {
                        this.$message(err)
                    })
                } else {
                    return false
                }
            })
        },
        passwordChange() {
            let $form = this.$refs.changeForm
            $form.validate((valid) => {
                if (valid) {
                    console.log(valid)
                    this.post('passwordChange', {
                        name: this.changeFormInfo.name,
                        oldpassword: md5(this.changeFormInfo.oldpassword),
                        newpassword: md5(this.changeFormInfo.newpassword),
                        renewpassword: md5(this.changeFormInfo.renewpassword)
                    }).then((res) => {
                        console.log(res)
                        if (!res.code) {
                            this.$message('密码修改成功').then(() => {
                                $form.resetFields()
                                this.$route.push('/login')
                            })
                        } else {
                            this.$message(res.msg)
                        }
                    }).catch((err) => {
                        this.$message(err)
                    })
                } else {
                    return false
                }
            })
        },
        login() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    console.log(valid)
                    this.post('login', {
                        name: this.loginFormInfo.name,
                        password: md5(this.loginFormInfo.password)
                    }).then((res) => {
                        console.log(res)
                        if (!res.code) {
                            this.$route.push('/payment')
                        } else {
                            this.$message(res.msg)
                        }
                    }).catch((err) => {
                        this.$message(err)
                    })
                } else {
                    return false
                }
            })
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
    }
}
</style>