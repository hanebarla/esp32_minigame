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

function loadProgressHandler(){
    console.log("loading");
}

function setup(){
    ship = new PIXI.Sprite(PIXI.loader.resources["images/ship.png"].texture);
    ship.x = rend_width / 2;
    ship.y = rend_height / 2;

    app.stage.addChild(ship);
    app.ticker.add(delta => gameloop(delta));
}

function gameloop(delta){
    requestAnimationFrame(gameloop);

    document.onkeydown = keydown;
}


function keydown(){
    target = document.getElementById("display");

    switch(event.keyCode){
        case "a":
            ship.x -= 1;
            console.log("a_code pushed");
            break;
        case "s":
            ship.y += 1;
            console.log("s_code pushed");
            break;
        case "d":
            ship.x += 1;
            console.log("d_code pushed");
            break;
        case "w":
            ship.y -= 1;
            console.log("w_code pushed");
            break;
        default:
            break;
    }
}

gameloop();
