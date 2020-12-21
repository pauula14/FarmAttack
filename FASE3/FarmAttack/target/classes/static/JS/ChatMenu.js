class ChatMenu extends Phaser.Scene{

    constructor(){
        super("ChatMenu");
    }
    


    preload() { 
    	this.load.html('chatform', 'Assets/LogInform/chat.html');
    }
    
    create() {
    
    	//this.textInput = this.add.dom(1135, 690).createFromCache("chatform").setOrigin(0.5);
    	this.textInput = this.add.dom(gameWidth*6/16, gameHeight*10/16).createFromCache('chatform');
    	
        this.chat = this.add.text(gameWidth*1/16, gameHeight*1/16, "", { lineSpacing: 15, backgroundColor: "#eceeee", color: "#000000", padding: 10, fontStyle: "bold", border: "1px solid #a1a3a3", font: "sans-serif" , borderRadius: "4px"});
        this.chat.setFixedSize(970, 565);
        
        this.usersConnected = this.add.text(gameWidth*12/16, gameHeight*1/16, "", { lineSpacing: 15, backgroundColor: "#eceeee", color: "#000000", padding: 10, fontStyle: "bold" , border: "1px solid #a1a3a3",  font: "sans-serif", borderRadius: "4px"});
        this.usersConnected.setFixedSize(270, 665);
        this.usersConnected.setText("USERS CONNECTED");
        
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        
        this.enterKey.on("down", event => {
            let chatbox = this.textInput.getChildByName("chat");
            if (chatbox.value != "") {
                //this.socket.emit("message", chatbox.value);
                chatbox.value = "";
            }
        })
        
        /*

        // Control
        mainPanel
            .on('send-message', function (message) {
                room.broadcast.send(message)
            })
            .on('change-name', function (newUserName) {
                room.changeUserName(newUserName);
            })

        room
            .on('userlist.update', function (users) {
                mainPanel.setUserList(users);
            })
            .on('broadcast.receive', function (message) {
                mainPanel.appendMessage(message);
            })
            .on('userlist.changename', function () {
                mainPanel.setMessages(room.broadcast.getHistory())
            })
            .setUser(userID, userName)
            .joinRoom()
        */
    }

    update() {
    	alive();
     }
}
