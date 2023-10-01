<template>
    <div class = "container text-center">
        <div class = "row text-center">
            <div>{{ Text_loginLogo }}</div>
        </div>
        <form class = "row align-self-center" @submit.prevent = "signIn">
            <div class="mb-3 row justify-content-center text-center ">
                <label for="inputUserName" class="col-sm-2 col-form-label">{{Text_username}}</label>
                <input id ="inputUserName" type="email" class="col form-control" v-model = "user.username"/>
            </div>
            <div class="mb-3 row justify-content-center text-center">
                <label for="inputUserPassword" class="col-sm-2 col-form-label">{{Text_password}}</label>
                <input id ="inputUserPassword" type="password" class="col form-control" v-model = "user.password"/>
            </div>
            <div class="mb-3 row justify-content-center text-center">
                <div class="col text-center">
                    <button  type="submit" class="btn btn-primary">{{Text_loginbutton}}</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import {mapState,mapActions} from 'pinia'
import userDataBase from '@/stores/userDataBase'
export default{
    setup(){
        const Text_username = '電子郵件 : '
        const Text_password = '密碼 : '
        const Text_loginbutton = '登入'
        const Text_loginLogo = '登入系統'
        return{
            Text_username,
            Text_password,
            Text_loginbutton,
            Text_loginLogo
        }
    },
    data(){
        return {
            user:{
                username:'',
                password:''
            }
        }
    },
    computed:{
        ...mapState(userDataBase,['userTable','loginState'])
    },
    methods:{
        ...mapActions(userDataBase,['create','isLoginOk']),
        signIn(){
            console.log("ok");
            console.log(this.user);
            var loginObj = this.isLoginOk(this.user.username,this.user.password);
            if(loginObj.isok){
                console.log('is login');
                this.$router.push({
                    name: 'MainHomeView',
                    params: { 
                        // loginObj:"{\
                        //     isLogin: true, // 注意，傳送後會轉為字串\
                        //     loginType:loginObj.loginType\
                        // }"
                        isLogin: true, // 注意，傳送後會轉為字串
                        LoginUUID:loginObj.LoginUUID,
                        loginType:loginObj.loginType
                    }
                });
            }else{
                this.user.password = '';
                console.log("miss login");
            }
        }
    }
    
}
    
</script>