class GamePlay extends Phaser.Scene{
  constructor(){
      super("GamePlay");
  }

  preload(){

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
    this.egg.create(50, 50, 'bomb');
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
    this.P1_attackButton = this.input.keyboard.addKey(P1_controls.attack);

    // 2) P2
    this.P2_jumpButton = this.input.keyboard.addKey(P2_controls.up);
    this.P2_leftButton = this.input.keyboard.addKey(P2_controls.left);
    this.P2_rightButton = this.input.keyboard.addKey(P2_controls.right);
    this.P2_attackButton = this.input.keyboard.addKey(P2_controls.attack);

    this.testButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);

    // Reiniciamos eventos
    this.P1_jumpButton.off('down');
    this.P1_jumpButton.off('up');
    this.P1_leftButton.off('down');
    this.P1_leftButton.off('up');
    this.P1_rightButton.off('down');  
    this.P1_rightButton.off('up'); 
    this.P1_attackButton.off('down');
    this.P1_attackButton.off('up');

    this.P2_jumpButton.off('down');
    this.P2_jumpButton.off('up');
    this.P2_leftButton.off('down');
    this.P2_leftButton.off('up');
    this.P2_rightButton.off('down');  
    this.P2_rightButton.off('up'); 
    this.P2_attackButton.off('down');
    this.P2_attackButton.off('up');


  }

  PauseMenu(){
    //prevScene = 'GamePlay';
    this.scene.run('PauseMenu');
    this.scene.bringToTop('PauseMenu');
    this.scene.pause();
  }

  FinNivel(){
    
  }

}
