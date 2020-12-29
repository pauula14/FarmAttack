class ChatMenu extends Phaser.Scene{

    constructor(){
        super("ChatMenu");
    }

    preload() { 
    	this.load.html('chatform', 'Assets/LogInform/chat.html');
    }
    
    create() {

        this.chatStack = [];
        this.localStack = [];
        this.indexChat = 0;
        this.chatText = "";

    	//this.textInput = this.add.dom(1135, 690).createFromCache("chatform").setOrigin(0.5);
    	this.textInput = this.add.dom(gameWidth*6/16, gameHeight*10/16).createFromCache('chatform');
    	
        this.chat = this.add.text(gameWidth*1/16, gameHeight*1/16, "", { lineSpacing: 15, backgroundColor: "#eceeee", color: "#000000", padding: 10, fontStyle: "bold", border: "1px solid #a1a3a3", font: "sans-serif" , borderRadius: "4px"});
        this.chat.setFixedSize(970, 565);
        
        this.usersConnectedText = this.add.text(gameWidth*12/16, gameHeight*1/16, "", { lineSpacing: 15, backgroundColor: "#eceeee", color: "#000000", padding: 10, fontStyle: "bold" , border: "1px solid #a1a3a3",  font: "sans-serif", borderRadius: "4px"});
        this.usersConnectedText.setFixedSize(270, 665);
        this.usersConnectedText.setText("USERS CONNECTED");
        
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        this.enterKey.on("down", event => {
        	let text = document.getElementById('message');
            if (text.value != "") {
                this.sendMessage(text.value);
                text.value = "";
            }
        })
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
        while(this.chatStack.length != this.indexChat){
            let TEXT = this.chatStack[this.indexChat];
            this.localStack.push(TEXT);
            this.chatText+=TEXT.toString() + " \n";
            this.indexChat++;
        }
        this.chat.setText(this.chatText);
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
}