var mario,mario_running,mario_collided;
var bg,bgImage,ground;
var brickgroup,brickImg;
var coinGroup,coinSound, coinImg,coinScore=0;
var mushImg,turImg,obsGroup;
var dieSound;
var gameState="PLAY";
var restart, restartImage;

function preload(){
    mario_running=loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png");
    mario_collided=loadAnimation("images/dead.png")

    bgImage=loadImage("images/bgnew.jpg");

    brickImg=loadImage("images/brick.png");

    coinImg=loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png");
    coinSound=loadSound("sounds/coinSound.mp3");

    mushImg= loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png");
    turImg= loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png");
    
    dieSound= loadSound("sounds/dieSound.mp3");

    restartImage = loadImage("images/restart.png");
}

function setup() {
    createCanvas(1000, 600);

    // create background sprite
    bg= createSprite(580,300);
    bg.addImage(bgImage);
    bg.scale=0.5;

    //create mario sprite
    mario=createSprite(200,500,20,50);
    mario.addAnimation("running",mario_running)
    mario.addAnimation("collided",mario_collided)
    mario.scale=0.3;

    // create ground sprite
    ground=createSprite(200,585,400,10)
    ground.visible=false;

    // debugging mario
    mario.debug=false;

    //create groups
    brickgroup = new Group()
    coinGroup = new Group()
    obsGroup= new Group()

    // create restart button sprite
    restart = createSprite(500,300)
    restart.addImage(restartImage);
    restart.visible= false;
}

function draw() {
    if(gameState==="PLAY"){

        mario.setCollider("rectangle",0,0,200,500);
        mario.scale = 0.3
    // giving velocity to background
    bg.velocityX = -6

    // scrolling background
    if(bg.x<100){
        bg.x=bg.width/4
    }

    // making mario jump
    if(keyDown("space")){
        mario.velocityY=-10
    }

    // gravity
    mario.velocityY=mario.velocityY+0.5

   

    // calling the function
    generateBricks()

    // make mario step on brick
    for(var i=0;i<brickgroup.length;i++){
        var temp= brickgroup.get(i);
        if(temp.isTouching(mario) ){
            mario.collide(temp)
        }

    }

    // preventing mario from moving out with bricks
    if(mario.x<200){
        mario.x=200;
    }

    // preventing mario from going top of the screen
    if(mario.y<50){
        mario.y=50;
    }

    // calling function to generate coins
    generateCoins()

    // make mario catch the coins
    for(var i=0;i<coinGroup.length;i++){
        var coinTemp= coinGroup.get(i);
        if(coinTemp.isTouching(mario)){
            // playing sound when mario touches coin
            coinSound.play();
            // destroying the coin sprite
            coinTemp.destroy();
            coinTemp=null;
            // increasing the score when mario catches the coin
            coinScore++;
        }
    }

    // calling the function to generate obstacle
    generateObs()
    if(obsGroup.isTouching(mario)){
        dieSound.play();
        gameState="END"
    }
}
    else if(gameState==="END"){
        bg.velocityX=0;
        mario.velocityX=0;
        mario.velocityY=0;
        obsGroup.setVelocityXEach(0);
        coinGroup.setVelocityXEach(0);
        brickgroup.setVelocityXEach(0);
        mario.changeAnimation("collided",mario_collided);
        obsGroup.setLifetimeEach(-1);
        coinGroup.setLifetimeEach(-1);
        brickgroup.setLifetimeEach(-1);
        mario.scale= 0.4;
        mario.setCollider("rectangle",0,0,300,10)
        mario.y=570;
        restart.visible = true;
        if(mousePressedOver(restart)){
            restartGame()
        }
    }
     // mario not falling down
     mario.collide(ground)

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
function generateObs(){
    if(frameCount%100===0){
        var obs= createSprite(1200,538,10,40);
        obs.velocityX= -4
        obs.scale=0.2
        var rand=Math.round(random(1,2))
        switch(rand){
            case 1:
                obs.addAnimation("mush",mushImg)
                break
            case 2:
                obs.addAnimation("tur",turImg)
                break
            default:
                break
        }
        obs.lifetime= 400
        obsGroup.add(obs)
    }
}
function restartGame(){
    gameState="PLAY";
    obsGroup.destroyEach();
    brickgroup.destroyEach();
    coinGroup.destroyEach();
    mario.changeAnimation("running",mario_running);
    restart.visible= false;
    coinScore= 0;
}