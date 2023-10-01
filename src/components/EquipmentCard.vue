<template>
    <div class = "container">
        <div class = "row">
            <div class = "col">{{ Text_Id }}</div>
            <div class = "col">{{ showId }}</div>
            <div class = "col">{{ Text_Name }}</div>
            <div class = "col">{{ showName }}</div>
        </div>
        <div class = "row">
            <div class = "col">{{ Text_SN }}</div>
            <div class = "col">{{ showSN }}</div>
        </div>
        <div class="row">
            <div class = "col">{{ Text_Office }}</div>
            <div class = "col">{{ showOffice }}</div>
            <div class = "col">{{ Text_ip }}</div>
            <div class = "col">{{ showIP }}</div>
        </div>
        <div class = "row">
            <div class = "col">{{ Text_Customer }}</div>
            <div class = "col">{{ showCustomer }}</div>
        </div>
        <div class="row" :class="stateColor(showState)">
            <div class = "col">{{ Text_state }}</div>
            <div class = "col">{{ showState }}</div>
        </div>
        <div class="row">
            <div class = "col">{{ Text_MaxWarrantyDay }}</div>
            <div class = "col">{{ showMaxWarrantyDay }}</div>
            <div class = "col">{{ Text_PurchaseDate }}</div>
            <div class = "col">{{ showPurchaseDate }}</div>
        </div>
    </div>
</template>
<script>
    //import { storeToRefs } from 'pinia';
    import EquipmentDataBase from '@/stores/EquipmentDataBase'
    import ProductDataBase from '@/stores/ProductDataBase';
    export default{
        setup(){
            const products = ProductDataBase().ProductTable;
            const Equipments = EquipmentDataBase().EquipmentDataBase;
            //const { ProductTable } = storeToRefs(products);
            const DataSN = 0;

            const showId = Equipments[DataSN].id;
            const showName = products.find(data => data.id == showId).name;
            const showCustomer = Equipments[DataSN].Customer;
            const showSN = Equipments[DataSN].serialNumber;
            const showOffice = Equipments[DataSN].Office;
            const showIP = Equipments[DataSN].ip;
            const showMaxWarrantyDay = Equipments[DataSN].MaxWarrantyDay;
            const showState = Equipments[DataSN].state;
            const showPurchaseDate = Equipments[DataSN].PurchaseDate;


            const Text_loginLogo = "設備表";
            const Text_Id = "設備ID";
            const Text_Name = "設備名稱";
            const Text_SN = "設備序號";
            const Text_Customer = "客戶";
            const Text_Office = "用途";
            const Text_ip  = "IP";
            const Text_MaxWarrantyDay = "保固時間";
            const Text_state = "使用狀態";
            const Text_PurchaseDate = "購入日期";
            const Text_StateTable = [
                "營運中",//bg-success
                "在庫存",//bg-light
                "客戶已回覆故障,待查修",//bg-warning
                "檢修中",//bg-warning
                "等報價",//bg-primary
                "維修中心已報價,待詢問",//bg-primary
                "已向客戶報價,待回覆",//bg-primary
                "維修中",//bg-danger
                "維修中心寄回中",//bg-primary
                "給客戶中",//bg-primary
                "待報廢",//bg-secondary
                "已報廢"//bg-dark text-white
            ];

            function stateColor(state){
                const color = {
                    'bg-success text-white':false,
                    'bg-light':false,
                    'bg-warning':false,
                    'bg-primary text-white':false,
                    'bg-danger text-white':false,
                    'bg-secondary text-white':false,
                    'bg-dark text-white':false,
                }
                switch(state){
                    case "營運中":
                        color['bg-success text-white'] = true;
                        break;
                    case "在庫存":
                        color['bg-light'] = true;
                        break;
                    case "客戶已回覆故障,待查修":
                        color['bg-warning'] = true;  
                        break;
                    case "檢修中":
                        color['bg-warning'] = true;
                        break;
                    case "等報價":
                        color['bg-primary text-white'] = true;
                        break;
                    case "維修中心已報價,待詢問":
                        color['bg-primary text-white'] = true;
                        break;
                    case "已向客戶報價,待回覆":
                        color['bg-primary text-white'] = true;
                        break;
                    case "維修中":
                        color['bg-danger'] = true;
                        break;
                    case "維修中心寄回中":
                        color['bg-primary text-white'] = true;
                        break;
                    case "給客戶中":
                        color['bg-primary text-white'] = true;
                        break;
                    case "待報廢":
                        color['bg-secondary text-white'] = true;
                        break;
                    case "已報廢":
                        color['bg-dark text-white'] = true;
                        break;
                }
                return color;
            }

            return {
                products,
                DataSN,
                showId,
                showName,
                showCustomer,
                showSN,
                showOffice,
                showIP,
                showMaxWarrantyDay,
                showState,
                showPurchaseDate,

                Text_loginLogo,
                Text_Id,
                Text_Name,
                Text_SN,
                Text_Customer,
                Text_Office,
                Text_ip,
                Text_MaxWarrantyDay,
                Text_state,
                Text_PurchaseDate,
                Text_StateTable,
                stateColor
            }
        }
    }
</script>