const const_width = 400;
const const_height = 500;
var w_width = window.innerWidth;
var w_height = window.innerHeight;

var width_scale = w_width / const_width;
var height_scale = w_height / const_height;

if(w_width >= w_height){
    const_width = const_width * height_scale * 6/7;
    const_height = const_height * 6/7;
}else{
    const_width = w_width;
    const_height = const_height * width_scale;
}

var type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas";
}
PIXI.utils.sayHello(type);

var app = new PIXI.Application({
    width: const_width,
    height: const_height
});

document.body.appendChild(app.view);

//var stage = new PIXI.Container();
