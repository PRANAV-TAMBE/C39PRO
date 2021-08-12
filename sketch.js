var gameState = "PLAY";

var scater,scaterImg;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var edges;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){

  scaterImg = loadImage("scater.png");
  groundImage = loadImage("ground.png");

  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(displayWidth, displayHeight);
    
 
  ground = createSprite(-displayWidth*2,0,displayWidth*5,displayHeight);   
  
  ground.addImage("ground",groundImage);
  ground.velocityX=5;
  ground.scale=8;

  scater = createSprite(displayWidth/3,displayHeight/2);
  scater.addImage(scaterImg);
  scater.scale=0.2;
  
  gameOver = createSprite(displayWidth/2,displayHeight/2);
  gameOver.addImage(gameOverImg);
  gameOver.scale=1.7;
  
  restart = createSprite(displayWidth/2,displayHeight/1.5);
  restart.addImage(restartImg);
  restart.scale=0.5;
  

  
  //invisibleGround = createSprite(width/2,height-10,width,10);
  //invisibleGround.visible = false;

  obstaclesGroup = createGroup();

 //scater.setCollider("rectangle",0,0,scater.width,scater.height);
   scater.setCollider("circle",0,0,50);
  score = 0;
  
}

function draw() {
  
  background(225);
  scater.collide(ground);

console.log(scater.y);

  if(gameState === "PLAY"){

  //edges=createEdgeSprites();
  if (ground.x < 0){
    ground.x = ground.width/2;
  }


    
    
    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
  
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if((touches.length>0 || keyDown("space"))){
        scater.velocityY = -5;
        jumpSound.play();
      touches=[] 
    }
    
    
 //scater.velocityY = scater.velocityY + 0.5
// if(keyDown("space") ){
  //scater.velocityX=2;
//}
      
    if(obstaclesGroup.isTouching(scater)){
       gameState ="END";
      gameOver.visible = true;
      restart.visible = true;
      dieSound.play()
      
    }
  }
   else if (gameState === "END") {

     

    
      ground.velocityX = 0;
      scater.velocityY = 0
      
      obstaclesGroup.setLifetimeEach(-1);

      obstaclesGroup.setVelocityXEach(0);
     
  obstaclesGroup.destroyEach();
  
   }
  
  
  
  if(mousePressedOver(restart)) {
      reset();
    }

  

  spawnObstacles();
  drawSprites();
  

  camera.position.x=scater.x;
  camera.position.y = displayHeight/2;
    fill("black");
  textSize(20)
  text("Score: "+ score, 50,40);
}

function reset(){
 
  gameState = "PLAY";
  
  
  gameOver.visible=false;
  restart.visible=false;
  
  
  score=0;
}


function spawnObstacles(){
 if (frameCount % 120 === 0){
   var obstacle = createSprite(displayWidth-100,displayHeight-200,10,40);
   obstacle.velocityX = -(6 + 3* score/100 )
  

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
        
               break;
      case 2: obstacle.addImage(obstacle2);
 
              break;
      case 3: obstacle.addImage(obstacle3);
                
              break;
      default: break;
    }
    obstacle.scale = 0.6;
    obstacle.lifetime = 300;
   

    obstaclesGroup.add(obstacle);
 }
}
