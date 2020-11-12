class SelectMap extends Phaser.Scene{
    constructor(){
        super("SelectMap");
    }
  
    preload(){
  
    }
  
    create(){
  
      //BACKGROUND
      this.backgroundGM = this.add.image(0, 0, 'backgroundGM');
      this.backgroundGM.setPosition(gameWidth/2, gameHeight/2);
  
      //PAUSE
      this.mapButton = this.add.image(gameWidth*2/16, gameHeight*2/16, 'star');
      this.mapButton.setInteractive({ useHandCursor: true  } )
        .on('pointerdown', () => this.StartGame());
  
    }
  
    StartGame(){
        this.scene.stop('SelectMap');
        this.scene.start('GamePlay');
        prevScene = 'SelectMap';
    }
  
  }
  