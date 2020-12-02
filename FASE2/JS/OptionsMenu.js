class OptionsMenu extends Phaser.Scene{
  constructor(){
      super("OptionsMenu");
  }

  preload(){

  }

  create(){

    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());

    //BACKGROUND
    this.backgroundOM = this.add.image(0, 0, 'backgroundOM');
    this.backgroundOM.setPosition(gameWidth/2, gameHeight/2);

    this.VolumenMusica = this.add.text(gameWidth*8/16, gameHeight*8/16,  volumeMusic, {fontFamily: "forte",fontSize: "40px", align: 'center', fill: "#481d18"});
    this.VolumeEffects = this.add.text(gameWidth*8/16, gameHeight*11/16,  volumeEffects, {fontFamily: "forte",fontSize: "40px", align: 'center', fill: "#481d18"});

    //UP VOL
    this.upMuButton = this.add.image(gameWidth*7/16, gameHeight*7/16, 'volUpButton');
    this.upMuButton.setScale(2/3);
    this.upMuButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.VolumeUp());

    //DOWN VOL
    this.downMuButton = this.add.image(gameWidth*10/16, gameHeight*7/16, 'volDownButton');
    this.downMuButton.setScale(2/3);
    this.downMuButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.VolumeDown());

    //UP EFF
    this.upEfButton = this.add.image(gameWidth*7/16, gameHeight*10/16, 'volUpButton');
    this.upEfButton.setScale(2/3);
    this.upEfButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.EffectsUp());

    //DOWN EFF
    this.downEfButton = this.add.image(gameWidth*10/16, gameHeight*10/16, 'volDownButton');
    this.downEfButton.setScale(2/3);
    this.downEfButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.EffectsDown());


    //BACK
    this.backButtonOM = this.add.image(gameWidth*14/16, gameHeight*14/16, 'backButtonOM');
    this.backButtonOM.setScale(2/3);
    this.backButtonOM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenuOM());

    this.VolumenMusica.setText(volumeMusic);
    this.VolumeEffects.setText(volumeEffects);
  }

  VolumeUp(){

   this.clickSound.play();
    if (volumeMusic < 10) {
      volumeMusic += 1;
      musicMenu.setVolume(volumeMusic/10);
      musicGameplay.setVolume(volumeMusic/10);
    }
    this.VolumenMusica.setText(volumeMusic);

  }

  VolumeDown(){

    this.clickSound.play();
    if (volumeMusic > 0) {
      volumeMusic -= 1;
      musicMenu.setVolume(volumeMusic/10);
      musicGameplay.setVolume(volumeMusic/10);
    }

    this.VolumenMusica.setText(volumeMusic);

  }

  EffectsUp(){

   this.clickSound.play();
    if (volumeEffects < 10) {
      volumeEffects += 1;
      this.clickSound.setVolume(volumeEffects/10);
    }
    this.VolumeEffects.setText(volumeEffects);

  }

  EffectsDown(){

    this.clickSound.play();
    if (volumeEffects > 0) {
      volumeEffects -= 1;
      this.clickSound.setVolume(volumeEffects/10);
    }

    this.VolumeEffects.setText(volumeEffects);

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
