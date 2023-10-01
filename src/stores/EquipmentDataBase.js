import { defineStore } from "pinia";
import {equipmentData} from '@/dataStructure/systemData.js';

export default defineStore('Equipment Data Base',{
    state:()=>{
        return {
            EquipmentDataBase:[
                {id:"001",serialNumber:"pos2001_00000001",Customer:"奛食小吃店(艋舺門市)",Office:"pos主機",ip:"192.168.1.1",MaxWarrantyDay:"365",state:"營運中",PurchaseDate:"2002/08/01"}
            ]
        };
    },
    getters:{
        GetEquipmentDataBase:(state)=> `${state}`
    },
    actions:{
        create(id,serialNumber,Customer,Office,ip,MaxWarrantyDay,state,PurchaseDate){
            const regData = new equipmentData(id,serialNumber,Customer,Office,ip,MaxWarrantyDay,state,PurchaseDate);
            this.add(regData);
        },
        add(newEqData){
            let findId = this.findObjIdbyPrimaryKey(newEqData).Id;
            let FindO = (findId < 0);//findId no find return -1 ,FindO is true
            console.log(newEqData.id + "/" + newEqData.serialNumber);
            //console.log(this.EquipmentDataBase);
            console.log(findId < 0);
            if(FindO){
                newEqData = newEqData.GetJSON();//JSON.parse(JSON.stringify(newEqData));
                this.EquipmentDataBase.push(newEqData);
            }else{
                console.log("有重複資料,無法新增");
            }
        },
        addSerialNumber(equipmentId,serialNumber){
            var findId = this.find(equipmentId).id;
            var findSN = this.EquipmentDataBase[findId].serialNumber.findIndex((sn) => sn == serialNumber);
            if(findSN < 0){
                this.EquipmentDataBase[findId].serialNumber.push[serialNumber];
            }
        },
        find(findString){
            var findId = -1;
            for(var i = 0;i < this.EquipmentDataBase.length;i++){
                if(this.EquipmentDataBase[i].id == findString){
                    findId = i;
                    break;
                }
                if(this.EquipmentDataBase[i].serialNumber == findString){
                    findId = i;
                    break;
                }
            }
            return {Id:findId};
        },
        findObjIdbyPrimaryKey(primaryKey){
            var findId = -1;
            console.log(this.EquipmentDataBase);
            for(var i = 0;i < this.EquipmentDataBase.length;i++){
                if(this.EquipmentDataBase[i].id == primaryKey.id){
                    if(this.EquipmentDataBase[i].serialNumber == primaryKey.serialNumber){
                        findId = i;
                        break;
                    }
                    break;
                }
            }
            return {Id:findId};
        },
        deleteSN(equipmentId,serialNumber){
            var findId = this.find(equipmentId).id;
            var findSN = this.EquipmentDataBase[findId].serialNumber.findIndex((sn) => sn == serialNumber);
            if(findSN >= 0 && findSN < this.EquipmentDataBase[findId].serialNumber.length){
                this.EquipmentDataBase[findId].serialNumber.splice(findSN,1);
            }
        },
        delete(findString){
            var findId = find(findString).Id;
            if(findId >= 0 && findId < this.EquipmentDataBase.length){
                this.EquipmentDataBase.splice(findId,1);
            }
        }
    }
});