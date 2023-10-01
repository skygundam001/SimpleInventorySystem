<template>
    <div class="container-fluid">
        <div class = "row">
            <div class = "col align-self-start text-center">
                {{ Logo }}
            </div>
        </div>
        <div class = "row">
            <nav class = "col align-self-center text-center">
                <!-- <RouterLink to="/MainHomeView" class="btn btn-primary">{{Text_ToHomePage}}</RouterLink> -->
                <RouterLink to="/login" class="btn btn-primary" v-if="isLogin(true)">{{Text_ToLogin}}</RouterLink>
                <RouterLink to="/register" class="btn btn-primary" v-if="isLogin(true)">{{Text_ToRegister}}</RouterLink>
                <!-- <button class="btn btn-primary" v-if="isLogin(false)">{{Text_SignOut}}</button> -->
            </nav>
        </div>
        <RouterView login/>
    </div>
</template>
<script>
    export default{
        setup(){
            const Logo = '簡單庫存系統'
            const Text_ToLogin = '登入'
            const Text_ToRegister = '註冊'
            const Text_ToHomePage = '首頁'
            const Text_SignOut = '登出'

            return {
                Logo,
                Text_ToLogin,
                Text_ToRegister,
                Text_ToHomePage,
                Text_SignOut
            }
        },
        data(){
            return {
                LoggingIn:false,
                LoginType:''
            }
        },
        methods:{
            isLogin(isloginbutton){
                if(isloginbutton){
                    return !this.LoggingIn
                }else{
                    return this.LoggingIn
                }
            }

        }
    }
</script>