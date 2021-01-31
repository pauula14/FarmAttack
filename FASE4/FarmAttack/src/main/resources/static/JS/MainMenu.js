class MainMenu extends Phaser.Scene{
  constructor(){
      super("MainMenu");
  }

  preload(){
	  console.log("MAIN MENU OFFLINE");
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


    //PLAY
    this.playButton = this.add.image(gameWidth*8/16, gameHeight*8.3/16, 'playButton');
    this.playButtonSel = this.add.image(gameWidth*8/16, gameHeight*8.3/16, 'playButtonSel');
    this.playButtonSel.setVisible(false);

    this.playButton.on('pointerover', function (pointer) {this.playButtonSel.setVisible(true);}, this);
    this.playButton.on('pointerout', function (pointer) {this.playButtonSel.setVisible(false);}, this);
    this.playButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.PlayGame());

    //TUTORIAL
    this.tutorialButton = this.add.image(gameWidth*8/16, gameHeight*10.4/16, 'tutorialButton');
    this.tutorialButtonSel = this.add.image(gameWidth*8/16, gameHeight*10.4/16, 'tutorialButtonSel');
    this.tutorialButtonSel.setVisible(false);

    this.tutorialButton.on('pointerover', function (pointer) {this.tutorialButtonSel.setVisible(true);}, this);
    this.tutorialButton.on('pointerout', function (pointer) {this.tutorialButtonSel.setVisible(false);}, this);
    this.tutorialButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.TutorialMenuMM());

    //OPTIONS
    this.optionsButton = this.add.image(gameWidth*8/16, gameHeight*12.4/16, 'optionsButton');
    this.optionsButtonSel = this.add.image(gameWidth*8/16, gameHeight*12.4/16, 'optionsButtonSel');
    this.optionsButtonSel.setVisible(false);

    this.optionsButton.on('pointerover', function (pointer) {this.optionsButtonSel.setVisible(true);}, this);
    this.optionsButton.on('pointerout', function (pointer) {this.optionsButtonSel.setVisible(false);}, this);
    this.optionsButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.OptionsMenuMM());

    //CREDITS
    this.creditsButton = this.add.image(gameWidth*8/16, gameHeight*14.4/16, 'creditsButton');
    this.creditsButtonSel = this.add.image(gameWidth*8/16, gameHeight*14.4/16, 'creditsButtonSel');
    this.creditsButtonSel.setVisible(false);

    this.creditsButton.on('pointerover', function (pointer) {this.creditsButtonSel.setVisible(true);}, this);
    this.creditsButton.on('pointerout', function (pointer) {this.creditsButtonSel.setVisible(false);}, this);
    this.creditsButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.CreditsMenu());

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
    this.backButtonCM = this.add.image(gameWidth*13.9/16, gameHeight*14.2/16, 'backButton');
    this.backButtonCMSel = this.add.image(gameWidth*13.9/16, gameHeight*14.2/16, 'backButtonSel');
    this.backButtonCMSel.setVisible(false);

    this.backButtonCM.on('pointerover', function (pointer) {this.backButtonCMSel.setVisible(true);}, this);
    this.backButtonCM.on('pointerout', function (pointer) {this.backButtonCMSel.setVisible(false);}, this);
    this.backButtonCM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackInitMenu());

  }

  PlayGame(){

    //this.scene.start("SelectMap");
    prevScene = 'MainMenu';
    this.clickSound.play();

    this.backgroundMM.setVisible(false);
    this.playButton.setVisible(false);
    this.playButtonSel.setVisible(false);
    this.tutorialButton.setVisible(false);
    this.optionsButton.setVisible(false);
    this.creditsButton.setVisible(false);

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
          this.scene.stop("MainMenu");
          this.scene.start("GamePlayEs1");
          musicGameplay.play();
        },
      callbackScope: this
      }, this);

  }

  SkipPreloadL1(){
    this.scene.stop("MainMenu");
	gamemode ="Offline";
    this.scene.start("GamePlayEs1");
    musicGameplay.play();
  }

  OptionsMenuMM(){
    this.clickSound.play();

    this.scene.stop("MainMenu");
    this.scene.start("OptionsMenu");
    prevScene = 'MainMenu';
  }

  CreditsMenu(){
    this.clickSound.play();

    this.scene.stop("MainMenu");
    this.scene.start("CreditsMenu");
    prevScene = 'MainMenu';
  }

  TutorialMenuMM(){
    this.clickSound.play();

    this.scene.stop("MainMenu");
	gamemode = "Offline";
    this.scene.start("TutorialMenu");
    prevScene = 'MainMenu';
  }

  BackInitMenu(){
    this.clickSound.play();

    this.scene.stop("MainMenu");
    this.scene.start("InitMenu");
    prevScene = 'MainMenu';
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
