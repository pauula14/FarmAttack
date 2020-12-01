class CreditsMenu extends Phaser.Scene{
  constructor(){
      super("CreditsMenu");
  }

  preload(){

  }

  create(){

    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());

    //BACKGROUND
    this.backgroundCM = this.add.image(0, 0, 'backgroundCM');
    this.backgroundCM.setPosition(gameWidth/2, gameHeight/2);

    //BACK
    this.backButtonCM = this.add.image(gameWidth*13.9/16, gameHeight*14.2/16, 'backButton');
    this.backButtonCMSel = this.add.image(gameWidth*13.9/16, gameHeight*14.2/16, 'backButtonSel');
    this.backButtonCMSel.setVisible(false);

    this.backButtonCM.on('pointerover', function (pointer) {this.backButtonCMSel.setVisible(true);}, this);
    this.backButtonCM.on('pointerout', function (pointer) {this.backButtonCMSel.setVisible(false);}, this);
    this.backButtonCM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenuCM());

  }

  BackMainMenuCM(){
    this.clickSound.play();

    prevScene = 'CreditsMenu';
    this.scene.stop('CreditsMenu');
    this.scene.start('MainMenu');
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
