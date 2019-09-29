//CONNECTボタン
function connect(){
    console.log("clicked");
    navigator.bluetooth.requestDevice({
        filters: [{
            services: [
                '2222'
            ]
        }]
    })
    .then(device =>{
        return device.connectGATT();
    })
    .then(server =>{
        return Promise.all([
            server.getPrimaryService('2222')
        ]);
    })
    .then(services =>{
        return Promise.all([
            services[0].getCharcteristic('connection_test')
        ]);
    })
    .then(characteristics =>{

    })
    .catch(error =>{
        console.log(error);
    })
}