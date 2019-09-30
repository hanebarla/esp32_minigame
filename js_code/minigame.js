var type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas";
}
PIXI.utils.sayHello(type);

var app = new PIXI.Application({
    width: 600,
    height: 800
});

document.body.appendChild(app.view);

//var stage = new PIXI.Container();