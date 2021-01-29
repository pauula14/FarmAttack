class ReadyMenu extends Phaser.Scene{

    constructor(){
        super("ReadyMenu");
    }

    preload() { 
		prevScene ='ReadyMenu';
		this.load.html('conexionalert', '../ASSETS/LogInform/conexionalert.html');
		//this.fullLobby;// = false;
		
		connection = new WebSocket('ws://'+ window.location.host + '/ws-level');
	    connection.onopen = function(){
	        console.log("WS Open");
	        //this.send(JSON.stringify({ type: "connect", id: that.myPlayer.id, numPlayers: that.numPlayers}));
	    }
	    
	    connection.onmessage = function(message) {
	        var parsedMessage = JSON.parse(message.data);
	        
	        if(parsedMessage.playerID != null){     
	            playerId = parsedMessage.playerID;
	            console.log("Id de la sesion: " + parsedMessage.playerID);
	            console.log("ID establecido: " + playerId);
	          }
	        
	        if(parsedMessage.lobby == "full"){
	        	console.log("lobby llena");
	        	fullLobby = true;
	        }
	    }
	    
	  //Cuando la conexion da un error
	    connection.onerror = function(e) {
	      console.log("WS error: " + e);
	    }
	    //Cuando se cierra la conexion, se muestra el codigo del motivo, para poder solucionarlo si esto ha sido no intencionadamente.
	    connection.onclose = function(e){
	      console.log("Motivo del cierre: " + e.code);
	    }
    }
    
    create() {
    	
    	
    	
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


		this.background = this.add.image(gameWidth/2,gameHeight/2,"backgroundCHAT"); 
        
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
	    this.skipButtonL1.on('pointerover', function () {this.skipButtonL1Sel.setVisible(true);}, this);
	    this.skipButtonL1.on('pointerout', function () {this.skipButtonL1Sel.setVisible(false);}, this);
	    
        //PLAY    
        this.playButton = this.add.image(gameWidth*7/16, gameHeight*8/16, 'playButton');
        this.playButton.setScale(2.5/3);
        this.playButtonSel = this.add.image(gameWidth*7/16, gameHeight*8/16, 'playButtonSel');
        this.playButtonSel.setScale(2.5/3);
        this.playButtonSel.setVisible(false);

        this.playButton.on('pointerover', function (pointer) {this.playButtonSel.setVisible(true);}, this);
        this.playButton.on('pointerout', function (pointer) {this.playButtonSel.setVisible(false);}, this);
        this.playButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.PlayGame());
        
        if (fullLobby == true){
	    	 console.log("putas todas");
	       	 this.playButton.setVisible(false);
	       	 this.playButtonSel.setVisible(false);
	    }else{
	    	this.playButton.setVisible(true);
	    }
        
        //BACK
        this.backButtonMMM = this.add.image(gameWidth*10/16, gameHeight*8/16, 'backButton');
        this.backButtonMMM.setScale(2.5/3);
        this.backButtonMMMSel = this.add.image(gameWidth*10/16, gameHeight*8/16, 'backButtonSel');
        this.backButtonMMMSel.setScale(2.5/3);
        this.backButtonMMMSel.setVisible(false);

        this.backButtonMMM.on('pointerover', function (pointer) {this.backButtonMMMSel.setVisible(true);}, this);
        this.backButtonMMM.on('pointerout', function (pointer) {this.backButtonMMMSel.setVisible(false);}, this);
        this.backButtonMMM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackInit());
        
    	this.alertbox = this.add.dom(gameWidth*11/16, gameHeight*1/16).createFromCache('conexionalert');
    	this.alertbox.setVisible(true);    	
    	
    	this.textusers = document.getElementById('alertmessage');
    }


	update(){
		alive();
		this.updateUsersConected();
		
	    
	}


    updateUsersConected(){
		let text = "";
        for(var i=0 ; i< usersConnected.length;i++){
            if(usersConnected[i].online){
            	text += usersConnected[i].name +" \n"
            }
        }
        this.textusers.innerHTML = text.toString();
    }



    PlayerMultiplayerGame(){
    	this.clickSound.play();
        this.scene.stop("ReadyMenu");
        this.scene.start("GamePlayEs1Multiplayer");
        prevScene = 'ReadyMenu';
    }
    
    BackInit(){
    	this.clickSound.play();
        this.scene.stop("ReadyMenu");
        this.scene.start("MainMenuMultiplayer");
        prevScene = 'ReadyMenu';
    }

    
    PlayGame(){

        //this.scene.start("SelectMap");
        prevScene = 'ReadyMenu';
        this.clickSound.play();

        //this.backgroundMM.setVisible(false);
        this.playButton.setVisible(false);
        this.playButtonSel.setVisible(false);
        this.backButtonMMM.setVisible(false);
        this.backButtonMMMSel.setVisible(false);
        //this.creditsButton.setVisible(false);

        this.skipButtonL1.setVisible(true);

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
              this.scene.stop("ReadyMenu");
              this.scene.start("GamePlayEs1Multiplayer");//, {connection: this.connection});
              musicGameplay.play();
            },
          callbackScope: this
          }, this);

      }
    
    SkipPreloadL1(){
        this.scene.stop("ReadyMenu");
        this.scene.start("GamePlayEs1Multiplayer");
        musicGameplay.play();
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

