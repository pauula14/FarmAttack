class MainMenuMultiplayer extends Phaser.Scene{
  constructor(){
      super("MainMenuMultiplayer");
  }

  preload(){
	this.load.html('conexionalert', '../ASSETS/LogInform/conexionalert.html');
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

    console.log("Menu multijugador");
    
    musicGameplay = this.sound.add('levelMusic', config);
    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());

    this.cameras.main.fadeIn(2000, 0, 0, 0);

    this.backgroundMM = this.add.image(0, 0, 'backgroundMenus');
    this.backgroundMM.setPosition(gameWidth/2, gameHeight/2);


    //PLAY
    this.playButton = this.add.image(gameWidth*8/16, gameHeight*8.3/16, 'playButton');
    this.playButtonSel = this.add.image(gameWidth*8/16, gameHeight*8.3/16, 'playButtonSel');
    this.playButtonSel.setVisible(false);

    this.playButton.on('pointerover', function () {this.playButtonSel.setVisible(true);}, this);
    this.playButton.on('pointerout', function () {this.playButtonSel.setVisible(false);}, this);
    this.playButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.GoReadyMenu());

    //TUTORIAL
    this.tutorialButton = this.add.image(gameWidth*8/16, gameHeight*10.4/16, 'tutorialButton');
    this.tutorialButtonSel = this.add.image(gameWidth*8/16, gameHeight*10.4/16, 'tutorialButtonSel');
    this.tutorialButtonSel.setVisible(false);

    this.tutorialButton.on('pointerover', function () {this.tutorialButtonSel.setVisible(true);}, this);
    this.tutorialButton.on('pointerout', function () {this.tutorialButtonSel.setVisible(false);}, this);
    this.tutorialButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.TutorialMenuMM());

    //OPTIONS
    this.optionsButton = this.add.image(gameWidth*8/16, gameHeight*12.4/16, 'optionsButton');
    this.optionsButtonSel = this.add.image(gameWidth*8/16, gameHeight*12.4/16, 'optionsButtonSel');
    this.optionsButtonSel.setVisible(false);

    this.optionsButton.on('pointerover', function () {this.optionsButtonSel.setVisible(true);}, this);
    this.optionsButton.on('pointerout', function () {this.optionsButtonSel.setVisible(false);}, this);
    this.optionsButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.OptionsMenuMM());

    //CREDITS
    this.creditsButton = this.add.image(gameWidth*8/16, gameHeight*14.4/16, 'creditsButton');
    this.creditsButtonSel = this.add.image(gameWidth*8/16, gameHeight*14.4/16, 'creditsButtonSel');
    this.creditsButtonSel.setVisible(false);

    this.creditsButton.on('pointerover', function () {this.creditsButtonSel.setVisible(true);}, this);
    this.creditsButton.on('pointerout', function () {this.creditsButtonSel.setVisible(false);}, this);
    this.creditsButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.CreditsMenu());
    
    //BACK
    this.backButtonMMM = this.add.image(gameWidth*13.9/16, gameHeight*14.2/16, 'backButton');
    this.backButtonMMMSel = this.add.image(gameWidth*13.9/16, gameHeight*14.2/16, 'backButtonSel');
    this.backButtonMMMSel.setVisible(false);

    this.backButtonMMM.on('pointerover', function () {this.backButtonMMMSel.setVisible(true);}, this);
    this.backButtonMMM.on('pointerout', function () {this.backButtonMMMSel.setVisible(false);}, this);
    this.backButtonMMM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.ChatMenu());




//0;

    //BACK
    /*this.backButtonMM = this.add.image(gameWidth*14/16, gameHeight*14/16, 'backButtonMM');
    this.backButtonMM.setScale(2/3);
    this.backButtonMM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackInitMenu());*/


	this.alertbox = this.add.dom(gameWidth*11/16, gameHeight*1/16).createFromCache('conexionalert');
	this.alertbox.setVisible(true);    	
	
	this.textusers = document.getElementById('alertmessage');
  }

	update(){
		alive();
		this.updateUsersConected();
	}



  GoReadyMenu(){
    this.scene.stop("MainMenuMultiplayer");
    this.scene.start("ReadyMenu");
    musicGameplay.play();
  }

  OptionsMenuMM(){
    this.clickSound.play();

    this.scene.stop("MainMenuMultiplayer");
    this.scene.start("OptionsMenu");
    prevScene = 'MainMenuMultiplayer';
  }

  CreditsMenu(){
    this.clickSound.play();

    this.scene.stop("MainMenuMultiplayer");
    this.scene.start("CreditsMenu");
    prevScene = 'MainMenuMultiplayer';
  }

  TutorialMenuMM(){
    this.clickSound.play();

    this.scene.stop("MainMenuMultiplayer");
    this.scene.start("TutorialMenu");
    prevScene = 'MainMenuMultiplayer';
  }

  BackInitMenu(){
    this.clickSound.play();

    this.scene.stop("MainMenuMultiplayer");
    this.scene.start("InitMenu");
    prevScene = 'MainMenuMultiplayer';
  }

  ChatMenu(){
	    this.clickSound.play();

	    this.scene.stop("MainMenuMultiplayer");
	    this.scene.start("ChatMenu");
	    prevScene = 'MainMenuMultiplayer';
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
  updateUsersConected(){
        let text="USERS CONNECTED:" + "\n";
        for(var i=0 ; i< usersConnected.length;i++){
            if(usersConnected[i].online){
            	text += usersConnected[i].name +" \n"
            }
        }
        this.textusers.innerHTML = text.toString();
    }
}