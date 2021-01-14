class ChatMenu extends Phaser.Scene{

    constructor(){
        super("ChatMenu");
    }

    preload() { 
		prevScene ='ChatMenu';
    	this.load.html('chatform', '../ASSETS/LogInform/sendmessage.html');
		//this.load.html('chatbox', '../ASSETS/LogInform/chat.html');
    }
    
    create() {
    	
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

        this.chatStack = [];
        this.localStack = [];
        this.indexChat = 0;
        this.chatText = "";

		this.background = this.add.image(gameWidth/2,gameHeight/2,"backgroundCHAT"); 

    	this.textInput = this.add.dom(gameWidth*6/16, 575).createFromCache('chatform');    	

	    var graphics = this.make.graphics();

		//graphics.fillRect(gameWidth*1/16, gameHeight*1/16, gameWidth*7/16, gameHeight*12/16);
 		graphics.fillRect(125, 135, 700, 1000);
        graphics.fillStyle(0xffff00, 1);
	
 		var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
		
		
    	this.chat = this.add.text(gameWidth*2/16, gameHeight*11/16, "", { fontFamily: 'fort', fontSize: '20px', padding: 50, color: "#FFFFFF" , wordWrap: { width: 600 } }).setOrigin(0);
		//this.chat.setFixedSize(600,350);
    	this.chat.setMask(mask);
		

        this.usersConnectedText = this.add.text(gameWidth*11/16, gameHeight*3/16, "", { fontFamily: 'fort', fontSize: '25px', lineSpacing: 15, color: "#FFFFFF", padding: 10});
        this.usersConnectedText.setFixedSize(290, 550);
        this.usersConnectedText.setText("USERS CONNECTED");
	   	
		graphics.fillRect( 800, 100, 1200, 900);
        graphics.fillStyle(0xffff00, 1);
        mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
		this.usersConnectedText.setMask(mask)

        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        this.enterKey.on("down", event => {
        	let text = document.getElementById('message');
            if (text.value != "") {
                this.sendMessage(text.value);
                text.value = "";
            }
        })
        

        //PLAY
        this.playButton = this.add.image(gameWidth*14.5/16, gameHeight*15/16, 'playButton');
        this.playButton.setScale(1.5/3);
        this.playButtonSel = this.add.image(gameWidth*14.5/16, gameHeight*15/16, 'playButtonSel');
        this.playButtonSel.setScale(1.5/3);
        this.playButtonSel.setVisible(false);

        this.playButton.on('pointerover', function (pointer) {this.playButtonSel.setVisible(true);}, this);
        this.playButton.on('pointerout', function (pointer) {this.playButtonSel.setVisible(false);}, this);
        this.playButton.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.PlayerMultiplayerGame());
        
        //BACK
        this.backButtonMMM = this.add.image(gameWidth*12.5/16, gameHeight*15/16, 'backButton');
        this.backButtonMMM.setScale(1.5/3);
        this.backButtonMMMSel = this.add.image(gameWidth*12.5/16, gameHeight*15/16, 'backButtonSel');
        this.backButtonMMMSel.setScale(1.5/3);
        this.backButtonMMMSel.setVisible(false);

        this.backButtonMMM.on('pointerover', function (pointer) {this.backButtonMMMSel.setVisible(true);}, this);
        this.backButtonMMM.on('pointerout', function (pointer) {this.backButtonMMMSel.setVisible(false);}, this);
        this.backButtonMMM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackInit());
    }


    update() {
        alive();
        this.updateUsersConected();
        this.getChat();
        this.updateChat();

    }

    updateUsersConected(){
		let text = "";
        for(var i=0 ; i< usersConnected.length;i++){
            if(usersConnected[i].online){
            	text += usersConnected[i].name +" \n"
            }
        }
        this.usersConnectedText.setText(text);
    }

    getChat(){
        let stack
        $.ajax({
            method: "GET",
            url:url + "/Chat",
            async:false,
            }).done(function(value) {
                stack = value;
            }).fail(function (value) {
                console.log("ERROR");
            });
            this.chatStack = stack;
    }

    updateChat(){
		if(this.chatStack != undefined){
			  while(this.chatStack.length != this.indexChat){
	            let TEXT = this.chatStack[this.indexChat];
	            this.localStack.push(TEXT);
	            this.chatText+=TEXT.toString() + " \n";
	            this.indexChat++;
	        }
	        this.chat.setText(this.chatText);
			this.chat.y =550 - this.chat.height; 
		}
      
    }

    PlayerMultiplayerGame(){
    	this.clickSound.play();
        this.scene.stop("ChatMenu");
        this.scene.start("MainMenuMultiplayer");
        prevScene = 'ChatMenu';
    }
    
    BackInit(){
    	this.clickSound.play();
        this.scene.stop("ChatMenu");
        this.scene.start("InitMenu");
        prevScene = 'ChatMenu';
    }

    sendMessage(message){
        $.ajax({
            method: "POST",
            url:url+"/Chat",
            data: JSON.stringify(name + ": " + message),
            processData: false,
            async:false,
            dataType: 'json',
            contentType: 'application/json',
          }).done(function (){
                console.log("Sended");
          }).fail(function (value) {
                console.log(value);
            }
        );
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