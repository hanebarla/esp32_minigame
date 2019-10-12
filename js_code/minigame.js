const rend_width = 400;
const rend_height = 500;

var type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas";
}
PIXI.utils.sayHello(type);

var app = new PIXI.Application({
    width: rend_width,
    height: rend_height
});

document.getElementById("display").appendChild(app.view);

PIXI.Loader.shared
    .add("images/ship.png")
    .on("progress", loadProgressHandler)
    .load(setup);

var ship;
var state;

function loadProgressHandler(){
    console.log("loading");
}

function setup(){
    ship = new PIXI.Sprite(PIXI.loader.resources["images/ship.png"].texture);
    ship.x = rend_width / 2;
    ship.y = rend_height / 2;
    app.stage.addChild(ship);

    state = play;

    app.ticker.add(delta => gameloop(delta));
}

function gameloop(delta){
    requestAnimationFrame(gameloop);

    document.onkeydown = keydown;
}

function play(delta){

}

function keyboard(value){
    var key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = event => {
        if(event.key === key.value){
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

gameloop();
