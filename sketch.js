var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var survivalTime = 0;
var score = 0;
var ground;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(800, 400);

  //creating ground
  ground = createSprite(400, 350, 1500, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;

  //creating monkey
  monkey = createSprite(80, 314, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;



  obstacleGroup = new Group();
  bananaGroup = new Group();

  //ground.debug = true;
  //monkey.debug = true

}


function draw() {
  background("lightBlue")




  //creating scoreboard
  stroke("white");
  textSize(20);
  fill("white");
  text("score: " + score, 500, 50);

  //creating survival time
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.round(frameCount / frameRate())
  text("playing time: " + survivalTime, 100, 50);


  if (keyDown("space") && (monkey.y > 310)) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.5;
  monkey.collide(ground);

  if (ground.x < 50) {
    ground.x = 300;
  }

  if (frameCount % 90 === 0) {
    spawnObstacles();
  }

  if (frameCount % 110 === 0) {
    spawnBanana();
  }

  if (monkey.isTouching(obstacleGroup)) {
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    survivalTime = 0;
    score = 0;
  }

  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score = score + 1;
  }

  drawSprites();
}

function spawnObstacles() {
  obstacle = createSprite(700, 314, 10, 10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -6;
  obstacle.lifetime = 150;
  obstacle.setCollider("circle", 0, 0, 175);
  //obstacle.debug = true;
  obstacleGroup.add(obstacle);

}

function spawnBanana() {
  banana = createSprite(700, 200, 10, 10);
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -4;
  banana.lifetime = 200;
  banana.setCollider("circle", 0, 0, 175);
  //banana.debug = true;
  bananaGroup.add(banana);
}