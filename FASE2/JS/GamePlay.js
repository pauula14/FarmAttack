class GamePlay extends Phaser.Scene{
  constructor(){
      super("GamePlay");
  }

  preload(){

  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    //var background = this.add.image(0, 0, 'backgroundOM');
    //background.setScale(2/3);
    //background.setPosition(wid/2, heig/2);

/*  //BOTON ATRAS
    this.backButtonOM = this.add.image(wid*14/16, heig*14/16, 'backButtonOM');
    this.backButtonOM.setScale(1.5/3);
    this.backButtonOM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackMainMenu());*/
  }

}
