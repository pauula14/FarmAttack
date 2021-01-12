class NickName extends Phaser.Scene{

	constructor(){
		super({key: 'NickName'})
	}

	preload (){
	    this.load.html('nameform', 'Assets/LogInform/loginform.html');
	    this.load.image('botonMP', 'Assets/Interface/BackButton/back_button.png');//BOTON JUGAR
	    this.load.image('fondo', 'Assets/Interface/Main_background.jpg'); //FONDO
		prevScene = "NickName"
	}

	 create ()
	{
	    
		//background image and rescale
		this.background =this.add.image(gameWidth/2,gameHeight/2,"fondo");

		//Font style for leters
		var style = {fontFamily: 'fort', fontSize: "30px", align: 'center', fill: "#000000", stroke: "#000000"};

		this.text = this.add.text(gameWidth*5/16, gameHeight*14/16, 'Introduzca su Nickname', style);

		//Animation for input name and loginButton
		this.nickname = this.add.dom(gameWidth*8/16, gameHeight*7/16).createFromCache('nameform');
		this.nickname.setDepth(2);

		this.checking=false;
		console.log('CREATE FINISH');
  	}
	
	update(){
		jQuery.ajaxSetup({async:false});
	  	this.nickname.addListener('click');
      	this.nickname.on('click', function (event) {
	  		if (event.target.name === 'loginButton')
			  {
			    if(!this.chekcing){
			      console.log('CLICK EVENT ACTIVATE');
			      this.chekcing=true;
			      this.nick = document.getElementById('nickname');
			      var localnick = this.nick.value;
			      if (localnick === ''){
					  localnick = "DEFAULT";
				  }
			        let data = {ip: '', name: localnick, score:0, online:false, lastconection : Date.now()};

			        $.ajax({
			          method: "POST",
			          url:url,
			          data: JSON.stringify(data),
			          processData: false,
			          async:false,
			          dataType: 'json',
			          contentType: 'application/json',
			        }).done(function (){
			          console.log("Register success");
			          name = localnick;
			          goChat(this.scene);
			        }).fail(function (value) {
			          if(value.status == 201){
			            console.log("Register success");
			            name=localnick;
			            goChat(this.scene);
			          }
			          else{
			            //El usuario ya existe
			            let localurl = url+'/'+ localnick;
			            $.ajax({
			              method: "GET",
			              async:false,
			              url: localurl,
			            }).done(function(value){
			              console.log("Login");
			              name = localnick;
			              goChat(this.scene);
			            }).fail(function (value) {
			              if(value.status == 200){
			                console.log("Login");
			                name = localnick;
			                goChat(this.scene);
			              }else if(value.status == 0){
			                console.log("Servidor caido");
							game.scene.sendToBack(prevScene);
					 	 	game.scene.stop(prevScene);
					 	 	game.scene.bringToTop('ServidorCaido');
			                this.chekcing=false;
			              }else{
			                console.log("Fallo no contemplado");
			                this.chekcing=false;
			              }
			            });
			          }
			        });
			      
			    }
			}
      	});
		jQuery.ajaxSetup({async:true});
	}

}



function goChat(nickScene){
  	prevScene = 'NickName';
	game.scene.stop("NickName");
	game.scene.start("ChatMenu");
}