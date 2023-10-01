<template>
    <div></div>
    <div class="login_view_button">
        <button class = "login_button" type="s">tse</button>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                user:{
                    username:'',
                    password:''
                }
            }
        },
        methods:{
            signIn(){
                const api = `http://127.0.0.1:5500/index.html#/admin/signin`;//${import.meta.env.VITE_LOGIN_API}
                console.log(api);
                this.$http.post(api,this.user)
                    .then((res)=>{
                        console.log(res.data);
                    });
            }
        }
    }
    /*import axios from 'axios'
    export default{
        created(){
            console.log(this.$route.params.id)
            const seed = this.$route.params.id
            axios.get(`https://randomuser.me/api/?seed=${seed}`).then((res) =>{
                console.log(res)
            })
        }
    }*/
    /*import http from 'node:http'
    //import querystring from 'node:querystring'
    
    http.createServer(function (req, res) {
        console.log(req,res);
    }).listen(5173);*/
</script>
