class ChatMenu extends Phaser.Scene{

    constructor(){
        super("ChatMenu");
    }

    preload() { 
		prevScene ='ChatMenu';
    	this.load.html('chatform', 'Assets/LogInform/sendmessage.html');
		//this.load.html('chatbox', 'Assets/LogInform/chat.html');
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

		gameWidth*6/16, gameHeight*10/16
    	this.textInput = this.add.dom(gameWidth*6/16, 575).createFromCache('chatform');    	

	    var graphics = this.make.graphics();

 		graphics.fillRect(75, 75, 800, 550);
        graphics.fillStyle(0xffff00, 1);
	
 		var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);
		
		this.backgroundChat = this.add.text(gameWidth*1/16, gameHeight*8/16, "", { fontFamily: 'Arial',  padding: 50,backgroundColor: "#eceeee", color: "#000000" , wordWrap: { width: 600 } }).setOrigin(0);
		this.backgroundChat.setFixedSize(800,550);
    	this.backgroundChat.setMask(mask);
		   	
    	this.chat = this.add.text(gameWidth*1/16, gameHeight*8/16, "", { fontFamily: 'Arial',  padding: 50, color: "#000000" , wordWrap: { width: 600 } }).setOrigin(0);
		//this.chat.setFixedSize(800,550);
    	this.chat.setMask(mask);
		

        this.usersConnectedText = this.add.text(gameWidth*12/16, gameHeight*2/16, "", { lineSpacing: 15, backgroundColor: "#eceeee", color: "#000000", padding: 10, fontStyle: "bold" , border: "1px solid #a1a3a3",  font: "sans-serif", borderRadius: "4px"});
        this.usersConnectedText.setFixedSize(270, 550);
        this.usersConnectedText.setText("USERS CONNECTED");
        
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
        let text="USERS CONNECTED:" + "\n";
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
			this.chat.y = 675 - this.chat.height; 
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