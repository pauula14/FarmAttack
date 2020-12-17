'use strict'
class NickName extends Phaser.Scene{

	constructor(){
		super({key: 'NickName'})
	}

	 preload (){
	    this.load.html('nameform', 'Assets/LogInform/loginform.html');
	    this.load.image('botonMP', 'Assets/Interface/BackButton/back_button.png');//BOTON JUGAR
	    this.load.image('fondo', 'Assets/Interface/Main_background.jpg'); //FONDO
	}

 create ()
{

    //background image and rescale
    this.scene.background =this.add.image(gameWidth/2,gameHeight/2,"fondo");
    this.scene.background.displayHeight = gameHeight;
    this.scene.background.scaleY = this.scene.background.scaleX;

    //Font style for leters
    var style = {fontFamily: "Maiandra GD",fontSize:55, color: '#ffcc00', boundsAlignH: "center", boundsAlignV: "middle", stroke:'#000000', strokeThickness: 5};

    //+ to check center
    //game.scene.text = this.add.text(gameWidth/2,gameHeight/2,'+',style);

    this.text = this.add.text(gameWidth*0.6, gameHeight*1.75, 'Introduzca su Nickname',style);

    //Animation for input name and loginButton
    this.element = this.add.dom(gameWidth, gameHeight/2).createFromCache('nameform');
/*
    this.tweens.add({
        targets: this.element,
        y: gameHeight*0.8,
        duration: 1000,
        ease: 'Power3'
    });
*/
    this.checking=false;
    console.log('CREATE FINISH');

  }

  update(){
      jQuery.ajaxSetup({async:false});
      this.element.addListener('click');
      this.element.on('click', function (event) {
         if (event.target.name === 'loginButton')
         {
           if(!this.chekcing){
           console.log('CLICK EVENT ACTIVATE');
           this.chekcing=true;
           //-------------------------------------------------------DEBUG-----------------------------------------------------------
           //document.getElementById('nickname').value = "Prothoky";
           //-------------------------------------------------------DEBUG-----------------------------------------------------------
           game.nick = document.getElementById('nickname');
             if (game.nick.value != '')
             {
               let data = {ip: '', name: game.nick.value, score:0, online:false, lastconection : Date.now()};

               $.ajax({
                 method: "POST",
                 url:game.url,
                 data: JSON.stringify(data),
                 processData: false,
                 async:false,
                 dataType: 'json',
                 contentType: 'application/json',
               }).done(function (){
                 console.log("Register success");
                 game.name = game.nick.value;
                 goMenuPrincipal();
             }).fail(function (value) {
                 if(value.status == 201){
                   console.log("Register success");
                   game.name=game.nick.value;
                   goMenuPrincipal();
                 }
                 else{
                   //text.text = "El usuario ya existe";
                   var url = game.url+'/'+game.nick.value;
                   $.ajax({
                   method: "GET",
                   async:false,
                   url:url,
                   }).done(function(value){
                     console.log("Login");
                     game.name = game.nick.value;
                     goMenuPrincipal();
                   }).fail(function (value) {
                     if(value.status == 200){
                       console.log("Login");
                       game.name = game.nick.value;
                       goMenuPrincipal();
                     }else if(value.status == 0){
                      console.log("Servidor caido");
                      this.chekcing=false;
                    }else{
                      console.log("Fallo no contemplado");
                      this.chekcing=false;
                    }
                   });

                 }
             });
         }
         else
         {
           this.scene.text.setText("Tienes que introducir un nombre de usuario");
           this.scene.text.setFontSize(50);
           this.scene.text.setPosition(gameWidth*0.2,gameHeight*0.9);
           this.chekcing=false;
         }

       }

       }
     });
     jQuery.ajaxSetup({async:true});


  }

}

function goMenuPrincipal(){
  console.log("ENVIADO")

}

function register(url, data){
  var j;
  $.ajax({
     method: "POST",
     url:url,
     data: JSON.stringify(data),
     processData: false,
     dataType: 'json',
     contentType: 'application/json',
    }).done(function () {
        j = true;
    }).fail(function () {
        j = false;
    });
    console.log(j);
    return j;
}
