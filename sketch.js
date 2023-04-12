let run1Img;
let run2Img;
let notRunImg;
let backgroundimg;
let cinema;

canX = 1000;
canY = 600;

//player movement
pMoveX = 100;
pMoveY = canY/2;
pHitboxRad = 50;
hastighed = 0;

function preload()
{
  run1Img = loadImage("assets/run.png");
  run2Img = loadImage("assets/run2.png");
  notRunImg = loadImage("assets/not_run.png");
  backgroundimg = loadImage("assets/city2.webp");
  cinemaImg = loadImage("assets/cinema.png")
}

function setup() 
{
  createCanvas(canX, canY);
  imageMode(CENTER);
}

function draw() 
{
  background(220);
  Background(backgroundimg, cinemaImg);
  circle(pMoveX, pMoveY, pHitboxRad); //draw the player
  
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

function Animation(img1,img2,img3,x,y)
{
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
  image(this.backimg, this.was, -200);
  image(this.backimg2, this.was2, -120);
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
}

// when movement keys are released, the player stops moving
function keyReleased()  
{
  hastighed = 0;
} 