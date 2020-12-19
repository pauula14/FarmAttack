class PreloadMenu extends Phaser.Scene{

  constructor(){
      super("PreloadMenu"); //super hace que la clase herede las caracteristicas de su predecesora
  }

  preload(){

    //BARRA DE CARGA DE PROGRESO
      var progressBar = this.add.graphics();
      var progressBox = this.add.graphics();
      progressBox.fillStyle(0xffffff, 0.2);
      progressBox.fillRect(100, gameWidth-100, gameHeight-50, 50);

      var percentText = this.make.text({
          x: gameWidth/2,
          y: 525,
          text: "0 %",
          style: {
              fontSize: '25px',
              fontFamily: 'fort',
              fontStyle: 'bold',
              fill: '#ffffff'
          }
      });

      percentText.setOrigin(0.5, 0.5);
      this.load.on("progress", function(value){
          percentText.setText(parseInt(value * 100) + ' %');
          progressBar.clear();
          progressBar.fillStyle(0x000000, 1);
          progressBar.fillRect(210, 510, 980 * value, 30);
      });


    //CARGA DE ASSETS

    //BACK BUTTON
    this.load.image('backButton', 'ASSETS/Interface/BackButton/back_button.png');
    this.load.image('backButtonSel', 'ASSETS/Interface/BackButton/back_button_selected.png');

    //BACKGROUND MENUS
    this.load.image('backgroundMenus', 'ASSETS/Interface/Main_background.jpg');

    //INIT MENU
    //Online
    this.load.image('onlineButton', 'ASSETS/Interface/OnlineOfflineMenu/Buttons/online_button.png');
    this.load.image('onlineButtonBloc', 'ASSETS/Interface/OnlineOfflineMenu/Buttons/online_button_blocked.png');
    this.load.image('onlineButtonSel', 'ASSETS/Interface/OnlineOfflineMenu/Buttons/online_button_selected.png');
    //Offline
    this.load.image('offlineButton', 'ASSETS/Interface/OnlineOfflineMenu/Buttons/offline_button.png');
    this.load.image('offlineButtonSel', 'ASSETS/Interface/OnlineOfflineMenu/Buttons/offline_button_selected.png');

    //PRELOAD IMAGES
    this.load.image('level1', 'ASSETS/Interface/LevelPreload/level1.jpg');
    this.load.image('level2', 'ASSETS/Interface/LevelPreload/level2.jpg');
    this.load.image('level3', 'ASSETS/Interface/LevelPreload/level3.jpg');
    this.load.image('level4', 'ASSETS/Interface/LevelPreload/level4.jpg');
    this.load.image('level5', 'ASSETS/Interface/LevelPreload/level5.jpg');
    this.load.image('skipButton', 'ASSETS/Interface/LevelPreload/SkipButton/skip_button.png');
    this.load.image('skipButtonSel', 'ASSETS/Interface/LevelPreload/SkipButton/skip_button_selected.png');

    //MAIN MENU
    //Play
    this.load.image('playButton', 'ASSETS/Interface/MainMenu/Buttons/play_button.png');
    this.load.image('playButtonSel', 'ASSETS/Interface/MainMenu/Buttons/play_button_selected.png');
    //Options
    this.load.image('optionsButton', 'ASSETS/Interface/MainMenu/Buttons/options_button.png');
    this.load.image('optionsButtonSel', 'ASSETS/Interface/MainMenu/Buttons/options_button_selected.png');
    //Credits
    this.load.image('creditsButton', 'ASSETS/Interface/MainMenu/Buttons/credits_button.png');
    this.load.image('creditsButtonSel', 'ASSETS/Interface/MainMenu/Buttons/credits_button_selected.png');
    //Tutorial
    this.load.image('tutorialButton', 'ASSETS/Interface/MainMenu/Buttons/tutorial_button.png');
    this.load.image('tutorialButtonSel', 'ASSETS/Interface/MainMenu/Buttons/tutorial_button_selected.png');
    
    //CHAT
    this.load.image('chatButton', 'ASSETS/Interface/MainMenu/Buttons/chat_button.png');
    
    //TUTORIAL MENU
    this.load.image('backgroundTM', 'ASSETS/Interface/TutorialMenu/tutorial_menu_background.jpg');

    //CREDITS MENU
    this.load.image('backgroundCM', 'Assets/Interface/CreditsMenu/credits_menu_buttons.jpg');

    //OPTIONS MENU
    this.load.image('backgroundOM', 'ASSETS/Interface/OptionsMenu/options_menu_background.jpg');
    this.load.image('volDownButton', 'ASSETS/Interface/OptionsMenu/Buttons/less.png');
    this.load.image('volUpButton', 'ASSETS/Interface/OptionsMenu/Buttons/more.png');
    this.load.image('volDownButtonSel', 'ASSETS/Interface/OptionsMenu/Buttons/less_selected.png');
    this.load.image('volUpButtonSel', 'ASSETS/Interface/OptionsMenu/Buttons/more_selected.png');

    //GAME
    this.load.image('backgroundEs1', 'ASSETS/Gameplay/Maps/barn1.jpg'); //establo 1
    this.load.image('backgroundEs2', 'ASSETS/Gameplay/Maps/barn2.jpg'); //establo 2
    this.load.image('backgroundFa1', 'ASSETS/Gameplay/Maps/facade1.jpg'); //fachada 1
    this.load.image('backgroundFa2', 'ASSETS/Gameplay/Maps/facade2.jpg'); //fachada 2
    this.load.image('backgroundFo', 'ASSETS/Gameplay/Maps/forest.jpg'); //forest

    this.load.image('platform', 'ASSETS/Placeholders/platform.png');
    this.load.image('platformBroken', 'ASSETS/Gameplay/Obstacles/broken_wood.png');//platform broken
    this.load.image('platformBale', 'ASSETS/Gameplay/Obstacles/hay_bale.png');//straw
    this.load.image('pipeline', 'ASSETS/Gameplay/Obstacles/facade2_pipeline.png');
    this.load.image('flowerPot', 'ASSETS/Gameplay/Obstacles/flower_pot.png');
    this.load.image('egg', 'ASSETS/Gameplay/Objects/egg.png');
    this.load.image('eggWhite', 'ASSETS/Gameplay/Objects/white_egg.png');
    this.load.image('leverR', 'Assets/Gameplay/Objects/lever_right.png');
    this.load.image('leverL', 'Assets/Gameplay/Objects/lever_left.png');

    //HUD
    this.load.image('pauseButton', 'ASSETS/Interface/PauseButton/pause_button.png');
    this.load.image('pauseButtonSel', 'ASSETS/Interface/PauseButton/pause_button_selected.png');

    //GOAL
    this.load.image('basketEmpty', 'ASSETS/Gameplay/Objects/empty_egg_counter.png');
    this.load.image('basket2', 'ASSETS/Gameplay/Objects/egg_counter.png');
    this.load.image('basket1', 'ASSETS/Gameplay/Objects/white_egg_counter.png');

    this.load.image('clock', 'ASSETS/Gameplay/Objects/clock.png');

    //PAUSE MENU
    this.load.image('backgroundPM', 'ASSETS/Interface/PauseMenu/pause_menu_buttons.png');
    this.load.image('resumeButtonPM', 'ASSETS/Interface/PauseMenu/Buttons/resume_button.png');
    this.load.image('optionsButtonPM', 'ASSETS/Interface/PauseMenu/Buttons/options_button.png');
    this.load.image('tutorialButtonPM', 'ASSETS/Interface/PauseMenu/Buttons/tutorial_button.png');
    this.load.image('quitButtonPM', 'ASSETS/Interface/PauseMenu/Buttons/quit_button.png');
    this.load.image('resumeButtonPMsel', 'ASSETS/Interface/PauseMenu/Buttons/resume_button_selected.png');
    this.load.image('optionsButtonPMsel', 'ASSETS/Interface/PauseMenu/Buttons/options_button_selected.png');
    this.load.image('tutorialButtonPMsel', 'ASSETS/Interface/PauseMenu/Buttons/tutorial_button_selected.png');
    this.load.image('quitButtonPMsel', 'ASSETS/Interface/PauseMenu/Buttons/quit_button_selected.png');

    //WINNER
    this.load.image('backgroundWM', 'Assets/Interface/VictoryMenu/victory_menu_buttons.jpg');
    this.load.image('quitButtonWM', 'Assets/Interface/VictoryMenu/Buttons/continue_button.png');
    this.load.image('quitButtonWMsel', 'Assets/Interface/VictoryMenu/Buttons/continue_button_selected.png');

    //GAME OVER
    this.load.image('backgroundGOM', 'Assets/Interface/GameOverMenu/game_over_menu_background.jpg');
    this.load.image('quitButtonGOM', 'Assets/Interface/GameOverMenu/Buttons/quit_button.png');
    this.load.image('retryButtonGOM', 'Assets/Interface/GameOverMenu/Buttons/retry_button.png');
    this.load.image('quitButtonGOMsel', 'Assets/Interface/GameOverMenu/Buttons/quit_button_selected.png');
    this.load.image('retryButtonGOMsel', 'Assets/Interface/GameOverMenu/Buttons/retry_button_selected.png');

    //SPRITES
    this.load.spritesheet('chicken1L', 'Assets/Characters/Chickens/brown_stop_izq.png', { frameWidth: 87, frameHeight: 108 });
    this.load.spritesheet('chicken1R', 'Assets/Characters/Chickens/brown_stop_dch.png', { frameWidth: 87, frameHeight: 108 });
    this.load.spritesheet('chicken2L', 'Assets/Characters/Chickens/white_stop_izq.png', { frameWidth: 87, frameHeight: 108 });
    this.load.spritesheet('chicken2R', 'Assets/Characters/Chickens/white_stop_dch.png', { frameWidth: 87, frameHeight: 108 });

    this.load.spritesheet('chicken1izq', 'Assets/Characters/Chickens/brown_chicken_walk_izq.png', { frameWidth: 87, frameHeight: 108 });
    this.load.spritesheet('chicken2izq', 'Assets/Characters/Chickens/white_chicken_walk_izq.png', { frameWidth: 87, frameHeight: 108 });

    this.load.spritesheet('chicken1dch', 'Assets/Characters/Chickens/brown_chicken_walk_dch.png', { frameWidth: 87, frameHeight: 108 });
    this.load.spritesheet('chicken2dch', 'Assets/Characters/Chickens/white_chicken_walk_dch.png', { frameWidth: 87, frameHeight: 108 });

    //MUSIC
    this.load.audio('levelMusic', 'Assets/Music/Nivel.m4a');
    this.load.audio('menuMusic', 'Assets/Music/Menu.m4a');
    this.load.audio('handleSound', 'Assets/Music/SonidoPalanca.mp3');
    this.load.audio('eggSound', 'Assets/Music/RecogerHuevo.mp3');
    this.load.audio('clickSound', 'Assets/Music/click.mp3');
    this.load.audio('goalSound', 'Assets/Music/LlegarCesta.mp3');
    this.load.audio('player_jump', 'Assets/Music/aleteo.mp3');

    this.load.image('logo', 'Assets/Logo_KimeraGames.jpeg');

    this.load.on("complete", () => {
      percentText.destroy();
      progressBar.destroy();
      progressBox.destroy();
	  });


  }

  create(){
    //Aniamcion izq (no va)
    this.anims.create({
      key: 'move_left1',
      frames: this.anims.generateFrameNumbers('chicken1izq',{start: 0, end:3}),
      frameRate:16,
      repeat:-1

    })

    this.anims.create({
      key: 'move_right1',
      frames: this.anims.generateFrameNumbers('chicken1dch',{start: 0, end:3}),
      frameRate:16,
      repeat:-1

    })

    this.anims.create({
      key: 'stop1L',
      frames: this.anims.generateFrameNumbers('chicken1izq',{start: 0, end:0}),
      frameRate:24,
      repeat:-1

    })

    this.anims.create({
      key: 'stop1R',
      frames: this.anims.generateFrameNumbers('chicken1dch',{start: 3, end:3}),
      frameRate:24,
      repeat:-1

    })

    this.anims.create({
      key: 'move_left2',
      frames: this.anims.generateFrameNumbers('chicken2izq',{start: 0, end:3}),
      frameRate:16,
      repeat:-1

    })

    this.anims.create({
      key: 'move_right2',
      frames: this.anims.generateFrameNumbers('chicken2dch',{start: 0, end:3}),
      frameRate:16,
      repeat:-1

    })

    this.anims.create({
      key: 'stop2L',
      frames: this.anims.generateFrameNumbers('chicken2izq',{start: 0, end:0}),
      frameRate:24,
      repeat:-1

    })

    this.anims.create({
      key: 'stop2R',
      frames: this.anims.generateFrameNumbers('chicken2dch',{start: 3, end:3}),
      frameRate:24,
      repeat:-1

    });

    this.logo = this.add.sprite(gameWidth*8/16, gameHeight*8/16, 'logo');
    this.logo.setScale(2/3);
    this.logo.alpha = 0;

    this.tweens.add({
      targets:this.logo,
      duration: 1000,
      alpha: 1,
      yoyo: true,
      hold: 1000,
      completeDelay: 500,
      onComplete:()=>this.scene.start('InitMenu')
    });

  }




}
