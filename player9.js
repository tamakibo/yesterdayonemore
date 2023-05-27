import { SelfJudge , WalkinAround ,Supersaiya, Jumping ,Balling ,Falling } from "./playerState9.js";
import { CollisionAnimation } from "./collisionAnimation9.js";
export class Player{
    constructor(game){
        this.game = game;
        this.width=141.4;
        this.height=142.57;
        this.x=0;
        this.y=this.game.height -this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight=1;
        this.image = document.getElementById('player');
        this.frameX =0;
        this.maxFrame=5;
        this.fps=20; //speed of the animation 
        this.frameInterval=1000/this.fps;
        this.frameTimer=0;
        this.frameY=0;
        this.speed=0;
        this.maxSpeed=10;
        this.states=[new SelfJudge(this.game) , new WalkinAround(this.game), new Supersaiya(this.game), new Jumping(this.game) , new Balling(this.game) , new Falling(this.game) ];
        
    }
    update(input , deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        //horizontal movement
        this.x += this.speed
         if (input. includes('ArrowRight')) this.speed = this.maxSpeed;
         else if (input.includes('ArrowLeft')) this.speed =- this.maxSpeed;
         else this.speed =0;

         /* boundati'ries */
         if (this.x <0 ) this.x =0;
         if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

         //vertical movement
        
         //if (input.includes('ArrowUp')&&this.onGround()) this.vy -=20;
         this.y += this.vy;
         if (!this.onGround()) this.vy += this.weight;
         else this.vy = 0;
         //VERTICAL BOUNDARI
         if (this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;
         //sprite animation
         //if (this.frameX <this.maxFrame) this.frameX++;
         //else this.frameX=0;
         if (this.frameTimer > this.frameInterval){
            this.frameTimer =0;
            if (this.frameX <this.maxFrame) this.frameX++;
           else this.frameX=0;
         }else {
            this.frameTimer +=deltaTime;
         }
    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x , this.y , this.width , this.height);
        context.fillStyle='red';
        context.drawImage(this.image ,this.frameX*this.width,this.frameY * this.height,this.width , this.height,this.x , this.y  , this.width , this.height );
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state , speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed*speed;
        this.currentState.enter();
    }
    checkCollision(){
        this.game.enemies.forEach(enemy =>{
            if(
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y+ this.height &&
                enemy.y + enemy.height > this.y
            ){
                //collision detected
                enemy.markedForDeletion = true;
                this.game.score++;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width*0.5,enemy.y + enemy.height *0.5));
                if(this.currentState===this.states[4] || this.currentState ===this.states[5]){
                    this.game.score++;
                }else{
                //no collision , it will get hit animation if collided in stateso ther than 4 and 5
                this.setState(5,0);
            }
        }
        });
    }
}