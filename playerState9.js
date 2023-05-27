import { Ribbon } from "./particles.js";
const states={
    SELFJUDGE :0,
    WALKINGAROUND:1,
    SUPERSAIYA:2,
    JUMPING:3,
    BALLING:4,
    FALLING:5,
    HIT:6
}
class State {
    constructor(state,game){
        this.state=state;
        this.game=game;

    }
}

export class SelfJudge extends State{
     constructor(game){
        super('SELFJUDGE',game);
     }
     enter(){
        this.game.player.frameX=0;
        this.game.player.maxFrame=1;
         this.game.player.frameY =3;
         
     }
     handleInput(input){
       if (input.includes('ArrowLeft') ||input.includes('ArrowRight')){
        this.game.player.setState(states.WALKINGAROUND,1);
       }else if(input.includes('Enter')){
        this.game.player.setState(states.BALLING,2);
       }
     }
}


export class WalkinAround extends State{
    constructor(game){
       super('WALKINAROUND',game);
    }
    enter(){
        this.game.player.frameX=0;
        this.game.player.maxFrame=3;
        this.game.player.frameY =2;
       
    }
    handleInput(input){
     
      if (input.includes('ArrowDown') ){
       this.game.player.setState(states.SELFJUDGE,0);
      } else if (input.includes('ArrowUp')){
        this.game.player.setState(states.SUPERSAIYA,1);
      }else if(input.includes('Enter')){
        this.game.player.setState(states.BALLING,2);
       }
    }
}


export class Supersaiya extends State{
    constructor(game){
       super('SUPERSAIYA',game);
    }
    enter(){
        this.game.player.frameX=0;
        this.game.player.maxFrame=1;
        if(this.game.player.onGround()) this.game.player.vy -=30;
        this.game.player.frameY =1;
    }
    handleInput(input){
      if (this.game.player.vy > this.game.player.weight ) {
       this.game.player.setState(states.JUMPING,1);
      }else if(input.includes('Enter')){
        this.game.player.setState(states.BALLING,2);
       }else if (input.includes('ArrowDown')){
        this.game.player.setState(states.FALLING,0);
       }
    }
}

export class Jumping extends State{
    constructor(game){
       super('JUMPING',game);
    }
    enter(){
        this.game.player.frameX=0;
        this.game.player.maxFrame=0;
        this.game.player.frameY =5;
    }
    handleInput(input){
      if (this.game.player.onGround()) {
       this.game.player.setState(states.WALKINGAROUND,1);
      }else if (input.includes('ArrowDown')){
        this.game.player.setState(states.FALLING,0);
       }
    }
}


export class Balling extends State{
  constructor(game){
     super('BALLING',game);
  }
  enter(){
      this.game.player.frameX=0;
      this.game.player.maxFrame=4;
      this.game.player.frameY =4;
  }
  handleInput(input){
  
    if (!input.includes('Enter') && this.game.player.onGround()) {
     this.game.player.setState(states.WALKINGAROUND,1);
    
  }else if (!input.includes('Enter')&&!this.game.player.onGround()){
    this.game.player.setState(states.JUMPING,1);
  } else if (input.includes('Enter') && input.includes('ArrowUp') && this.game.player.onGround()){
    this.game.player.vy -=27;
  }else if (input.includes('ArrowDown')){
    this.game.player.setState(states.FALLING,0);
   }
}
}


export class Falling extends State{
  constructor(game){
     super('FALLING',game);
  }
  enter(){
      this.game.player.frameX=0;
      this.game.player.maxFrame=6;
      this.game.player.frameY =6;
      this.game.player.vy=15;
  }
  handleInput(input){
    this.game.particles.unshift(new Ribbon(this.game , this.game.player.x + this.game.player.width *0.5 , this.game.player.y + this.game.player.height*0.5));
    if ( this.game.player.onGround()) {
     this.game.player.setState(states.WALKINGAROUND,1);
   
    
    
  }else if (input.includes('Enter')&&!this.game.player.onGround()){
    this.game.player.setState(states.BALLING,2);
  } 
}
}
