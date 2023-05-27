class Enemy {
    constructor(){
        this.frameX=0;
        this.frameY=0;
        this.fps=20;
        this.frameInterval = 1000/ this.fps;
        this.frameTimer =0;
        this.markedForDeletion =false;
    }  
    update(deltaTime){
        //movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer =0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX =0;
        }else {
            this.frameTimer += deltaTime;
        }
        //check if off screen
        if (this.x + this.width <0) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.image, this.frameX*this.width ,0,  this.width , this.height, this.x , this.y , this.width , this.height);

    }
}
export class UFO extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=82;
        this.height=68;
        this.x=this.game.width + Math.random()*this.game.width*0.5 ;
        this.y=Math.random()*this.game.height*0.5;
        this.speedX=2;
        this.speedY=0;
        this.maxFrame=4;
        this.image = document.getElementById('ufo');
        this.angle =0;
        this.va = Math.random() * 0.1 + 0.1;
    }

    update(deltaTime){
        super.update(deltaTime);
        this.angle +=this.va;
        this.y += Math.sin(this.angle);
        
    }
}

export class ZombiNoLeg extends Enemy{
    constructor(game){
       super();
       this.game=game;
       this.width=71;
       this.height=90;
       this.x =this.game.width;
       this.y=this.game.height - this.height - this.game.groundMargin;
       this.image=document.getElementById('enemyZombi');
       this.speedX=0;
       this.speedY=0;
       this.maxFrame=5;


    }

}
export class LegEnemy extends Enemy{
    constructor(game){
        super();
        this.game=game;
        this.width=84.8;
        this.height=90;
        this.x= Math.random()*this.game.width*0.8;
        this.y=Math.random()*this.game.height*0.3;
        this.image=document.getElementById('leg');
        this.speedX=0;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame=5;
        this.angle =0;
        this.va = Math.random() * 0.1 + 0.1;
    }
    update(deltaTime){
        super.update(deltaTime);
        if (this.y > this.game.height - this.height - this.game.groundMargin) this.speedY*=-1;
        if(this.y < -this.height) this.markedForDeletion=true;
        this.angle +=this.va;
        this.y += Math.sin(this.angle);
    }
    draw(context){
        super.draw(context);
      
    }
}