var mario,mario_running,mario_collided;
var bg,bgImage,ground;
var brickgroup,brickImg;
var coinGroup,coinSound, coinImg,coinScore=0;

function preload(){
mario_running=loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
bgImage=loadImage("images/bgnew.jpg");
brickImg=loadImage("images/brick.png");
coinImg=loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png");
coinSound=loadSound("sounds/coinSound.mp3")
}

function setup() {
createCanvas(1000, 600);

bg= createSprite(580,300);
bg.addImage(bgImage);
bg.scale=0.5;
mario=createSprite(200,500,20,50);
mario.addAnimation("running",mario_running)
mario.scale=0.3;
ground=createSprite(200,585,400,10)
ground.visible=false;
mario.debug=false;

brickgroup = new Group()
coinGroup = new Group()

}

function draw() {
bg.velocityX = -6
if(bg.x<100){
    bg.x=bg.width/4
}

if(keyDown("space")){
    mario.velocityY=-10
}

mario.velocityY=mario.velocityY+0.5
mario.collide(ground)
generateBricks()
for(var i=0;i<brickgroup.length;i++){
    var temp= brickgroup.get(i);
    if(temp.isTouching(mario) ){
        mario.collide(temp)
    }

}


if(mario.x<200){
    mario.x=200;
}

if(mario.y<50){
    mario.y=50;
}
generateCoins()
for(var i=0;i<coinGroup.length;i++){
    var coinTemp= coinGroup.get(i);
    if(coinTemp.isTouching(mario)){
        coinSound.play();
        coinTemp.destroy();
        coinTemp=null;
        coinScore++;
    }
}

drawSprites()  
fill("blue")
textSize(20)  
text("Coin Score: "+coinScore,500,50)

}

function generateBricks(){
    if(frameCount%70===0){
        var brick= createSprite(1200,120,40,10);
        brick.y= random(50,450);
        brick.velocityX=-5;
        brick.addImage(brickImg);
        brick.scale= 0.5;
        brickgroup.add(brick);
        brick.lifetime=300;
    }
}
function generateCoins(){
    if(frameCount%50===0){
        var coin= createSprite(1200,120,40,10)
        coin.addAnimation("coin",coinImg)
        coin.velocityX=-3;
        coin.scale=0.1;
        coin.y=random(80,350)
        coin.lifetime=1000;
        coinGroup.add(coin)
    }
}