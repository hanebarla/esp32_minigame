/*
We assume that SERVICE_UUID        is "3f48001d-7fbd-48dc-8b12-4556caf802b1"
               CHARACTERISTIC_UUID is "868c0c4f-6087-4416-b9d7-0d5ff8aed46a"
*/

//BLE Device Constructor

let BLE_DEVICE = function BLE_Device(name, service_uuid, charcteristic_uuid){
    this.device_obj = null;
    this.chara_obj = null;
    this.name = name;
    this.service_uuid = service_uuid;
    this.charcteristic_uuid = charcteristic_uuid;
}

BLE_DEVICE.prototype.datachange = function(){
    return function(event){
        // console.log(event.target.value)
        value = event.target.value.getInt8(0);
        // console.log(value);
        first = value % 2;
        second = value % 3;

        buttonlog = "You are pushing: ";
        if(first==0){
            buttonlog += "left";
        }
        if(second==0){
            buttonlog += "right";
        }
        document.getElementById("value").innerHTML = buttonlog;
    }
}

BLE_DEVICE.prototype.ble_notfy = function(){
    navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [this.service_uuid]
    })
    .then(device =>{
        this.device_obj = device;
        console.log("Begin Connecting...");
        document.getElementById("state").innerHTML = "Begin Connecting...";
        return this.device_obj.gatt.connect();
    })
    .then(server =>{
        console.log("Getting Services...");
        document.getElementById("state").innerHTML = "Getting Services...";
        return server.getPrimaryService(this.service_uuid);
    })
    .then(service =>{
        console.log("Getting Characteristic...");
        document.getElementById("state").innerHTML = "Getting Characteristic...";
        return service.getCharacteristic(this.charcteristic_uuid);
    })
    .then(characteristic =>{
        this.chara_obj = characteristic;
        this.chara_obj.addEventListener('characteristicvaluechanged', this.datachange())
        console.log("Connection Success!");
        document.getElementById("state").innerHTML = "Device is connected";
    })
    .then(() =>{
        this.chara_obj.startNotifications();
    })
    .catch(error =>{
        console.log(error);
    })
}

BLE_DEVICE.prototype.disconnect = function(){
    document.getElementById("state").innerHTML = "";
    document.getElementById("value").innerHTML = "";

    if(!this.device_obj){
        document.getElementById("state").innerHTML = "No Device is connecting";
    }
    return this.device_obj.gatt.disconnect()
}

let Client = new BLE_DEVICE("ESP32", "3f48001d-7fbd-48dc-8b12-4556caf802b1", "868c0c4f-6087-4416-b9d7-0d5ff8aed46a");
