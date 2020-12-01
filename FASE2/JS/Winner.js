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
    this.backButtonWM = this.add.image(gameWidth/2, gameHeight*13/16, 'quitButtonWM');
    this.backButtonWM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenu());
    this.backButtonWM.setDepth(2);
  }

  BackMainMenu(){
    this.clickSound.play();

    this.scene.stop('OptionsMenu');
    this.scene.sendToBack('OptionsMenu');
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
