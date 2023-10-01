<template>
    <div class="container-fluid">
        <div class="row">
            <form class = "row align-self-center" @submit.prevent = "edit">
                <div class="row">
                    <label for="inputStoreName" class="col-sm-2 col-form-label">商店名稱</label>
                    <input id ="inputStoreName" type="email" class="col form-control" v-model = "user.storeName"/>
                </div>
                <div class="row">
                    <label for="inputContactNumber" class="col-sm-2 col-form-label">聯絡電話</label>
                    <input id ="inputContactNumber" type="email" class="col form-control" v-model = "user.contactNumber"/>
                </div>
                <div class="row">
                    
                    <label for="inputAddress" class="col-sm-2 col-form-label">地址</label>
                    <input id ="inputAddress" type="email" class="col form-control" v-model = "user.address"/>
                </div>
                <div class="row">
                    保固資料
                        硬體保固 no red yes green
                        線上客服 no red yes green
                    <label for="inputStoreName" class="col-sm-2 col-form-label">硬體維護</label>
                    <input id ="inputStoreName" type="email" class="col form-control" v-model = "user.HardwareMaintenance"/>
                    <label for="inputStoreName" class="col-sm-2 col-form-label">線上客服</label>
                    <input id ="inputStoreName" type="email" class="col form-control" v-model = "user.OnlineSustomerService"/>
                </div>
                <div class="row">
                    設備資料
                </div>
                <button  type="submit" class="btn btn-primary">新增資料</button>
            </form>
        </div>
        <div class="row">
            {{ Data }}
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'pinia'
import customerDataBase from '@/stores/CustomerDataBase'
//import { CustomerData } from "@/dataStructure/systemData.js";
export default{
    setup(){
        return{
        }
    },
    data(){
        return {
            user:{
                storeName:'',
                contactNumber:'',
                address:'',
                HardwareMaintenance:true,
                OnlineSustomerService:true,
                EquipmentUnitDataTable:{}
            }
        }
    },
    computed:{
        ...mapState(customerDataBase,['GetUserTable'])
    },
    methods:{
        ...mapActions(customerDataBase,['create']),
        edit(){

        }
    }
    
}
</script>