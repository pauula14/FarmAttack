class ReadyMenu extends Phaser.Scene{

    constructor(){
        super("ReadyMenu");
    }

    preload() { 
		prevScene ='ReadyMenu';
		alone = false;
		gameOver = false;
		
		this.load.html('conexionalert', '../ASSETS/LogInform/conexionalert.html');
		this.activeButton = false;
		//this.fullLobby;// = false;
		
		connection = new WebSocket('ws://'+ window.location.host + '/ws-level');
	    connection.onopen = function(){
	        console.log("WS Open");
	    }
	    
	  //Cuando la conexion da un error
	    connection.onerror = function(e) {
	      connection.send(JSON.stringify({ type: "leave"}));
	      console.log("WS error: " + e);
	    }
	    
	    //Cuando se cierra la conexion, se muestra el codigo del motivo, para poder solucionarlo si esto ha sido no intencionadamente.
	    connection.onclose = function(e){
	      //connection.send(JSON.stringify({ type: "leave"}));
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
        

		this.background = this.add.image(gameWidth/2,gameHeight/2,"readyBackground"); 
        
	    //Pre carga Nivel 1
	    this.preLevel1 = this.add.image(gameWidth/2, gameHeight/2, 'level1');
	    this.preLevel1.setDepth(2);
	    this.preLevel1.alpha = 0;
	    
        //PLAY    
        this.readyButton = this.add.image(gameWidth*7/16, gameHeight*11/16, 'readyButton');
        this.readyButton.setScale(2.5/3);
        this.readyButtonSel = this.add.image(gameWidth*7/16, gameHeight*11/16, 'readyButtonSel');
        this.readyButtonSel.setScale(2.5/3);
        
        this.readyButton.setVisible(false);
        this.readyButtonSel.setVisible(false);

        this.readyButton.on('pointerover', function (pointer) {this.readyButtonSel.setVisible(true);}, this);
        this.readyButton.on('pointerout', function (pointer) {this.readyButtonSel.setVisible(false);}, this);
        this.readyButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => /*this.PlayGame()*/ connection.send(JSON.stringify({type: "startGame"})));
        
        /*if ((fullLobby == true) ){//}|| (playerId == "1")){
	    	 console.log("putas todas");
	       	 this.playButton.setVisible(false);
	       	 this.playButtonSel.setVisible(false);
	    }else{
	    	this.playButton.setVisible(true);
	    }*/
        
        /*else{
        	connection.send(JSON.stringify({ type: "handshake" , nombre: name}));
        }*/
        /*else
        {
        	//ACTIVAR FONDO QUE PONE WAITING FOR PLAYERS
        }
        */
        //BACK
        this.quitButton = this.add.image(gameWidth*10/16, gameHeight*11/16, 'backButton');
        this.quitButton.setScale(2.5/3);
        this.quitButtonSel = this.add.image(gameWidth*10/16, gameHeight*11/16, 'backButtonSel');
        this.quitButtonSel.setScale(2.5/3);
        this.quitButtonSel.setVisible(false);

        this.quitButton.on('pointerover', function (pointer) {this.quitButtonSel.setVisible(true);}, this);
        this.quitButton.on('pointerout', function (pointer) {this.quitButtonSel.setVisible(false);}, this);
        this.quitButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => (connection.send(JSON.stringify({ type: "leave"})), leaved = true)/*this.BackInit()*/);
        
	    //SKIP BUTTON
	    this.skipButtonL1 = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'skipButton');
	    this.skipButtonL1.setVisible(false);
	    this.skipButtonL1.setDepth(2);
	    this.skipButtonL1Sel = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'skipButtonSel');
	    this.skipButtonL1Sel.setVisible(false);
	    this.skipButtonL1Sel.setDepth(2);

	    this.skipButtonL1.setInteractive({ useHandCursor: true}).on('pointerdown', () => connection.send(JSON.stringify({ type: "skipTutorial"}))/*this.SkipPreloadL1()*/);
	    this.skipButtonL1.on('pointerover', function () {this.skipButtonL1Sel.setVisible(true);}, this);
	    this.skipButtonL1.on('pointerout', function () {this.skipButtonL1Sel.setVisible(false);}, this);
	    
    	this.alertbox = this.add.dom(gameWidth*11/16, gameHeight*1/16).createFromCache('conexionalert');
    	this.alertbox.setVisible(true);    	
    	
    	this.textusers = document.getElementById('alertmessage');
		this.textusers.innerHTML = name;

//recibimos el mensaje de empezar
        connection.onmessage = function (msg) {
        	var parsedMessage = JSON.parse(msg.data);
	        
	        if(parsedMessage.playerID != null){     
	            playerId = parsedMessage.playerID;
	            console.log("Id de la sesion: " + parsedMessage.playerID);
	            console.log("ID establecido: " + playerId);
	            //console.log("jugadores antes: " + playersIn);
	            //playersIn ++;
	            //console.log("jugadores despues: " + playersIn);
	          }
	        
	        if(parsedMessage.lobby == "full"){
	        	console.log("lobby llena");
	        	fullLobby = true;
	        }
	        
            console.log("message received");
            console.log(connection);
            
            var data = JSON.parse(msg.data); // Se convierte el mensaje a JSON
            
            if(data.type == "startGame"){
            	console.log(" A JUGAR!");
            	//this.PlayGame();
            	startGame = true;
            }
            
            if(data.type == "skipTutorial"){
            	console.log(" SALTAR!");
            	//this.PlayGame();
            	skipTutorial = true;
            }
			
			if(data.type == "names"){
				let text = data.name1 + "\n";
				text += data.name2;
				namesreceived = true;
				names = text;
			}
            
            if(data.type == "leave"){
            	console.log(" EL OTRO SE FUE de golpe :((((");
            	alone = true;
            	//this.PlayGame();
            	//skipTutorial = true;
            }
            
            if(data.type == "fullroom"){
            	console.log("SALA LLENA");
            	fullroom = true;
            }
                        
        }// Fin onmessage
		
		
		 this.time.addEvent({
	        delay:1000,
	        callback: () => {
				connection.send(JSON.stringify({ type: "handshake" , nombre: name}));
			},
	      callbackScope: this
	      }, this);
 			
    }


	update(){
		
		if (startGame == true){
			this.PlayGame();
			startGame = false;
		}
		
		if (skipTutorial == true){
			this.SkipPreloadL1();
			skipTutorial = false;
		}
		
		if ((alone == true)){
			this.AloneInRoom();
			alone = false;
		}

		if ((leaved == true)){
			console.log("atras satanas");
			this.BackInit();
			leaved = false;
		}
		if(namesreceived == true){
			this.textusers.innerHTML = names;
			namesreceived = false;
		}
		
		if(fullroom == true)
		{
			this.background.setTexture("waitingBackground"); 
			this.readyButton.setVisible(true);
			fullroom = false;
		}
		
		if (fullLobby == true){
        	
			this.background.setTexture("fullLobby"); 
        	fullLobby = false;//ACTIVAR FONDO QUE PONE FULL LOBBY
        	
        }
	}


    PlayerMultiplayerGame(){
    	this.clickSound.play();
        this.scene.stop("ReadyMenu");
        this.scene.start("GamePlayEs1Multiplayer");
    }
    
    BackInit(){
    	this.clickSound.play();
        this.scene.stop("ReadyMenu");
        this.scene.start("MainMenuMultiplayer");
    }
    
    AloneInRoom(){
    	this.clickSound.play();
        this.scene.stop("ReadyMenu");
        this.scene.start("AloneInGame");
    }

    
    PlayGame(){
    	
    	//SE DEBERIA PASATR UN MENSAJE PARA QUE AMBOS COMIENCEN A JUGAR A LA PAR CUANDO EL JUGADOR 2 LE DE CLICK

        //this.scene.start("SelectMap");
        prevScene = 'ReadyMenu';
        this.clickSound.play();

        //this.backgroundMM.setVisible(false);
        this.quitButton.setVisible(false);
        this.quitButtonSel.setVisible(false);
        this.readyButton.setVisible(false);
        this.readyButtonSel.setVisible(false);
        //this.creditsButton.setVisible(false);
        
    	this.alertbox.setVisible(false);    	  	
    	//this.textusers.setVisible(false);    	

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

