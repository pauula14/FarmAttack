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
    this.backButtonOM = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'backButton');
    this.backButtonOMSel = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'backButtonSel');
    this.backButtonOMSel.setVisible(false);

    this.backButtonOM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenuTM());
    this.backButtonOM.on('pointerover', function (pointer) {this.backButtonOMSel.setVisible(true);}, this);
    this.backButtonOM.on('pointerout', function (pointer) {this.backButtonOMSel.setVisible(false);}, this);

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
