const rend_width = 400;
const rend_height = 500;
let player_ship;
let enemy_ship;
let state;
const speed = 1.5;
let message = new Text();

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
    .add(["images/ship.png",
          "images/my_ship_huge.png",
          "images/enemy_ship_huge.png"])
    .on("progress", loadProgressHandler)
    .load(setup);

function loadProgressHandler(){
    console.log("loading");
}

function setup(){
    //Create player and enemy ship
    player_ship = new PIXI.Sprite(PIXI.Loader.shared.resources["images/my_ship_huge.png"].texture);
    enemy_ship = new PIXI.Sprite(PIXI.Loader.shared.resources["images/enemy_ship_huge.png"].texture);

    player_ship.anchor.set(0.5);
    player_ship.x = app.screen.width / 2;
    player_ship.y = app.screen.height * 2 / 3;
    player_ship.vx = 0;
    player_ship.vy = 0;
    app.stage.addChild(player_ship);

    enemy_ship.anchor.set(0.5);
    enemy_ship.rotation = Math.PI;
    enemy_ship.x = app.screen.width / 2;
    enemy_ship.y = app.screen.height / 3;
    enemy_ship.vx = 0;
    enemy_ship.vy = 0;
    app.stage.addChild(enemy_ship);

    let left = keyboard('a');
    let right = keyboard('d');
    let up = keyboard('w');
    let down = keyboard('s');

    left.press = () => {
        player_ship.vx = -speed;
        player_ship.vy = 0;
    };
    left.release = () => {
        if(!right.isDown && player_ship.vy == 0){
            player_ship.vx = 0;
        }
    };

    right.press = () => {
        player_ship.vx = speed;
        player_ship.vy = 0;
    };
    right.release = () => {
        if(!left.isDown && player_ship.vy == 0){
            player_ship.vx = 0;
        }
    };

    up.press = () =>{
        player_ship.vx = 0;
        player_ship.vy = -speed;
    };
    up.release = () =>{
        if(!down.isDown && player_ship.vx == 0){
            player_ship.vy = 0;
        }
    };

    down.press = () =>{
        player_ship.vx = 0;
        player_ship.vy = speed;
    };
    down.release = () =>{
        if(!up.isDown && player_ship.vx == 0){
            player_ship.vy = 0;
        }
    };

    state = play;

    app.ticker.add(delta => gameloop(delta));
}

function gameloop(delta){

    state(delta);
}

function play(delta){
    if(hitTestRectangle(player_ship, enemy_ship)){
        message.text = "hit!";
        console.log("hit");
    }
    player_ship.x += player_ship.vx;
    player_ship.y += player_ship.vy;
    player_ship.x = display_loop(player_ship.x, rend_width);
    player_ship.y = display_loop(player_ship.y, rend_height);
    enemy_ship.x = display_loop(enemy_ship.x, rend_width);
}

function display_loop(obj_pos, length){
    obj_pos = obj_pos - Math.floor(obj_pos/length) * length;
    return obj_pos;
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

function hitTestRectangle(r1, r2) {

    //Define the variables we'll need to calculate
    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy, leng, combinedleng;
  
    //hit will determine whether there's a collision
    hit = false;
  
    //Find the center points of each sprite
    r1.centerX = r1.x + r1.width / 2;
    r1.centerY = r1.y + r1.height / 2;
    r2.centerX = r2.x + r2.width / 2;
    r2.centerY = r2.y + r2.height / 2;
  
    //Find the half-widths and half-heights of each sprite
    r1.halfWidth = r1.width / 2;
    r1.halfHeight = r1.height / 2;
    r2.halfWidth = r2.width / 2;
    r2.halfHeight = r2.height / 2;
  
    //Calculate the distance vector between the sprites
    vx = Math.abs(r1.centerX - r2.centerX);
    vy = Math.abs(r1.centerY - r2.centerY);
    //leng = Math.sqrt(vx*vx + vy*vy);
  
    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = (r1.halfWidth + r2.halfWidth);
    combinedHalfHeights = 2*(r1.halfHeight + r2.halfHeight)/3;
    //combinedleng = Math.sqrt(combinedHalfHeights*combinedHalfHeights + combinedHalfWidths*combinedHalfWidths);
    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
  
      //A collision might be occurring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
  
        //There's definitely a collision happening
        hit = true;
      } else {
  
        //There's no collision on the y axis
        hit = false;
      }
    } else {
  
      //There's no collision on the x axis
      hit = false;
    }
    /*
    if(leng < combinedleng){
        hit = true;
    }else{
        hit = false;
    }*/
  
    //`hit` will be either `true` or `false`
    return hit;
  };
