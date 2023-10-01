import { defineStore } from "pinia";
//import { CustomerData } from "@/dataStructure/systemData.js";

export default defineStore('Customer Data Base',{
    state:()=>{
        return {
            CustomerTable:[
            ]
        };
    },
    getters:{
        GetUserTable:(state)=> `${state}`
    },
    actions:{
        create(newObj){
            this.CustomerTable.push(JSON.parse(JSON.stringify(newObj)));
        },
        edit(newObj){
            this.CustomerTable.forEach(elementT => {
                if(elementT.name == newObj.nama){
                    elementT = JSON.parse(JSON.stringify(newObj));
                }
            });
        }
    }
});