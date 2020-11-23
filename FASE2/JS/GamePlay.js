class GamePlay extends Phaser.Scene{
  constructor(){
      super("GamePlay");
  }

  preload(){
    this.levelWidth = 1462;
    this.levelHeight = 687;
  }

  create(){

    // 1) BACKGROUND
    this.backgroundGM = this.add.image(0, 0, 'backgroundGM');
    this.backgroundGM.setPosition(gameWidth/2, gameHeight/2);

    // 2) PLAYER
    this.player = this.physics.add.sprite(400, this.playerStartPositionY, 'pj');

    // 3) OBJETOS DE CONTROL DE FLUJO
    this.endTrigger = this.physics.add.sprite(0, this.levelGroundHeight, 'star');  // Trigger de evento final de nivel
    this.endTrigger.body.setAllowGravity(false);    // Quitar gravedad
    
    // 4) FÍSICAS
    this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);  // Tamaño del nivel
    this.player.setCollideWorldBounds(false);    // No puede sal

    this.ground = this.physics.add.staticGroup();    // Grupo de plataformas colisionables
    this.eggs = this.physics.add.staticGroup();    // Grupo de monedas
    this.eggs.create(50, 50, 'egg');
    this.ground.create(500, 500, 'platform');

    this.physics.add.collider(this.player, this.ground); 
    this.physics.add.collider(this.eggs, this.ground);
    this.physics.add.collider(this.player, this.eggs);

    this.physics.add.overlap(this.player, this.endTrigger, this.FinNivel, null, this); 

    // 5) CÁMARA
    this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);   // Límites cámara
    this.cameras.main.startFollow(this.player, false, 1, 1, this.cameraOffsetX, 0); // Cámar sigue al personaje

    // --- HUD --- //
    
    // 1) BOTON PAUSA
    this.pauseButton = this.add.image(gameWidth*2/16, gameHeight*2/16, 'pauseButton');
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


    this.P1_jumpButton.on('down',this.playerStartJump, this);
    this.P1_jumpButton.on('up',this.playerStopJump, this);
    this.P1_leftButton.on('down',this.playerLeft , this);
    this.P1_leftButton.on('up', this.playerStop, this);
    this.P1_rightButton.on('down',this.playerRight, this);  
    this.P1_rightButton.on('up', this.playerStop, this); 

    //this.P1_interactButton.on('down', () => console.log('interact ON'), this);
    //this.P1_interactButton.on('up', () => console.log('interact OFF') , this);

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


  playerStartJump(){

    this.player.setVelocityY(-300);
   
  }

  playerStopJump(){

    this.player.setVelocityY(0);

  }


  playerLeft() {
    
    this.player.setVelocityX(-100);
    //this.player.anims.play('move_left', true);

  }

  playerRight() {
    
    this.player.setVelocityX(100);
    //this.player.anims.play('move_right', true);

  }

  playerStop() {
    
    this.player.setVelocityX(0);

    if(this.P1_leftButton.isDown){
      this.playerLeft();
    }
    if(this.P1_rightButton.isDown){
      this.playerRight();
    }
  
    //this.player.anims.stop();
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
