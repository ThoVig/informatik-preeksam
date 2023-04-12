canX = 1000;
canY = 800;

//player movement
pMoveX = 100;
pMoveY = canY/2;
pHitboxRad = 50;
hastighed = 0;

function setup() 
{
  createCanvas(canX, canY);
}

function draw() 
{
  background(220);
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
}

//control movement with arrow keys
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

