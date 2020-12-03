class GamePlayEs2 extends Phaser.Scene{
  constructor(){
      super("GamePlayEs2");

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

    levelGameplay = 'GamePlayEs2';

    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());
    this.handleSound = this.sound.add('handleSound', this.EffectsConfig());
    this.eggSound = this.sound.add('eggSound', this.EffectsConfig());
    this.goalSound = this.sound.add('goalSound', this.EffectsConfig());

    // 1) BACKGROUND
    this.backgroundEs2 = this.add.image(0, 0, 'backgroundEs2');
    this.backgroundEs2.setPosition(gameWidth/2, gameHeight/2);
    this.backgroundEs2.setDepth(1);

    //Pre carga Nivel 3
    this.preLevel3 = this.add.image(gameWidth/2, gameHeight/2, 'level3');
    this.preLevel3.setDepth(2);
    this.preLevel3.alpha = 0;

    //SKIP BUTTON
    this.skipButtonL3 = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'skipButton');
    this.skipButtonL3.setVisible(false);
    this.skipButtonL3.setDepth(2);
    this.skipButtonL3Sel = this.add.image(gameWidth*13.9/16, gameHeight*14.23/16, 'skipButtonSel');
    this.skipButtonL3Sel.setVisible(false);
    this.skipButtonL3Sel.setDepth(2);

    this.skipButtonL3.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.SkipPreloadL3());
    this.skipButtonL3.on('pointerover', function (pointer) {this.skipButtonL3Sel.setVisible(true);}, this);
    this.skipButtonL3.on('pointerout', function (pointer) {this.skipButtonL3Sel.setVisible(false);}, this);


    // 2) PLAYER
    this.player1 = this.physics.add.sprite(60, 155, 'chicken1R').setScale(0.7).setDepth(2);
    this.player2 = this.physics.add.sprite(gameWidth-60, 155, 'chicken2L').setScale(0.7).setDepth(2);


    // 3) OBJETOS DE CONTROL DE FLUJO
    this.endTrigger1Empty = this.physics.add.sprite(40, 625, 'basketEmpty').setOrigin(0).setSize(100, 100).setDepth(2).setScale(1).refreshBody();
    this.endTrigger1Empty.body.setAllowGravity(false);

    this.endTrigger1 = this.physics.add.sprite(0, 610, 'basket1').setOrigin(0).setSize(100, 100).setDepth(2).refreshBody();
    this.endTrigger1.body.setAllowGravity(false);
    this.endTrigger1.setVisible(false);

    //
    this.endTrigger2Empty = this.physics.add.sprite(1260, 628, 'basketEmpty').setOrigin(0).setSize(100, 102).setDepth(2).setScale(1).refreshBody();
    this.endTrigger2Empty.body.setAllowGravity(false);

    this.endTrigger2 = this.physics.add.sprite(1240, 628, 'basket2').setOrigin(0).setSize(100, 102).setDepth(2).refreshBody();
    this.endTrigger2.body.setAllowGravity(false);
    this.endTrigger2.setVisible(false);
    //this.endTrigger2.body.enable = false;

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
    this.ground.create(0, 600, 'platform').setOrigin(0,0).setScale(0.63,0.5).refreshBody().setVisible(false);//left
    this.ground.create(860, 600, 'platform').setOrigin(0,0).setScale(1.4,0.5).refreshBody().setVisible(false); //right
    this.ground.create(gameWidth/2-150, 592, 'platform').setOrigin(0,0).setScale(0.35,4.4).refreshBody().setVisible(false); //straw

    //Nivel 1: straw that our teammate will help move it to the right
    this.movableStraw=this.physics.add.sprite(gameWidth-285, 488, 'platformBale').setOrigin(0,0).setScale(1,1).refreshBody();
    this.movableStraw.body.allowGravity=false;
    this.movableStraw.body.immovable=true;
    this.movableStraw.setDepth(3)

    //Nivel 1: icon to help our teammate with the straw
    this.movableStrawIcon=this.physics.add.sprite(gameWidth/2-100, 529, 'leverL').setOrigin(0,0).setScale(0.6,0.6).refreshBody();
    this.movableStrawIcon.body.allowGravity=false;
    this.movableStrawIcon.body.immovable=true;
    this.movableStrawIcon.setDepth(2)

    this.movableStrawIconAct=this.physics.add.sprite(gameWidth/2-100, 529, 'leverR').setOrigin(0,0).setScale(0.6,0.6).refreshBody();
    this.movableStrawIconAct.body.allowGravity=false;
    this.movableStrawIconAct.body.immovable=true;
    this.movableStrawIconAct.setDepth(2);
    this.movableStrawIconAct.setVisible(false);


    //Nivel 2
    this.ground.create(124, 460, 'platform').setOrigin(0,0).setScale(1.46,0.5).refreshBody().setVisible(false);//left long
    this.ground.create(gameWidth/2+5, 460, 'platform').setOrigin(0,0).setScale(0.74,0.5).refreshBody().setVisible(false);//right 1
    this.ground.create(gameWidth/2+447, 460, 'platform').setOrigin(0,0).setScale(0.65,0.5).refreshBody().setVisible(false);//right 2
    this.ground.create(1290, 365, 'platform').setOrigin(0,0).setScale(0.3,3.2).refreshBody().setVisible(false);

    //Nivel 2: Platform that our teammate will destroy
    this.deletedPtf = this.physics.add.sprite(13, 461, 'platformBroken').setOrigin(0,0).setScale(1, 1).setDepth(2);
    this.deletedPtf.body.allowGravity=false;
    this.deletedPtf.body.immovable=true;

    //Nivel 2: icon to destroy our teammate block platform
    this.deletedPtfIcon = this.physics.add.sprite(gameWidth/2+50, 395, 'leverR').setOrigin(0,0).setScale(0.6,0.6).setDepth(2);
    this.deletedPtfIcon.body.allowGravity=false;
    this.deletedPtfIcon.body.immovable=true;

    this.deletedPtfIconAct2 = this.physics.add.sprite(gameWidth/2+50, 395, 'leverL').setOrigin(0,0).setScale(0.6,0.6).setDepth(2);
    this.deletedPtfIconAct2.body.allowGravity=false;
    this.deletedPtfIconAct2.body.immovable=true;
    this.deletedPtfIconAct2.setVisible(false);

    //Nivel 3
    this.ground.create(0, 330, 'platform').setOrigin(0,0).setScale(1,0.5).refreshBody().setVisible(false);//left 1
    this.ground.create(gameWidth/2-170, 330, 'platform').setOrigin(0,0).setScale(0.42,0.5).refreshBody().setVisible(false);//left 2
    this.ground.create(gameWidth/2, 290, 'platform').setOrigin(0,0).setScale(0.83,0.5).refreshBody().setVisible(false);//right
    this.ground.create(590, 230, 'platform').setOrigin(0,0).setScale(0.3,3.2).refreshBody().setVisible(false);

    //Exits
    this.ground.create(0, 200, 'platform').setOrigin(0,0).setScale(0.7,0.5).refreshBody().setVisible(false);
    this.ground.create(1180, 200, 'platform').setOrigin(0,0).setScale(0.7,0.5).refreshBody().setVisible(false);


    //Grupo de huevos
    this.eggsP1 = this.physics.add.staticGroup();
    this.eggsP1.create(450, 640, 'eggWhite').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP1.create(gameWidth/2-100, 370, 'eggWhite').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP1.create(40, 230, 'eggWhite').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();

    this.eggsP2 = this.physics.add.staticGroup();
    this.eggsP2.create(gameWidth-195, 500, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP2.create(gameWidth/2+260, 640, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();
    this.eggsP2.create(800, 200, 'egg').setOrigin(0,0).setScale(0.7).setDepth(2).refreshBody();


    this.physics.add.collider(this.player1, this.ground);
    this.physics.add.collider(this.eggsP1, this.ground);
    this.physics.add.collider(this.player1, this.deletedPtf);//collision platform to delete

    this.physics.add.collider(this.player2, this.ground);
    this.physics.add.collider(this.eggsP2, this.ground);
    this.physics.add.collider(this.player2, this.movableStraw);//collision straw to move right

    // 5) CÁMARA
    this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight);   // Límites cámara

    // --- HUD --- //
    this.clockHUD = this.add.image(gameWidth/2, 720, 'clock');
    this.clockHUD.setDepth(2);

    //Timer
    this.initialTime=120;

    this.text = this.add.text(gameWidth/2 - 25, 720, this.formatTime(this.initialTime), {fontFamily: "forte", fontSize: '32px', fill: '#000' });
    this.text.setDepth(2);

    // 1) BOTON PAUSA
    this.pauseButtonEs2 = this.add.image(gameWidth/2, 35, 'pauseButton');
    this.pauseButtonEs2.setDepth(2);
    this.pauseButtonEs2.setScale(2/3);
    this.pauseButtonEs2Sel = this.add.image(gameWidth/2,35, 'pauseButtonSel');
    this.pauseButtonEs2Sel.setVisible(false);
    this.pauseButtonEs2Sel.setScale(2/3);
    this.pauseButtonEs2Sel.setDepth(3);

    this.pauseButtonEs2.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.PauseMenu());
    this.pauseButtonEs2.on('pointerover', function (pointer) {this.pauseButtonEs2Sel.setVisible(true);}, this);
    this.pauseButtonEs2.on('pointerout', function (pointer) {this.pauseButtonEs2Sel.setVisible(false);}, this);

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

    this.score=0;

    // Each 1000 ms call onEvent
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });

  }
  update(){

    this.physics.add.overlap(this.player1, this.eggsP1, this.recogerHuevoP1, null, this);
    this.physics.add.overlap(this.player2, this.eggsP2, this.recogerHuevoP2, null, this);

    this.physics.add.overlap(this.player1, this.movableStrawIcon, this.moveStrawRight, null, this);
    this.physics.add.overlap(this.player2, this.deletedPtfIcon, this.deletePlatform, null, this);

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
      this.GameOverEs2();
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
      y:670,
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
      y:670,
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
        this.FinNivelEs2();
    }
  }

  moveStrawRight(){

    this.movableStrawIcon.disableBody(true,true);
    this.handleSound.play();

    this.tweens.add({
      targets:this.movableStraw,
      duration:2000,
      x:gameWidth-140,
    });

    this.movableStrawIconAct.setVisible(true);
  }

  deletePlatform(){
    this.deletedPtfIcon.disableBody(true,true);
    this.handleSound.play();
    this.deletedPtf.disableBody(true,true);
    this.deletedPtfIconAct2.setVisible(true);
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

  eggCatched(){
  }

//GAME CONTROL

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

  FinNivelEs2(){

    totalTime += 120 - this.initialTime;
    finalPunt = (totalTime * 5)/3;

    this.endTrigger1.setVisible(false);
    this.endTrigger2.setVisible(false);
    this.endTrigger1Empty.setVisible(false);
    this.endTrigger2Empty.setVisible(false);
    this.player1.setVisible(false);
    this.player2.setVisible(false);
    this.backgroundEs2.setVisible(false);
    this.movableStraw.setVisible(false);
    this.clockHUD.setVisible(false);
    this.text.setVisible(false);
    this.movableStrawIconAct.setVisible(false);
    this.deletedPtfIconAct2.setVisible(false);

    this.pauseButtonEs2.setVisible(false);
    this.skipButtonL3.setVisible(true);

    this.tweens.add({
      targets: this.preLevel3,
      duration: 1000,
      alpha: 1,
      yoyo: true,
      hold: 4000,
      completeDelay: 2000
    });

    this.time.addEvent({
      delay: 6300,
      callback: function() {
        this.scene.stop('GamePlayEs2');
        this.scene.sendToBack('GamePlayEs2');
        this.scene.start('GamePlayFa1');
      },
    callbackScope: this
    }, this);

  }

  SkipPreloadL3(){
    this.scene.stop('GamePlayEs2');
    this.scene.sendToBack('GamePlayEs2');
    this.scene.start('GamePlayFa1');
  }


  GameOverEs2(){

    if(musicGameplay.isPlaying){
      musicGameplay.stop();
    }
    musicMenu.play();

    this.scene.stop('GamePlayEs2');
    this.scene.sendToBack('GamePlayEs2');
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
