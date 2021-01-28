class OptionsMenu extends Phaser.Scene{
  constructor(){
      super("OptionsMenu");
  }

  preload(){

  }

  create(){

    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());

    //BACKGROUND
    this.backgroundOM = this.add.image(gameWidth/2, gameHeight/2, 'backgroundOM');

    this.VolumeMus = this.add.text(gameWidth*9.2/16, gameHeight*8/16,  volumeMusic, {fontFamily: 'fort', fontSize: "60px", align: 'center', fill: "#ffffff", stroke: "#000000"});
    this.VolumeEff = this.add.text(gameWidth*9.2/16, gameHeight*11.3/16,  volumeEffects, {fontFamily: "fort", fontSize: "60px", align: 'center', fill: "#ffffff", stroke: "#000000"});

    //UP VOL
    this.upMuButton = this.add.image(gameWidth*10.15/16, gameHeight*8.6/16, 'volUpButton');
    this.upMuButtonSel = this.add.image(gameWidth*10.15/16, gameHeight*8.6/16, 'volUpButtonSel');
    this.upMuButtonSel.setVisible(false);

    this.upMuButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.VolumeUp());
    this.upMuButton.on('pointerover', function (pointer) {this.upMuButtonSel.setVisible(true);}, this);
    this.upMuButton.on('pointerout', function (pointer) {this.upMuButtonSel.setVisible(false);}, this);

    //DOWN VOL
    this.downMuButton = this.add.image(gameWidth*8.55/16, gameHeight*8.6/16, 'volDownButton');
    this.downMuButtonSel = this.add.image(gameWidth*8.55/16, gameHeight*8.6/16, 'volDownButtonSel');
    this.downMuButtonSel.setVisible(false);

    this.downMuButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.VolumeDown());
    this.downMuButton.on('pointerover', function (pointer) {this.downMuButtonSel.setVisible(true);}, this);
    this.downMuButton.on('pointerout', function (pointer) {this.downMuButtonSel.setVisible(false);}, this);

    //UP EFF
    this.upEfButton = this.add.image(gameWidth*10.15/16, gameHeight*12.05/16, 'volUpButton');
    this.upEfButtonSel = this.add.image(gameWidth*10.15/16, gameHeight*12.05/16, 'volUpButtonSel');
    this.upEfButtonSel.setVisible(false);

    this.upEfButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.EffectsUp());
    this.upEfButton.on('pointerover', function (pointer) {this.upEfButtonSel.setVisible(true);}, this);
    this.upEfButton.on('pointerout', function (pointer) {this.upEfButtonSel.setVisible(false);}, this);

    //DOWN EFF
    this.downEfButton = this.add.image(gameWidth*8.55/16, gameHeight*12.05/16, 'volDownButton');
    this.downEfButtonSel = this.add.image(gameWidth*8.55/16, gameHeight*12.05/16, 'volDownButtonSel');
    this.downEfButtonSel.setVisible(false);

    this.downEfButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.EffectsDown());
    this.downEfButton.on('pointerover', function (pointer) {this.downEfButtonSel.setVisible(true);}, this);
    this.downEfButton.on('pointerout', function (pointer) {this.downEfButtonSel.setVisible(false);}, this);

    //BACK
    this.backButtonOM = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'backButton');
    this.backButtonOMSel = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'backButtonSel');
    this.backButtonOMSel.setVisible(false);

    this.backButtonOM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenuOM());
    this.backButtonOM.on('pointerover', function (pointer) {this.backButtonOMSel.setVisible(true);}, this);
    this.backButtonOM.on('pointerout', function (pointer) {this.backButtonOMSel.setVisible(false);}, this);

  }

  VolumeUp(){

   this.clickSound.play();
    if (volumeMusic < 10) {
      volumeMusic += 1;
      musicMenu.setVolume(volumeMusic/10);
      musicGameplay.setVolume(volumeMusic/10);
      this.VolumeMus.setX(gameWidth*9.2/16);
    }
    this.VolumeMus.setText(volumeMusic);

    if(volumeMusic == 10){
      this.VolumeMus.setX(gameWidth*9.05/16);
    }


  }

  VolumeDown(){

    this.clickSound.play();
    if (volumeMusic > 0) {
      volumeMusic -= 1;
      musicMenu.setVolume(volumeMusic/10);
      musicGameplay.setVolume(volumeMusic/10);
    }

    if(volumeMusic < 10){
      this.VolumeMus.setX(gameWidth*9.2/16);
    }

    this.VolumeMus.setText(volumeMusic);

  }

  EffectsUp(){

   this.clickSound.play();
    if (volumeEffects < 10) {
      volumeEffects += 1;
      this.clickSound.setVolume(volumeEffects/10);
    }
    this.VolumeEff.setText(volumeEffects);

    if(volumeEffects == 10){
      this.VolumeEff.setX(gameWidth*9.05/16);
    }
  }

  EffectsDown(){

    this.clickSound.play();
    if (volumeEffects > 0) {
      volumeEffects -= 1;
      this.clickSound.setVolume(volumeEffects/10);
    }

    if(volumeEffects < 10){
      this.VolumeEff.setX(gameWidth*9.2/16);
    }

    this.VolumeEff.setText(volumeEffects);

  }

  BackMainMenuOM(){
    this.clickSound.play();

    this.scene.stop('OptionsMenu');
    this.scene.start(prevScene);
    prevScene = 'OptionsMenu';

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
