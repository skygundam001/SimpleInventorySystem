import { defineStore } from "pinia";
import { ProductData } from "@/dataStructure/systemData.js";

export default defineStore('Product Data Base',{
    state:()=>{
        return {
            ProductTable:[
                {id:"001",name:"pos_WinXP",introduce:"this pos use minsoft OS.",manufacturer:"minsoftpos",publisher:"minsoftpos_TW",repairer:"minsoftpos_WRC",serialNumberTable:["pos2001_00000001","pos2001_00000002"]},
                {id:"002",name:"PM_99",introduce:"this printer.",manufacturer:"FPSN",publisher:"FPSN_TW",repairer:"FPSN_TW",serialNumberTable:["P2_001_00000001","P2_001_00000005"]}
            ]
        };
    },
    getters:{
        GetEquipmentTable:(state)=> `${state}`,
        ProductIDList:(state)=>{
            let regArray = [];
            for(var i = 0;i < state.ProductTable.length;i++){
                let regData = {id:state.ProductTable[i].id,name:state.ProductTable[i].name};
                regArray.push(regData);
            }
            return regArray;
        }
    },
    actions:{
        create(id,name,introduce,manufacturer,publisher,repairer){
            const regData = new ProductData(id,name);
            regData.id = id;
            regData.name = name;
            regData.introduce = introduce;
            regData.manufacturer = manufacturer;
            regData.publisher = publisher; 
            regData.repairer = repairer;
            regData.serialNumberTable = [];

            this.add(regData);
        },
        add(newEqData){
            newEqData = JSON.parse(JSON.stringify(newEqData));
            this.ProductTable.push(newEqData);
        },
        find(findString){
            var findId = -1;
            for(var i = 0;i < this.ProductTable.length;i++){
                if(this.ProductTable[i].id == findString){
                    findId = i;
                    break;
                }
                if(this.ProductTable[i].name == findString){
                    findId = i;
                    break;
                }
            }
            return {Id:findId};
        },
        delete(findString){
            var findId = find(findString).Id;
            if(findId >= 0 && findId < this.ProductTable.length){
                this.ProductTable.splice(findId,1);
            }
        },
        edit(findString,dataName,dataString){
            var findId = find(findString).Id;
            if(findId < 0){
                return {Reply: "edit miss ,no find data"};
            }
            switch(dataName){
                case "id" :
                    this.ProductTable[findId].id = dataString;
                    break;
                case "name" :
                    this.ProductTable[findId].name = dataString;
                    break;
                case "introduce":
                    this.ProductTable[findId].introduce = dataString;
                    break;
                case "manufacturer":
                    this.ProductTable[findId].manufacturer = dataString;
                    break;
                case "publisher":
                    this.ProductTable[findId].publisher = dataString;
                    break;
                case "repairer":
                    this.ProductTable[findId].repairer = dataString;
                    break;
            }
        },
        SNTable(findId){
            if(findId == ""){
                findId = "001";
            }
            return this.ProductTable.find(obj => obj.id == findId).serialNumberTable;
        }
    }
});