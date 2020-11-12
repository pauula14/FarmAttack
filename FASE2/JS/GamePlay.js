class GamePlay extends Phaser.Scene{
  constructor(){
      super("GamePlay");
  }

  preload(){

  }

  create(){

    //BACKGROUND
    this.backgroundGM = this.add.image(0, 0, 'backgroundGM');
    this.backgroundGM.setPosition(gameWidth/2, gameHeight/2);

    //PAUSE
    this.pauseButton = this.add.image(gameWidth*2/16, gameHeight*2/16, 'pauseButton');
    this.pauseButton.setScale(2/3);
    this.pauseButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.PauseMenu());

  }

  PauseMenu(){
    prevScene = 'GamePlay';
    this.scene.run('PauseMenu');
    this.scene.bringToTop('PauseMenu');
    this.scene.pause();
  }

}
