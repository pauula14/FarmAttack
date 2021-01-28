class NickName extends Phaser.Scene{

	constructor(){
		super({key: 'NickName'})
	}

	preload (){
	    this.load.html('nameform', '../ASSETS/LogInform/loginform.html');
	    this.load.image('botonMP', '../ASSETS/Interface/BackButton/back_button.png');//BOTON JUGAR
	    this.load.image('fondo', '../ASSETS/Interface/Main_background.jpg'); //FONDO
		prevScene = "NickName"
	}

	 create ()
	{

	        let config = {
	        	      mute: false,
	        	      volume: volumeMusic/10,
	        	      rate: 1,
	        	      detune: 0,
	        	      seek: 0,
	        	      loop: true,
	        	      delay: 0
	        	    };

	        musicGameplay = this.sound.add('levelMusic', config);
	        this.clickSound = this.sound.add('clickSound', this.EffectsConfig());

		//background image and rescale
		this.background =this.add.image(gameWidth/2,gameHeight/2,"fondo");

		//Font style for leters
		var style = {fontFamily: 'fort', fontSize: "30px", align: 'center', fill: "#000000", stroke: "#000000"};

		//this.text = this.add.text(gameWidth*5/16, gameHeight*14/16, 'Introduzca su Nickname', style);

		//Animation for input name and loginButton
		this.nickname = this.add.dom(gameWidth*8/16, gameHeight*7/16).createFromCache('nameform');
		this.nickname.setDepth(2);

        //BACK
        this.backButtonMMM = this.add.image(gameWidth*14.5/16, gameHeight*15/16, 'backButton');
        this.backButtonMMM.setScale(2/3);
        this.backButtonMMMSel = this.add.image(gameWidth*14.5/16, gameHeight*15/16, 'backButtonSel');
        this.backButtonMMMSel.setScale(2/3);
        this.backButtonMMMSel.setVisible(false);

        this.backButtonMMM.on('pointerover', function (pointer) {this.backButtonMMMSel.setVisible(true);}, this);
        this.backButtonMMM.on('pointerout', function (pointer) {this.backButtonMMMSel.setVisible(false);}, this);
        this.backButtonMMM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackInit());

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
					  localnick = "USER_" + Math.round(Math.random() *100);
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

	BackInit(){
		this.clickSound.play();
        this.scene.stop("NickName");
        this.scene.start("InitMenu");
        prevScene = 'NickName';
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
}



function goChat(nickScene){
  	prevScene = 'NickName';
	game.scene.stop("NickName");
	game.scene.start("ChatMenu");
}
