export class UI{
    constructor(game){
        this.game = game;
        this.fontSize =40;
        this.fontFamily = this.game.font;
        this.livesImage = document.getElementById('lives');
    }
    draw(context){
        context.save();
        context.font = this.fontSize + 'px' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.font = this.fontSize *0.5 + 'px ' + this.fontFamily;
        context.fillText('Score' + this.game.score , 20, 50);
        //timer
        context.font = this.fontSize *0.6 + 'px ' + this.fontFamily;
        context.fillText('Time:' + (this.game.time *0.001).toFixed(1), 20,80);
        //lives
       /*  for (let i =0 ; i < this.game.lives; i++);{
            context.drawImage(this.livesImage ,25*i + 20 ,95 , 25, 25);
        }  */
       
        //gameOver message
        if (this.game.gameOver){
            context.textAlign='center';
            context.font = this.fontSize *2 + 'px ' + this.fontFamily;

            if(this.game.score >5){
            context.fillText('YAYYY' , this.game.width * 0.5 , this.game.height * 0.5-20);
            context.font = this.fontSize *0.7 + 'px ' + this.fontFamily;
            context.fillText("The hero we deserve but don't need" , this.game.width * 0.5 , this.game.height * 0.5 +20);
            }else{
                context.fillText('Oh man...' , this.game.width * 0.5 , this.game.height * 0.5-20);
                context.font = this.fontSize *0.7 + 'px ' + this.fontFamily;
                context.fillText('People will remember your mistake forever' , this.game.width * 0.5 , this.game.height * 0.5 +20);
            }
         
        }
        context.restore(); 
    }
}
