const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var ground,leftWall,rightWall;
var chain,jointLink,jointPoint;
var stones=[]
var zombie1,zombie2,zombie3,zombie4,bgImg;
var zombie,background;


function preload(){
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");
  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");
  bgImg = loadImage("./assets/background.png");
}

function setup() {
  // createCanvas(windowWidth, windowHeight);
  createCanvas(600, 600);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(300,550,600,20);
  leftWall = new Base(10,300,10,200);
  rightWall = new Base(590,300,10,200);
  chain = new Bridge(17,{x:590,y:300});
  Matter.Composite.add(chain.body, leftWall);
  jointLink = new link(chain,leftWall);
  stone = new Stone(300,300,20); 


  for(var i =0;i<=8;i++){
    var x = random(width/2-200,width/2+300)
    var y = random(-10,140);
    var stone= new Stone(x ,y,30);
    stones.push(stone);
  }
  // background = createSprite(300,300);
  // background.addImage(bgImg);

  zombie = createSprite(width / 2 , height - 110);
  zombie.addAnimation("leftToRight", zombie1,zombie2,zombie1);
  zombie.addAnimation("rightToLeft", zombie3,zombie4,zombie3);
  zombie.scale = 0.1;
  zombie.velocityX = 10;

  breakButton = createButton("");
  breakButton.position(width - 200,height/2-50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);
}

function draw() {
  background(51);
  Engine.update(engine);

  ground.show();
  leftWall.show();
  rightWall.show();
  chain.show();

 for (var stone of stones) { 
   stone.show(); 
  }

  if(zombie.position.x > width-300 ){
    zombie.velocityX = -10;
    zombie.changeAnimation("rightToLeft");
  }
  if(zombie.position.x <= 300 ){
    zombie.velocityX = 10;
    zombie.changeAnimation("leftToRight");
  }


  drawSprites();
}

function handleButtonPress(){
  jointLink.detach();
  setTimeout(() => {
  chain.break();
  },1500);
}