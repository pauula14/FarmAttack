class PreloadMenu extends Phaser.Scene{

  constructor(){
      super("PreloadMenu"); //super hace que la clase herede las caracteristicas de su predecesora
  }

  preload(){

    //Cargamos mapas desbloqueados y dinero del jugador
    var user_map = localStorage.getItem("UserMap"); //Variables a guardar en local
    var user_money = localStorage.getItem("UserMoney"); //Variables a guardar en local
    if(user_map!=null && user_money != null) {
    //  this.stringToArray(user_map);
      user.money = user_money;
    }

    //Checkeamos que estemos en movil o PC
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      PC=false;
    }

    //BARRA DE CARGA DE PROGRESO

      var progressBar = this.add.graphics();

      var progressBox = this.add.graphics();
      progressBox.fillStyle(0xffffff, 0.2);
      progressBox.fillRect(100, 500, 1000, 50);

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

    //Init Menu
      this.load.image('backgroundIM', './ASSETS/InitMenu/InitMenuBackground.jpg');

    //Main MENU
        this.load.image('backgroundMM', './ASSETS/MainMenu/MainMenuBackground.jpg');
        this.load.image('playButton', './ASSETS/MainMenu/BotonJugar.png');
        this.load.image('optionsButton', './ASSETS/MainMenu/BotonOpciones.png');
        this.load.image('creditsButton', './ASSETS/MainMenu/BotonCreditos.png');
        this.load.image('quitButton', './ASSETS/MainMenu/BotonSalir.png');

    //Options Menu
      this.load.image('backgroundOM', './ASSETS/OptionsMenu/OptionsMenuBackground.jpg');
      this.load.image('backButtonOM', './ASSETS/OptionsMenu/BotonSalir.png');

    //Credits Menu
      this.load.image('backgroundCM', './ASSETS/MapSelectionMenu/MapMenuBackground.jpeg'); //CAMBIAR
      this.load.image('backButtonCM', './ASSETS/MapSelectionMenu/BotonSalir.png');

    //Map Selection Menu
      this.load.image('backgroundMSM', './ASSETS/MapSelectionMenu/MapMenuBackground.jpeg');
      this.load.image('World1Button', './ASSETS/MapSelectionMenu/BotonMundo1.png');
      this.load.image('backButtonMSM', './ASSETS/MapSelectionMenu/BotonSalir.png');

    //Level Manager
      this.load.spritesheet('dude', 'ASSETS/Placeholders/dude.png', { frameWidth: 32, frameHeight: 48 });
      this.load.image('ground', 'ASSETS/Placeholders/platform.png');
      this.load.image('dot', 'ASSETS/Placeholders/star.png');
      this.load.image('bomb', 'ASSETS/Placeholders/bomb.png');
      this.load.image('bg_far', 'ASSETS/Secciones/Zona lejana.png');
      this.load.image('bg_medium' , 'ASSETS/Secciones/Zona media.png');
      this.load.image('bg_near' , 'ASSETS/Secciones/Zona delantera.png');
      this.load.image('bg_background', 'ASSETS/Secciones/Fondo.png');
      this.load.image('einar', 'ASSETS/Gameplay/einar_provisional.png');

    //Pause Menu
      this.load.image('backgroundPM', './ASSETS/PauseMenu/PauseMenuBackground.jpg');
      this.load.image('backButtonPM', './ASSETS/PauseMenu/BotonAtras.png');
      this.load.image('quitButtonPM', './ASSETS/PauseMenu/BotonAbandonar.png');
      this.load.image('optionsButtonPM', './ASSETS/PauseMenu/BotonOpciones.png');

      //World 1 Map
        this.load.image('backgroundWM1M', './ASSETS/World1Menu/FondoMapaMundo1.jpg');
        this.load.image('ButtonNodePrinc', './ASSETS/World1Menu/IconosNodos/NodoPrincipalDesbloq.png');
        this.load.image('ButtonNodePrincSnow', './ASSETS/World1Menu/IconosNodos/NodoPrincipalNieveDesbloq.png');
        this.load.image('ButtonNodePrincSel', './ASSETS/World1Menu/IconosNodos/NodoPrincipalSel.png');
        this.load.image('ButtonNodePrincSnowSel', './ASSETS/World1Menu/IconosNodos/NodoPrincipalNieveSel.png');
        this.load.image('ButtonSubode1', './ASSETS/World1Menu/NodoSecundario.png'); //CAMBIAR
        this.load.image('ButtonPlayLevel', './ASSETS/World1Menu/BotonJugar.png'); //CAMBIAR
        this.load.image('BackgrAcessToLevel', './ASSETS/World1Menu/FondoAccesoANivel.png'); //CAMBIAR
        this.load.image('Level0Name', './ASSETS/World1Menu/NombreNivel0.png'); //CAMBIAR


      //Carga automáticamente main menu cuando los assets están cargados
        /*this.load.on('complete', () => {
          this.scene.start('MainMenu')
        })*/

        this.load.on("complete", () => {
            console.log("Complete");
            this.scene.start('MainMenu');
        });

  }

  create(){

    var wid = this.cameras.main.width;
    var heig = this.cameras.main.height;

    var background = this.add.image(0, 0, 'backgroundIM');
    background.setPosition(wid/2, heig/2);
    background.setScale(2/3);

    var text = this.add.text(wid*3/7, heig*3/4, 'Pulse para Iniciar', {fill: "black"});

    //Tienes que hacer click para pasar al main menu
    /*this.input.on('pointerdown', function (pointer){
        this.scene.start('MainMenu');
    }, this);*/

  }

  update(){

  }

  stringToArray(user_map) {
    var separador = ",";
    var mapas = user_map.split(separador);

    for (var i=0; i < mapas.length; i++) {
      user.map[i] =mapas[i];
    }
  }

}
