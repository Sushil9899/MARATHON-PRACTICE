const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;


let engine;
let world;

var boy,boy_run,boy_jump,boy_collide,boy_stand,boy_slide,boy_fall
var ground,backgroundImg,road,road2
var logG,log,bombG,bomb,spikeG,spike

var PLAY = 1;
var END = 0;
var gameState = SERVE;
var SERVE = 2
var startB

var jumpb
var bg,jumps,wins,overs
var obstacle_1G

var score = 0
var form,formImg,wins

function preload(){

  boy_stand = loadAnimation('stand.png','stand.png','stand.png','blink.png')
 boy_run = loadAnimation("run.png","run2.png","run3.png","run4.png","run5.png")
 boy_slide = loadAnimation('slide.png','slide.png','slide.png')
 boy_fall = loadAnimation(
 "fall.png")
 
 formImg = loadImage("FORM.png")
 wins = loadSound("win.wav")
 

backgroundImg = loadImage("bg.png")

bg = loadSound("pf.mp3")
jumps = loadSound("jump.wav")
wins = loadSound("win.wav")
overs = loadSound("over.wav")

logImg = loadImage("log.png")

boy_jump.looping = false
boy_run.playing = true
boy_slide.looping = false
boy_fall.looping = false


}

function setup(){
  var isMobile = /iPhone | iPad | iPod | Android /i.test(navigator.userAgent) 
  if(isMobile){
 
   canW = displayWidth
   canH = displayHeight
   createCanvas(displayWidth+80,displayHeight)
  }
 
  else{
 
   canW = windowWidth
   canH = windowHeight
 
   createCanvas(windowWidth,windowHeight)
  }
  frameRate(60);
  bg.loop()
  engine = Engine.create();
  world = engine.world;
  


  ground = createSprite(1500,100)
  ground.addImage(backgroundImg)
 ground.scale = 2.5

 form = createSprite(1000,420)
 form.addImage(formImg)
 form.scale = 0.6
 //ground.velocityX = -6

  boy = createSprite(100,500)
   boy.addAnimation("stand",boy_stand)
  boy.frameDelay = 49
 
  boy.addAnimation("run",boy_run)
  boy.addAnimation("slide",boy_slide)
  boy.addAnimation("fall",boy_fall)

  startB = createImg('start.png')
  startB.position(100,200)
  startB.size(200,100)
  startB.mouseClicked(start)

  jumpb = createImg('jb.png')
  jumpb.position(10,500)
  jumpb.size(150,150)
  jumpb.mouseClicked(jump)
  

  obstacle_1G = createGroup ()

road = createSprite(100,650,10000,2)
road.visible = false
console.log(boy.y)

boy.setCollider("rectangle",0,0,100,200);

}

function draw(){

  background(181)
  
  Engine.update(engine);
  drawSprites()
  jumpb.size(0,0)
  //camera.position.x = boy.x
  camera.position.y = boy.y
  if(gameState === PLAY){
   if (ground.x < 0){
    ground.x = ground.width/1;
  }

  if(keyDown("space")&& boy.y >= 500) {
    boy.velocityY = -20
    jumps.play()
    
    boy.changeAnimation('run')
    boy_run.frameDelay = 40
  }
  boy.velocityY = boy.velocityY + 0.6
  jumpb.size(150,150)

 startB.size(0,0)
 spawnClouds()
 if(obstacle_1G.isTouching(boy)){
  gameState = END
  overs.play()
  
}
fill("black")
textSize(60)
text("Score: "+score,20,330)
score = score+Math.round(frameCount / 60 )

if(keyDown("down")){
  boy.changeAnimation('slide')
  boy.frameDelay = 40
}
  }
 boy.collide(road)
 if(score>10000){
 win()

 gameState = SERVE
 boy.changeAnimation("stand")
 ground.velocityX = 0
 }
 
   if(gameState === END){

    boy.changeAnimation('fall')
    ground.velocityX = 0
    bg.stop()
    reset()

    }
   
  
 
     
   
}


function start(){
  gameState = PLAY
  ground.velocityX = -10
  boy.changeAnimation('run')
  form.scale = 0
  
}

function over(){

  boy.changeAnimation()
  ground.velocityX = 0 

}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 180 === 0) {
    var cloud = createSprite(1200,500,40,10);
    cloud.addImage(logImg)
    cloud.y = Math.round(random(560,660))
    cloud.scale = 0.4;
    cloud.velocityX = -15;
    cloud.depth = boy.depth
    boy.depth = boy.depth + 1;
    cloud.lifetime = 200
    obstacle_1G.add(cloud)
  }
}
function jump(){

 
  if(boy.y >= 500){
    boy.velocityY = -20
  }
  jumps.play()
}

function reset() {
  swal(
    {
      title: `GAME OVER`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/blink_1.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
} 
function win() {
  swal(
    {
      title: `YOU WIN`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/blink_1.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );

} 