import { defineStore } from "pinia";

export default defineStore('Equipment SN Data Base',{
    state:()=>{
        return {
            EquipmentTable:[
                {id:"001",name:"pos_WinXP",serialNumber:["pos2001_00000001"]}
            ]
        };
    },
    getters:{
        GetEquipmentTable:(state)=> `${state}`
    },
    actions:{
        create(id,name){
            const regData = {};
            regData.id = id;
            regData.name = name;
            this.add(regData);
        },
        add(newEqData){
            this.EquipmentTable.push(newEqData);
        },
        addSerialNumber(equipmentId,serialNumber){
            var findId = this.find(equipmentId).id;
            var findSN = this.EquipmentTable[findId].serialNumber.findIndex((sn) => sn == serialNumber);
            if(findSN < 0){
                this.EquipmentTable[findId].serialNumber.push[serialNumber];
            }
        },
        find(findString){
            var findId = -1;
            for(var i = 0;i < this.EquipmentTable.length;i++){
                if(this.EquipmentTable[i].id == findString){
                    findId = i;
                    break;
                }
                if(this.EquipmentTable[i].name == findString){
                    findId = i;
                    break;
                }
            }
            return {Id:findId};
        },
        deleteSN(equipmentId,serialNumber){
            var findId = this.find(equipmentId).id;
            var findSN = this.EquipmentTable[findId].serialNumber.findIndex((sn) => sn == serialNumber);
            if(findSN >= 0 && findSN < this.EquipmentTable[findId].serialNumber.length){
                this.EquipmentTable[findId].serialNumber.splice(findSN,1);
            }
        },
        delete(findString){
            var findId = find(findString).Id;
            if(findId >= 0 && findId < this.EquipmentTable.length){
                this.EquipmentTable.splice(findId,1);
            }
        }
    }
});