class ServidorCaido extends Phaser.Scene{
  constructor(){
      super("ServidorCaido");
  }

  preload(){

  }

  create(){

	
    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());

    //BACKGROUND
    this.backgroundPM = this.add.image(0, 0, 'backgroundOFFLINE');
    this.backgroundPM.setPosition(gameWidth/2, gameHeight/2);


 //RELOAD
    this.button_Reload = this.add.image(gameWidth*8/16, gameHeight*8.3/16, 'playButton');
	this.button_Reload.setVisible(true);
    this.button_ReloadSel = this.add.image(gameWidth*8/16, gameHeight*8.3/16, 'playButtonSel');
    this.button_ReloadSel.setVisible(false);

    this.button_Reload.on('pointerover', function (pointer) {this.button_ReloadSel.setVisible(true);}, this);
    this.button_Reload.on('pointerout', function (pointer) {this.button_ReloadSel.setVisible(false);}, this);
    this.button_Reload.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.reload());

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

	update(){
		alive();
	}
	
	reload(){
		
	    this.clickSound.play();

		this.scene.stop("ServidorCaido");
    	this.scene.start("InitMenu");
		alive();
	}
	
}
