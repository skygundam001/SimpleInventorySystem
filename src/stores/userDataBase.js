import { defineStore } from "pinia";

export default defineStore('User Data Base',{
    state:()=>{
        return {
            userTable:[
                {username:"admin@newmail.com",password:"newAdmin000",isLogin:false,loginType:"administrator",vipname:"admin",LoginUUID:""},
                {username:"eateat@gmail.com",password:"testCustomer001",isLogin:false,loginType:"Customer",vipname:"奛食小吃店(艋舺門市)",LoginUUID:""}
            ]
        };
    },
    getters:{
        GetUserTable:(state)=> `${state}`
    },
    actions:{
        create(username,password,vipname){
            var isOk = true;
            this.userTable.forEach(element => {
                if(element.username == username){
                    isOk = false;
                };
                if(element.vipname == vipname){
                    isOk = false;
                }
                //console.log(element);
            });

            if(isOk){
                const newUserData = {username:"",password:""};
                newUserData.username = username;
                newUserData.password = password;
                newUserData.isLogin = false;
                newUserData.vipname = vipname;
                newUserData.loginType = "Customer";
                
                this.userTable.push(newUserData);
            }

            return {isok:isOk};
        },
        isLoginOk(username,password){
            var isOk = false;
            var loginT = '';
            var LoginUUID = '';
            this.userTable.forEach(element => {
                if(element.username == username){
                    if(element.password == password){
                        element.isLogin = true;
                        loginT = element.loginType;
                        isOk = true;
                        element.LoginUUID = Math.floor(Math.random());
                        LoginUUID = element.LoginUUID;
                    };
                };
                console.log(element);
            });
            return {
                loginType:loginT,
                LoginUUID:LoginUUID,
                isok:isOk
            };
        },
        SignOut(UUID){
            var siginoutend = false;
            this.userTable.forEach(element => {
                if(element.LoginUUID == UUID){
                    element.isLogin = false;
                    element.LoginUUID = "";
                    siginoutend = true;
                };
            });
            return siginoutend;
        }
    }
});
//console.log(this.isLogin);