class PrePlayManu extends Phaser.Scene{
  constructor(){
      super("PrePlayManu");
  }

  preload(){

  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    //var background = this.add.image(0, 0, 'backgroundMM');
    //background.setOrigin(0, 0);
    //background.setPosition(wid/2, heig/2);
    //background.setScale(2/3);
  }

}
