let bluetoothDevice;
//CONNECTボタン
console.log("page_ok");
function connect(){
    console.log("connect_clicked");
    navigator.bluetooth.requestDevice({
        filters: [{
            services: [
                'link_loss',
                'immediate_alert',
                'tx_power'
            ]
        }]
    })
    .then(device =>{
        bluetoothDevice = device;
        console.log("Connected!");
        return device.gatt.connect();
    })
    .then(server =>{
        if(device.gatt.connected){
            device_connected[0] = 1;
        }
        return Promise.all([
            server.getPrimaryService('link_loss'),
            server.getPrimaryService('immediate_alert'),
            server.getPrimaryService('tx_power')
        ]);
    })
    .then(services =>{
        console.log("Got Services");
        return Promise.all([
            services[0].getCharacteristic('alert_level'),
            services[1].getCharacteristic('alert_level'),
            services[2].getCharacteristic('tx_power_level')
        ]);
    })
    .then(characteristics =>{
        console.log("Got Characteristic");

    })
    .catch(error =>{
        console.log(error);
    })
}

//DISCONNECTボタン
function disconnect(){
    console.log("disconnect_clicked");
    if(bluetoothDevice == null){
        console.log("Not Connected");
    }else{
        bluetoothDevice.gatt.disconnect();
    }
}