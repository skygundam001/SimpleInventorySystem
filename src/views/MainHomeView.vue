<template>
    <div class="container text-center">
        <div class = "row align-self-center text-center">
                {{ Logo }}
        </div>
        <from class = "row" @submit.prevent = "Search">
            <!-- <label for="inputSearch" class="col-sm-2 col-form-label">{{Text_Search}}</label> -->
            <input id ="inputSearch" type="text" class="col form-control" v-model = "SearchString"/>
            <button type="submit" class="btn btn-primary">{{ Text_Search }}</button>
        </from>
        <RouterView />
    </div>
</template>
<script>
    import {mapActions} from 'pinia'
    import userDataBase from '@/stores/userDataBase' 
    export default{
        created(){
            console.log(this.$route.params);
            this.loginData.isLogin = this.$route.params.isLogin;
            this.loginData.LoginUUID = this.$route.params.LoginUUID;
            this.loginData.loginType = this.$route.params.loginType;
        },
        setup(){
            const Logo = '簡單庫存系統'
            const Text_Search = '搜尋'
            const Text_Customer = '客戶'
            const Text_Product = '產品' 
            const Text_Equipment = '設備'

            return {
                Logo,
                Text_Search,
                Text_Customer,
                Text_Product,
                Text_Equipment
            }
        },
        data(){
            return{
                SearchString:'',
                loginData:{
                    isLogin:"",
                    LoginUUID:"",
                    loginType:""
                }
            }
        },
        methods:{
            ...mapActions(userDataBase,['SignOut']),
            Search(){

            },
            SiginOut(){
                var siginstart = this.SignOut(this.$route.params.LoginUUID);
                if(siginstart){
                    console.log("sigin out ok");
                }else{
                    console.log("loss sigin out");
                }
            }
        }
    }
</script>