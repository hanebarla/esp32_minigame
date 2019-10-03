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

document.body.appendChild(app.view);

PIXI.loader
    .add("images/ship.png")
    .load(setup);

function setup(){
    var ship = new PIXI.Sprite(PIXI.loader.resources["images/ship.png"].texture);

    app.stage.addChild(ship);
}

//var stage = new PIXI.Container();
