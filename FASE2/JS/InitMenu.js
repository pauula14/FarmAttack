class InitMenu extends Phaser.Scene{
  constructor(){
      super("InitMenu");
  }

  preload(){

  }

  create(){
    //var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    //var heig = this.cameras.main.height;

    this.backgroundIM = this.add.image(0, 0, 'backgroundIM');
    this.backgroundIM.setPosition(gameWidth/2, gameHeight/2);

    //ONLINE
    this.onlineButton = this.add.image(gameWidth*8/16, gameHeight*7/16, 'onlineButton');
    //this.onlineButton.setScale(2/3);
    this.onlineButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.GameOnline());

    //OFFLINE
    this.offlineButton = this.add.image(gameWidth*8/16, gameHeight*10/16, 'offlineButton');
    //this.offlineButton.setScale(2/3);
    this.offlineButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.GameOffline());

  }

  GameOnline(){
    prevScene = 'InitMenu';
    console.log("El modo online aún no está listo")
  }

  GameOffline(){
    prevScene = 'InitMenu';
    this.scene.stop("InitMenu");
    this.scene.start("MainMenu");
  }

}
