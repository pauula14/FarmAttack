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
    this.preLevel5.setDepth(3);
    this.preLevel5.alpha = 0;

    // 2) PLAYER
    this.player1 = this.physics.add.sprite(60, 685, 'chicken1R').setScale(0.7).setDepth(2);
    this.player2 = this.physics.add.sprite(gameWidth-60, 685, 'chicken2L').setScale(0.7).setDepth(2);

    // 3) OBJETOS DE CONTROL DE FLUJO
    //this.endTrigger = this.physics.add.sprite(0, this.levelGroundHeight, 'star');  // Trigger de evento final de nivel
    //this.endTrigger.body.setAllowGravity(false);    // Quitar gravedad
    this.endTrigger1 = this.physics.add.sprite(1250, 50, 'basket1').setSize(100, 100).setOrigin(0).setDepth(2).refreshBody();
    this.endTrigger1.body.setAllowGravity(false);
    //this.endTrigger1.body.enable = false;
    //this.endTrigger1.setVisible(false);
    this.endTrigger2 = this.physics.add.sprite(1200, 70, 'basket2').setSize(100, 100).setOrigin(0).setDepth(2).refreshBody();
    this.endTrigger2.body.setAllowGravity(false);
    //this.endTrigger2.setVisible(false);
    //this.endTrigger2.body.enable = false;

    // 4) FÍSICAS
    this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);  // Tamaño del nivel
    this.player1.setCollideWorldBounds(false);    // No puede sal
    this.player2.setCollideWorldBounds(false);

    this.ground = this.physics.add.staticGroup();    // Grupo de plataformas colisionables
    //Bordes y palo del medio
    this.ground.create(0, 730, 'platform').setOrigin(0,0).setScale(4,0.5).refreshBody().setVisible(false); //abajo

    this.ground.create(gameWidth/2-10, 0, 'platform').setOrigin(0,0).setScale(0.05,13).refreshBody().setVisible(false); //palo medio 1
    this.ground.create(gameWidth/2-10, 600, 'platform').setOrigin(0,0).setScale(0.05,4).refreshBody().setVisible(false); //palo medio 2
    this.stickDelete=this.ground.create(gameWidth/2-10, 470, 'pipeline').setOrigin(0,0).setScale(1,1).setDepth(1).refreshBody(); //palo medio removable
    ///this.stickDelete.tint=0x180d06;

    //Icon to help our teammate with the platform that block him to pass to otherside
    this.stickDeleteIcon=this.physics.add.sprite(gameWidth/2+100, 230, 'platform').setOrigin(0,0).setScale(0.1,2).refreshBody();
    this.stickDeleteIcon.body.allowGravity=false;
    this.stickDeleteIcon.body.immovable=true;
    this.stickDeleteIcon.setDepth(2);
    this.stickDeleteIcon.tint=0x180d06;

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
    this.movablePlatformIcon2=this.physics.add.sprite(gameWidth/2+100, 510, 'platform').setOrigin(0,0).setScale(0.1,2).refreshBody();
    this.movablePlatformIcon2.body.allowGravity=false;
    this.movablePlatformIcon2.body.immovable=true;
    this.movablePlatformIcon2.setDepth(2);
    this.movablePlatformIcon2.tint=0x180d06;

    //Nivel 2
    this.ground.create(0, 455, 'platform').setOrigin(0,0).setScale(0.68,0.5).refreshBody().setVisible(false);//left
    this.ground.create(gameWidth/2-275, 455, 'platform').setOrigin(0,0).setScale(0.7,0.5).refreshBody().setVisible(false);//left2
    this.ground.create(gameWidth/2+10, 455, 'platform').setOrigin(0,0).setScale(1.4,0.5).refreshBody().setVisible(false);//right

    //Nivel 2: platform that our teammate will help move it to the left
    this.movablePlatform=this.physics.add.sprite(gameWidth-145, 455, 'platformBroken').setOrigin(0,0).setScale(1.15,1.0).refreshBody();
    this.movablePlatform.body.allowGravity=false;
    this.movablePlatform.body.immovable=true;
    this.movablePlatform.setDepth(2);
  //  this.movablePlatform.tint=0x180d06;

    //Nivel 2: icon to help our teammate with the platform
    this.movablePlatformIcon=this.physics.add.sprite(50, 375, 'platform').setOrigin(0,0).setScale(0.1,2).refreshBody();
    this.movablePlatformIcon.body.allowGravity=false;
    this.movablePlatformIcon.body.immovable=true;
    this.movablePlatformIcon.setDepth(2);
    this.movablePlatformIcon.tint=0x180d06;

    //Nivel 3
    this.ground.create(260, 310, 'platform').setOrigin(0,0).setScale(1.15,0.5).refreshBody().setVisible(false);//left
    this.ground.create(gameWidth/2, 310, 'platform').setOrigin(0,0).setScale(0.9,0.5).refreshBody().setVisible(false);//right
    this.blockDelete=this.ground.create(gameWidth/2+240, 142, 'flowerPot').setOrigin(0,0).setScale(1,1).setDepth(2).refreshBody();//block that dont allow pass
  //  this.blockDelete.tint=0x180d06;

    //Nivel 3: icon to help our teammate with the block that block him to pass
    this.blockDeleteIcon=this.physics.add.sprite(gameWidth/2-100, 90, 'platform').setOrigin(0,0).setScale(0.1,2).refreshBody();
    this.blockDeleteIcon.body.allowGravity=false;
    this.blockDeleteIcon.body.immovable=true;
    this.blockDeleteIcon.setDepth(2);
    this.blockDeleteIcon.tint=0x180d06;

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
    //this.physics.add.overlap(this.player1, this.endTrigger, this.FinNivel, null, this);

    this.physics.add.collider(this.player2, this.ground);
    this.physics.add.collider(this.eggsP2, this.ground);
    this.physics.add.collider(this.player2, this.movablePlatform);//collision platform move to left
    //this.physics.add.overlap(this.player2, this.endTrigger, this.FinNivel, null, this);

    // 5) CÁMARA
    this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);   // Límites cámara
    //this.cameras.main.startFollow(this.player1, false, 1, 1, this.cameraOffsetX, 0); // Cámar sigue al personaje

    // --- HUD --- //

    // 1) BOTON PAUSA
    this.pauseButton = this.add.image(gameWidth/2, 30, 'pauseButton');
    this.pauseButton.setScale(2/3);
    this.pauseButton.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.PauseMenu());

    // --- CONTROLES --- //

    // 1) P1
    this.P1_jumpButton = this.input.keyboard.addKey(P1_controls.up);
    this.P1_leftButton = this.input.keyboard.addKey(P1_controls.left);
    this.P1_rightButton = this.input.keyboard.addKey(P1_controls.right);
    //this.P1_interactButton = this.input.keyboard.addKey(P1_controls.interact);

    // 2) P2
    this.P2_jumpButton = this.input.keyboard.addKey(P2_controls.up);
    this.P2_leftButton = this.input.keyboard.addKey(P2_controls.left);
    this.P2_rightButton = this.input.keyboard.addKey(P2_controls.right);
    //this.P2_interactButton = this.input.keyboard.addKey(P2_controls.interact);

    this.testButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

    // Reiniciamos eventos
    this.P1_jumpButton.off('down');
    this.P1_jumpButton.off('up');
    this.P1_leftButton.off('down');
    this.P1_leftButton.off('up');
    this.P1_rightButton.off('down');
    this.P1_rightButton.off('up');
    //this.P1_interactButton.off('down');
    //this.P1_interactButton.off('up');

    this.P2_jumpButton.off('down');
    this.P2_jumpButton.off('up');
    this.P2_leftButton.off('down');
    this.P2_leftButton.off('up');
    this.P2_rightButton.off('down');
    this.P2_rightButton.off('up');
    //this.P2_interactButton.off('down');
    //this.P2_interactButton.off('up');

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

    //this.P1_interactButton.on('down', () => console.log('interact ON'), this);
    //this.P1_interactButton.on('up', () => console.log('interact OFF') , this);

    //Variable para saber los huevos recogidos
    this.score=0;
    this.scoreText = this.add.text(460, 200, 'huevos: 0', { fontSize: '32px', fill: '#000' });
    this.scoreText.setDepth(2);

    //Timer
    this.initialTime=120;

    this.text = this.add.text(460, 250, this.formatTime(this.initialTime), { fontSize: '32px', fill: '#000' });
    this.text.setDepth(2);

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

    if(this.initialTime < 0){
      this.GameOverFa2();
    }

  }


  formatTime(seconds){
    // Minutes
    var minutes = Math.floor(seconds/60);
    // Seconds
    var partInSeconds = seconds%60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2,'0');
    // Returns formated time
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
    console.log("Huevo recogido");

    this.tweens.add({
      targets:egg,
      duration:2500,
      x:this.levelWidth-200,
      y:120,
      onComplete: () => egg.alpha=0
    })

    this.score += 1;
    this.scoreText.setText('huevos: ' + this.score);
    //console.log(player);

    this.numEgssP1 ++;
    console.log(this.numEgssP1);

    if(this.numEgssP1 == 3){
      //this.endTrigger1.setVisible(true);
      this.endsVisibles ++;
      this.end1Visible = true;
    }
  }

  recogerHuevoP2 (player, egg)
  {

    egg.body.enable=false;
    this.eggSound.play();
    console.log("Huevo recogido");

    this.tweens.add({
      targets:egg,
      duration:2500,
      x:this.levelWidth-250,
      y:120,
      onComplete: () => egg.alpha=0
    })

    this.score += 1;
    this.scoreText.setText('huevos: ' + this.score);
    console.log(player);

    this.numEgssP2 ++;
    console.log(this.numEgssP2);

    if(this.numEgssP2 == 3){
      //this.endTrigger2.setVisible(true);
      this.endsVisibles ++;
      this.end2Visible = true;
    }
  }


endArrived(player, end){
    console.log("Colas");
    console.log(player);

    end.body.enable=false;
    this.goalSound.play();
    this.playersArrived++;
    console.log(this.playersArrived);
    console.log("Hola");

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
    })
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
    })
  }

  deleteBlock(){

    this.blockDeleteIcon.disableBody(true, true);
    this.blockDelete.disableBody(true, true);
    this.handleSound.play();

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
    })
  }

  PauseMenu(){

    this.clickSound.play();

    if(musicGameplay.isPlaying){
      musicGameplay.stop();
    }
    musicMenu.play();

    this.scene.run('PauseMenu');
    this.scene.bringToTop('PauseMenu');
    this.scene.pause();
    //prevScene = 'GamePlayEs2';
  }

  FinNivelFa2(){

    totalTime += 120 - this.initialTime;

    this.endTrigger1.setVisible(false);
    this.endTrigger2.setVisible(false);
    this.player1.setVisible(false);
    this.player2.setVisible(false);
    this.backgroundFa2.setVisible(false);
    this.movablePlatform2.setVisible(false);

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

  //CAMBIOS ANIMACIÓN PLAYER 1

  player1StartJump(){

    this.player1.setVelocityY(-300);

  }

  player1StopJump(){

    this.player1.setVelocityY(0);

  }


  player1Left() {

    this.player1.setVelocityX(-100);
    this.player1.anims.play('move_left1', true);
    this.player1.flipX = false;
    this.dir1 = 0;

  }

  player1Right() {

    this.player1.setVelocityX(100);
    this.player1.anims.play('move_right1', true);
    //this.player1.flipX = true;
    this.dir1 = 1;

  }

  player1Stop() {

    this.player1.setVelocityX(0);
    //this.player1.anims.play('stop1', true);

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

    //this.player.anims.stop();
  }

  //CAMBIOS ANIMACION PLAYER 2
  player2StartJump(){

    this.player2.setVelocityY(-300);

  }

  player2StopJump(){

    this.player2.setVelocityY(0);

  }


  player2Left() {

    this.player2.setVelocityX(-100);
    this.player2.anims.play('move_left2', true);
    //this.player2.flipX = false;
    this.dir2 = 0;

  }

  player2Right() {

    this.player2.setVelocityX(100);
    this.player2.anims.play('move_right2', true);
    //this.player2.flipX = true;
    this.dir2 = 1;
  }

  player2Stop() {

    this.player2.setVelocityX(0);
    //this.player2.anims.play('stop2', true);

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

    //this.player.anims.stop();
  }

  eggCatched(){
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
/*
  startDrag(player, objects){
    this.input.off('down', this.startDrag,this);
    this.dragObj = objects[0];
    this.input.on('pointermove' , this.drag, this);
  }

  drag(){
    this.dragObj.x=pointer.x;
    this.dragObj.y=pointer.y;
  }
  */
}
