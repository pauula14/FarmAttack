class GameOver extends Phaser.Scene{
  constructor(){
      super("GameOver");
  }

  preload(){

  }

  create(){

    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());

    // 1) BACKGROUND
    this.backgroundWM = this.add.image(gameWidth/2, gameHeight/2, 'backgroundGOM');

    //BOTON Reiniciar
    this.retryButtonGoM = this.add.image(gameWidth*10/16, gameHeight*13/16, 'retryButtonGOM');
    this.retryButtonGoM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.RetryGame());
    this.retryButtonGoM.setDepth(2);

    //BOTON SALIR
    this.backButtonGoM = this.add.image(gameWidth*5/16, gameHeight*13/16, 'quitButtonGOM');
    this.backButtonGoM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenu());
    this.backButtonGoM.setDepth(2);

  }

  BackMainMenu(){
    this.clickSound.play();

    this.scene.stop('GameOver');
    this.scene.sendToBack('GameOver');
    this.scene.start('MainMenu'); //Ver como hacer para que lleve a la anterior real
  }

  RetryGame(){
    this.clickSound.play();

    if(musicMenu.isPlaying){
      musicMenu.stop();
    }
    musicGameplay.play();

    this.scene.stop('GameOver');
    this.scene.sendToBack('GameOver');
    this.scene.start(levelGameplay);
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
