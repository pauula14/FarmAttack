class GamePlayFa2 extends Phaser.Scene{
  constructor(){
      super("GamePlayFa2");

      this.numEgssP1 = 0;
      this.numEgssP2 = 0;
      this.end1Visible = false;
      this.end2Visible = false;
      this.playersArrived = 0;
      this.endsVisibles = 0;
  }

  preload(){
    this.levelWidth = 1462;
    this.levelHeight = 687;
  }

  create(){

    levelGameplay = 'GamePlayFa2';

    // 1) BACKGROUND
    this.backgroundGM = this.add.image(0, 0, 'backgroundFa2');
    this.backgroundGM.setPosition(gameWidth/2, gameHeight/2);
    this.backgroundGM.setDepth(1);

    // 2) PLAYER
    this.player1 = this.physics.add.sprite(60, 685, 'chicken1dch').setScale(0.8).setDepth(2);
    this.player2 = this.physics.add.sprite(gameWidth-60, 685, 'chicken2dch').setScale(0.8).setDepth(2);

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
    this.ground.create(0, 730, 'platform').setOrigin(0,0).setScale(4,0.5).refreshBody(); //abajo

    this.ground.create(gameWidth/2-10, 0, 'platform').setOrigin(0,0).setScale(0.05,6).refreshBody(); //palo medio 1
    this.ground.create(gameWidth/2-10, 320, 'platform').setOrigin(0,0).setScale(0.05,13).refreshBody(); //palo medio 2
    this.stickDelete=this.ground.create(gameWidth/2-10, 175, 'platform').setOrigin(0,0).setScale(0.05,5).refreshBody(); //palo medio removable
    this.stickDelete.tint=0x180d06;

    //Icon to help our teammate with the platform that block him to pass to otherside
    this.stickDeleteIcon=this.physics.add.sprite(gameWidth/2+100, 230, 'platform').setOrigin(0,0).setScale(0.1,2).refreshBody();
    this.stickDeleteIcon.body.allowGravity=false;
    this.stickDeleteIcon.body.immovable=true;
    this.stickDeleteIcon.setDepth(2);
    this.stickDeleteIcon.tint=0x180d06;

    this.ground.create(0, 0, 'platform').setOrigin(0,0).setScale(0.05,23).refreshBody();//palo dcha
    this.ground.create(gameWidth-20, 0, 'platform').setOrigin(0,0).setScale(0.05,23).refreshBody(); //palo izq
    this.ground.create(0, 0, 'platform').setOrigin(0,0).setScale(4,0.5).refreshBody(); //arriba

    //Nivel 1
    this.ground.create(150, 600, 'platform').setOrigin(0,0).setScale(1,0.5).refreshBody();//left
    this.ground.create(gameWidth/2, 600, 'platform').setOrigin(0,0).setScale(0.8,0.5).refreshBody(); //right
    this.ground.create(gameWidth-240, 600, 'platform').setOrigin(0,0).setScale(0.57,0.5).refreshBody(); //right2

    //Nivel 1: platform that will move to left and right in loop
    this.movablePlatform2=this.physics.add.sprite(150, 600, 'platform').setOrigin(0,0).setScale(1.4,0.5).refreshBody();
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
    this.ground.create(0, 455, 'platform').setOrigin(0,0).setScale(0.68,0.5).refreshBody();//left
    this.ground.create(gameWidth/2-275, 455, 'platform').setOrigin(0,0).setScale(0.7,0.5).refreshBody();//left2
    this.ground.create(gameWidth/2+10, 455, 'platform').setOrigin(0,0).setScale(1.4,0.5).refreshBody();//right

    //Nivel 2: platform that our teammate will help move it to the left
    this.movablePlatform=this.physics.add.sprite(gameWidth-150, 455, 'platform').setOrigin(0,0).setScale(0.65,0.5).refreshBody();
    this.movablePlatform.body.allowGravity=false;
    this.movablePlatform.body.immovable=true;
    this.movablePlatform.setDepth(2);
    this.movablePlatform.tint=0x180d06;

    //Nivel 2: icon to help our teammate with the platform
    this.movablePlatformIcon=this.physics.add.sprite(50, 375, 'platform').setOrigin(0,0).setScale(0.1,2).refreshBody();
    this.movablePlatformIcon.body.allowGravity=false;
    this.movablePlatformIcon.body.immovable=true;
    this.movablePlatformIcon.setDepth(2);
    this.movablePlatformIcon.tint=0x180d06;

    //Nivel 3
    this.ground.create(260, 310, 'platform').setOrigin(0,0).setScale(1.15,0.5).refreshBody();//left
    this.ground.create(gameWidth/2, 310, 'platform').setOrigin(0,0).setScale(0.9,0.5).refreshBody();//right
    this.blockDelete=this.ground.create(gameWidth/2+240, 220, 'platform').setOrigin(0,0).setScale(0.3,3).setDepth(2).refreshBody();//block that dont allow pass
    this.blockDelete.tint=0x180d06;

    //Nivel 3: icon to help our teammate with the block that block him to pass
    this.blockDeleteIcon=this.physics.add.sprite(gameWidth/2-100, 90, 'platform').setOrigin(0,0).setScale(0.1,2).refreshBody();
    this.blockDeleteIcon.body.allowGravity=false;
    this.blockDeleteIcon.body.immovable=true;
    this.blockDeleteIcon.setDepth(2);
    this.blockDeleteIcon.tint=0x180d06;

    //Exit
    this.ground.create(0, 170, 'platform').setOrigin(0,0).setScale(0.5,0.5).refreshBody();//left 1
    this.ground.create(gameWidth/2-280, 170, 'platform').setOrigin(0,0).setScale(0.7,0.5).refreshBody(); //left 2
    this.ground.create(gameWidth-285, 170, 'platform').setOrigin(0,0).setScale(0.68,0.5).refreshBody();


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
    this.P1_interactButton = this.input.keyboard.addKey(P1_controls.interact);

    // 2) P2
    this.P2_jumpButton = this.input.keyboard.addKey(P2_controls.up);
    this.P2_leftButton = this.input.keyboard.addKey(P2_controls.left);
    this.P2_rightButton = this.input.keyboard.addKey(P2_controls.right);
    this.P2_interactButton = this.input.keyboard.addKey(P2_controls.interact);

    this.testButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

    // Reiniciamos eventos
    this.P1_jumpButton.off('down');
    this.P1_jumpButton.off('up');
    this.P1_leftButton.off('down');
    this.P1_leftButton.off('up');
    this.P1_rightButton.off('down');
    this.P1_rightButton.off('up');
    this.P1_interactButton.off('down');
    this.P1_interactButton.off('up');

    this.P2_jumpButton.off('down');
    this.P2_jumpButton.off('up');
    this.P2_leftButton.off('down');
    this.P2_leftButton.off('up');
    this.P2_rightButton.off('down');
    this.P2_rightButton.off('up');
    this.P2_interactButton.off('down');
    this.P2_interactButton.off('up');

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

      this.playersArrived++;
      console.log(this.playersArrived);
      console.log("Hola");


      if (this.playersArrived == 2){
        this.FinNivelFa2();
      }
  }

  movePltLeft(){

    this.movablePlatformIcon.disableBody(true,true);

    this.tweens.add({
      targets:this.movablePlatform,
      duration:2000,
      x:gameWidth-420,
    })
  }

  movePltLeft2(){

    this.movablePlatformIcon2.disableBody(true, true);
    this.pltToDelete.disableBody(true, true);

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

  }

  moveStick(){

    this.stickDeleteIcon.disableBody(true,true);
    this.stickDelete.body.enable=false;

    this.tweens.add({
      targets:this.stickDelete,
      duration:2000,
      y:320
    })
  }

  PauseMenu(){
    this.scene.run('PauseMenu');
    this.scene.bringToTop('PauseMenu');
    this.scene.pause();
    //prevScene = 'GamePlayEs2';
  }

  FinNivelFa2(){
    this.scene.stop('GamePlayFa2');
    this.scene.sendToBack('GamePlayFa2');
    this.scene.start('MainMenu');
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

  }

  player1Right() {

    this.player1.setVelocityX(100);
    this.player1.anims.play('move_right1', true);

  }

  player1Stop() {

    this.player1.setVelocityX(0);
    this.player1.anims.play('stop1', true);

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

  }

  player2Right() {

    this.player2.setVelocityX(100);
    this.player2.anims.play('move_right2', true);

  }

  player2Stop() {

    this.player2.setVelocityX(0);
    this.player2.anims.play('stop2', true);

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
