<template>
    <div class="login-bg">
        <div class="login-content" v-if="tab === 'register'">
            <p class="login-title">注册</p>
            <el-form>
                <el-form-item label="用户名" label-width="70px">
                    <el-input size="small" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="70px">
                    <el-input size="small" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" label-width="70px">
                    <el-input size="small" type="password" placeholder="请再次输入密码"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-bottom">
                <router-link class="to-login-link" to="/login">已有账号，去登陆？</router-link>
                <el-button type="primary">注册</el-button>
            </div>
        </div>
        <div class="login-content" v-else-if="tab === 'change'">
            <p class="login-title">修改密码</p>
            <el-form>
                <el-form-item label="用户名" label-width="70px">
                    <el-input size="small" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="原密码" label-width="70px">
                    <el-input size="small" type="password" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" label-width="70px">
                    <el-input size="small" type="password" placeholder="请输入新密码"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-bottom">
                <router-link class="to-login-link" to="/login">放弃修改，去登陆？</router-link>
                <el-button type="primary">修改密码</el-button>
            </div>
        </div>
        <div class="login-content" v-else>
            <p class="login-title">登录</p>
            <el-form>
                <el-form-item label="用户名" label-width="70px">
                    <el-input size="small" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="70px">
                    <el-input size="small" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <div class="login-bottom">
                <router-link class="to-login-link" to="/login?tab=register">没有账号，去注册？</router-link>
                <el-button type="primary">登录</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data() {
        let { tab } = this.$route.query
        return {
            tab
        }
    },
    watch: {
        $route: function(obj) {
            this.tab = obj.query.tab
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