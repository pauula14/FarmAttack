class Winner1vs1 extends Phaser.Scene{
  constructor(){
      super("Winner1vs1");
  }

  preload(){

  }

  create(){

    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());

    // 1) BACKGROUND
    this.backgroundWM = this.add.image(gameWidth/2, gameHeight/2, 'typeBackground');

    //BOTON SALIR
    this.backButtonWM = this.add.image(gameWidth/2, gameHeight*12.85/16, 'quitButtonWM');
    this.backButtonWM.setDepth(2);
    this.backButtonWMSel = this.add.image(gameWidth/2, gameHeight*12.85/16, 'quitButtonWMsel');
    this.backButtonWMSel.setVisible(false);
    this.backButtonWMSel.setDepth(2);

    this.backButtonWM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenu());
    this.backButtonWM.on('pointerover', function (pointer) {this.backButtonWMSel.setVisible(true);}, this);
    this.backButtonWM.on('pointerout', function (pointer) {this.backButtonWMSel.setVisible(false);}, this);

    //this.finalPunt = this.add.text(gameWidth*8.2/16, gameHeight*9.2/16,  totalTime*5, {fontFamily: 'fort', fontSize: "60px", align: 'center', fill: "#ffffff", stroke: "#000000"});
    //this.finalTime = this.add.text(gameWidth*8.2/16, gameHeight*7.1/16,  totalTime, {fontFamily: 'fort', fontSize: "60px", align: 'center', fill: "#ffffff", stroke: "#000000"});

    this.winner = this.add.text(gameWidth*6/16, gameHeight*7.1/16,  "WINNER: ", {fontFamily: 'fort', fontSize: "60px", align: 'center', fill: "#ffffff", stroke: "#000000"});
    this.looser = this.add.text(gameWidth*6/16, gameHeight*9.2/16,  "LOSER: ", {fontFamily: 'fort', fontSize: "60px", align: 'center', fill: "#ffffff", stroke: "#000000"});

    this.chickenWinner = this.add.image(gameWidth*9.6/16, gameHeight*7.7/16, 'brownChicken');
    this.chickenWinner.setDepth(2);
    this.chickenLooser = this.add.image(gameWidth*9.2/16, gameHeight*9.8/16, 'whiteChicken');
    this.chickenLooser.setDepth(2);

    if(winner == 2){
      this.chickenWinner.setTexture('whiteChicken');
      this.chickenLooser.setTexture('brownChicken');
    }



  }

  BackMainMenu(){
    this.clickSound.play();

    this.scene.stop('Winner1vs1');
    this.scene.sendToBack('Winner1vs1');
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
