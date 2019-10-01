const rend_width = 400;
const rend_height = 500;

/*
var w_width = window.innerWidth;
var w_height = window.innerHeight;

var width_scale = w_width / rend_width;
var height_scale = w_height / rend_height;

if(w_width >= w_height){
    rend_width = rend_width * height_scale * 6/7;
    rend_height = rend_height * 6/7;
}else{
    rend_width = rend_width;
    rend_height = rend_height * rend_scale;
}
*/

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

//var stage = new PIXI.Container();
