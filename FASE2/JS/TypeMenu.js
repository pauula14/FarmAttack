class TypeMenu extends Phaser.Scene{
  constructor(){
      super("TypeMenu");
  }

  preload(){

  }

  create(){

    let config = {
      mute: false,
      volume: volumeMusic/10,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    };

    musicGameplay = this.sound.add('levelMusic', config);
    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());

    this.cameras.main.fadeIn(2000, 0, 0, 0);

    this.backgroundMM = this.add.image(0, 0, 'backgroundMenus');
    this.backgroundMM.setPosition(gameWidth/2, gameHeight/2);


    //COOPERATIVE
    this.coopButton = this.add.image(gameWidth*8/16, gameHeight*8.3/16, 'coopButton');
    this.coopButtonSel = this.add.image(gameWidth*8/16, gameHeight*8.3/16, 'coopButtonSel');
    this.coopButtonSel.setVisible(false);

    this.coopButton.on('pointerover', function (pointer) {this.coopButtonSel.setVisible(true);}, this);
    this.coopButton.on('pointerout', function (pointer) {this.coopButtonSel.setVisible(false);}, this);
    this.coopButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.PlayCoopGame());

    //COMPETITIVE
    this.compButton = this.add.image(gameWidth*8/16, gameHeight*10.4/16, 'compButton');
    this.compButtonSel = this.add.image(gameWidth*8/16, gameHeight*10.4/16, 'compButtonSel');
    this.compButtonSel.setVisible(false);

    this.compButton.on('pointerover', function (pointer) {this.compButtonSel.setVisible(true);}, this);
    this.compButton.on('pointerout', function (pointer) {this.compButtonSel.setVisible(false);}, this);
    this.compButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.PlayCompGame());


    //Pre carga Nivel 1
    this.preLevel1 = this.add.image(gameWidth/2, gameHeight/2, 'level1');
    this.preLevel1.setDepth(2);
    this.preLevel1.alpha = 0;

    //SKIP BUTTON
    this.skipButtonL1 = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'skipButton');
    this.skipButtonL1.setVisible(false);
    this.skipButtonL1.setDepth(2);
    this.skipButtonL1Sel = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'skipButtonSel');
    this.skipButtonL1Sel.setVisible(false);
    this.skipButtonL1Sel.setDepth(2);

    this.skipButtonL1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.SkipPreloadL1());
    this.skipButtonL1.on('pointerover', function (pointer) {this.skipButtonL1Sel.setVisible(true);}, this);
    this.skipButtonL1.on('pointerout', function (pointer) {this.skipButtonL1Sel.setVisible(false);}, this);

//0;

    //BACK
    this.backButtonMM = this.add.image(gameWidth*14/16, gameHeight*14/16, 'backButton');
    this.backButtonMM.setScale(2/3);
    this.backButtonMMSel = this.add.image(gameWidth*14/16, gameHeight*14/16, 'backButtonSel');
    this.backButtonMMSel.setVisible(false);
    this.backButtonMMSel.setScale(2/3);

    this.backButtonMM.on('pointerover', function (pointer) {this.backButtonMMSel.setVisible(true);}, this);
    this.backButtonMM.on('pointerout', function (pointer) {this.backButtonMMSel.setVisible(false);}, this);
    this.backButtonMM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackInitMenu());


  }

  PlayCoopGame(){

    //this.scene.start("SelectMap");
    prevScene = 'MainMenu';
    this.clickSound.play();

    this.backgroundMM.setVisible(false);
    this.coopButton.setVisible(false);
    this.coopButtonSel.setVisible(false);
    this.compButton.setVisible(false);
    //this.optionsButton.setVisible(false);
    this.backButtonMM.setVisible(false);

    this.skipButtonL1.setVisible(true);
  //  this.backButtonMM.setVisible(false);

  if(musicMenu.isPlaying){
    musicMenu.stop();
  }

    this.tweens.add({
      targets: this.preLevel1,
      duration: 1000,
      alpha: 1,
      yoyo: true,
      hold: 4000,
      completeDelay: 2000
    });

      this.time.addEvent({
        delay: 6500,
        callback: function() {
          this.scene.stop("TypeMenu");
          this.scene.start("GamePlayEs1");
          musicGameplay.play();
        },
      callbackScope: this
      }, this);

  }

  SkipPreloadL1(){
    this.scene.stop("TypeMenu");
    this.scene.start("GamePlayEs1");
    musicGameplay.play();
  }

  PlayCompGame(){

    prevScene = 'TypeMenu';
    this.clickSound.play();

  if(musicMenu.isPlaying){
    musicMenu.stop();
  }

    this.scene.stop("TypeMenu");
    this.scene.start("GamePlayFo1vs1");
    musicGameplay.play();

  }


  BackInitMenu(){
    this.clickSound.play();

    this.scene.stop("TypeMenu");
    this.scene.start("MainMenu");
    prevScene = 'TypeMenu';
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
