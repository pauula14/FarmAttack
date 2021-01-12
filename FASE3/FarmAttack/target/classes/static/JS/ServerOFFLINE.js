class ServidorCaido extends Phaser.Scene{
  constructor(){
      super("ServidorCaido");
  }

  preload(){

  }

  create(){

    //BACKGROUND
    this.backgroundPM = this.add.image(0, 0, 'backgroundOFFLINE');
    this.backgroundPM.setPosition(gameWidth/2, gameHeight/2);

  }

	update(){
		alive();
	}
}
