var sword;

var PLAY = 1;
var END = 0;
var gameState = 1;

var fruitsGroup, fruit1, fruit2, fruit3, fruit4;
var enemysGroup, enemy1;

function preload(){
  swordImage = loadImage("sword.png");
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  enemy1 = loadImage("alien1.png");
  
  gameOverImage = loadImage("gameover.png");
  
}

function setup(){
  createCanvas(600,600)
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  sword.setCollider("rectangle",0, 0, 40, 40);
  
  fruitsGroup = createGroup();
  enemysGroup = createGroup();
  
  score = 0;
  
}

function draw(){
  background("lightblue")
  
  
  
  if(gameState === PLAY ){
     sword.y = World.mouseY;
     sword.x = World.mouseX; 
     
    if(fruitsGroup.isTouching(sword)){
      fruitsGroup.destroyEach();
      score = score + 2
      }
     fruit();
     enemy();
     
     if(enemysGroup.isTouching(sword)){
       gameState = END;
     }
    }
     else if(gameState === END){
       fruitsGroup.velocityX = 0;
       enemysGroup.velocityY = 0;
       enemysGroup.destroyEach();
       
       sword.addImage(gameOverImage);
       sword.x = 200;
       sword.y = 200;
       
     }
 
  drawSprites();
  text("Score: " + score , 500, 50);
 }

function fruit(){
  if(World.frameCount%80===0){
    var fruit = createSprite(250,200,20,20);
    fruit.velocityX =-7;
    
    var rand = Math.round(random(1,4));
    switch(rand){
        case 1 : fruit.addImage(fruit1);
        break;
        case 2 : fruit.addImage(fruit2);
        break;
        case 3 : fruit.addImage(fruit3);
        break;
        case 4 : fruit.addImage(fruit4);
        break;
        default: break;
    
    }
    
    fruit.y = Math.round(random(50, 340));
    
    fruit.setLifetime = 100;
    fruit.scale =0.2;
    
    fruitsGroup.add(fruit);
  }
  
}

function enemy(){
  if(World.frameCount % 200 === 0){
    var enemy = createSprite(300, 200, 20, 20);
    enemy.addAnimation("moving", enemy1);
    enemy.y = Math.round(random(100,300));
    enemy.velocityX = -8; 
    enemy.setLifetime = 50;
    
    enemysGroup.add(enemy);
  }
}

















