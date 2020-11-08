class OptionsMenu extends Phaser.Scene{
  constructor(){
      super("OptionsMenu");
  }

  preload(){

  }

  create(){

    //BACKGROUND
    this.backgroundOM = this.add.image(0, 0, 'backgroundOM');
    this.backgroundOM.setPosition(gameWidth/2, gameHeight/2);

    //BACK
    this.backButtonOM = this.add.image(gameWidth*14/16, gameHeight*14/16, 'backButtonOM');
    this.backButtonOM.setScale(2/3);
    this.backButtonOM.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.BackMainMenuOM());

  }

  BackMainMenuOM(){
    this.scene.stop('OptionsMenu');
    this.scene.start(prevScene);
    prevScene = 'OptionsMenu';

  }

}
