var type = "WebGL";
if(!devicePixelRatio.utils.isWebGLSupported()){
    type = "canvas";
}
devicePixelRatio.utils.sayHello(type);