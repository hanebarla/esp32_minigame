const rend_width = 400;
const rend_height = 500;
let ship;
let state;
const speed = 5 / 500;

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
    .add("images/ship.png")
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(){
    console.log("loading");
}

function setup(){
    //Create player and enemy ship
    player_ship = new PIXI.Sprite(PIXI.loader.resources["images/ship.png"].texture);
    player_ship.x = rend_width / 2;
    player_ship.y = rend_height / 2;
    player_ship.vx = 0;
    player_ship.vy = 0;
    app.stage.addChild(player_ship);

    let left = keyboard('a');
    let right = keyboard('d');
    let up = keyboard('w');
    let down = keyboard('s');

    left.press = () => {
        player_ship.vx = -speed;
        player_ship.vy = 0;
    };
    left.release = () => {
        if(!right.isDown && player_ship.vy === 0){
            player_ship.vx = 0;
        }
    };

    right.press = () => {
        player_ship.vx = speed;
        player_ship.vy = 0;
    };
    right.release = () => {
        if(!left.isDown && player_ship.vy === 0){
            player_ship.vx = 0;
        }
    };

    up.press = () =>{
        player_ship.vx = 0;
        player_ship.vy = -speed;
    };
    up.release = () =>{
        if(!down.isDown && player_ship.vx === 0){
            player_ship.vy = 0;
        }
    };

    down.press = () =>{
        player_ship.vx = 0;
        player_ship.vy = speed;
    };
    down.release = () =>{
        if(!up.isDown && player_ship.vx === 0){
            player_ship.vy = 0;
        }
    };

    state = play;

    app.ticker.add(delta => gameloop(delta));
}

function gameloop(delta){
    requestAnimationFrame(gameloop);

    state(delta);
}

function play(delta){
    console.log(player_ship.x);
    player_ship.x += player_ship.vx;
    player_ship.y += player_ship.vy;
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
