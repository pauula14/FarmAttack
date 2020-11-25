class GamePlayEs1 extends Phaser.Scene{
  constructor(){
      super("GamePlayEs1");


  }

  preload(){
    this.levelWidth = 1462;
    this.levelHeight = 687;
  }

  create(){

    // 1) BACKGROUND
    this.backgroundGM = this.add.image(0, 0, 'fondoMapa1');
    this.backgroundGM.setPosition(gameWidth/2, gameHeight/2);
    this.backgroundGM.setDepth(2);

    // 2) PLAYER
    this.player1 = this.physics.add.sprite(400, 650, 'chicken1').setScale(0.8).setDepth(2);
    this.player2 = this.physics.add.sprite(1000, 650, 'chicken2').setScale(0.8).setDepth(2);



    // 3) OBJETOS DE CONTROL DE FLUJO
    this.endTrigger = this.physics.add.sprite(0, this.levelGroundHeight, 'star');  // Trigger de evento final de nivel
    this.endTrigger.body.setAllowGravity(false);    // Quitar gravedad

    // 4) FÍSICAS
    this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);  // Tamaño del nivel
    this.player1.setCollideWorldBounds(false);    // No puede sal
    this.player2.setCollideWorldBounds(false);

    this.ground = this.physics.add.staticGroup();    // Grupo de plataformas colisionables
    //Bordes y palo del medio
    this.ground.create(0, 730, 'platform').setOrigin(0,0).setScale(4,0.5).refreshBody(); //abajo
    this.ground.create(gameWidth/2-10, 0, 'platform').setOrigin(0,0).setScale(0.05,23).refreshBody(); //palo medio
    this.ground.create(0, 0, 'platform').setOrigin(0,0).setScale(0.05,23).refreshBody();//palo dcha
    this.ground.create(gameWidth-20, 0, 'platform').setOrigin(0,0).setScale(0.05,23).refreshBody(); //palo izq
    this.ground.create(0, 0, 'platform').setOrigin(0,0).setScale(4,0.5).refreshBody(); //arriba
    //Nivel 1
    this.ground.create(440, 600, 'platform').setOrigin(0,0).setScale(1.36,0.5).refreshBody();
    this.ground.create(0, 600, 'platform').setOrigin(0,0).setScale(0.63,0.5).refreshBody();
    this.ground.create(1175, 600, 'platform').setOrigin(0,0).setScale(0.63,0.5).refreshBody();
    //Nivel 2
    this.ground.create(215, 460, 'platform').setOrigin(0,0).setScale(1.15,0.5).refreshBody();
    this.ground.create(705, 460, 'platform').setOrigin(0,0).setScale(1.25,0.5).refreshBody();
    //Nivel 3
    this.ground.create(570, 330, 'platform').setOrigin(0,0).setScale(0.35,0.5).refreshBody();
    this.ground.create(1050, 330, 'platform').setOrigin(0,0).setScale(1,0.5).refreshBody();
    //Madera suelta
    this.ground.create(160, 275, 'platform').setOrigin(0,0).setScale(0.6,0.5).refreshBody();
    //Salidas
    this.ground.create(0, 200, 'platform').setOrigin(0,0).setScale(0.7,0.5).refreshBody();
    this.ground.create(1180, 200, 'platform').setOrigin(0,0).setScale(0.7,0.5).refreshBody();


    //Grupo de huevos
    this.eggs = this.physics.add.staticGroup();
    this.eggs.create(600, 670, 'egg').setOrigin(0,0).setScale(3).setDepth(2).refreshBody();
    this.eggs.create(50, 540, 'egg').setOrigin(0,0).setScale(3).refreshBody().setDepth(2);
    this.eggs.create(gameWidth/2+30, 540, 'egg').setOrigin(0,0).setScale(3).setDepth(2).refreshBody();
    this.eggs.create(gameWidth/2-80, 400, 'egg').setOrigin(0,0).setScale(3).setDepth(2).refreshBody();
    this.eggs.create(gameWidth/2+40, 400, 'egg').setOrigin(0,0).setScale(3).setDepth(2).refreshBody();
    this.eggs.create(900, 210, 'egg').setOrigin(0,0).setScale(3).setDepth(2).refreshBody();



    this.physics.add.collider(this.player1, this.ground);
    this.physics.add.collider(this.eggs, this.ground);
    this.physics.add.overlap(this.player1, this.endTrigger, this.FinNivel, null, this);

    this.physics.add.collider(this.player2, this.ground);
    this.physics.add.collider(this.eggs, this.ground);
    this.physics.add.overlap(this.player2, this.endTrigger, this.FinNivel, null, this);

    // 5) CÁMARA
    this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);   // Límites cámara
    //this.cameras.main.startFollow(this.player1, false, 1, 1, this.cameraOffsetX, 0); // Cámar sigue al personaje

    // --- HUD --- //

    // 1) BOTON PAUSA
    this.pauseButton = this.add.image(gameWidth/2, 30, 'pauseButton');
    this.pauseButton.setScale(2/3).setDepth(2);
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

    this.physics.add.overlap(this.player1, this.eggs, this.recogerHuevo, null, this);
    this.physics.add.overlap(this.player2, this.eggs, this.recogerHuevo, null, this);

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

  recogerHuevo (player, egg)
  {
    //egg.disableBody(true, true);

    egg.body.enable=false;
    console.log("Huevo recogido");

    this.tweens.add({
      targets:egg,
      duration:2000,
      x:gameWidth/2-20,
      y:170,
      onComplete: () => egg.alpha=0
    })

    this.score += 1;
    this.scoreText.setText('huevos: ' + this.score);
  }

  PauseMenu(){
    //prevScene = 'GamePlay';
    this.scene.run('PauseMenu');
    this.scene.bringToTop('PauseMenu');
    this.scene.pause();
  }

  FinNivel(){
    this.scene.stop('GamePlay');
    this.scene.sendToBack('GamePlay');
    this.scene.start('GameOver');
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
