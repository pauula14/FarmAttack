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
          x: 600,
          y: 525,
          text: "0 %",
          style: {
              fontSize: '25px',
              fontFamily: 'Berlin Sans FB',
              fontStyle: 'bold',
              fill: '#ffffff'
          }
      });

      percentText.setOrigin(0.5, 0.5);
      this.load.on("progress", function(value){
          console.log(value);
          percentText.setText(parseInt(value * 100) + ' %');
          progressBar.clear();
          progressBar.fillStyle(0xCB2821, 1);
          progressBar.fillRect(110, 510, 980 * value, 30);
      });


    //CARGA DE ASSETS

    //PRELOAD MENU


    //BACKGROUND MENUS
    this.load.image('backgroundMenus', 'ASSETS/Interface/Main_background.jpg');

    //INIT MENU
    //this.load.image('backgroundIM', 'ASSETS/Interface/Main_background.jpg');
    //Online
    this.load.image('onlineButton', 'ASSETS/Interface/OnlineOfflineMenu/Buttons/online_button.png');
    this.load.image('onlineButtonSel', 'ASSETS/Interface/OnlineOfflineMenu/Buttons/online_button_selected.png');
    //Offline
    this.load.image('offlineButton', 'ASSETS/Interface/OnlineOfflineMenu/Buttons/offline_button.png');
    this.load.image('offlineButtonSel', 'ASSETS/Interface/OnlineOfflineMenu/Buttons/offline_button_selected.png');

    //MAIN MENU
    //this.load.image('backgroundMM', 'ASSETS/Interface/MainMenu/main_menu_buttons.jpg');
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

    this.load.image('backButtonMM', 'ASSETS/MainMenu/BotonAtras.png');

    //TUTORIAL MENU
    this.load.image('backgroundTM', 'ASSETS/TutorialMenu/FondoTutorialMenu.jpg');
    this.load.image('backButtonTM', 'ASSETS/TutorialMenu/BotonAtras.png');

    //CREDITS MENU
    this.load.image('backgroundCM', 'ASSETS/CreditsMenu/FondoCreditsMenu.jpg');
    this.load.image('backButtonCM', 'ASSETS/CreditsMenu/BotonAtras.png');

    //OPTIONS MENU
    this.load.image('backgroundOM', 'ASSETS/OptionsMenu/FondoOptionsMenu.jpg');
    this.load.image('backButtonOM', 'ASSETS/OptionsMenu/BotonAtras.png');

    //GAME
    this.load.image('backgroundGM', 'ASSETS/Gameplay/FondoJuego.jpg');
    this.load.image('backgroundEs1', 'ASSETS/Gameplay/Maps/barn1.jpg'); //establo 1
    this.load.image('backgroundEs2', 'ASSETS/Gameplay/Maps/barn2.jpg'); //establo 2
    this.load.image('backgroundFa1', 'ASSETS/Gameplay/Maps/facade1.jpg'); //fachada 1
    this.load.image('backgroundFa2', 'ASSETS/Gameplay/Maps/facade2.jpg'); //fachada 2
    this.load.image('pauseButton', 'ASSETS/Gameplay/botonPausa.png');
    this.load.image('platform', 'ASSETS/Placeholders/platform.png');
    this.load.image('platformBroken', 'ASSETS/Gameplay/Obstacles/broken_wood.png');//platform broken
    this.load.image('platformBale', 'ASSETS/Gameplay/Obstacles/hay_bale.png');//straw
    //this.load.image('chicken1Stop', 'ASSETS/Placeholders/dude.png');
    this.load.image('egg', 'ASSETS/Gameplay/Objects/egg.png');
    this.load.image('eggWhite', 'ASSETS/Gameplay/Objects/white_egg.png');

    this.load.image('basket2', 'ASSETS/Gameplay/Objects/egg_counter.png');
    this.load.image('basket1', 'ASSETS/Gameplay/Objects/white_egg_counter.png');

    //this.load.image('fondoMapa1', 'ASSETS/Placeholders/FondoProvisional.jpeg');

    //SELECT MAP
    this.load.image('star', 'ASSETS/Placeholders/star.png');

    //PAUSE MENU
    this.load.image('backgroundPM', 'ASSETS/PauseMenu/FondoPauseMenu.jpg');
    this.load.image('resumeButtonPM', 'ASSETS/PauseMenu/BotonReanudar.png');
    this.load.image('optionsButtonPM', 'ASSETS/PauseMenu/BotonOpciones.png');
    this.load.image('tutorialButtonPM', 'ASSETS/PauseMenu/BotonTutorial.png');
    this.load.image('quitButtonPM', 'ASSETS/PauseMenu/BotonAbandonar.png');

    //WINNER
    this.load.image('backgroundWM', 'ASSETS/WinnerMenu/FondoWinner.jpg');

    //GAME OVER
    this.load.image('backgroundGOM', 'ASSETS/GameOverMenu/FondoGameOver.jpg');

    //SPRITES
    //this.load.spritesheet('chicken1', 'Assets/Placeholders/dude.png', { frameWidth: 32, frameHeight: 48 });
    //this.load.spritesheet('chicken2', 'Assets/Placeholders/dude.png', { frameWidth: 32, frameHeight: 48 });

    this.load.spritesheet('chicken1izq', 'Assets/Characters/Chickens/brown_chicken_walk_izq.png', { frameWidth: 87, frameHeight: 108 });
    this.load.spritesheet('chicken2izq', 'Assets/Characters/Chickens/white_chicken_walk_izq.png', { frameWidth: 87, frameHeight: 108 });

    this.load.spritesheet('chicken1dch', 'Assets/Characters/Chickens/brown_chicken_walk_dch.png', { frameWidth: 87, frameHeight: 108 });
    this.load.spritesheet('chicken2dch', 'Assets/Characters/Chickens/white_chicken_walk_dch.png', { frameWidth: 87, frameHeight: 108 });


    /*this.backgroundPdM = this.add.image(0, 0, 'backgroundPdM');
    this.backgroundPdM.setPosition(gameWidth/2, gameHeight/2);*/

    //PASA AL MAIN MENU
    this.load.on("complete", () => {
      //prevScene = 'PreloadMenu';
      console.log("Complete");
      this.scene.start('GamePlayEs2');
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
      key: 'stop1',
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
      key: 'stop2',
      frames: this.anims.generateFrameNumbers('chicken2dch',{start: 3, end:3}),
      frameRate:24,
      repeat:-1

    })




  }

  update(){

  }


}
