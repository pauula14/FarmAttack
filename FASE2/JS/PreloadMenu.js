class PreloadMenu extends Phaser.Scene{

  constructor(){
      super("PreloadMenu"); //super hace que la clase herede las caracteristicas de su predecesora
  }

  preload(){
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



    //PASA AL MAIN MENU
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

  //  var text = this.add.text(wid*3/7, heig*3/4, 'Pulse para Iniciar', {fill: "black"});

  }

  update(){

  }


}
