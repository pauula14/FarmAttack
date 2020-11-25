class InitMenu extends Phaser.Scene{
  constructor(){
      super("InitMenu");
  }

  preload(){

  }

  create(){
    //var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    //var heig = this.cameras.main.height;

    this.backgroundIM = this.add.image(0, 0, 'backgroundMenus');
    this.backgroundIM.setPosition(gameWidth/2, gameHeight/2);

    //ONLINE
    this.onlineButton = this.add.image(gameWidth*8/16, gameHeight*9.4/16, 'onlineButton');
    this.onlineButtonSel = this.add.image(gameWidth*8/16, gameHeight*9.4/16, 'onlineButtonSel');
    this.onlineButtonSel.setVisible(false);

    this.onlineButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.GameOnline());
    this.onlineButton.on('pointerover', function (pointer) {this.onlineButtonSel.setVisible(true);}, this);
    this.onlineButton.on('pointerout', function (pointer) {this.onlineButtonSel.setVisible(false);}, this);

    //OFFLINE
    this.offlineButton = this.add.image(gameWidth*8/16, gameHeight*12/16, 'offlineButton');
    this.offlineButtonSel = this.add.image(gameWidth*8/16, gameHeight*12/16, 'offlineButtonSel');
    this.offlineButtonSel.setVisible(false);

    this.offlineButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.GameOffline());
    this.offlineButton.on('pointerover', function (pointer) {this.offlineButtonSel.setVisible(true);}, this);
    this.offlineButton.on('pointerout', function (pointer) {this.offlineButtonSel.setVisible(false);}, this);

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
