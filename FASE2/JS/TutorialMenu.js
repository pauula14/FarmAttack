class TutorialMenu extends Phaser.Scene{
  constructor(){
      super("TutorialMenu");
  }

  preload(){

  }

  create(){

    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());

    //BACKGROUND
    this.backgroundTM = this.add.image(0, 0, 'backgroundTM');
    this.backgroundTM.setPosition(gameWidth/2, gameHeight/2);

    //BACK
    this.backButtonTM = this.add.image(gameWidth*14/16, gameHeight*14/16, 'backButtonTM');
    this.backButtonTM.setScale(2/3);
    this.backButtonTM.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.BackMainMenuTM());

  }

  BackMainMenuTM(){
    this.clickSound.play();

    this.scene.stop('TutorialMenu');
    this.scene.start(prevScene);
    prevScene = 'TutorialMenu';

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
