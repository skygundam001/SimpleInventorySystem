<template>
    <div class = "container text-center">
        <div class = "row text-center">
            <div>{{ Text_loginLogo }}</div>
        </div>
        <form class = "row align-self-center" @submit.prevent = "register">

            <div class="mb-3 row justify-content-center text-center ">
                <label for="inputStoreName" class="col-sm-2 col-form-label">{{Text_StoreName}}</label>
                <input id ="inputStoreName" type="email" class="col form-control" v-model = "user.storeName"/>
            </div>


            <div class="mb-3 row justify-content-center text-center ">
                <label for="inputUserName" class="col-sm-2 col-form-label">{{Text_username}}</label>
                <input id ="inputUserName" type="email" class="col form-control" v-model = "user.username"/>
            </div>

            <div class="mb-3 row justify-content-center text-center">
                <label for="inputUserPassword" class="col-sm-2 col-form-label">{{Text_password}}</label>
                <input id ="inputUserPassword" type="password" class="col form-control" v-model = "user.password"/>
            </div>


            
            <div class="mb-3 row justify-content-center text-center">
                <label for="inputUserPasswordAgain" class="col-sm-2 col-form-label">{{Text_passwordAgain}}</label>
                <input id ="inputUserPasswordAgain" type="password" class="col form-control" v-model = "user.passwordAgain"/>
            </div>

            <div class="mb-3 row justify-content-center">
                <div class="col-2">
                    <button  type="submit" class="btn btn-primary">{{Text_loginbutton}}</button>
                </div>
            </div>
        </form>
        <div>{{ userTable }}</div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'pinia'
import userDataBase from '@/stores/userDataBase'
export default{
    setup(){
        const Text_username = '電子郵件 : '
        const Text_password = '密碼 : '
        const Text_passwordAgain = '再次確認密碼 : '
        const Text_loginbutton = '註冊'
        const Text_loginLogo = '註冊新帳號'
        const Text_TipsEnterPassword = '請輸入密碼!'
        const Text_StoreName = '商店名稱'

        return{
            Text_username,
            Text_password,
            Text_passwordAgain,
            Text_loginbutton,
            Text_loginLogo,
            Text_TipsEnterPassword,
            Text_StoreName
        }
    },
    data(){
        return {
            user:{
                username:'',
                password:'',
                passwordAgain:'',
                storeName:''
            }
        }
    },
    computed:{
        ...mapState(userDataBase,['userTable','loginState'])
    },
    methods:{
        ...mapActions(userDataBase,['create','isLoginOk']),
        register(){
            console.log("ok");
            console.log(this.user);
            if(this.user.password != this.user.passwordAgain){
                this.user.password = ''
                this.user.passwordAgain = ''
                console.log('Confirm password again Error,please enter again')
                return;
            }

            if(this.create(this.user.username,this.user.password,this.user.storeName).isok){
                console.log('is register ok');
            }else{
                console.log("register no ok");
            }
        }
    }
    
}
    
</script>