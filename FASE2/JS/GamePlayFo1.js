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
  }

  create(){

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

    // 1) P1
    this.P1_jumpButton = this.input.keyboard.addKey(P1_controls.up);
    this.P1_leftButton = this.input.keyboard.addKey(P1_controls.left);
    this.P1_rightButton = this.input.keyboard.addKey(P1_controls.right);

    // 2) P2
    this.P2_jumpButton = this.input.keyboard.addKey(P2_controls.up);
    this.P2_leftButton = this.input.keyboard.addKey(P2_controls.left);
    this.P2_rightButton = this.input.keyboard.addKey(P2_controls.right);

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


endArrived(player, end){
    end.body.enable=false;
    this.goalSound.play();
    this.playersArrived++;

    if (this.playersArrived == 2){
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

      this.scene.run('PauseMenu');
      this.scene.bringToTop('PauseMenu');
      this.scene.pause();
    }

    FinNivelFo1(){
      totalTime += 80 - this.initialTime;
      finalPunt = (totalTime * 5);

      if(musicGameplay.isPlaying){
        musicGameplay.stop();
      }
      musicMenu.play();

      this.scene.stop('GamePlayFo1');
      this.scene.sendToBack('GamePlayFo1');
      this.scene.start('Winner');
    }

    GameOverFo1(){
      if(musicGameplay.isPlaying){
        musicGameplay.stop();
      }
      musicMenu.play();

      this.scene.stop('GamePlayFo1');
      this.scene.sendToBack('GamePlayFo1');
      this.scene.start('GameOver');
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

}
