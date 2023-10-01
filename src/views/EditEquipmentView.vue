<template>
    <div class = "container text-center">
        <div class = "row text-center">
            <div>{{ Text_loginLogo }}</div>
        </div>
        <form class = "row align-self-center" @submit.prevent = "signIn">
            
            <div class="mb-3 row justify-content-center text-center ">
                <label for="inputId" class="col-sm-2 col-form-label">{{Text_Id}}</label>
                <!--input id ="inputId" list="ice-cream-flavors" type="text" class="col form-control" v-model = "Equipment.id"/-->
                <select id ="inputId" class="col" v-model="Equipment.id">
                    <option v-for="item in ProductIDList" :key="item" :value="item.id">{{ item.name }}</option>
                </select>
                <div class="col-sm-2 col-form-label color-red" v-if="isNullValue('id')">{{Text_ErrorMessages1}}</div>

                <!--datalist id="ice-cream-flavors">
                    <option v-for="item in ProductIDList" :key="item" :value="item"></option>
                </datalist-->
            </div>
            <div class="mb-3 row justify-content-center text-center">
                <label for="inputSN" class="col-sm-2 col-form-label">{{Text_SN}}</label>
                <!--input id ="inputSN" type="text" class="col form-control" v-model = "Equipment.serialNumber"/-->
                <select id ="inputSN" class="col" v-model="Equipment.serialNumber">
                    <option v-for="item in SNTable(Equipment.id)" :key="item" :value="item">{{ item }}</option>
                </select>
                <div class="col-sm-2 col-form-label" v-if="isNullValue('serialNumber')">{{Text_ErrorMessages1}}</div>
            </div>
            <div class="mb-3 row justify-content-center text-center">
                <label for="inputCustomer" class="col-sm-2 col-form-label">{{Text_Customer}}</label>
                <input id ="inputCustomer" type="text" class="col form-control" v-model = "Equipment.Customer"/>
            </div>
            <div class="mb-3 row justify-content-center text-center">
                <label for="inputOffice" class="col-sm-2 col-form-label">{{Text_Office}}</label>
                <input id ="inputOffice" type="text" class="col form-control" v-model = "Equipment.Office"/>
            </div>
            <div class="mb-3 row justify-content-center text-center">
                <label for="inputIp" class="col-sm-2 col-form-label">{{Text_ip}}</label>
                <input id ="inputIp" type="text" class="col form-control" onkeyup="value=value.replace(/[^\d\.]/g,'')" onblur="value=value.replace(/[^\d\.]/g,'')" placeholder="192.168.0.1" v-model = "Equipment.ip"/>
                
                <div class="col-sm-3 col-form-label bs-danger-text-emphasis" v-show="iPError()">
                    {{ Text_ErrorMessages }}
                </div>
            </div>
            <div class="mb-3 row justify-content-center text-center">
                <label for="inputMaxWarrantyDay" class="col-sm-2 col-form-label">{{Text_MaxWarrantyDay}}</label>
                <input id ="inputMaxWarrantyDay" type="number" class="col form-control" v-model = "Equipment.MaxWarrantyDay"/>
            </div>

            <div class="mb-3 row justify-content-center text-center">
                <label for="inputState" class="col-sm-2 col-form-label">{{Text_state}}</label>
                <!--input id ="inputState" type="text" class="col form-control" v-model = "Equipment.state"/-->
                <select id ="inputState" class="col" v-model="Equipment.state">
                    <option v-for="item in Text_StateTable" :key="item">{{ item }}</option>
                </select>

                
                <label for="inputPurchaseDate" class="col-sm-2 col-form-label">{{Text_PurchaseDate}}</label>
                <input id ="inputPurchaseDate" type="date" class="col form-control" v-model = "Equipment.PurchaseDate"/>
            </div>

            

            <div class="mb-3 row justify-content-center">
                <div class="col">
                    <button  type="submit" class="btn btn-primary">{{Text_loginbutton}}</button>
                </div>
            </div>
        </form>
        <div class = "row text-center">
            {{ EquipmentDataBase }}
        </div>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'pinia'
    import EquipmentDataBase from '@/stores/EquipmentDataBase'
    import ProductDataBase from '@/stores/ProductDataBase'
    export default{
        setup(){
            const Text_loginLogo = "編輯設備 : ";
            const Text_Id = "設備ID : ";
            const Text_SN = "設備序號 : ";
            const Text_Customer = "客戶 : ";
            const Text_Office = "用途 : ";
            const Text_ip  = "IP : ";
            const Text_MaxWarrantyDay = "保固時間 : ";
            const Text_state = "目前狀態 : ";
            const Text_PurchaseDate = "購入日期 : ";
            const Text_loginbutton = "新增";
            const Text_ErrorMessages = "IP輸入錯誤，請輸入IP";
            const Text_ErrorMessages1 = "此為必填欄位";
            const Text_StateTable = [
                "營運中",
                "在庫存",
                "客戶已回覆故障,待查修",
                "檢修中",
                "等報價",
                "維修中心已報價,待詢問",
                "已向客戶報價,待回覆",
                "維修中",
                "維修中心寄回中",
                "給客戶中"
            ];
            return {
                Text_loginLogo,
                Text_Id,
                Text_SN,
                Text_Customer,
                Text_Office,
                Text_ip,
                Text_MaxWarrantyDay,
                Text_state,
                Text_PurchaseDate,
                Text_loginbutton,
                Text_ErrorMessages,
                Text_ErrorMessages1,
                Text_StateTable
            }
        },
        data(){
            return {
                Equipment:{
                    id:'',
                    serialNumber:'',
                    Customer:'',
                    Office:'',
                    ip:'',
                    MaxWarrantyDay:'',
                    state:'',
                    PurchaseDate:''
                }
            }
        },
        computed:{
            ...mapState(EquipmentDataBase,['EquipmentDataBase']),
            ...mapState(ProductDataBase,['ProductIDList'])
        },
        methods:{
            ...mapActions(EquipmentDataBase,['create']),
            ...mapActions(ProductDataBase,['SNTable']),
            signIn(){
                if(this.Equipment.state == ""){
                    this.Equipment.state = "在庫存";
                }
                if(this.Equipment.PurchaseDate == ""){
                    var todayDate = new Date();
                    var yyyy = todayDate.getFullYear();
                    var mm = todayDate.getMonth()+1;
                    var dd = todayDate.getDate();
                    var todayDateString = yyyy + "/" + mm + "/" + dd;
                    this.Equipment.PurchaseDate = todayDateString;
                }
                if(this.inputError()){
                    this.create(
                        this.Equipment.id,
                        this.Equipment.serialNumber,
                        this.Equipment.Customer,
                        this.Equipment.Office,
                        this.Equipment.ip,
                        this.Equipment.MaxWarrantyDay,
                        this.Equipment.state,
                        this.Equipment.PurchaseDate);
                }
            },
            iPError(){
                let oldip = this.Equipment.ip.split('.');
                console.log(oldip.length + "|" + oldip);
                if(oldip.length == 4){
                    if(oldip[3] == ""){
                        return true;
                    }
                    return false;
                }else{
                    return true;
                }
            },
            isNullValue(inputString){
                let regBoolen = false;
                switch(inputString){
                    case "id":
                        if(this.Equipment.id == ""){
                            regBoolen = true;
                        }
                        break;
                    case "serialNumber":
                        if(this.Equipment.serialNumber == ""){
                            regBoolen = true;
                        }
                        break;
                    case "Customer":
                        break;
                    case "office":
                        break;
                    case "MaxWarrantyDay":
                        break;
                    case "state":
                        break;
                    case "PurchaseDate":
                        break;
                }
                return regBoolen;
            },
            inputError(){
                if(this.iPError()){return false;}
                if(this.isNullValue("id"))return false;
                if(this.isNullValue("serialNumber"))return false;
                return true;
            }
        }
    }
</script>