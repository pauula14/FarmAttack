class GamePlayFa2 extends Phaser.Scene{
  constructor(){
      super("GamePlayFa2");

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
  }

  create(){

    this.dir1 = 1;
    this.dir2 = 0;
    this.numEgssP1 = 0;
    this.numEgssP2 = 0;
    this.end1Visible = false;
    this.end2Visible = false;
    this.playersArrived = 0;
    
    levelGameplay = 'GamePlayFa2';

    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());
    this.handleSound = this.sound.add('handleSound', this.EffectsConfig());
    this.eggSound = this.sound.add('eggSound', this.EffectsConfig());
    this.goalSound = this.sound.add('goalSound', this.EffectsConfig());

    // 1) BACKGROUND
    this.backgroundFa2 = this.add.image(0, 0, 'backgroundFa2');
    this.backgroundFa2.setPosition(gameWidth/2, gameHeight/2);
    this.backgroundFa2.setDepth(1);

    //Pre carga Nivel 5
    this.preLevel5 = this.add.image(gameWidth/2, gameHeight/2, 'level5');
    this.preLevel5.setDepth(2);
    this.preLevel5.alpha = 0;

    //SKIP BUTTON
    this.skipButtonL5 = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'skipButton');
    this.skipButtonL5.setVisible(false);
    this.skipButtonL5.setDepth(2);
    this.skipButtonL5Sel = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'skipButtonSel');
    this.skipButtonL5Sel.setVisible(false);
    this.skipButtonL5Sel.setDepth(2);

    this.skipButtonL5.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.SkipPreloadL5());
    this.skipButtonL5.on('pointerover', function (pointer) {this.skipButtonL5Sel.setVisible(true);}, this);
    this.skipButtonL5.on('pointerout', function (pointer) {this.skipButtonL5Sel.setVisible(false);}, this);

    // 2) PLAYER
    this.player1 = this.physics.add.sprite(60, 685, 'chicken1R').setScale(0.7).setDepth(2);
    this.player2 = this.physics.add.sprite(gameWidth-60, 685, 'chicken2L').setScale(0.7).setDepth(2);

    // 3) OBJETOS DE CONTROL DE FLUJO
    this.endTrigger1Empty = this.physics.add.sprite(1290, 70, 'basketEmpty').setOrigin(0).setSize(100, 100).setDepth(2).setScale(1).refreshBody();
    this.endTrigger1Empty.body.setAllowGravity(false);
    this.endTrigger1 = this.physics.add.sprite(1250, 50, 'basket1').setSize(100, 100).setOrigin(0).setDepth(2).refreshBody();
    this.endTrigger1.body.setAllowGravity(false);
    this.endTrigger1.setVisible(false);

    //
    this.endTrigger2Empty = this.physics.add.sprite(1220, 70, 'basketEmpty').setOrigin(0).setSize(100, 102).setDepth(2).setScale(1).refreshBody();
    this.endTrigger2Empty.body.setAllowGravity(false);
    this.endTrigger2 = this.physics.add.sprite(1200, 69, 'basket2').setSize(100, 100).setOrigin(0).setDepth(2).refreshBody();
    this.endTrigger2.body.setAllowGravity(false);
    this.endTrigger2.setVisible(false);

    // 4) FÍSICAS
    this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);  // Tamaño del nivel
    this.player1.setCollideWorldBounds(false);    // No puede sal
    this.player2.setCollideWorldBounds(false);

    this.ground = this.physics.add.staticGroup();    // Grupo de plataformas colisionables
    this.ground.create(0, 730, 'platform').setOrigin(0,0).setScale(4,0.5).refreshBody().setVisible(false); //abajo

    this.ground.create(gameWidth/2-10, 0, 'platform').setOrigin(0,0).setScale(0.05,13).refreshBody().setVisible(false); //palo medio 1
    this.ground.create(gameWidth/2-10, 600, 'platform').setOrigin(0,0).setScale(0.05,4).refreshBody().setVisible(false); //palo medio 2
    this.stickDelete=this.ground.create(gameWidth/2-10, 470, 'pipeline').setOrigin(0,0).setScale(1,1).setDepth(1).refreshBody(); //palo medio removable

    //Icon to help our teammate with the platform that block him to pass to otherside
    this.stickDeleteIcon=this.physics.add.sprite(gameWidth/2+100, 245, 'leverR').setOrigin(0,0).setScale(0.6,0.6).refreshBody();
    this.stickDeleteIcon.body.allowGravity=false;
    this.stickDeleteIcon.body.immovable=true;
    this.stickDeleteIcon.setDepth(2);

    this.stickDeleteIconAct=this.physics.add.sprite(gameWidth/2+100, 245, 'leverL').setOrigin(0,0).setScale(0.6,0.6).refreshBody();
    this.stickDeleteIconAct.body.allowGravity=false;
    this.stickDeleteIconAct.body.immovable=true;
    this.stickDeleteIconAct.setDepth(2);
    this.stickDeleteIconAct.setVisible(false);


    this.ground.create(0, 0, 'platform').setOrigin(0,0).setScale(0.05,23).refreshBody().setVisible(false);//palo dcha
    this.ground.create(gameWidth-20, 0, 'platform').setOrigin(0,0).setScale(0.05,23).refreshBody().setVisible(false); //palo izq
    this.ground.create(0, 0, 'platform').setOrigin(0,0).setScale(4,0.5).refreshBody().setVisible(false); //arriba

    //Nivel 1
    this.ground.create(150, 600, 'platform').setOrigin(0,0).setScale(1,0.5).refreshBody().setVisible(false);//left
    this.ground.create(gameWidth/2, 600, 'platform').setOrigin(0,0).setScale(0.8,0.5).refreshBody().setVisible(false); //right
    this.ground.create(gameWidth-240, 600, 'platform').setOrigin(0,0).setScale(0.57,0.5).refreshBody().setVisible(false); //right2

    //Nivel 1: platform that will move to left and right in loop
    this.movablePlatform2=this.physics.add.sprite(143, 600, 'platform').setOrigin(0,0).setScale(1.4,0.5).refreshBody();
    this.movablePlatform2.body.allowGravity=false;
    this.movablePlatform2.body.immovable=true;
    this.movablePlatform2.setDepth(2);
    this.movablePlatform2.tint=0x180d06;

    this.pltToDelete=this.ground.create(0, 600, 'platform').setOrigin(0,0).setScale(0.5,0.5).setDepth(2).refreshBody();//left2
    this.pltToDelete.tint=0x180d06;

    //Nivel 1: icon to help our teammate with the platform that block him to pass
    this.movablePlatformIcon2=this.physics.add.sprite(gameWidth/2+100, 535, 'leverR').setOrigin(0,0).setScale(0.6,0.6).refreshBody();
    this.movablePlatformIcon2.body.allowGravity=false;
    this.movablePlatformIcon2.body.immovable=true;
    this.movablePlatformIcon2.setDepth(2);
    this.movablePlatformIcon2Act=this.physics.add.sprite(gameWidth/2+100, 535, 'leverL').setOrigin(0,0).setScale(0.6,0.6).refreshBody();
    this.movablePlatformIcon2Act.body.allowGravity=false;
    this.movablePlatformIcon2Act.body.immovable=true;
    this.movablePlatformIcon2Act.setDepth(2);
    this.movablePlatformIcon2Act.setVisible(false);


    //Nivel 2
    this.ground.create(0, 455, 'platform').setOrigin(0,0).setScale(0.68,0.5).refreshBody().setVisible(false);//left
    this.ground.create(gameWidth/2-275, 455, 'platform').setOrigin(0,0).setScale(0.7,0.5).refreshBody().setVisible(false);//left2
    this.ground.create(gameWidth/2+10, 455, 'platform').setOrigin(0,0).setScale(1.4,0.5).refreshBody().setVisible(false);//right

    //Nivel 2: platform that our teammate will help move it to the left
    this.movablePlatform=this.physics.add.sprite(gameWidth-145, 455, 'platformBroken').setOrigin(0,0).setScale(1.15,1.0).refreshBody();
    this.movablePlatform.body.allowGravity=false;
    this.movablePlatform.body.immovable=true;
    this.movablePlatform.setDepth(2);

    //Nivel 2: icon to help our teammate with the platform
    this.movablePlatformIcon=this.physics.add.sprite(50, 390, 'leverR').setOrigin(0,0).setScale(0.6,0.6).refreshBody();
    this.movablePlatformIcon.body.allowGravity=false;
    this.movablePlatformIcon.body.immovable=true;
    this.movablePlatformIcon.setDepth(2);

    this.movablePlatformIconAct=this.physics.add.sprite(50, 390, 'leverL').setOrigin(0,0).setScale(0.6,0.6).refreshBody();
    this.movablePlatformIconAct.body.allowGravity=false;
    this.movablePlatformIconAct.body.immovable=true;
    this.movablePlatformIconAct.setDepth(2);
    this.movablePlatformIconAct.setVisible(false);

    //Nivel 3
    this.ground.create(260, 310, 'platform').setOrigin(0,0).setScale(1.15,0.5).refreshBody().setVisible(false);//left
    this.ground.create(gameWidth/2, 310, 'platform').setOrigin(0,0).setScale(0.9,0.5).refreshBody().setVisible(false);//right
    this.blockDelete=this.ground.create(gameWidth/2+240, 142, 'flowerPot').setOrigin(0,0).setScale(1,1).setDepth(2).refreshBody();//block that dont allow pass

    //Nivel 3: icon to help our teammate with the block that block him to pass
    this.blockDeleteIcon=this.physics.add.sprite(gameWidth/2-100, 105, 'leverL').setOrigin(0,0).setScale(0.6,0.6).refreshBody();
    this.blockDeleteIcon.body.allowGravity=false;
    this.blockDeleteIcon.body.immovable=true;
    this.blockDeleteIcon.setDepth(2);

    this.blockDeleteIconAct=this.physics.add.sprite(gameWidth/2-100, 105, 'leverR').setOrigin(0,0).setScale(0.6,0.6).refreshBody();
    this.blockDeleteIconAct.body.allowGravity=false;
    this.blockDeleteIconAct.body.immovable=true;
    this.blockDeleteIconAct.setDepth(2);
    this.blockDeleteIconAct.setVisible(false);

    //Exit
    this.ground.create(0, 170, 'platform').setOrigin(0,0).setScale(0.5,0.5).refreshBody().setVisible(false);//left 1
    this.ground.create(gameWidth/2-280, 170, 'platform').setOrigin(0,0).setScale(0.7,0.5).refreshBody().setVisible(false); //left 2
    this.ground.create(gameWidth-285, 170, 'platform').setOrigin(0,0).setScale(0.68,0.5).refreshBody().setVisible(false);


    //Grupo de huevos
    this.eggsP1 = this.physics.add.staticGroup();
    this.eggsP1.create(290, 640, 'eggWhite').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP1.create(gameWidth/2-120, 350, 'eggWhite').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP1.create(20, 70, 'eggWhite').setOrigin(0,0).setScale(0.7).refreshBody().setDepth(2);

    this.eggsP2 = this.physics.add.staticGroup();
    this.eggsP2.create(gameWidth/2+100, 360, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP2.create(gameWidth-100, 230, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP2.create(gameWidth/2+50, 640, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();

    this.physics.add.collider(this.player1, this.ground);
    this.physics.add.collider(this.eggsP1, this.ground);
    this.physics.add.collider(this.player1, this.movablePlatform2);//collision platform move to left-right loop

    this.physics.add.collider(this.player2, this.ground);
    this.physics.add.collider(this.eggsP2, this.ground);
    this.physics.add.collider(this.player2, this.movablePlatform);//collision platform move to left

    // 5) CÁMARA
    this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);   // Límites cámara

    // --- HUD --- //
    this.clockHUD = this.add.image(gameWidth/2, 720, 'clock');
    this.clockHUD.setDepth(2);
    //Timer
    this.initialTime = 65;

    this.text = this.add.text(gameWidth/2 - 25, 720, this.formatTime(this.initialTime), {fontFamily: "forte", fontSize: '32px', fill: '#000' });
    this.text.setDepth(2);

    // 1) BOTON PAUSA
    this.pauseButtonFa2 = this.add.image(gameWidth/2, 35, 'pauseButton');
    this.pauseButtonFa2.setDepth(2);
    this.pauseButtonFa2.setScale(2/3);
    this.pauseButtonFa2Sel = this.add.image(gameWidth/2,35, 'pauseButtonSel');
    this.pauseButtonFa2Sel.setVisible(false);
    this.pauseButtonFa2Sel.setScale(2/3);
    this.pauseButtonFa2Sel.setDepth(3);

    this.pauseButtonFa2.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.PauseMenu());
    this.pauseButtonFa2.on('pointerover', function (pointer) {this.pauseButtonFa2Sel.setVisible(true);}, this);
    this.pauseButtonFa2.on('pointerout', function (pointer) {this.pauseButtonFa2Sel.setVisible(false);}, this);

    // --- CONTROLES --- //

    // 1) P1
    this.P1_jumpButton = this.input.keyboard.addKey(P1_controls.up);
    this.P1_leftButton = this.input.keyboard.addKey(P1_controls.left);
    this.P1_rightButton = this.input.keyboard.addKey(P1_controls.right);

    // 2) P2
    this.P2_jumpButton = this.input.keyboard.addKey(P2_controls.up);
    this.P2_leftButton = this.input.keyboard.addKey(P2_controls.left);
    this.P2_rightButton = this.input.keyboard.addKey(P2_controls.right);

    this.testButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

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

    //Variable para saber los huevos recogidos
    this.score=0;

    // Each 1000 ms call onEvent
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

  }
  update(){

    this.physics.add.overlap(this.player1, this.eggsP1, this.recogerHuevoP1, null, this);
    this.physics.add.overlap(this.player2, this.eggsP2, this.recogerHuevoP2, null, this);

    this.physics.add.overlap(this.player1, this.movablePlatformIcon, this.movePltLeft, null, this);
    this.physics.add.overlap(this.player2, this.movablePlatformIcon2, this.movePltLeft2, null, this);

    this.physics.add.overlap(this.player1, this.blockDeleteIcon, this.deleteBlock, null, this);
    this.physics.add.overlap(this.player2, this.stickDeleteIcon, this.moveStick, null, this);

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
      this.GameOverFa2();
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
      x:this.levelWidth-200,
      y:120,
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
      x:this.levelWidth-250,
      y:120,
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


endArrived(player, end){
    end.body.enable=false;
    this.goalSound.play();
    this.playersArrived++;

    if (this.playersArrived == 2){
      this.FinNivelFa2();
    }
  }

  movePltLeft(){
    this.movablePlatformIcon.disableBody(true,true);
    this.handleSound.play();

    this.tweens.add({
      targets:this.movablePlatform,
      duration:2000,
      alpha: 0,
      x:gameWidth-420,
    });

    this.movablePlatformIconAct.setVisible(true);
  }

  movePltLeft2(){
    this.movablePlatformIcon2.disableBody(true, true);
    this.pltToDelete.disableBody(true, true);
    this.handleSound.play();

    this.tweens.add({
      targets:this.movablePlatform2,
      duration:2000,
      x:0,
      repeat:-1,
      yoyo:true,
    });

    this.movablePlatformIcon2Act.setVisible(true);
  }

  deleteBlock(){
    this.blockDeleteIcon.disableBody(true, true);
    this.blockDelete.disableBody(true, true);
    this.handleSound.play();
    this.blockDeleteIconAct.setVisible(true);
  }

  moveStick(){
    this.stickDeleteIcon.disableBody(true,true);
    this.stickDelete.body.enable=false;
    this.handleSound.play();

    this.tweens.add({
      targets:this.stickDelete,
      duration:2000,
      alpha: 0,
      y:320
    });

    this.stickDeleteIconAct.setVisible(true);
  }

  //ANIMACIÓNES JUGADORES
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
    this.player1.setVelocityX(100);
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

    this.scene.run('PauseMenu');
    this.scene.bringToTop('PauseMenu');
    this.scene.pause();
  }

  FinNivelFa2(){
    totalTime += 65 - this.initialTime;
    finalPunt = (totalTime * 5)/2;

    this.endTrigger1.setVisible(false);
    this.endTrigger2.setVisible(false);
    this.player1.setVisible(false);
    this.player2.setVisible(false);
    this.backgroundFa2.setVisible(false);
    this.movablePlatform2.setVisible(false);
    this.clockHUD.setVisible(false);
    this.text.setVisible(false);
    this.blockDeleteIconAct.setVisible(false);
    this.movablePlatformIcon2Act.setVisible(false);
    this.movablePlatformIconAct.setVisible(false);
    this.stickDeleteIconAct.setVisible(false);
    this.pauseButtonFa2.setVisible(false);
    this.skipButtonL5.setVisible(true);

    this.tweens.add({
      targets: this.preLevel5,
      duration: 1000,
      alpha: 1,
      yoyo: true,
      hold: 4000,
      completeDelay: 2000
    });

    this.time.addEvent({
      delay: 6300,
      callback: function() {
        this.scene.stop('GamePlayFa2');
        this.scene.sendToBack('GamePlayFa2');
        this.scene.start('GamePlayFo1');
      },
    callbackScope: this
    }, this);
  }

  SkipPreloadL5(){
    this.scene.stop('GamePlayFa2');
    this.scene.sendToBack('GamePlayFa2');
    this.scene.start('GamePlayFo1');
  }

  GameOverFa2(){
    if(musicGameplay.isPlaying){
      musicGameplay.stop();
    }
    musicMenu.play();

    this.scene.stop('GamePlayFa2');
    this.scene.sendToBack('GamePlayFa2');
    this.scene.start('GameOver');
  }

  //CONFIG
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
