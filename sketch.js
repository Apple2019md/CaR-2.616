var person, road, car;
var personImg, roadImg, carImg;
var score = 0;
var personGroup;

var gameOver, restart;
var gameOverImg, restartImg;
var PLAY=1;
var END=0;
var gameState = PLAY;



function preload(){

    personImg = loadImage("person.png");
    roadImg = loadImage("road.png");
    carImg = loadImage("car.png");

    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");


}



function setup() {
    createCanvas(600, 600);

    road = createSprite(300,300,600,600);
    road.scale = 2;
    road.addImage("road", roadImg);
    road.velocityY = 2;
    
    car = createSprite(200, 250, 20, 35);
    car.addImage(carImg);
    car.scale = 0.3;
    
    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(300,140);
    restart.addImage(restartImg);

    personGroup = new Group();

}



function draw() {
    background("white");
    
    drawSprites();

    fill("white");
    text("Score: "+score, 525, 50);

    if(gameState === PLAY){
      
        gameOver.visible = false;
        restart.visible = false;
        
        score = score + Math.round(getFrameRate()/60);

        car.x = World.mouseX;
    
    
        if(road.y > 400){
            road.y = 300
        }

        if(personGroup.isTouching(car)){
            gameState = END;
        }
        spawnPeople();
       
    } 
       else if(gameState === END){
        
        gameOver.visible = true;
        restart.visible = true;
       
        road.velocityY = 0;
         
        personGroup.setVelocityEach(0);
        
        if(mousePressedOver(restart)){
            reset();
          }
       }


       
    
    
    
}
    




function reset(){
    gameState = PLAY;
    road.velocityY = 2;
    gameOver.visible = false;
    restart.visible = false;
    personGroup.destroyEach();
    score=0;
}


function spawnPeople(){
    
    if (frameCount % 60 === 0) {
      person = createSprite(400, -10, 10 , 40);
      person.x = Math.round(random(70,530));
      person.addImage(personImg);
      person.scale = 0.1;
      person.velocityY = 4;

      person.lifetime = 200;

      personGroup.add(person);

    }




}   
    
