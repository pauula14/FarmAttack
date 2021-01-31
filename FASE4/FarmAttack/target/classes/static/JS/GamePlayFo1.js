class GamePlayFo1 extends Phaser.Scene{
  constructor(){
      super("GamePlayFo1");

      this.numEgssP1 = 0;
      this.numEgssP2 = 0;
      this.end1Visible = false;
      this.end2Visible = false;
      this.playersArrived = 0;
      this.endsVisibles = 0;
      this.dir1 = 1; //0 = mirando izq, 1 = mirando der
      this.dir2 = 0; //0 = izq, 1 = der
  }

  preload(){
    this.levelWidth = 1462;
    this.levelHeight = 687;
    
	 if(gamemode == "Online")
	 {	
	    	console.log("online");
	
	  	    //Cuando la conexion da un error
		    connection.onerror = function(e) {
		      console.log("WS error: " + e);
		    }
	
		    //Cuando se cierra la conexion, se muestra el codigo del motivo, para poder solucionarlo si esto ha sido no intencionadamente.
		    connection.onclose = function(e){
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

    levelGameplay = 'GamePlayFo1';

    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());
    this.handleSound = this.sound.add('handleSound', this.EffectsConfig());
    this.eggSound = this.sound.add('eggSound', this.EffectsConfig());
    this.goalSound = this.sound.add('goalSound', this.EffectsConfig());

    // 1) BACKGROUND
    this.backgroundFo1 = this.add.image(0, 0, 'backgroundFo');
    this.backgroundFo1.setPosition(gameWidth/2, gameHeight/2);
    this.backgroundFo1.setDepth(1);

    // 2) PLAYER
    this.player1 = this.physics.add.sprite(60, 130, 'chicken1R').setScale(0.7).setDepth(2);
    this.player2 = this.physics.add.sprite(gameWidth-60, 265, 'chicken2L').setScale(0.7).setDepth(2);

    // 3) OBJETOS DE CONTROL DE FLUJO
    this.endTrigger1Empty = this.physics.add.sprite(90, 639, 'basketEmpty').setOrigin(0).setSize(100, 100).setDepth(2).setScale(1).refreshBody();
    this.endTrigger1Empty.body.setAllowGravity(false);
    this.endTrigger1 = this.physics.add.sprite(50, 620, 'basket1').setSize(100, 100).setOrigin(0).setDepth(2).refreshBody();
    this.endTrigger1.body.setAllowGravity(false);
    this.endTrigger1.setVisible(false);

    //
    this.endTrigger2Empty = this.physics.add.sprite(20, 640, 'basketEmpty').setOrigin(0).setSize(100, 102).setDepth(2).setScale(1).refreshBody();
    this.endTrigger2Empty.body.setAllowGravity(false);
    this.endTrigger2 = this.physics.add.sprite(0, 640, 'basket2').setSize(100, 100).setOrigin(0).setDepth(2).refreshBody();
    this.endTrigger2.body.setAllowGravity(false);
    this.endTrigger2.setVisible(false);

    // 4) FÍSICAS
    this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);  // Tamaño del nivel
    this.player1.setCollideWorldBounds(false);    // No puede sal
    this.player2.setCollideWorldBounds(false);

    this.ground = this.physics.add.staticGroup();    // Grupo de plataformas colisionables
    //Bordes y palo del medio
    this.ground.create(0, 740, 'platform').setOrigin(0,0).setScale(4,0.5).refreshBody().setVisible(false); //abajo
    this.ground.create(0, 0, 'platform').setOrigin(0,0).setScale(0.05,23).refreshBody().setVisible(false);//palo dcha
    this.ground.create(gameWidth-20, 0, 'platform').setOrigin(0,0).setScale(0.05,23).refreshBody().setVisible(false); //palo izq
    this.ground.create(0, 0, 'platform').setOrigin(0,0).setScale(4,0.5).refreshBody().setVisible(false); //arriba

    //Nivel 1
    this.ground.create(0, 601, 'platform').setOrigin(0,0).setScale(1.377,0.55).refreshBody().setVisible(false);//left
    this.ground.create(gameWidth/2+62, 601, 'platform').setOrigin(0,0).setScale(0.85,0.55).refreshBody().setVisible(false); //right
    this.ground.create(gameWidth/2+62, 601, 'platform').setOrigin(0,0).setScale(0.045,4.2).refreshBody().setVisible(false); //stick vertical

    //Nivel 2
    this.ground.create(332, 461, 'platform').setOrigin(0,0).setScale(0.54,0.5).refreshBody().setVisible(false);//left
    this.ground.create(gameWidth/2-180, 461, 'platform').setOrigin(0,0).setScale(0.045,4.5).refreshBody().setVisible(false);//stick vertical
    this.ground.create(gameWidth/2+352, 461, 'platform').setOrigin(0,0).setScale(0.52,0.5).refreshBody().setVisible(false);//right

    //Nivel 3
    this.ground.create(332, 307, 'platform').setOrigin(0,0).setScale(0.5,0.5).refreshBody().setVisible(false);//left
    this.ground.create(gameWidth/2+220, 307, 'platform').setOrigin(0,0).setScale(1.2,0.5).refreshBody().setVisible(false);//right
    this.ground.create(332, 307, 'platform').setOrigin(0,0).setScale(0.045,5).refreshBody().setVisible(false);//stick vertical
    this.ground.create(gameWidth/2+352, 307, 'platform').setOrigin(0,0).setScale(0.045,5).refreshBody().setVisible(false);//stick vertical 2

    //Nivel 4
    this.ground.create(0, 170, 'platform').setOrigin(0,0).setScale(0.62,0.5).refreshBody().setVisible(false);//left 1
    this.ground.create(gameWidth-295, 131, 'platform').setOrigin(0,0).setScale(0.7,0.5).refreshBody().setVisible(false);


    //Grupo de huevos
    this.eggsP1 = this.physics.add.staticGroup();
    this.eggsP1.create(gameWidth/2+80, 630, 'eggWhite').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP1.create(gameWidth/2-350, 350, 'eggWhite').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP1.create(gameWidth-120, 30, 'eggWhite').setOrigin(0,0).setScale(0.7).refreshBody().setDepth(2);

    this.eggsP2 = this.physics.add.staticGroup();
    this.eggsP2.create(gameWidth/2+370, 360, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP2.create(130,70, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP2.create(430, 490, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();

    this.physics.add.collider(this.player1, this.ground);
    this.physics.add.collider(this.eggsP1, this.ground);

    this.physics.add.collider(this.player2, this.ground);
    this.physics.add.collider(this.eggsP2, this.ground);

    // 5) CÁMARA
    this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);   // Límites cámara

    // --- HUD --- //
    this.clockHUD = this.add.image(gameWidth/2, 720, 'clock');
    this.clockHUD.setDepth(2);
    //Timer
    this.initialTime = 80;

    this.text = this.add.text(gameWidth/2 - 25, 720, this.formatTime(this.initialTime), {fontFamily: "forte", fontSize: '32px', fill: '#000' });
    this.text.setDepth(2);

    // 1) BOTON PAUSA
    this.pauseButtonFo1 = this.add.image(gameWidth/2, 35, 'pauseButton');
    this.pauseButtonFo1.setDepth(2);
    this.pauseButtonFo1.setScale(2/3);
    this.pauseButtonFo1Sel = this.add.image(gameWidth/2,35, 'pauseButtonSel');
    this.pauseButtonFo1Sel.setVisible(false);
    this.pauseButtonFo1Sel.setScale(2/3);
    this.pauseButtonFo1Sel.setDepth(3);

    this.pauseButtonFo1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.PauseMenu());
    this.pauseButtonFo1.on('pointerover', function (pointer) {this.pauseButtonFo1Sel.setVisible(true);}, this);
    this.pauseButtonFo1.on('pointerout', function (pointer) {this.pauseButtonFo1Sel.setVisible(false);}, this);

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
	         }
	        
	        if(parsedMessage.type == "gameover"){
	        	gameOver = true;
	        }

		}




		if(playerId == 1 )
		{
			this.P1_jumpButton = this.input.keyboard.addKey(P1_controls.up, false);
			this.P1_leftButton = this.input.keyboard.addKey(P1_controls.left, false);
			this.P1_rightButton = this.input.keyboard.addKey(P1_controls.right, false);
			
			this.P1_jumpButton2 = this.input.keyboard.addKey(P2_controls.up, false);
			this.P1_leftButton2 = this.input.keyboard.addKey(P2_controls.left,false);
			this.P1_rightButton2 = this.input.keyboard.addKey(P2_controls.right, false);

	 		// Reiniciamos eventos
		    this.P1_jumpButton.off('down');
		    this.P1_jumpButton.off('up');
		    this.P1_leftButton.off('down');
		    this.P1_leftButton.off('up');
		    this.P1_rightButton.off('down');
		    this.P1_rightButton.off('up');
		    
		    this.P1_jumpButton2.off('down');
		    this.P1_jumpButton2.off('up');
		    this.P1_leftButton2.off('down');
		    this.P1_leftButton2.off('up');
		    this.P1_rightButton2.off('down');
		    this.P1_rightButton2.off('up');

			//Controles jugador 1
		    this.P1_jumpButton.on('down',this.player1StartJump , this);
		    this.P1_jumpButton.on('up',this.player1StopJump, this);
		    this.P1_leftButton.on('down',this.player1Left , this);
		    this.P1_leftButton.on('up', this.player1Stop, this);
		    this.P1_rightButton.on('down',this.player1Right, this);
		    this.P1_rightButton.on('up', this.player1Stop, this);
		    
		    this.P1_jumpButton2.on('down',this.player1StartJump , this);
		    this.P1_jumpButton2.on('up',this.player1StopJump, this);
		    this.P1_leftButton2.on('down',this.player1Left , this);
		    this.P1_leftButton2.on('up', this.player1Stop, this);
		    this.P1_rightButton2.on('down',this.player1Right, this);
		    this.P1_rightButton2.on('up', this.player1Stop, this);
		}
		else if(playerId ==2)
		{
			this.P2_jumpButton = this.input.keyboard.addKey(P1_controls.up, false);
			this.P2_leftButton = this.input.keyboard.addKey(P1_controls.left, false);
			this.P2_rightButton = this.input.keyboard.addKey(P1_controls.right, false);
			
			this.P2_jumpButton2 = this.input.keyboard.addKey(P2_controls.up, false);
			this.P2_leftButton2 = this.input.keyboard.addKey(P2_controls.left,false);
			this.P2_rightButton2 = this.input.keyboard.addKey(P2_controls.right, false);

			// Reiniciamos eventos
			this.P2_jumpButton.off('down');
		    this.P2_jumpButton.off('up');
		    this.P2_leftButton.off('down');
		    this.P2_leftButton.off('up');
		    this.P2_rightButton.off('down');
		    this.P2_rightButton.off('up');
		    
		    this.P2_jumpButton2.off('down');
		    this.P2_jumpButton2.off('up');
		    this.P2_leftButton2.off('down');
		    this.P2_leftButton2.off('up');
		    this.P2_rightButton2.off('down');
		    this.P2_rightButton2.off('up');

			//Controles jugador 2
		    this.P2_jumpButton.on('down',this.player2StartJump, this);
		    this.P2_jumpButton.on('up',this.player2StopJump, this);
		    this.P2_leftButton.on('down',this.player2Left, this);
		    this.P2_leftButton.on('up', this.player2Stop, this);
		    this.P2_rightButton.on('down',this.player2Right, this);
		    this.P2_rightButton.on('up', this.player2Stop, this);

		    this.P2_jumpButton2.on('down',this.player2StartJump, this);
		    this.P2_jumpButton2.on('up',this.player2StopJump, this);
		    this.P2_leftButton2.on('down',this.player2Left, this);
		    this.P2_leftButton2.on('up', this.player2Stop, this);
		    this.P2_rightButton2.on('down',this.player2Right, this);
		    this.P2_rightButton2.on('up', this.player2Stop, this);


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
      this.GameOverFo1();
    }
    
    if (alone == true){
    	this.AloneInGame();  	
    	alone = false;
    }
    
    if(gameOver == true){
    	this.GameOverFo1();
    	gameOver = false;
    }

  }

  formatTime(seconds){
    var minutes = Math.floor(seconds/60);
    var partInSeconds = seconds%60;
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    return `${minutes}:${partInSeconds}`;
  }

  onEvent ()
  {
	  if(this.goalArrived == false){
			this.initialTime -= 1; // One second
		    this.text.setText(this.formatTime(this.initialTime));
		
		    if(this.initialTime==0){
		      console.log("Se acaboo");
		    }
		} 
  }

  recogerHuevoP1 (player, egg)
  {
    egg.body.enable=false;
    this.eggSound.play();

    this.tweens.add({
      targets:egg,
      duration:2500,
      x:100,
      y:610,
      onComplete: () => egg.alpha=0
    })

    this.score += 1;
    this.numEgssP1 ++;

    if(this.numEgssP1 == 3){
      this.endsVisibles ++;
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
      x:30,
      y:610,
      onComplete: () => egg.alpha=0
    })

    this.score += 1;
    this.numEgssP2 ++;

    if(this.numEgssP2 == 3){
      this.endsVisibles ++;
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


  endArrived(player, end)
  {
    end.body.enable=false;
    this.goalSound.play();
    this.playersArrived++;

    if (this.playersArrived == 2)
    {
      this.goalArrived = true;
      this.FinNivelFo1();
    }
  }

  //ANIMACIONES
  //CAMBIOS ANIMACIÓN PLAYER 1

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

  //CAMBIOS ANIMACION PLAYER 2
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

  //FLUJO DEL JUEGO
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

    FinNivelFo1(){
      totalTime += 80 - this.initialTime;
      finalPunt = (totalTime * 5);

      if(musicGameplay.isPlaying){
        musicGameplay.stop();
      }
      musicMenu.play();


      if (gamemode == "Online")
      {
      	clearInterval(playerUpdate);
      	connection.close();
      }
      
      
      this.scene.stop('GamePlayFo1');
      this.scene.sendToBack('GamePlayFo1');
      this.scene.start('Winner');
    }

    GameOverFo1(){
      if(musicGameplay.isPlaying){
        musicGameplay.stop();
      }
      musicMenu.play();

      if (gamemode == "Online")
      {
    	  gameOver = false;
      	connection.send(JSON.stringify({type: "gameover"}));
      	clearInterval(playerUpdate);
      	connection.close();
      }
      
      this.scene.stop('GamePlayFo1');
      this.scene.sendToBack('GamePlayFo1');
      this.scene.start('GameOver');
    }
    
    
    AloneInGame(){
  	  if(musicGameplay.isPlaying){
  	      musicGameplay.stop();
  	    }
  	    musicMenu.play();

  	    this.scene.stop('GamePlayFo1');
  	    this.scene.sendToBack('GamePlayFo1');
  	    this.scene.start('AloneInGame');
    }

    //CONFIGURATION
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
