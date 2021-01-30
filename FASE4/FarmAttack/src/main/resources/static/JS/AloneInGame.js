class AloneInGame extends Phaser.Scene{
  constructor(){
      super("AloneInGame");
  }

  preload(){

  }

  create(){

    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());

    // 1) BACKGROUND
    this.backgroundWM = this.add.image(gameWidth/2, gameHeight/2, 'backgroundWM');

    //BOTON SALIR
    this.backButtonWM = this.add.image(gameWidth/2, gameHeight*12.85/16, 'quitButtonWM');
    this.backButtonWM.setDepth(2);
    this.backButtonWMSel = this.add.image(gameWidth/2, gameHeight*12.85/16, 'quitButtonWMsel');
    this.backButtonWMSel.setVisible(false);
    this.backButtonWMSel.setDepth(2);

    this.backButtonWM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenu());
    this.backButtonWM.on('pointerover', function (pointer) {this.backButtonWMSel.setVisible(true);}, this);
    this.backButtonWM.on('pointerout', function (pointer) {this.backButtonWMSel.setVisible(false);}, this);

  }

  BackMainMenu(){
    this.clickSound.play();
    //this.scene.stop(levelGameplay);
    this.scene.stop('AloneInGame');
    this.scene.sendToBack('AloneInGame');
    this.scene.start('InitMenu'); //Ver como hacer para que lleve a la anterior real
  }

  EffectsConfig(){
    return {
      mute: false,
      volume: volumeEffects/10,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    };
  }
}
