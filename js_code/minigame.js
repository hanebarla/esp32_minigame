const const_width = 300;
const const_height = 500;
var w_width = window.innerWidth;
var w_height = window.innerHeight;

var width_scale = w_width / const_width;
var height_scale = w_height / const_height;

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

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
if(w_width >= w_height){
    app.renderer.resize(const_width * height_scale, w_height);
}else{
    app.renderer.resize(w_width, const_height * width_scale);
}

//var stage = new PIXI.Container();
