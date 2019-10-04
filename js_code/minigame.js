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
        case 'a':
            ship.x -= 1;
        case 's':
            ship.y += 1;
        case 'd':
            ship.x += 1;
        case 'w':
            ship.y -= 1;
    }
}

gameloop();
