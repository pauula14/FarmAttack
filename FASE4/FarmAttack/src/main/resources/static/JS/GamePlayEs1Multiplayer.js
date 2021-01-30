class GamePlayEs1Multiplayer extends Phaser.Scene{
  constructor(){
      super("GamePlayEs1Multiplayer");

      this.numEgssP1 = 0;
      this.numEgssP2 = 0;
      this.end1Visible = false;
      this.end2Visible = false;
      this.playersArrived = 0;
      this.dir1 = 1; //0 = mirando izq, 1 = mirando der
      this.dir2 = 0; //0 = izq, 1 = der
      this.endTrigger2Empty;
      this.endTrigger1Empty;
      this.endTrigger2;
      this.endTrigger1;
      //this.playerUpdate;
   }

  preload(){
    this.levelWidth = 1462;
    this.levelHeight = 687;
    alone = false;
    levelGameplay = 'GamePlayEs1Multiplayer';

    if(gamemode == "Online"){

    	console.log("online");

  	    //Cuando la conexion da un error
	    connection.onerror = function(e) {
	      //this.scene.stop('GamePlayEs1Multiplayer');
	      console.log("WS error: " + e);
	    }

	    //Cuando se cierra la conexion, se muestra el codigo del motivo, para poder solucionarlo si esto ha sido no intencionadamente.
	    connection.onclose = function(e){
	      //connection.send(JSON.stringify({ type: "leave", inGame: "yes"}))
	      //this.scene.stop('GamePlayEs1Multiplayer');
	      console.log("Motivo del cierre: " + e.code);
	      clearInterval(playerUpdate);
	      console.log("Intervalo fuera");
	      
	    }
    }
  }

  create(){

    this.dir1 = 1;
    this.dir2 = 0;
    this.numEgssP1 = 0;
    this.numEgssP2 = 0;
    this.end1Visible = false;
    this.end2Visible = false;
    this.playersArrived = 0;

   

    //EFFECTS
    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());
    this.handleSound = this.sound.add('handleSound', this.EffectsConfig());
    this.eggSound = this.sound.add('eggSound', this.EffectsConfig());
    this.goalSound = this.sound.add('goalSound', this.EffectsConfig());

    // 1) BACKGROUND
    this.backgroundEs1 = this.add.image(0, 0, 'backgroundEs1');
    this.backgroundEs1.setPosition(gameWidth/2, gameHeight/2);
    this.backgroundEs1.setDepth(1);

    //Pre carga Nivel 2
    this.preLevel2 = this.add.image(gameWidth/2, gameHeight/2, 'level2');
    this.preLevel2.setDepth(2);
    this.preLevel2.alpha = 0;

    //SKIP BUTTON
    this.skipButtonL2 = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'skipButton');
    this.skipButtonL2.setVisible(false);
    this.skipButtonL2.setDepth(2);
    this.skipButtonL2Sel = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'skipButtonSel');
    this.skipButtonL2Sel.setVisible(false);
    this.skipButtonL2Sel.setDepth(2);

    this.skipButtonL2.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.SkipPreloadL2());
    this.skipButtonL2.on('pointerover', function (pointer) {this.skipButtonL2Sel.setVisible(true);}, this);
    this.skipButtonL2.on('pointerout', function (pointer) {this.skipButtonL2Sel.setVisible(false);}, this);

    // 2) PLAYER
    this.player1 = this.physics.add.sprite(60, 685, 'chicken1R').setScale(0.7).setDepth(2);
    this.player2 = this.physics.add.sprite(gameWidth-60, 685, 'chicken2L').setScale(0.7).setDepth(2);

    // 3) OBJETOS DE CONTROL DE FLUJO
    this.endTrigger1Empty = this.physics.add.sprite(70, 99, 'basketEmpty').setOrigin(0).setSize(100, 100).setDepth(2).setScale(1).refreshBody();
    this.endTrigger1Empty.body.setAllowGravity(false);

    this.endTrigger1 = this.physics.add.sprite(30, 79, 'basket1').setOrigin(0).setSize(100, 100).setDepth(2).setScale(1).refreshBody();
    this.endTrigger1.body.setAllowGravity(false);
    this.endTrigger1.setVisible(false);

    this.endTrigger2Empty = this.physics.add.sprite(1240, 99, 'basketEmpty').setOrigin(0).setSize(100, 102).setDepth(2).setScale(1).refreshBody();
    this.endTrigger2Empty.body.setAllowGravity(false);

    this.endTrigger2 = this.physics.add.sprite(1220, 99, 'basket2').setOrigin(0).setSize(100, 102).setDepth(2).setScale(1).refreshBody();
    this.endTrigger2.body.setAllowGravity(false);
    this.endTrigger2.setVisible(false);

    // 4) FÍSICAS
    this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);  // Tamaño del nivel
    this.player1.setCollideWorldBounds(false);    // No puede sal
    this.player2.setCollideWorldBounds(false);

    this.ground = this.physics.add.staticGroup();    // Grupo de plataformas colisionables
    //Bordes y palo del medio
    this.ground.create(0, 730, 'platform').setOrigin(0,0).setScale(4,0.5).refreshBody().setVisible(false); //abajo
    this.ground.create(gameWidth/2-10, 0, 'platform').setOrigin(0,0).setScale(0.05,23).refreshBody().setVisible(false); //palo medio
    this.ground.create(0, 0, 'platform').setOrigin(0,0).setScale(0.05,23).refreshBody().setVisible(false);//palo dcha
    this.ground.create(gameWidth-20, 0, 'platform').setOrigin(0,0).setScale(0.05,23).refreshBody().setVisible(false); //palo izq
    this.ground.create(0, 0, 'platform').setOrigin(0,0).setScale(4,0.5).refreshBody().setVisible(false); //arriba
    //Nivel 1
    this.ground.create(440, 600, 'platform').setOrigin(0,0).setScale(1.36,0.5).refreshBody().setVisible(false);
    this.ground.create(0, 600, 'platform').setOrigin(0,0).setScale(0.63,0.5).refreshBody().setVisible(false);
    this.ground.create(1175, 600, 'platform').setOrigin(0,0).setScale(0.63,0.5).refreshBody().setVisible(false);
    this.ground.create(830, 600, 'platform').setOrigin(0,0).setScale(0.4,4.2).refreshBody().setVisible(false);
    //Nivel 2
    this.ground.create(215, 460, 'platform').setOrigin(0,0).setScale(1.15,0.5).refreshBody().setVisible(false);
    this.ground.create(705, 460, 'platform').setOrigin(0,0).setScale(1.25,0.5).refreshBody().setVisible(false);
    //Nivel 3
    this.ground.create(570, 330, 'platform').setOrigin(0,0).setScale(0.35,0.5).refreshBody().setVisible(false);
    this.ground.create(1050, 330, 'platform').setOrigin(0,0).setScale(1,0.5).refreshBody().setVisible(false);
    this.ground.create(575, 230, 'platform').setOrigin(0,0).setScale(0.3,3.2).refreshBody().setVisible(false);
    this.ground.create(1060, 230, 'platform').setOrigin(0,0).setScale(0.7,3.2).refreshBody().setVisible(false);
    //Madera suelta
    this.ground.create(160, 275, 'platform').setOrigin(0,0).setScale(0.6,0.5).refreshBody().setVisible(false);
    //Exits
    this.ground.create(0, 200, 'platform').setOrigin(0,0).setScale(0.7,0.5).refreshBody().setVisible(false);
    this.ground.create(1180, 200, 'platform').setOrigin(0,0).setScale(0.7,0.5).refreshBody().setVisible(false);


    //Grupo de huevos
    this.eggsP1 = this.physics.add.staticGroup();
    this.eggsP1.create(570, 620, 'eggWhite').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP1.create(10, 490, 'eggWhite').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP1.create(gameWidth/2-108, 350, 'eggWhite').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();

    this.eggsP2 = this.physics.add.staticGroup();
    this.eggsP2.create(gameWidth/2+10, 350, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP2.create(gameWidth/2+50, 500, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP2.create(900, 10, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();

    this.physics.add.collider(this.player1, this.ground);
    this.physics.add.collider(this.eggsP1, this.ground);

    this.physics.add.collider(this.player2, this.ground);
    this.physics.add.collider(this.eggsP2, this.ground);

    // 5) CÁMARA
    //this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);   // Límites cámara

    // --- HUD --- //
    this.clockHUD = this.add.image(gameWidth/2, 720, 'clock');
    this.clockHUD.setDepth(2);

    //Timer
    this.initialTime = 35;

    this.text = this.add.text(gameWidth/2 - 25, 720, this.formatTime(this.initialTime), { fontFamily: "forte", fontSize: '32px', fill: '#000' });
    this.text.setDepth(2);


    // 1) BOTON PAUSA
    this.pauseButtonEs1 = this.add.image(gameWidth/2, 35, 'pauseButton');
    this.pauseButtonEs1.setDepth(2);
    this.pauseButtonEs1.setScale(2/3);
    this.pauseButtonEs1Sel = this.add.image(gameWidth/2,35, 'pauseButtonSel');
    this.pauseButtonEs1Sel.setVisible(false);
    this.pauseButtonEs1Sel.setScale(2/3);
    this.pauseButtonEs1Sel.setDepth(3);


    this.pauseButtonEs1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.PauseMenu());
    this.pauseButtonEs1.on('pointerover', function (pointer) {this.pauseButtonEs1Sel.setVisible(true);}, this);
    this.pauseButtonEs1.on('pointerout', function (pointer) {this.pauseButtonEs1Sel.setVisible(false);}, this);

    // --- CONTROLES --- //

	if((gamemode == "Online")){

			console.log("Jugando moodo online con x");
			var pl1 = this.player1;
			var pl2 = this.player2;
			
			playerUpdate = setInterval(function(){
				
					if(playerId == 1 ){
						
						connection.send(JSON.stringify({type: "updatePosition",
						posX: pl1.x, posY: pl1.y,
						accX: pl1.body.acceleration.x, accY: pl1.body.acceleration.y}));
					}
					else if(playerId==2)
					{
						connection.send(JSON.stringify({type: "updatePosition",
						posX: pl2.x, posY: pl2.y,
						accX: pl2.body.acceleration.x, accY: pl2.body.acceleration.y}));
					}
				
			}, 30);
		
		



		 connection.onmessage = (msg) => {

			var parsedMessage = JSON.parse(msg.data);
	        console.log("receive");

	        if(parsedMessage.type == "updatePosition"){
				if(playerId == 1){
					this.player2.x = parsedMessage.posX;
					this.player2.y = parsedMessage.posY;
					this.player2.body.x = parsedMessage.posX;
					this.player2.body.y = parsedMessage.posY;
					//this.player2.setVisible(true);
				}
				else if(playerId == 2){
					this.player1.x = parsedMessage.posX;
					this.player1.y = parsedMessage.posY;
					this.player1.body.x = parsedMessage.posX;
					this.player1.body.y = parsedMessage.posY;
					//this.player1.setVisible(true);
				}
				this.UpdatetAnims();
	        }

			if(parsedMessage.type == "synTimer"){
				this.initialTime = parsedMessage.time;
			}

	        if(parsedMessage.type == "leave"){
	         	console.log(" EL OTRO SE FUE :((((");
	         	clearInterval(this.playerUpdate);
	         	alone = true;
	         	//gamemode = "Offline";
	         	//this.PlayGame();
	         	//skipTutorial = true;
	         }

		}




		if(playerId == 1 ){
			this.P1_jumpButton = this.input.keyboard.addKey(P1_controls.up, false);
			this.P1_leftButton = this.input.keyboard.addKey(P1_controls.left, false);
			this.P1_rightButton = this.input.keyboard.addKey(P1_controls.right, false);

	 		// Reiniciamos eventos
		    this.P1_jumpButton.off('down');
		    this.P1_jumpButton.off('up');
		    this.P1_leftButton.off('down');
		    this.P1_leftButton.off('up');
		    this.P1_rightButton.off('down');
		    this.P1_rightButton.off('up');

			//Controles jugador 1
		    this.P1_jumpButton.on('down',this.player1StartJump , this);
		    this.P1_jumpButton.on('up',this.player1StopJump, this);
		    this.P1_leftButton.on('down',this.player1Left , this);
		    this.P1_leftButton.on('up', this.player1Stop, this);
		    this.P1_rightButton.on('down',this.player1Right, this);
		    this.P1_rightButton.on('up', this.player1Stop, this);
		}
		else if(playerId ==2){
			this.P2_jumpButton = this.input.keyboard.addKey(P2_controls.up, false);
			this.P2_leftButton = this.input.keyboard.addKey(P2_controls.left,false);
			this.P2_rightButton = this.input.keyboard.addKey(P2_controls.right, false);

			// Reiniciamos eventos
			this.P2_jumpButton.off('down');
		    this.P2_jumpButton.off('up');
		    this.P2_leftButton.off('down');
		    this.P2_leftButton.off('up');
		    this.P2_rightButton.off('down');
		    this.P2_rightButton.off('up');

			//Controles jugador 2
		    this.P2_jumpButton.on('down',this.player2StartJump, this);
		    this.P2_jumpButton.on('up',this.player2StopJump, this);
		    this.P2_leftButton.on('down',this.player2Left, this);
		    this.P2_leftButton.on('up', this.player2Stop, this);
		    this.P2_rightButton.on('down',this.player2Right, this);
		    this.P2_rightButton.on('up', this.player2Stop, this);


		}
	}else{
	    // 1) P1
	    this.P1_jumpButton = this.input.keyboard.addKey(P1_controls.up, false);
	    this.P1_leftButton = this.input.keyboard.addKey(P1_controls.left, false);
	    this.P1_rightButton = this.input.keyboard.addKey(P1_controls.right, false);

	    // 2) P2
	    this.P2_jumpButton = this.input.keyboard.addKey(P2_controls.up, false);
	    this.P2_leftButton = this.input.keyboard.addKey(P2_controls.left,false);
	    this.P2_rightButton = this.input.keyboard.addKey(P2_controls.right, false);

	    // Reiniciamos eventos
	    this.P1_jumpButton.off('down');
	    this.P1_jumpButton.off('up');
	    this.P1_leftButton.off('down');
	    this.P1_leftButton.off('up');
	    this.P1_rightButton.off('down');
	    this.P1_rightButton.off('up');

	    this.P2_jumpButton.off('down');
	    this.P2_jumpButton.off('up');
	    this.P2_leftButton.off('down');
	    this.P2_leftButton.off('up');
	    this.P2_rightButton.off('down');
	    this.P2_rightButton.off('up');

	    //Controles jugador 1
	    this.P1_jumpButton.on('down',this.player1StartJump, this);
	    this.P1_jumpButton.on('up',this.player1StopJump, this);
	    this.P1_leftButton.on('down',this.player1Left , this);
	    this.P1_leftButton.on('up', this.player1Stop, this);
	    this.P1_rightButton.on('down',this.player1Right, this);
	    this.P1_rightButton.on('up', this.player1Stop, this);

	    //Controles jugador 2
	    this.P2_jumpButton.on('down',this.player2StartJump, this);
	    this.P2_jumpButton.on('up',this.player2StopJump, this);
	    this.P2_leftButton.on('down',this.player2Left, this);
	    this.P2_leftButton.on('up', this.player2Stop, this);
	    this.P2_rightButton.on('down',this.player2Right, this);
	    this.P2_rightButton.on('up', this.player2Stop, this);

	}


    //Variable para saber los huevos recogidos
    this.score=0;

    // Each 1000 ms call onEvent
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
    
    if(gamemode == "Online"){
    	connection.send(JSON.stringify({type: "syncTimer", time: this.text.text}));
    }
	

  }
  update(){

    this.physics.add.overlap(this.player1, this.eggsP1, this.recogerHuevoP1, null, this);
    this.physics.add.overlap(this.player2, this.eggsP2, this.recogerHuevoP2, null, this);

    if(this.end1Visible == true) {
      this.physics.add.overlap(this.player1, this.endTrigger1, this.endArrived, null, this);
    }

    if(this.end2Visible == true){
      this.physics.add.overlap(this.player2, this.endTrigger2, this.endArrived, null, this);
    }

    if(this.initialTime < 60){
      this.text.setX(gameWidth/2 - 28);
    }

    if(this.initialTime < 0){
      this.GameOverEs1();
    }

    if (alone == true){
    	this.AloneInGame();  	
    	alone = false;
    }

	//alive();
  }

  formatTime(seconds){
    var minutes = Math.floor(seconds/60);
    var partInSeconds = seconds%60;
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    return `${minutes}:${partInSeconds}`;
  }

  onEvent ()
  {
    this.initialTime -= 1; // One second
    this.text.setText(this.formatTime(this.initialTime));

    if(this.initialTime==0){
      console.log("Se acaboo");
    }
  }

  recogerHuevoP1 (player, egg)
  {
    egg.body.enable=false;
    this.eggSound.play();

    this.tweens.add({
      targets:egg,
      duration:2500,
      x:80,
      y:130,
      onComplete: () => egg.alpha=0
    })

    this.score += 1;
    this.numEgssP1 ++;

    if(this.numEgssP1 == 3){
      this.end1Visible = true;
      this.time.addEvent({
        delay: 2500,
        callback: function() {
          this.endTrigger1.setVisible(true);
          this.endTrigger1Empty.setVisible(false);
        },
      callbackScope: this
      }, this);


    }
  }

  recogerHuevoP2 (player, egg)
  {
    egg.body.enable=false;
    this.eggSound.play();

    this.tweens.add({
      targets:egg,
      duration:2500,
      x:this.levelWidth-200,
      y:140,
      onComplete: () => egg.alpha=0
    })

    this.score += 1;
    this.numEgssP2 ++;

    if(this.numEgssP2 == 3){
      this.end2Visible = true;
      this.time.addEvent({
        delay: 2500,
        callback: function() {
          this.endTrigger2Empty.setVisible(false);
          this.endTrigger2.setVisible(true);
        },
      callbackScope: this
      }, this);
    }
  }


  
endArrived(player, end){
    end.body.enable=false;
    this.goalSound.play();
    this.playersArrived++;

    if (this.playersArrived == 2){
        this.FinNivelEs1();
    }
  }

//ANIMATIONS
  //ANIMATIONS PLAYER 1
  player1StartJump(){
    this.player1.setVelocityY(-300);
  }

  player1StopJump(){
    this.player1.setVelocityY(0);
  }


  player1Left() {
    this.player1.setVelocityX(-160);
    this.player1.anims.play('move_left1', true);
    this.player1.flipX = false;
    this.dir1 = 0;
  }

  player1Right() {
    this.player1.setVelocityX(160);
    this.player1.anims.play('move_right1', true);
    this.dir1 = 1;
  }

  player1Stop() {
    this.player1.setVelocityX(0);

    if(this.dir1 == 1){
      this.player1.anims.play('stop1R', true);
    }else{
      this.player1.anims.play('stop1L', true);
    }

    if(this.P1_leftButton.isDown){
      this.player1Left();
    }
    if(this.P1_rightButton.isDown){
      this.player1Right();
    }
  }

  //ANIMATIONS PLAYER 2
  player2StartJump(){
    this.player2.setVelocityY(-300);
  }

  player2StopJump(){
    this.player2.setVelocityY(0);
  }


  player2Left() {
    this.player2.setVelocityX(-160);
    this.player2.anims.play('move_left2', true);
    this.dir2 = 0;
  }

  player2Right() {
    this.player2.setVelocityX(160);
    this.player2.anims.play('move_right2', true);
    this.dir2 = 1;
  }

  player2Stop() {
    this.player2.setVelocityX(0);

    if(this.dir2 == 1){
      this.player2.anims.play('stop2R', true);
    }else{
      this.player2.anims.play('stop2L', true);
    }

    if(this.P2_leftButton.isDown){
      this.player2Left();
    }
    if(this.P2_rightButton.isDown){
      this.player2Right();
    }
  }

  //GAME CONTROL
  FinNivelEs1(){

    totalTime += 35 - this.initialTime;
    finalPunt = (totalTime * 5)/4

    this.endTrigger1.setVisible(false);
    this.endTrigger2.setVisible(false);
    this.endTrigger1Empty.setVisible(false);
    this.endTrigger2Empty.setVisible(false);
    this.player1.setVisible(false);
    this.player2.setVisible(false);
    this.backgroundEs1.setVisible(false);
    this.clockHUD.setVisible(false);
    this.text.setVisible(false);

    this.pauseButtonEs1.setVisible(false);
    this.skipButtonL2.setVisible(true);

    this.tweens.add({
      targets: this.preLevel2,
      duration: 1000,
      alpha: 1,
      yoyo: true,
      hold: 4000,
      completeDelay: 2000
    });

    this.time.addEvent({
      delay: 6300,
      callback: function() {
        this.scene.stop('GamePlayEs1Multiplayer');
        this.scene.sendToBack('GamePlayEs1Multiplayer');
        this.scene.start('GamePlayEs2');
      },
    callbackScope: this
    }, this);

  }

  AloneInGame(){
	  if(musicGameplay.isPlaying){
	      musicGameplay.stop();
	    }
	    musicMenu.play();

	    this.scene.stop('GamePlayEs1Multiplayer');
	    this.scene.sendToBack('GamePlayEs1Multiplayer');
	    this.scene.start('AloneInGame');
  }
  
  GameOverEs1(){

    if(musicGameplay.isPlaying){
      musicGameplay.stop();
    }
    musicMenu.play();

    if (gamemode == "Online")
    {
    	clearInterval(playerUpdate);
    }
    
    this.scene.stop('GamePlayEs1Multiplayer');
    this.scene.sendToBack('GamePlayEs1Multiplayer');
    this.scene.start('GameOver');
  }

  SkipPreloadL2()
  {
    this.scene.stop('GamePlayEs1Multiplayer');
    this.scene.sendToBack('GamePlayEs1Multiplayer');
    this.scene.start('GamePlayEs2');
  }

  PauseMenu(){

    this.clickSound.play();

    if(musicGameplay.isPlaying){
      musicGameplay.stop();
    }
    musicMenu.play();
    
    if(gamemode == "Online"){
    	//clearInterval(this.playerUpdate);
    	this.scene.run('PauseMenuMultiplayer');
        this.scene.bringToTop('PauseMenuMultiplayer');
        this.scene.sendToBack();
    }
    else
    {
    	this.scene.run('PauseMenu');
        this.scene.bringToTop('PauseMenu');
        this.scene.pause();
    }
    
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

	UpdatetAnims(){
		if(this.player1.prevx > this.player1.x)
		{
			this.player1.anims.play('move_left1', true);
			this.player1.flipX = false;
		}
		else if(this.player1.prevx < this.player1.x)
		{
			this.player1.anims.play('move_right1', true);
			this.player1.flipX = false;
		}
		else if(this.player1.prevx == this.player1.x)
			this.player1.anims.play('stop1R', true);

		this.player1.prevx = this.player1.x;

		if(this.player2.prevx > this.player2.x){
			this.player2.anims.play('move_left2', true);
			this.player2.flipX = false;
		}
		else if(this.player2.prevx < this.player2.x)
		{
			this.player2.anims.play('move_right2', true);
		    this.player2.flipX = false;
		}
		else if(this.player2.prevx == this.player2.x)
			this.player2.anims.play('stop2R', true);

		this.player2.prevx = this.player2.x;

	}
}
