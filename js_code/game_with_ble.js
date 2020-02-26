//-----------------------------
// game part (using phixi.js)
//-----------------------------

const rend_width = 400;
const rend_height = 500;
let player_ship;
let enemy_ship;
let state;
const speed = 1.5;

let btn_key = {'left_key':0,
               'right_key':0,
               'up_key':0,
               'down_key':0
};

//WebGL support?
let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas";
}
PIXI.utils.sayHello(type);

//make canvas
const app = new PIXI.Application({
    width: rend_width,
    height: rend_height
});
document.getElementById("display").appendChild(app.view);

//texture load
PIXI.Loader.shared
    .add(["images/ship.png",
          "images/my_ship.png",
          "images/enemy_ship.png"])
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(){
    console.log("loading");
}

function setup(){
    //Create player and enemy ship
    player_ship = new PIXI.Sprite(PIXI.Loader.shared.resources["images/my_ship.png"].texture);
    enemy_ship = new PIXI.Sprite(PIXI.Loader.shared.resources["images/enemy_ship.png"].texture);

    player_ship.anchor.set(0.5);
    player_ship.x = app.screen.width / 2;
    player_ship.y = app.screen.height * 2 / 3;
    player_ship.vx = 0;
    player_ship.vy = 0;
    app.stage.addChild(player_ship);

    enemy_ship.anchor.set(0.5);
    enemy_ship.rotation = Math.PI;
    enemy_ship.x = app.screen.width / 2;
    enemy_ship.y = app.screen.height / 3;
    enemy_ship.vx = 0;
    enemy_ship.vy = 0;
    app.stage.addChild(enemy_ship);

    
    let left = keyboard('a');
    let right = keyboard('d');
    let up = keyboard('w');
    let down = keyboard('s');

    left.press = () => {
        player_ship.vx = -speed;
        player_ship.vy = 0;
    };
    left.release = () => {
        if(!right.isDown && player_ship.vy == 0){
            player_ship.vx = 0;
        }
    };

    right.press = () => {
        player_ship.vx = speed;
        player_ship.vy = 0;
    };
    right.release = () => {
        if(!left.isDown && player_ship.vy == 0){
            player_ship.vx = 0;
        }
    };

    up.press = () =>{
        player_ship.vx = 0;
        player_ship.vy = -speed;
    };
    up.release = () =>{
        if(!down.isDown && player_ship.vx == 0){
            player_ship.vy = 0;
        
        }
    };

    down.press = () =>{
        player_ship.vx = 0;
        player_ship.vy = speed;
    
    };
    down.release = () =>{
        if(!up.isDown && player_ship.vx == 0){
            player_ship.vy = 0;    
        }
    };

    state = play;

    app.ticker.add(delta => gameloop(delta));
}

function gameloop(delta){

    state(delta);
}

function play(){
    if(Client.device_obj != null){
        player_ship.vx = -speed*btn_key['left_key'] + speed*btn_key['right_key']
        player_ship.vy = -speed*btn_key['up_key'] + speed*btn_key['down_key']
    }
    player_ship.x += player_ship.vx;
    player_ship.y += player_ship.vy;
    player_ship.x = display_loop(player_ship.x, rend_width);
    player_ship.y = display_loop(player_ship.y, rend_height);
    enemy_ship.x = display_loop(enemy_ship.x, rend_width);
}

function display_loop(obj_pos, length){
    obj_pos = obj_pos - Math.floor(obj_pos/length) * length;
    return obj_pos;
}

//keyevent handler function
function keyboard(value){
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = event => {
        if(event.key == key.value){
            if(key.isUp && key.press){
                key.press();
                key.isDown = true;
                key.isUp = false;
                event.preventDefault();
            }
        }
    }

    key.upHandler = event =>{
        if(event.key === key.value){
            if(key.isDown && key.release){
                key.release();
                key.isDown = false;
                key.isUp = true;
                event.preventDefault();
            }
        }
    }

    const DownListener = key.downHandler.bind(key);
    const UpListener = key.upHandler.bind(key);

    window.addEventListener("keydown", DownListener, false);
    window.addEventListener("keyup", UpListener, false);

    return key;
}





//------------------------------
//BLE Device Constructor
//------------------------------

/*
We assume that SERVICE_UUID        is "3f48001d-7fbd-48dc-8b12-4556caf802b1"
               CHARACTERISTIC_UUID is "868c0c4f-6087-4416-b9d7-0d5ff8aed46a"
*/

let BLE_DEVICE = function BLE_Device(name, service_uuid, charcteristic_uuid){
    this.device_obj = null;
    this.chara_obj = null;
    this.name = name;
    this.service_uuid = service_uuid;
    this.charcteristic_uuid = charcteristic_uuid;
}

BLE_DEVICE.prototype.datachange = function(){
    return function(event){
        value = event.target.value.getUint8(0)
        //console.log(value)

        first = value % 2;
        second = value % 3;
        third = value % 5;
        fourth = value % 7;

        if(first==0){
            btn_key['left_key'] = 1;
        }else{
            btn_key['left_key'] = 0;
        }
        if(second==0){
            btn_key['right_key'] = 1;
        }else{
            btn_key['right_key'] = 0;
        }
        if(third==0){
            btn_key['up_key'] = 1;
        }
        else{
            btn_key['up_key'] = 0;
        }
        if(fourth==0){
            btn_key['down_key'] = 1;
        }else{
            btn_key['down_key'] = 0;
        }

        buttonlog = "You are pushing: ";
        if(btn_key['left_key']){
            buttonlog += "left";
        }
        if(btn_key['right_key']){
            buttonlog += "right";
        }
        if(btn_key['up_key']){
            buttonlog += "up";
        }
        if(btn_key['down_key']){
            buttonlog += "down"
        }
        document.getElementById("value").innerHTML = buttonlog;

        // 冗長な感じではある
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
    this.device_obj.gatt.disconnect()
    this.device_obj = null;
}

let Client = new BLE_DEVICE("ESP32", "3f48001d-7fbd-48dc-8b12-4556caf802b1", "868c0c4f-6087-4416-b9d7-0d5ff8aed46a");