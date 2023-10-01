//產品資料
export function ProductData(id,name){
    this.SetObj(id,name,"","","","",[]);
}

ProductData.prototype.SetObj = function(id,name,introduce,manufacturer,publisher,repairer,serialNumberTable){
    this.id = id;
    this.name = name;
    this.introduce = introduce;
    this.manufacturer = manufacturer;
    this.publisher = publisher;
    this.repairer = repairer;
 
    this.serialNumberTable = serialNumberTable;
}

ProductData.prototype.JSONStringToThis = function(JSONString){
    const regData = JSON.parse(JSONString);
    this.JsonToThis(regData);
}

ProductData.prototype.JsonToThis = function(jsonObj){
    this.SetObj(jsonObj.id,jsonObj.name,jsonObj.introduce,jsonObj.manufacturer,jsonObj.publisher,jsonObj.repairer,jsonObj.serialNumberTable);
}

//設備詳細資料
export function equipmentData(id,serialNumber,Customer,Office,ip,MaxWarrantyDay,state,PurchaseDate){
    this.SetObj(id,serialNumber,Customer,Office,ip,MaxWarrantyDay,state,PurchaseDate);
}

equipmentData.prototype.SetObj = function(id,serialNumber,Customer,Office,ip,MaxWarrantyDay,state,PurchaseDate){
    this.id = id;
    this.serialNumber = serialNumber;
    this.Customer = Customer;
    this.Office = Office;
    this.ip = ip;
    this.MaxWarrantyDay = MaxWarrantyDay;//day
    this.state = state;
    this.EquipmentUnitData = {};
    this.PurchaseDate = PurchaseDate;//(yyyy/mm/dd)
}

equipmentData.prototype.JsonToThis = function(jsonObj){
    this.SetObj(jsonObj.id,jsonObj.serialNumber,jsonObj.Customer,jsonObj.Office,jsonObj.ip,jsonObj.MaxWarrantyDay,jsonObj.state,jsonObj.PurchaseDate);
}

equipmentData.prototype.GetJSON = function(){
    return JSON.parse(JSON.stringify(this));
}

equipmentData.prototype.NewInStock = function(id,serialNumber){
    var todayDate = new Date();
    var yyyy = todayDate.getFullYear();
    var mm = todayDate.getMonth()+1;
    var dd = todayDate.getDate();
    var todayDateString = yyyy + "/" + mm + "/" + dd;
    this.SetObj(id,serialNumber,"","","0.0.0.0",0,"入庫",todayDateString);
}

equipmentData.prototype.Warehouse = function(){
    this.NewInStock(this.id,this.serialNumber);
}

equipmentData.prototype.WarrantyStatus = function(){
    let todayDate = new Date();
    let oldPurchaseDate = new Date(this.PurchaseDate);
    let result = parseInt(Math.abs(todayDate - oldPurchaseDate) / 1000 / 60 / 60 / 24);
    if(result > parseInt(this.MaxWarrantyDay)){
        return {WarrantyStatus:false};
    }
    return {WarrantyStatus:true};
}

equipmentData.prototype.SetStandbyMachine = function(EquipmentUnitData){
    this.EquipmentUnitData = EquipmentUnitData;
}

equipmentData.prototype.ComparisonThis = function(CId,CSN){
    var rBoolen = true;
    if(this.id != CId){
        rBoolen = false;
    }
    if(this.serialNumber != CSN){
        rBoolen = false;
    }
    return rBoolen;
}

//設備單元資料
export function EquipmentUnitData(id,serialNumber){
    this.id = id;
    this.serialNumber = serialNumber;
}

EquipmentUnitData.prototype.JsonToThis = function(jsonObj){
    this.id = jsonObj.id;
    this.serialNumber = jsonObj.serialNumber;
}

EquipmentUnitData.prototype.JSONStringToThis = function(JSONString){
    const regData = JSON.parse(JSONString);
    this.JsonToThis(regData);
}

EquipmentUnitData.prototype.ComparisonId = function(CId){
    if(this.id == CId){
        return true;
    }else{
        return false;
    }
}

EquipmentUnitData.prototype.ComparisonSN = function(CSN){
    if(this.serialNumber == CSN){
        return true;
    }else{
        return false;
    }
}

EquipmentUnitData.prototype.ComparisonThis = function(CThis){
    var rBoolen = false;
    if(this.id == CThis.id){
        if(this.serialNumber == CThis.serialNumber){
            rBoolen = true;
        }
    }
    return rBoolen;
}

//保固資料
export function WarrantyData(EquipmentWarranty,CustomerService){
    this.EquipmentWarranty = EquipmentWarranty;
    this.CustomerService = CustomerService;
}

WarrantyData.prototype.EquipmentWarrantyOnOff = function(){
    this.EquipmentWarranty = !this.EquipmentWarranty;
}

WarrantyData.prototype.CustomerServiceOnOff = function(){
    this.CustomerService = !this.CustomerService;
}

//客戶資料
//EquipmentUnitData {id,SN}
export function CustomerData(id,name,introduce,WarrantyData){
    this.id = id;
    this.name = name;
    this.introduce = introduce;//基本介紹
    this.WarrantyData = WarrantyData;//保固資料
    this.EquipmentUnitDataTable = [];
}

CustomerData.prototype.GetJSON = function(){
    return JSON.parse(JSON.stringify(this));
}

CustomerData.prototype.AddEquipment = function(EquipmentData){
    var regData = new EquipmentUnitData(EquipmentData.id,EquipmentData.serialNumber);
    regData = JSON.parse(JSON.stringify(regData));
    if(this.Existed(regData)){
        this.EquipmentUnitDataTable.push(regData);
    }
}

CustomerData.prototype.Existed =  function(findObj){
    var findIndex = this.EquipmentUnitDataTable.findIndex((value) => value.ComparisonThis(findObj));
    if(findIndex >= 0 && findIndex < this.EquipmentUnitDataTable.length){
        return true;
    }
    return false;
}

CustomerData.prototype.FindEquipment = function(findObj){
    var findIndex = this.EquipmentUnitDataTable.findIndex((value) => value.ComparisonThis(findObj));
    if(findIndex >= 0 && findIndex < this.EquipmentUnitDataTable.length){
        return this.EquipmentUnitDataTable[findIndex];
    }
    return null;
}

CustomerData.prototype.DeleteEquipment = function(findId,findSN){
    var findIndex = this.EquipmentUnitDataTable.findIndex((value) => value.ComparisonThis(findId,findSN));
    if(findIndex >= 0 && findIndex < this.EquipmentUnitDataTable.length){
        this.EquipmentUnitDataTable.splice(findIndex,1);
    }
}