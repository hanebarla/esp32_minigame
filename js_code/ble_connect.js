//CONNECTボタン
console.log("ok");
function connect(){
    console.log("clicked");
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
        return device.gatt.connect();
    })
    .then(server =>{
        return Promise.all([
            server.getPrimaryService('link_loss'),
            server.getPrimaryService('immediate_alert'),
            server.getCharcteristic('tx_power')
        ]);
    })
    .then(services =>{
        return Promise.all([
            services[0].getCharcteristic('alert_level'),
            services[1].getCharcteristic('alert_level'),
            services[2].getCharcteristic('tx_power_level')
        ]);
    })
    .then(characteristics =>{

    })
    .catch(error =>{
        console.log(error);
    })
}