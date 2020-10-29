class PauseMenu extends Phaser.Scene{
  constructor(){
      super("PauseMenu");
  }

  preload(){
  
  }

  create(){
    var wid = this.cameras.main.width; //ancho del canvas en el dispositivo
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundPM');
    background.setScale(1/3);
    background.setPosition(wid/2, heig/2);

    //BOTON OPCIONES
    this.optionsButtonPM = this.add.image(wid*8/16, heig*7/16, 'optionsButtonPM');
    this.optionsButtonPM.setScale(1.5/3);
    this.optionsButtonPM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.GoOptionsMenu());

    //BOTON ABANDONAR
    this.quitButtonPM = this.add.image(wid*8/16, heig*9/16, 'quitButtonPM');
    this.quitButtonPM.setScale(1.5/3);
    this.quitButtonPM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.QuitGame());

    //BOTON ATRAS
    this.backButtonPM = this.add.image(wid*8/16, heig*11/16, 'backButtonPM');
    this.backButtonPM.setScale(1.5/3);
    this.backButtonPM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackGame());

  }

  GoOptionsMenu(){
    this.scene.stop('PauseMenu');
    //this.scene.sendToBack('PauseMenu');
    this.scene.start('OptionsMenu');
    this.scene.bringToTop('OptionsMenu');
  }

/*  BackGame(){
    this.scene.pause('PauseMenu');
    this.scene.sendToBack('PauseMenu');
    this.scene.run('MapOne');
  }*/

  BackGame(){
    this.scene.pause('PauseMenu');
    this.scene.sendToBack('PauseMenu');
    this.scene.run('MapOne');
    this.scene.bringToTop('MapOne');
  }
}
