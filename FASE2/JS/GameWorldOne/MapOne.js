class MapOne extends Phaser.Scene{
  constructor(){
      super("MapOne");
  }

  preload(){

  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    //var background = this.add.image(0, 0, 'backgroundMO');
    //background.setScale(2/3)
    //background.setPosition(wid/2, heig/2);

    text = this.add.text(wid/2, heig/2, 'Bienvenido al mundo 1.1, a jugar!!!!!', {fill: 'red'});

    //BOTON ATRAS
    this.pauseButtonMO = this.add.image(wid*14/16, heig*2/16, 'pauseButtonMO');
    this.pauseButtonMO.setScale(1.5/3);
    this.pauseButtonMO.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.GoPauseMenu());
  }

  GoPauseMenu(){
    this.scene.pause('MapOne');
    this.scene.run('PauseMenu');
    this.scene.bringToTop('PauseMenu');
    //game.paused = true;
  }
}
