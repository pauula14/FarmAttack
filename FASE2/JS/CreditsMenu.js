class CreditsMenu extends Phaser.Scene{
  constructor(){
      super("CreditsMenu");
  }

  preload(){

  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundCM');
    //background.setScale(2/3)
    background.setPosition(wid/2, heig/2);

    //BOTON ATRAS
    this.backButtonCM = this.add.image(wid*14/16, heig*14/16, 'backButtonCM');
    this.backButtonCM.setScale(1.5/3);
    this.backButtonCM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackMainMenu());
  }

  BackMainMenu(){
    this.scene.pause('CreditsMenu');
    this.scene.start('MainMenu');
  }
}
