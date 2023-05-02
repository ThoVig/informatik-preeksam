let run1Img;
let run2Img;
let notRunImg;
let backgroundimg;
let cinema;

state = 0;

canX = 1000;
canY = 600;

//player movement
pMoveX = 100;
pMoveY = canY/2;
pHitboxRad = 50;
hastighed = 0;

//enemy
enemyAmount = 5;
enemyObjList = [];
spawnInterval = 5000; //ms
coilled = 0;

//timer 
setInterval(countDown, spawnInterval);
count = 0;

function preload()
{
  run1Img = loadImage("assets/run.png");
  run2Img = loadImage("assets/run2.png");
  notRunImg = loadImage("assets/not_run.png");
  backgroundimg = loadImage("assets/dfq02wv-1bccb493-c267-45ba-aae5-868dbb011385.png");
  cinemaImg = loadImage("assets/dfq02wv-1bccb493-c267-45ba-aae5-868dbb011385.png");
  cokeEnemy = loadImage("CocaCola2D.png");
  soundFormats('ogg', 'mp3');
  sound = loadSound("assets/sound.mp3");
  pipe = loadSound("assets/pipe.mp3");
}

function setup() 
{
  fill(255);
  createCanvas(canX, canY);
  //push enemyobjects into list
  for(i = 0; i < enemyAmount; i++)
  {
    enemyObjList.push(new Coke(i)); 
  }
  sound.loop();
}

//this function gets called every SpawnInterval seconds, and increases count, which is used to make objects
function countDown()
{
  count++;
  print(count)
}

function draw() 
{
  background(220);
  if(state == 0)
  {
    Background(backgroundimg, cinemaImg);
    textAlign("center");
    textSize(50);
    text("Pepsi Man!", canX/2, 200);
    textSize(30);
    text("Tryk på op/ned pil for at undgå Coca Cola", canX/2, 300);
  }
  if(state == 1)
  {
    Background(backgroundimg, cinemaImg);
    circle(pMoveX, pMoveY, pHitboxRad); //draw the player
    enemyObjList[count].flytCoke(pMoveX, pMoveY, pHitboxRad);
    textAlign("left");
    textSize(18);
    text(`Fjender tilbage ${count} ud af ${enemyAmount}`, 20, 20);
    text(`Liv ${2-coilled} ud af 2`, 20, 40);
    
    //game over når alle enemies er blevet spawned
    if(count >= enemyAmount-1 || coilled == 2)
    {
      gameOver(); 
      count = 0;
    }
    
    pMoveY = pMoveY + hastighed; //make the player move up down
    
    //map borders
    if(pMoveY < pHitboxRad/2)
    {
      pMoveY = pHitboxRad/2;
      print("border");
    }
    else if(pMoveY > (canY-pHitboxRad/2))
    {
      pMoveY = canY-pHitboxRad/2;
    }
    
    Animation(run1Img, run2Img, notRunImg, pMoveX, pMoveY);
  }
}

function Animation(img1,img2,img3,x,y)
{
  imageMode(CENTER);
  this.img1 = img1;
  this.img2 = img2;
  this.img3 = img3;
  this.x = x;
  this.y = y;
  // function needs to be called to continue animating
  if(isNaN(this.timer))
  {
    this.timer = 0;
  }
  this.timer = deltaTime + this.timer;

  // timer
  if(this.timer < 500)
  {
    image(this.img1, this.x, this.y);
  }
  else if(this.timer < 1000)
  {
    image(this.img2, this.x, this.y);
  }
  else if(this.timer < 1500)
  {
    this.timer = 0;
  }
}

function Background(img, img2)
{
  this.backimg = img;
  this.backimg2 = img2;
  
  if(isNaN(this.was))
  {
    this.was = this.backimg2.width;
  }
  this.was = this.was - 7;
  if(isNaN(this.was2))
  {
    this.was2 = 0;
  }
  this.was2 = this.was2 - 7;

  imageMode(CORNER);
  image(this.backimg, this.was, -0);
  image(this.backimg2, this.was2, -0);
  if(this.was < -this.backimg.width)
  {
    this.was = this.backimg2.width;
  }
  if(this.was2 < -this.backimg2.width)
  {
    this.was2 = this.backimg.width;
  }
  imageMode(CENTER);
}

function keyPressed()
{
  if (keyCode === UP_ARROW)
  {
    hastighed = hastighed - 5;
  }
  else if (keyCode === DOWN_ARROW)
  {
    hastighed = hastighed + 5;
  }
  state = 1;
}

// when movement keys are released, the player stops moving
function keyReleased()  
{
  hastighed = 0;
} 

function gameOver()
{
  textSize(50);
  textAlign("center");
  if(coilled == 2)
  {
    text(`Game over \ndu blev ramt ${coilled} gange!`, canX/2, canY/2);
  }
  if(coilled == 0)
  {
    text("Tilykke du har vundet {PRIZE}", canX/2, canY/2-50);
  }
  else
  {
    text(`Du blev ramt ${coilled} gange!`, canX/2, canY/2);
  }
  exit();
}