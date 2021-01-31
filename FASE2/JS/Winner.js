class Winner extends Phaser.Scene{
  constructor(){
      super("Winner");
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

    this.finalPunt = this.add.text(gameWidth*8.2/16, gameHeight*9.2/16,  totalTime*5, {fontFamily: 'fort', fontSize: "60px", align: 'center', fill: "#ffffff", stroke: "#000000"});
    this.finalTime = this.add.text(gameWidth*8.2/16, gameHeight*7.1/16,  totalTime, {fontFamily: 'fort', fontSize: "60px", align: 'center', fill: "#ffffff", stroke: "#000000"});

  }

  BackMainMenu(){
    this.clickSound.play();

    this.scene.stop('Winner');
    this.scene.sendToBack('Winner');
    this.scene.start('MainMenu'); //Ver como hacer para que lleve a la anterior real
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
