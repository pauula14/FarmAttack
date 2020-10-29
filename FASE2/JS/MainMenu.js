class MainMenu extends Phaser.Scene{
  constructor(){
      super("MainMenu");
  }

  preload(){

  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundMM');
    background.setOrigin(0, 0);
    //background.setPosition(wid/2, heig/2);
    background.setScale(2/3);

    //JUGAR
    this.playButton = this.add.image(wid/2, heig*6/16, 'playButton');
    this.playButton.setScale(2/3);
    this.playButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.InitGame());

    //OPTIONS MENU
    this.optionsButton = this.add.image(wid/2, heig*8/16, 'optionsButton');
    this.optionsButton.setScale(2/3);
    this.optionsButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.OptionsGame());

    //CREDITS MENU
    this.creditsButton = this.add.image(wid/2, heig*10/16, 'creditsButton');
    this.creditsButton.setScale(2/3);
    this.creditsButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.GameCredits());

    //QUIT
    this.quitButton = this.add.image(wid/2, heig*12/16, 'quitButton');
    this.quitButton.setScale(2/3);
    this.quitButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.QuitGame());

    this.fullScreen = this.add.image(wid*12/14, heig*12/14, 'ButtonNode1');
    this.fullScreen.setScale(2/3);

    this.fullScreen.setInteractive({ useHandCursor: true})   
		.on('pointerdown', function() {
      this.scene.scale.toggleFullscreen();
    });

  }

  InitGame(){
    this.scene.pause('MainMenu');
    this.scene.sendToBack('MainMenu');
    this.scene.start('MapSelectionMenu');
  }

  OptionsGame(){
    this.scene.pause('MainMenu');
    this.scene.start('OptionsMenu');
    //this.scene.bringToTop('OptionsMenu');
  }

  GameCredits(){
    this.scene.pause('MainMenu');
    this.scene.start('CreditsMenu');
  }

/*  SetFullScreen(){
    console.log ("Hola");
    //this.game.config.Phaser.scale.FIT;
    scene.scale.on('enterfullscreen', function() {});
  }*/

  QuitGame(){
    //VER como cerrar la app
  }
}
