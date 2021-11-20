var mario,mario_running,mario_collided;
var bg,bgImage,ground;
var brickgroup,brickImg;

function preload(){
mario_running=loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
bgImage=loadImage("images/bgnew.jpg");
brickImg=loadImage("images/brick.png")
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

drawSprites()    
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