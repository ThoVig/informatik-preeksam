class Coke
{
    constructor(enemyModel)
    {
        this.length = 50;
        this.height = 90;
        this.x = canX + 50;
        this.y = random((this.height),(canY-this.height)) 
        this.speed = 5;
        this.flag = true;

        this.cokeEnemy = loadImage("CocaCola2D.png") ;
    }
  
  
    flytCoke(spillerX, spillerY, spillerRad)
    {
        imageMode(CORNER);
        rect(this.x, this.y, this.length, this.height)
        this.x = this.x - this.speed;
        image(this.cokeEnemy, this.x + 5, this.y);
        
        if(this.flag == true && this.x < spillerX + spillerRad/2 && this.x > spillerX - spillerRad/2 && this.y < spillerY + spillerRad && this.y  + this.height > spillerY - spillerRad)
        {
            print("collision");
            this.flag = false;
            coilled++;
            pipe.play();
        }
    }
}