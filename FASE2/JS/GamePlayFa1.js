class GamePlayFa1 extends Phaser.Scene{
  constructor(){
      super("GamePlayFa1");

      this.numEgssP1 = 0;
      this.numEgssP2 = 0;
      this.end1Visible = false;
      this.end2Visible = false;
      this.playersArrived = 0;
      this.dir1 = 1; //0 = mirando izq, 1 = mirando der
      this.dir2 = 0; //0 = izq, 1 = der
  }

  preload(){
    this.levelWidth = 1462;
    this.levelHeight = 687;
  }

  create(){

    levelGameplay = 'GamePlayFa1';

    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());
    this.handleSound = this.sound.add('handleSound', this.EffectsConfig());
    this.eggSound = this.sound.add('eggSound', this.EffectsConfig());
    this.goalSound = this.sound.add('goalSound', this.EffectsConfig());

    // 1) BACKGROUND
    this.backgroundFa1 = this.add.image(0, 0, 'backgroundFa1');
    this.backgroundFa1.setPosition(gameWidth/2, gameHeight/2);
    this.backgroundFa1.setDepth(1);

    //Pre carga Nivel 4
    this.preLevel4 = this.add.image(gameWidth/2, gameHeight/2, 'level4');
    this.preLevel4.setDepth(2);
    this.preLevel4.alpha = 0;

    //SKIP BUTTON
    this.skipButtonL4 = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'skipButton');
    this.skipButtonL4.setVisible(false);
    this.skipButtonL4.setDepth(2);
    this.skipButtonL4Sel = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'skipButtonSel');
    this.skipButtonL4Sel.setVisible(false);
    this.skipButtonL4Sel.setDepth(2);

    this.skipButtonL4.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.SkipPreloadL4());
    this.skipButtonL4.on('pointerover', function (pointer) {this.skipButtonL4Sel.setVisible(true);}, this);
    this.skipButtonL4.on('pointerout', function (pointer) {this.skipButtonL4Sel.setVisible(false);}, this);

    // 2) PLAYER
    this.player1 = this.physics.add.sprite(50, 690, 'chicken1R').setScale(0.7).setDepth(2);
    this.player2 = this.physics.add.sprite(gameWidth-50, 690, 'chicken2L').setScale(0.7).setDepth(2);

    // 3) OBJETOS DE CONTROL DE FLUJO
    this.endTrigger1Empty = this.physics.add.sprite(65, 65, 'basketEmpty').setOrigin(0).setSize(100, 100).setDepth(2).setScale(1).refreshBody();
    this.endTrigger1Empty.body.setAllowGravity(false);

    this.endTrigger1 = this.physics.add.sprite(25, 50, 'basket1').setOrigin(0).setSize(100, 100).setDepth(2).refreshBody();
    this.endTrigger1.body.setAllowGravity(false);
    this.endTrigger1.setVisible(false);
    //
    this.endTrigger2Empty = this.physics.add.sprite(750, 70, 'basketEmpty').setOrigin(0).setSize(100, 102).setDepth(2).setScale(1).refreshBody();
    this.endTrigger2Empty.body.setAllowGravity(false);

    this.endTrigger2 = this.physics.add.sprite(730, 70, 'basket2').setOrigin(0).setSize(100, 100).setDepth(2).refreshBody();
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
    this.ground.create(0, 600, 'platform').setOrigin(0,0).setScale(1.4,0.5).refreshBody().setVisible(false);//left
    this.ground.create(gameWidth/2, 600, 'platform').setOrigin(0,0).setScale(1.4,0.5).refreshBody().setVisible(false); //right

    //Nivel 1: platform that our teammate will help move it to the left
    this.movablePlatform2=this.physics.add.sprite(gameWidth-151, 600, 'platformBroken').setOrigin(0,0).setScale(1.15,1.05).refreshBody();//.setVisible(false);
    this.movablePlatform2.body.allowGravity=false;
    this.movablePlatform2.body.immovable=true;
    this.movablePlatform2.setDepth(2);
    this.movablePlatform2.tint=0x180d06;

    //Nivel 1: icon to help our teammate with the platform
    this.movablePlatformIcon2=this.physics.add.sprite(50, 535, 'leverR').setOrigin(0,0).setScale(0.6,0.6).refreshBody();//.setVisible(false);
    this.movablePlatformIcon2.body.allowGravity=false;
    this.movablePlatformIcon2.body.immovable=true;
    this.movablePlatformIcon2.setDepth(2);

    this.movablePlatformIconAct2=this.physics.add.sprite(50, 535, 'leverL').setOrigin(0,0).setScale(0.6,0.6).refreshBody();//.setVisible(false);
    this.movablePlatformIconAct2.body.allowGravity=false;
    this.movablePlatformIconAct2.body.immovable=true;
    this.movablePlatformIconAct2.setDepth(2);
    this.movablePlatformIconAct2.setVisible(false);

    //Nivel 2
    this.ground.create(gameWidth/2-430, 455, 'platform').setOrigin(0,0).setScale(1.08,0.5).refreshBody().setVisible(false);//left long
    this.ground.create(gameWidth/2+270, 455, 'platform').setOrigin(0,0).setScale(0.74,0.5).refreshBody().setVisible(false);//right

    //Nivel 3
    this.ground.create(0, 310, 'platform').setOrigin(0,0).setScale(1.15,0.5).refreshBody().setVisible(false);//left 1
    this.ground.create(gameWidth/2, 310, 'platform').setOrigin(0,0).setScale(0.9,0.5).refreshBody().setVisible(false);//right
    this.ground.create(gameWidth-180, 310, 'platform').setOrigin(0,0).setScale(0.42,0.5).refreshBody().setVisible(false);//right 2

    //Nivel 3: platform that our teammate will help move it to the left
    this.movablePlatform=this.physics.add.sprite(460, 310, 'platformBroken').setOrigin(0,0).setScale(2.05,1.15).refreshBody();//.setVisible(false);
    this.movablePlatform.body.allowGravity=false;
    this.movablePlatform.body.immovable=true;
    this.movablePlatform.setDepth(2);
    this.movablePlatform.tint=0x180d06;

    //Nivel 3: icon to help our teammate with the platform
    this.movablePlatformIcon=this.physics.add.sprite(810, 245, 'leverR').setOrigin(0,0).setScale(0.6,0.6).refreshBody();//.setVisible(false);
    this.movablePlatformIcon.body.allowGravity=false;
    this.movablePlatformIcon.body.immovable=true;
    this.movablePlatformIcon.setDepth(2);

    this.movablePlatformIconAct=this.physics.add.sprite(810, 245, 'leverL').setOrigin(0,0).setScale(0.6,0.6).refreshBody();//.setVisible(false);
    this.movablePlatformIconAct.body.allowGravity=false;
    this.movablePlatformIconAct.body.immovable=true;
    this.movablePlatformIconAct.setDepth(2);
    this.movablePlatformIconAct.setVisible(false);

    //Exits
    this.ground.create(0, 170, 'platform').setOrigin(0,0).setScale(1.07,0.5).refreshBody().setVisible(false);
    this.ground.create(gameWidth/2+10, 170, 'platform').setOrigin(0,0).setScale(0.7,0.5).refreshBody().setVisible(false);

    //Grupo de huevos
    this.eggsP1 = this.physics.add.staticGroup();
    this.eggsP1.create(270, 640, 'eggWhite').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP1.create(gameWidth/2-100, 360, 'eggWhite').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP1.create(20, 220, 'eggWhite').setOrigin(0,0).setScale(0.7).refreshBody().setDepth(2);

    this.eggsP2 = this.physics.add.staticGroup();
    this.eggsP2.create(gameWidth/2+260, 640, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP2.create(gameWidth/2+80, 500, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP2.create(gameWidth-100, 200, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();

    this.physics.add.collider(this.player1, this.ground);
    this.physics.add.collider(this.eggsP1, this.ground);
    this.physics.add.collider(this.player1, this.movablePlatform);//collision platform move to left

    this.physics.add.collider(this.player2, this.ground);
    this.physics.add.collider(this.eggsP2, this.ground);
    this.physics.add.collider(this.player2, this.movablePlatform2);//collision platform move to left

    // 5) CÁMARA
    this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);   // Límites cámara

    // --- HUD --- //
    this.clockHUD = this.add.image(gameWidth/2, 720, 'clock');
    this.clockHUD.setDepth(2);
    //Timer
    this.initialTime = 55;

    this.text = this.add.text(gameWidth/2 - 25, 720, this.formatTime(this.initialTime), {fontFamily: "forte", fontFamily: "forte", fontSize: '32px', fill: '#000' });
    this.text.setDepth(2);

    // 1) BOTON PAUSA
    this.pauseButtonFa1 = this.add.image(gameWidth/2, 35, 'pauseButton');
    this.pauseButtonFa1.setDepth(2);
    this.pauseButtonFa1.setScale(2/3);
    this.pauseButtonFa1Sel = this.add.image(gameWidth/2,35, 'pauseButtonSel');
    this.pauseButtonFa1Sel.setVisible(false);
    this.pauseButtonFa1Sel.setScale(2/3);
    this.pauseButtonFa1Sel.setDepth(3);

    this.pauseButtonFa1.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.PauseMenu());
    this.pauseButtonFa1.on('pointerover', function (pointer) {this.pauseButtonFa1Sel.setVisible(true);}, this);
    this.pauseButtonFa1.on('pointerout', function (pointer) {this.pauseButtonFa1Sel.setVisible(false);}, this);

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
    this.score = 0;

    // Each 1000 ms call onEvent
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

  }
  update(){

    this.physics.add.overlap(this.player1, this.eggsP1, this.recogerHuevoP1, null, this);
    this.physics.add.overlap(this.player2, this.eggsP2, this.recogerHuevoP2, null, this);

    this.physics.add.overlap(this.player2, this.movablePlatformIcon, this.movePltLeft, null, this);
    this.physics.add.overlap(this.player1, this.movablePlatformIcon2, this.movePltLeft2, null, this);

    if(this.end1Visible == true) {
      this.physics.add.overlap(this.player1, this.endTrigger1, this.endArrived, null, this);
    }

    if(this.end2Visible == true){
      this.physics.add.overlap(this.player2, this.endTrigger2, this.endArrived, null, this);
    }

    if(this.initialTime < 60){
      this.text.setX(gameWidth/2 - 28);
    }

    if (this.initialTime < 0){
      this.GameOverFa1();
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
      x:gameWidth/2+40,
      y:130,
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
        this.FinNivelFa1();
    }
  }

  movePltLeft(){
    this.movablePlatformIcon.disableBody(true,true);
    this.handleSound.play();

    this.tweens.add({
      targets:this.movablePlatform,
      alpha: 0,
      duration:2000,
      x:0,
    });

    this.movablePlatformIconAct.setVisible(true);
  }

  movePltLeft2(){
    this.movablePlatformIcon2.disableBody(true,true);
    this.handleSound.play();

    this.tweens.add({
      targets:this.movablePlatform2,
      alpha: 0,
      duration:2000,
      x:gameWidth-360,
    });

    this.movablePlatformIconAct2.setVisible(true);
  }


  //ANIMACIÓN JUGADORES
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

  eggCatched(){
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

  FinNivelFa1(){
    totalTime += 55 - this.initialTime;
    finalPunt = (totalTime * 5)/2;

    this.endTrigger1.setVisible(false);
    this.endTrigger2.setVisible(false);
    this.player1.setVisible(false);
    this.player2.setVisible(false);
    this.backgroundFa1.setVisible(false);
    this.clockHUD.setVisible(false);
    this.text.setVisible(false);
    this.movablePlatformIconAct2.setVisible(false);
    this.movablePlatformIconAct.setVisible(false);
    this.pauseButtonFa1.setVisible(false);
    this.skipButtonL4.setVisible(true);

    this.tweens.add({
      targets: this.preLevel4,
      duration: 1000,
      alpha: 1,
      yoyo: true,
      hold: 4000,
      completeDelay: 2000
    });

    this.time.addEvent({
      delay: 6300,
      callback: function() {
        this.scene.stop('GamePlayFa1');
        this.scene.sendToBack('GamePlayFa1');
        this.scene.start('GamePlayFa2');
      },
    callbackScope: this
    }, this);

  }

  SkipPreloadL4(){
    this.scene.stop('GamePlayFa1');
    this.scene.sendToBack('GamePlayFa1');
    this.scene.start('GamePlayFa2');
  }

  GameOverFa1(){
    if(musicGameplay.isPlaying){
      musicGameplay.stop();
    }
    musicMenu.play();

    this.scene.stop('GamePlayFa1');
    this.scene.sendToBack('GamePlayFa1');
    this.scene.start('GameOver');
  }

}
